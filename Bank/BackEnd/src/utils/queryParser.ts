import { Request } from "express";
import { IRequestQueryTransactions } from "../types/IHttp.js";
import { CATEGORIES } from "./constant.js";
import Transaction from "../models/Transaction.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

const ACCOUNT_TYPES = ["deposit", "withdrawal", "transfer", "loan payment"];

type IAccountType = "deposit" | "withdrawal" | "transfer" | "loan payment";
type IAccountCategory =
  | "entertainment"
  | "food"
  | "government"
  | "healthcare"
  | "housing"
  | "insurance"
  | "miscellaneous"
  | "payments"
  | "salary"
  | "transportation";

interface IProcessedTrasactoinsFilters {
  query: string;
  sides: ("Payee" | "Payor")[];
  types: IAccountType[];
  categories: IAccountCategory[];
  start: Date;
  end: Date;
  limit: number;
  offset: number;
}

export function getTrasactoinsFilters(filters: IRequestQueryTransactions) {
  // const query = filters.query ?? "^\\d{11}$";
  const query = filters.query ?? "";
  const sides = (filters.side?.split(",") || ["Payee", "Payor"]) as (
    | "Payee"
    | "Payor"
  )[];
  const types = (filters.type?.split(",") || ACCOUNT_TYPES).map((t) =>
    t.toLowerCase()
  ) as IAccountType[];
  const categories = (filters.category?.split(",") || CATEGORIES).map((c) =>
    c.toLowerCase()
  ) as IAccountCategory[];

  const start = filters.start
    ? new Date(filters.start)
    : new Date("2024-01-01Z00:00:00:000"); // the start date of the bank
  let end = filters.end ? new Date(filters.end) : new Date();
  if (end < start) end = start;
  end.setDate(end.getDate() + 1);
  const page = parseInt(filters.page);
  const limit = 10;
  const offset = (page - 1) * limit;
  return {
    query,
    sides,
    types,
    categories,
    start: new Date(dayjs.utc(start).local().format()),
    end: new Date(dayjs.utc(end).local().format()),
    // start,
    // end,
    limit,
    offset,
  };
}

export function getAccountMatch(req: Request, sides: ("Payee" | "Payor")[]) {
  const accountMatch = [];
  if (sides.includes("Payee"))
    accountMatch.push({ receiverAccount: req.account });
  if (sides.includes("Payor"))
    accountMatch.push({ senderAccount: req.account });

  return accountMatch;
}

export function transformPopulatedResult(
  req: Request,
  result: any,
  query: string
) {
  return result
    .filter((item) => {
      const isReceiver =
        req.account!._id.toString() ===
        item._doc.receiverAccount?._id.toString();
      const isSenderMatch =
        item._doc.senderAccount?.number.includes(query) ?? true;

      const isSender =
        req.account!._id.toString() === item._doc.senderAccount?._id.toString();
      const isReceiverMatch =
        item._doc.receiverAccount?.number.includes(query) ?? true;
      return (isReceiver && isSenderMatch) || (isSender && isReceiverMatch);
    })
    .map((item) => {
      const tag =
        req.account!._id.toString() === item._doc.senderAccount?._id.toString()
          ? "payor"
          : "payee";
      const newDoc = { ...item._doc, tag };
      return Object.assign(item, { _doc: newDoc });
    });
}

export function buildSearchQuery(
  req: Request,
  filters: IProcessedTrasactoinsFilters
) {
  const { query, sides, types, categories, start, end } = filters;
  const accountMatch = getAccountMatch(req, sides);

  let searchQuery = Transaction.find({
    $or: accountMatch,
    type: { $in: types },
    category: { $in: categories },
    createdAt: { $gte: start, $lte: end },
  })
    .populate({
      path: "senderAccount receiverAccount",
      select: "number",
    })
    .transform((result) => transformPopulatedResult(req, result, query))
    .sort("-createdAt");

  return searchQuery;
}

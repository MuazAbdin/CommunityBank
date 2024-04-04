import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
dayjs.extend(localizedFormat);
import {
  IAccountDetails,
  IUserWithoutPasswordDetails,
} from "../types/IHttp.js";
import { buildSearchQuery } from "./queryParser.js";

export default function buildTransactionsPDF(
  pdfDoc: PDFKit.PDFDocument,
  userData: IUserWithoutPasswordDetails,
  accountData: IAccountDetails,
  transactions: Awaited<ReturnType<typeof buildSearchQuery>>
) {
  // A4 595.28 x 841.89 (portrait) (about width sizes)
  pdfDoc.image("images/BankLogo.png", 50, 50, { width: 170 });
  pdfDoc
    .font("fonts/SourceSerif4-Regular.ttf", 12)
    .text(`${dayjs().format("LLLL")}`, { align: "right" })
    .moveDown(1.5);

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 18)
    .text("Account Statement", { align: "center" })
    .moveDown(0.4);

  pdfDoc
    .moveTo(50, 120)
    .lineTo(pdfDoc.page.width - 50, 120)
    .stroke();

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 12)
    .text("Owner: ", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text(
      `${captlize(userData.name.first)} ${captlize(userData.name.last)}   |`,
      { continued: true }
    )
    .font("fonts/SourceSerif4-Bold.ttf")
    .text("   Number: ", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text(`${formatAccountNumber(accountData.number)}   |`, {
      continued: true,
    })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text("   Type: ", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text(`${accountData.type}`)
    .font("fonts/SourceSerif4-Bold.ttf")
    .text("Balance: ", { continued: true })
    .fillColor(`${getBalanceColor(accountData.balance)}`)
    .font("fonts/SourceSerif4-Bold.ttf", 14)
    .text(`${accountData.balance < 0 ? "-" : ""} ${accountData.balance} `, {
      continued: true,
    })
    .font("fonts/NotoSansHebrew-Regular.ttf")
    .text("₪")
    .fillColor("black");

  pdfDoc
    .strokeColor("black")
    .strokeOpacity(0.3)
    .moveTo(50, 175)
    .lineWidth(25)
    .lineTo(pdfDoc.page.width - 50, 175)
    .lineCap("butt")
    .stroke();

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 14)
    .text("Date", 100, 166)
    .text("Account", 200, 166)
    .text("Category", 340, 166)
    .text("Amount", 460, 166);

  let lineYPos = 192;
  let isFooterDrawn = true;
  let pageNum = 1;
  drawFooter(pdfDoc, pageNum);

  //@ts-ignore
  transactions.forEach((t, i: number) => {
    if (!isFooterDrawn) {
      drawFooter(pdfDoc, pageNum);
      isFooterDrawn = true;
    }

    const targetAccount =
      t._doc.tag === "payor"
        ? t.receiverAccount?.number || " --- "
        : t.senderAccount?.number || " --- ";
    const amountStyle = t._doc.tag === "payor" ? "red" : "green";
    const sign = t._doc.tag === "payor" ? "-" : "";

    pdfDoc
      .fillColor("black")
      .font("fonts/SourceSerif4-Regular.ttf", 12)
      .text(`${i + 1}.`, 60, lineYPos)
      .text(`${formatDate(t.createdAt)}`, 100, lineYPos)
      .text(`${formatAccountNumber(targetAccount)}`, 200, lineYPos)
      .text(`${t.category}`, 340, lineYPos)
      .fillColor(amountStyle)
      .text(`${sign} ${t.amount} `, 460, lineYPos, { continued: true })
      .font("fonts/NotoSansHebrew-Regular.ttf")
      .text("₪");

    lineYPos += 25;

    if (lineYPos > pdfDoc.page.height - 100) {
      pdfDoc.addPage();
      lineYPos = 50;
      isFooterDrawn = false;
      pageNum++;
    }
  });
}

function drawFooter(pdfDoc: PDFKit.PDFDocument, pageNum: number) {
  pdfDoc
    .strokeColor("black")
    .strokeOpacity(1)
    .lineWidth(1)
    .moveTo(50, pdfDoc.page.height - 80)
    .lineTo(pdfDoc.page.width - 50, pdfDoc.page.height - 80)
    .stroke();

  pdfDoc
    .fillColor("black")
    .font("fonts/SourceSerif4-Bold.ttf", 11)
    .text("Community Bank", 130, pdfDoc.page.height - 75, {
      continued: true,
      lineBreak: false,
    })
    .font("fonts/SourceSerif4-Regular.ttf", 10)
    .text(", Jerusalem, Community st. 13. ", {
      continued: true,
      lineBreak: false,
    })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text("Tel: ", { continued: true, lineBreak: false })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("02-1234567 .", { lineBreak: false })
    .moveDown(0.25);

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 13)
    .text(
      `- ${pageNum} -`,
      (pdfDoc.page.width - 50) / 2,
      pdfDoc.page.height - 55,
      {
        align: "center",
        lineBreak: false,
      }
    );
}

function captlize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatAccountNumber(value: string) {
  return `${value.slice(0, 2)} - ${value.slice(2, 5)} - ${value.slice(5)}`;
}

function formatDate(date: Date): string {
  const month = date.getMonth() + 1; // months from 1-12
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
}

function getBalanceColor(balance: number) {
  if (balance <= 0) return "red";
  if (balance <= 300) return "orange";
  return "green";
}

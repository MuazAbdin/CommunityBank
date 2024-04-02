import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
dayjs.extend(localizedFormat);
import {
  IAccountDetails,
  IUserWithoutPasswordDetails,
} from "../types/IHttp.js";
import { amortizedSchedule } from "./amortizedSchedule.js";
import Loan from "../models/Loan.js";

export default function buildLoanPDF(
  pdfDoc: PDFKit.PDFDocument,
  userData: IUserWithoutPasswordDetails,
  accountData: IAccountDetails,
  loan: any,
  schedule: ReturnType<typeof amortizedSchedule>
) {
  // A4 595.28 x 841.89 (portrait) (about width sizes)
  pdfDoc.image("images/BankLogo.png", 50, 50, { width: 170 });
  pdfDoc
    .font("fonts/SourceSerif4-Regular.ttf", 12)
    .text(`${dayjs().format("LLLL")}`, { align: "right" })
    .moveDown(1.5);

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 18)
    .text("Loan Amortization Schedule", { align: "center" })
    .moveDown(0.4);

  pdfDoc
    .moveTo(50, 120)
    .lineTo(pdfDoc.page.width - 50, 120)
    .stroke();

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 12)
    .text("Account: ", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text(`${formatAccountNumber(accountData.number)}   |`, {
      continued: true,
    })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text("   Owner: ", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text(
      `${captlize(userData.name.first)} ${captlize(userData.name.last)}   |`,
      { continued: true }
    )
    .font("fonts/SourceSerif4-Bold.ttf")
    .text("   Balance: ", { continued: true })
    .fillColor(`${getBalanceColor(accountData.balance)}`)
    .font("fonts/SourceSerif4-Bold.ttf", 13)
    .text(`${accountData.balance < 0 ? "-" : ""} ${accountData.balance} `, {
      continued: true,
    })
    .font("fonts/NotoSansHebrew-Regular.ttf")
    .text("₪")
    .fillColor("black");

  pdfDoc
    .roundedRect(50, 150, pdfDoc.page.width - 100, 75, 5)
    .fillOpacity(0.1)
    .fillAndStroke("black", "black");

  let nextMonth = new Date(loan.createdAt);
  nextMonth.setMonth(nextMonth.getMonth() + loan.nextPayment + 1);

  pdfDoc
    .fillOpacity(1)
    .font("fonts/SourceSerif4-Regular.ttf", 12)
    .text("Loan Amount: ", 60, 158, { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${loan.amount} `, { continued: true })
    .font("fonts/NotoSansHebrew-Regular.ttf")
    .text("₪", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("  |  Interest Rate: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${loan.interestRate} %`, { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("  |  Next Payment: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${loan.nextPayment + 1}`, { continued: true })
    .moveUp(0.1)
    .font("fonts/SourceSerif4-Bold.ttf", 8)
    .text("th", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf", 12)
    .moveDown(0.1)
    .text(" on: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${dayjs(nextMonth).format("MMM  YYYY")}`)
    .moveDown(0.3);

  pdfDoc
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("Total Payments: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${schedule[loan.term].payment} `, { continued: true })
    .font("fonts/NotoSansHebrew-Regular.ttf")
    .text("₪", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("  |  Monthly Payment: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${schedule[loan.term - 1].payment} `, { continued: true })
    .font("fonts/NotoSansHebrew-Regular.ttf")
    .text("₪", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("  |  Total Interest: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${schedule[loan.term].interest} `, { continued: true })
    .font("fonts/NotoSansHebrew-Regular.ttf")
    .text("₪")
    .moveDown(0.3);

  pdfDoc
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("Start Date: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${dayjs(loan.createdAt).format("MMM  YYYY")} `, { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("  |  Pay-off Date: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${dayjs(loan.payOffDate).format("MMM  YYYY")}`, { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("  |  Loan Term: ", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(`${loan.term} months`)
    .moveDown();

  pdfDoc
    .strokeColor("black")
    .strokeOpacity(0.3)
    .moveTo(50, 238)
    .lineWidth(25)
    .lineTo(pdfDoc.page.width - 50, 238)
    .lineCap("butt")
    .stroke();

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 14)
    .text("Date", 60, 228)
    .text("Payment", 150, 228)
    .text("Interest", 250, 228)
    .text("Principal", 350, 228)
    .text("Balance", 450, 228);

  let lineYPos = 254;
  let isFooterDrawn = true;
  let pageNum = 1;
  drawFooter(pdfDoc, pageNum);
  let startDate = new Date(loan.createdAt);

  schedule.forEach((r, i) => {
    if (!isFooterDrawn) {
      drawFooter(pdfDoc, pageNum);
      isFooterDrawn = true;
    }

    startDate.setMonth(startDate.getMonth() + 1);
    let dateText = dayjs(startDate).format("MMM  YYYY");
    let fontSize = 12;
    let fontWeight = "Regular";
    if (i === schedule.length - 1) {
      dateText = "";
      fontSize = 13;
      fontWeight = "Bold";
    }

    if (i < schedule.length - 1 && loan.nextPayment === i) {
      pdfDoc
        .strokeColor("red")
        .strokeOpacity(0.2)
        .moveTo(50, lineYPos + 10)
        .lineWidth(25)
        .lineTo(pdfDoc.page.width - 50, lineYPos + 10)
        .lineCap("butt")
        .stroke();

      pdfDoc
        .fillColor("red")
        .font("fonts/NotoSansMath-Regular.ttf", 15)
        .text("⇒", 35, lineYPos);
    }

    if (i < schedule.length - 1 && loan.nextPayment > i) {
      pdfDoc
        .fillColor("green")
        .font("fonts/NotoSansSymbols2-Regular.ttf", 15)
        .text("✔", 35, lineYPos);
    }

    pdfDoc
      .fillColor("black")
      .fontSize(fontSize)
      .font(`fonts/SourceSerif4-${fontWeight}.ttf`)
      .text(`${dateText}`, 60, lineYPos)
      .text(`${r.payment}`, 160, lineYPos, { continued: true })
      .font("fonts/NotoSansHebrew-Regular.ttf")
      .text(" ₪")
      .font(`fonts/SourceSerif4-${fontWeight}.ttf`)
      .text(`${r.interest}`, 260, lineYPos, { continued: true })
      .font("fonts/NotoSansHebrew-Regular.ttf")
      .text(" ₪")
      .font(`fonts/SourceSerif4-${fontWeight}.ttf`)
      .text(`${r.principal}`, 360, lineYPos, { continued: true })
      .font("fonts/NotoSansHebrew-Regular.ttf")
      .text(" ₪")
      .font(`fonts/SourceSerif4-${fontWeight}.ttf`)
      .text(`${r.balance} `, 450, lineYPos, { continued: true })
      .font("fonts/NotoSansHebrew-Regular.ttf")
      .text(`${i === schedule.length - 1 ? "" : " ₪"}`);

    if (i === schedule.length - 1) {
      pdfDoc
        .strokeColor("black")
        .strokeOpacity(0.3)
        .moveTo(150, lineYPos + 10)
        .lineWidth(25)
        .lineTo(450, lineYPos + 10)
        .lineCap("butt")
        .stroke();
    }

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

function getBalanceColor(balance: number) {
  if (balance <= 0) return "red";
  if (balance <= 300) return "orange";
  return "green";
}

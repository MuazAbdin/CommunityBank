import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
dayjs.extend(localizedFormat);
import { IAccount } from "../types/IModels.js";
import Account from "../models/Account.js";

export default function buildBADC_PDF(
  pdfDoc: PDFKit.PDFDocument,
  accountData: IAccount
  // accountData: Awaited<ReturnType<typeof Account.findOne>>
) {
  // A4 595.28 x 841.89 (portrait) (about width sizes)
  pdfDoc
    .image("images/BankLogo.png", (pdfDoc.page.width - 200) / 2, 80, {
      width: 200,
    })
    .moveDown(4);

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 18)
    .text("Bank account Details Confirmation", { align: "center" })
    .moveDown();

  pdfDoc
    .font("fonts/SourceSerif4-Regular.ttf", 13)
    .text(`${dayjs().format("LLLL")}`)
    .moveDown();

  pdfDoc.text("To Whom It May Concern:").moveDown();

  pdfDoc
    .text("This letter is to inform you that ", {
      align: "justify",
      indent: 15,
      continued: true,
    })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(
      `${captlize(accountData.user.name.first)} ${captlize(
        accountData.user.name.last
      )} `,
      { continued: true }
    )
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("has a personal", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(` ${accountData.type} `, { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text("account with", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf")
    .text(" Community Bank", { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text(", the account number is:", { continued: true })
    .font("fonts/SourceSerif4-Bold.ttf", 14)
    .text(` ${accountData.number}`, { continued: true })
    .font("fonts/SourceSerif4-Regular.ttf")
    .text(".")
    .moveDown();

  pdfDoc
    .font("fonts/SourceSerif4-Regular.ttf", 13)
    .text(
      "If you have any further questions, please do not hesitate to call us.",
      { indent: 15 }
    )
    .moveDown(2);

  pdfDoc
    .font("fonts/SourceSerif4-Bold.ttf", 14)
    .text("Bank Manager")
    .moveDown(0.25);
  pdfDoc
    .font("fonts/SourceSerif4-Regular.ttf", 13)
    .text("Sawyer Ford")
    .moveDown();
  pdfDoc.image("images/BankSignature.png", { height: 100 });

  pdfDoc
    .moveTo(80, pdfDoc.page.height - 80)
    .lineTo(pdfDoc.page.width - 80, pdfDoc.page.height - 80)
    .stroke();

  pdfDoc
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
    .text("02-1234567 .", { lineBreak: false });
}

function captlize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

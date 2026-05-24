import PDFDocument from "pdfkit";

export const generateItineraryPDF = async (tripData: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      bufferPages: true,
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageWidth = doc.page.width - 100;

    doc
      .fontSize(28)
      .font("Helvetica-Bold")
      .fillColor("#0f172a")
      .text(tripData.planName, { width: pageWidth });

    doc.moveDown(0.3);

    doc
      .moveTo(50, doc.y)
      .lineTo(50 + pageWidth, doc.y)
      .strokeColor("#0052cc")
      .lineWidth(3)
      .stroke();

    doc.moveDown(0.5);

    const metaParts = [
      `Date: ${tripData.planDate}`,
      `Travelers: ${tripData.numberOfPeople}`,
      `Budget: ${tripData.BudgetCategory}`,
      `Total: INR ${tripData.EstimatedTotalCostINR?.toLocaleString()}`,
    ];

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#64748b")
      .text(metaParts.join("   |   "), { width: pageWidth });

    doc.moveDown(1);

    if (tripData.PlanDescription) {
      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#475569")
        .text(tripData.PlanDescription, { width: pageWidth, lineGap: 3 });
      doc.moveDown(1.5);
    }

    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .fillColor("#0f172a")
      .text("Recommended Accommodations", { width: pageWidth });

    doc.moveDown(0.3);
    doc
      .moveTo(50, doc.y)
      .lineTo(50 + pageWidth, doc.y)
      .strokeColor("#e2e8f0")
      .lineWidth(1)
      .stroke();
    doc.moveDown(0.5);

    const colWidths = [pageWidth * 0.35, pageWidth * 0.30, pageWidth * 0.15, pageWidth * 0.20];
    const headerLabels = ["Hotel Name", "Location", "Rating", "Price/Night"];
    const startX = 50;

    let xPos = startX;
    doc.fontSize(8).font("Helvetica-Bold").fillColor("#475569");
    for (let i = 0; i < headerLabels.length; i++) {
      const align = i === 3 ? "right" as const : "left" as const;
      doc.text(headerLabels[i]!, xPos, doc.y, { width: colWidths[i], align, continued: false });
      if (i < headerLabels.length - 1) {
        doc.y = doc.y - doc.currentLineHeight();
      }
      xPos += colWidths[i]!;
    }

    doc.moveDown(0.5);

    if (tripData.hotelList && tripData.hotelList.length > 0) {
      for (const hotel of tripData.hotelList) {
        if (doc.y > doc.page.height - 100) {
          doc.addPage();
        }

        const rowY = doc.y;
        xPos = startX;

        doc.fontSize(9).font("Helvetica-Bold").fillColor("#1e293b");
        doc.text(hotel.NameOfHotel, xPos, rowY, { width: colWidths[0], continued: false });

        doc.fontSize(9).font("Helvetica").fillColor("#475569");
        doc.text(hotel.LocationOfHotel, xPos + colWidths[0]!, rowY, { width: colWidths[1], continued: false });

        doc.text(`${hotel.HotelStars} Stars`, xPos + colWidths[0]! + colWidths[1]!, rowY, { width: colWidths[2], continued: false });

        doc.font("Helvetica-Bold").fillColor("#0f172a");
        doc.text(`INR ${hotel.PricePerNight.toLocaleString()}`, xPos + colWidths[0]! + colWidths[1]! + colWidths[2]!, rowY, { width: colWidths[3], align: "right", continued: false });

        doc.y = Math.max(doc.y, rowY + 15);
        doc.moveDown(0.3);

        doc
          .moveTo(startX, doc.y)
          .lineTo(startX + pageWidth, doc.y)
          .strokeColor("#f1f5f9")
          .lineWidth(0.5)
          .stroke();

        doc.moveDown(0.3);
      }
    }

    if (tripData.events && tripData.events.length > 0) {
      doc.addPage();

      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text("Daily Schedule Timeline", { width: pageWidth });

      doc.moveDown(1);

      for (const day of tripData.events) {
        if (doc.y > doc.page.height - 150) {
          doc.addPage();
        }

        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .fillColor("#0052cc")
          .text(`Day ${day.Day} - ${day.Nameoftheday} (${day.DayDate})`, { width: pageWidth });

        doc.moveDown(0.2);
        doc
          .moveTo(50, doc.y)
          .lineTo(50 + pageWidth, doc.y)
          .strokeColor("#e2e8f0")
          .lineWidth(1)
          .stroke();
        doc.moveDown(0.5);

        if (day.Events && day.Events.length > 0) {
          for (const event of day.Events) {
            if (doc.y > doc.page.height - 120) {
              doc.addPage();
            }

            const blockX = 54;
            const blockWidth = pageWidth - 8;
            const blockStartY = doc.y;

            doc
              .fontSize(11)
              .font("Helvetica-Bold")
              .fillColor("#1e293b")
              .text(event.NameOfEvent, blockX, doc.y, { width: blockWidth - 120 });

            doc
              .fontSize(8)
              .font("Helvetica")
              .fillColor("#0369a1")
              .text(event.Time, blockX + blockWidth - 120, blockStartY, { width: 120, align: "right" });

            if (doc.y < blockStartY + 14) {
              doc.y = blockStartY + 14;
            }

            doc.moveDown(0.2);

            doc
              .fontSize(9)
              .font("Helvetica")
              .fillColor("#475569")
              .text(event.EventDescription, blockX, doc.y, { width: blockWidth, lineGap: 2 });

            doc.moveDown(0.3);

            doc
              .fontSize(8)
              .font("Helvetica")
              .fillColor("#94a3b8")
              .text(
                `Duration: ${event.TotalTimeConsumption} Hours  |  Type: ${event.PriceType}`,
                blockX,
                doc.y,
                { width: blockWidth }
              );

            doc
              .moveTo(50, blockStartY)
              .lineTo(50, doc.y + 5)
              .strokeColor("#3b82f6")
              .lineWidth(3)
              .stroke();

            doc.moveDown(1);
          }
        }

        doc.moveDown(0.5);
      }
    }

    doc.end();
  });
};
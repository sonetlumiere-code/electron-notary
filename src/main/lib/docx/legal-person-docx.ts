import { LegalPersonDataSheet } from "@shared/types"
import { Document, Packer, Paragraph, TabStopPosition, TabStopType, TextRun } from "docx"

const legalPersonDocBuffer = async (legalPersons: LegalPersonDataSheet[]): Promise<Buffer> => {
  const sections = legalPersons.map((legalPerson) => ({
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: "FICHA DE DATOS PERSONALES",
            bold: true
          })
        ],
        spacing: {
          after: 200
        }
      }),

      // createFormField()

      new Paragraph({
        children: [
          new TextRun({
            text: "Firma",
            bold: true
          })
        ],
        spacing: {
          before: 200
        },
        alignment: "right"
      })
    ]
  }))

  const doc = new Document({
    sections: sections
  })

  function createFormField(label: string, multiline = false) {
    return new Paragraph({
      children: [
        new TextRun({
          text: label
        })
      ],
      tabStops: [
        {
          type: TabStopType.LEFT,
          position: TabStopPosition.MAX
        }
      ],
      spacing: {
        after: 200
      }
    })
  }

  return await Packer.toBuffer(doc)
}

export default legalPersonDocBuffer

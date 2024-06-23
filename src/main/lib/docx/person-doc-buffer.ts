import { PersonDataSheet } from "@shared/types"
import { Document, Packer, Paragraph, TabStopPosition, TabStopType, TextRun } from "docx"

const personDocBuffer = async (persons: PersonDataSheet[]): Promise<Buffer> => {
  const sections = persons.map((person) => ({
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
      createFormField(`Nombre (completo): ${person.name}`),
      createFormField(`Apellido: ${person.lastName}`),
      createFormField(`Sexo: ${person.gender}`),
      createFormField(`Nacionalidad: ${person.nationality}`),
      createFormField(`${person.documentType}: ${person.documentNumber}`),
      createFormField(`CUIT/L: ${person.CUIT_L}`),
      createFormField(`Fecha de nacimiento: ${person.birthdate}`),
      createFormField(`Lugar de nacimiento: ${person.birthplace}`),
      createFormField(`Estado civil: ${person.maritalStatus}`),
      // createFormField(
      //   `Soltero: Nombre padre: ${person.} Nombre madre: ${person.nombreMadre}`,
      //   true
      // ),
      // createFormField(
      //   `Casado: nº nupcias: ${person.numNupcias} nombre cónyuge: ${person.nombreConyuge}`,
      //   true
      // ),
      // createFormField(`Régimen patrimonial del matrimonio: ${person.regimenPatrimonial}`, true),
      // createFormField(
      //   `Divorciado: nº nupcias: ${person.numNupciasDiv} nombre del cónyuge: ${person.nombreConyugeDiv}`,
      //   true
      // ),
      // createFormField(
      //   `Sentencia: Fecha: ${person.fechaSentencia} tribunal/juzgado: ${person.tribunal}`,
      //   true
      // ),
      // createFormField("Autos: " + (person.autos || ""), true),
      // createFormField(
      //   `Viudo: nº nupcias: ${person.numNupciasViudo} nombre cónyuge: ${person.nombreConyugeViudo}`,
      //   true
      // ),
      createFormField(`Cantidad de Hijos: ${person.numberOfChildren}`),
      createFormField(`Domicilio Real: ${person.address}`),
      createFormField(`Ciudad/Partido/Provincia: ${person.city}`),
      createFormField(`Profesión/Ocupación: ${person.profession}`),
      createFormField(`Teléfono fijo: ${person.phoneNumber}`),
      createFormField(`Teléfono Celular: ${person.mobileNumber}`),
      createFormField(`E-mail: ${person.email}`),
      createFormField(
        `Es Persona expuesta políticamente? ${person.isPoliticallyExposed ? "Si" : "No"} Cargo: ${person.politicalPosition || ""}`,
        true
      ),
      createFormField(
        `En operaciones onerosas indique origen del dinero: ${person.originOfFunds}`,
        true
      ),
      createFormField("Porque eligió nuestra escribanía?"),
      createFormField(`Lo asesoramos habitualmente: ${person.reasonForChoosing}`, true),
      createFormField(`Alguien nos recomendó? Quien?: ${person.referredBy}`, true),
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

export default personDocBuffer

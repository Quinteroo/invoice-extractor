const fs = require("fs/promises");


async function crearCsv(jsonPath:string, resultPath:string): Promise<void> {
  try {
    const data = await fs.readFile(jsonPath, "utf-8")

    const movimientos = JSON.parse(data) // no hace falta el await aquí, JSON.parse es síncrono

    let strToCsv = "";

    for (const key in movimientos[0]) {
      strToCsv += `${key},`
    }

    strToCsv = strToCsv.slice(0, strToCsv.length - 1) // quitar la última coma

    strToCsv += "\n"

    for (const movimiento of movimientos) {
      const values = Object.values(movimiento).join(",");
      strToCsv += `${values}\n`;
    }


    await fs.writeFile(resultPath, strToCsv)

    console.log("✅ Archivo csv de la facturación del Hotel creado correctamente.")

  } catch (error) {
    console.log("❌ Error al generar el CSV", error)

  }
}

module.exports = {
  crearCsv
}

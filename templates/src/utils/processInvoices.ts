const fs = require("fs/promises");
const pdf = require("pdf-parse");
const path = require("path");
const { crearCsv } = require("./createCsv");
const { renameFile } = require("./renameFile");

import { Supplier } from "../types/supplier";

type InvoiceInfo = {
  nameS: string;
  factura: string;
  fecha: string;
  total: string;
}
const docsPath = path.join(__dirname, "../../pdfs");



async function processInvoices(supplier:Supplier) {

    const pdfs = await fs.readdir(docsPath);
    const info = [];

    for (const file of pdfs) {

        const filePath = path.join(docsPath, file);

        try {
            const dataBuffer = await fs.readFile(filePath);
            const data = await pdf(dataBuffer);
            const lines = data.text.split("\n").map((line:string) => line.trim());

            const facturaLine = lines.find((line:string) => line.includes(supplier.invoiceLine));
            const fechaLine = lines.find((line:string) => line.includes(supplier.dateLine));
            const totalLine = lines.find((line:string) => line.includes(supplier.totalLine));

            const nameS = supplier.name;
            const factura = facturaLine.match(supplier.invoice)[0] || "N/A";
            const fecha = fechaLine.match(supplier.date).toString().replaceAll("/", "-") || "N/A";
            const total = totalLine.match(supplier.total)[0] || "N/A";

            info.push({ nameS, factura, fecha, total });

            const newFileName = `${nameS} ${factura} ${fecha} ${total}.pdf`;
            const newFilePath = path.join(docsPath, newFileName);
            await renameFile(filePath, newFilePath);
        }
        catch (err) {
            console.error("❌ Error procesando", file, err);
        }
    }

    const jsonPath = path.join(__dirname, `${supplier.name}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(info, null, 2));
    console.log("✅ Archivo JSON creado correctamente.");

    const csvPath = path.join(__dirname, `../../result/${supplier.name}.csv`);
    await crearCsv(jsonPath, csvPath);
}

module.exports = {
    processInvoices,
};

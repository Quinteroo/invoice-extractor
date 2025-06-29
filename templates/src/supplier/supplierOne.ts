const {processInvoices} = require("../utils/processInvoices")

import type { Supplier } from "../types/supplier"

const supplierOne:Supplier ={
    name:"supplierOne",
    invoiceLine: "ALBARAN/FACTURA",
    invoice:/[0-9]{8}/,
    dateLine: "FECHA",
    date: /\b\d{2}\/\d{2}\/\d{4}\b/,
    totalLine:"TOTAL FACTURA",
    total: /\d+,\d{2}/,
    currency:""

}

//console.log("hola desde supplierOne.ts")
processInvoices(supplierOne)
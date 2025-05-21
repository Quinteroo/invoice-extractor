"use strict";
const { rename } = require('fs/promises');
async function renameFile(from, to) {
    try {
        await rename(from, to);
    }
    catch (err) {
        console.log("❌ Error al intentar renombrar el archivo:", err.message);
    }
}
module.exports = { renameFile };

const { rename } = require('fs/promises');

async function renameFile(from:string, to:string) {
  try {
    await rename(from, to);
  } catch (err) {
    console.log("❌ Error al intentar renombrar el archivo:", (err as Error).message);
  }
}

module.exports ={renameFile}
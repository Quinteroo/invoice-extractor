#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

function copyRecursive(src, dest) {
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

program
  .command('init')
  .description('Crear estructura inicial del proyecto')
  .action(() => {
    const templateDir = path.join(__dirname, '../templates');
    const targetDir = process.cwd();

    fs.readdirSync(templateDir).forEach(file => {
      const src = path.join(templateDir, file);
      const dest = path.join(targetDir, file);
      copyRecursive(src, dest);
    });

    console.log('Proyecto inicial creado.');
  });

program.parse(process.argv);

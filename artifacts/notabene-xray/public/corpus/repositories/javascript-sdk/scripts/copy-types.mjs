import fs from 'fs';

// Read the main package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Create package.json files
console.log('Creating package.json files...');
const cjsPkg = { ...pkg, type: 'commonjs' };
const esmPkg = { ...pkg, type: 'module' };

fs.writeFileSync('dist/cjs/package.json', JSON.stringify(cjsPkg, null, 2));
fs.writeFileSync('dist/esm/package.json', JSON.stringify(esmPkg, null, 2));

// Copy type declarations
console.log('Copying type declarations...');
fs.copyFileSync('dist/notabene.d.ts', 'dist/cjs/notabene.d.ts');
fs.copyFileSync('dist/notabene.d.ts', 'dist/esm/notabene.d.ts');

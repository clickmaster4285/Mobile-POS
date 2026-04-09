const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${files.length} JPG files to convert.`);

const convertFile = (file) => {
  return new Promise((resolve, reject) => {
    const input = path.join(framesDir, file);
    const output = input.replace('.jpg', '.webp');
    exec(`magick "${input}" -quality 75 "${output}"`, (err) => {
      if (err) {
        console.error(`Failed to convert ${file}:`, err);
        return reject(err);
      }
      // Optional: fs.unlinkSync(input); // Delete original JPG
      resolve();
    });
  });
};

async function run() {
  const batchSize = 10;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    await Promise.all(batch.map(convertFile));
    console.log(`Converted ${i + batch.length}/${files.length} files...`);
  }
  console.log('Conversion complete!');
}

run();

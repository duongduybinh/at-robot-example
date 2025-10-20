const path = require('path');
const fs = require('fs');
const csvtojson = require('csvtojson');

let inputPath = path.join(__dirname, 'data.csv');
let outputDir = __dirname;

// --- Phân tích tham số dòng lệnh ---
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--input=')) inputPath = path.resolve(arg.split('=')[1]);
  else if (arg === '--input') inputPath = path.resolve(args[++i]);
  else if (arg.startsWith('--output=')) outputDir = path.resolve(arg.split('=')[1]);
  else if (arg === '--output') outputDir = path.resolve(args[++i]);
}

console.log('CSV → JSON converter');
console.log('Input file:', inputPath);
console.log('Output directory:', outputDir);

(async () => {
  try {
    if (!fs.existsSync(inputPath)) throw new Error(`Không tìm thấy file input: ${inputPath}`);

    // Đảm bảo thư mục output tồn tại
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`Tạo thư mục output: ${outputDir}`);
    }

    // Đọc CSV → JSON
    const csv = fs.readFileSync(inputPath, 'utf-8');
    const jsonArray = await csvtojson({
      colParser: {
        confirmInforConsultation: (item) => {
          if (!item) return [];
          return item
            .split(';')
            .map(x => x.trim())
            .filter(x => x.length > 0);
        }
      }
    }).fromString(csv);

    if (!jsonArray || jsonArray.length === 0) {
      throw new Error('Không có dữ liệu hợp lệ trong CSV.');
    }

    // Ghi từng dòng CSV ra file JSON riêng
    for (let index = 0; index < jsonArray.length; index++) {
      const json = jsonArray[index];
      const fileName = (json.testType || `data_${index + 1}`).toLowerCase() + '-data.json';
      const outputPath = path.join(outputDir, fileName);

      fs.writeFileSync(outputPath, JSON.stringify(json, null, 2), 'utf-8');
      console.log(`✅ Output: ${outputPath}`);
    }

    console.log('Hoàn tất chuyển đổi CSV → JSON.');
  } catch (err) {
    console.error('Lỗi khi xử lý:', err.message);
  }
})();

const fs = require('fs');
const path = require('path');
const { Parser } = require('@json2csv/plainjs'); // plainjs dùng default export

// Lấy thư mục hiện tại (nơi chạy lệnh)
const __dirname = path.dirname(process.argv[1]);
const outputPath = path.join(__dirname, 'data.csv');

let test = "all";
let isPLNTB = true;
let isXSTU = true;

// Phân tích tham số --func --manual
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--test=")) test = arg.split("=")[1];
  else if (arg === "--test") test = args[++i];
}

if (test.toLocaleLowerCase() == 'plntb') {
  isPLNTB = true;
  isXSTU = false;
} else if (test.toLocaleLowerCase() == 'xstu') {
  isPLNTB = false;
  isXSTU = true;
}

console.log('JSON -> CSV');

// Đảm bảo dữ liệu là mảng
const dataArray =[];

if(isPLNTB){
    const inputPath = path.join(__dirname, 'plntb-data.json');
    console.log('Input', inputPath);
    const testData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    dataArray.push(testData);
    
}

if(isXSTU){
    const inputPath = path.join(__dirname, 'xstu-data.json');
    console.log('Input', inputPath);
    const testData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    dataArray.push(testData);
}

// Helper flatten object
function flattenObject(obj, parentKey = '', res = {}) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else if (Array.isArray(value)) {
      res[newKey] = value.map(v => (typeof v === 'object' ? JSON.stringify(v) : v)).join(';');
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

// Flatten tất cả dữ liệu
const flatData = dataArray.map(item => flattenObject(item));

// Parse sang CSV
const parser = new Parser({});
const csv = parser.parse(flatData);


console.log(dataArray);

// Ghi file CSV
fs.writeFileSync(outputPath, csv, 'utf-8');
console.log('Output', outputPath);
console.log(csv);

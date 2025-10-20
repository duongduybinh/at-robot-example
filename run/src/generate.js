const fs = require('fs');
const path = require('path');


const VN_PREFIXES = [
  '032', '033', '034', '035', '036', '037', '038', '039', // 03x
  '056', '058', '059',                                   // 05x
  '070', '076', '077', '078', '079',                     // 07x
  '081', '082', '083', '084', '085', '086', '088', '089', // 08x
  '090', '091', '092', '093', '094', '095', '096', '097', '098', '099' // 09x
];

class DataProvider {
  static generateIDCard(length = 12) {
    const nums = '0123456789';
    let out = '';
    for (let i = 0; i < length; i++) {
      out += nums.charAt(DataProvider.randomInt(0, nums.length - 1));
    }
    return out;
  }

  static generateVNPhone({ withCountryCode = false } = {}) {
    const prefix = VN_PREFIXES[DataProvider.randomInt(0, VN_PREFIXES.length - 1)];
    const remainLen = 10 - prefix.length;
    let rest = '';
    for (let i = 0; i < remainLen; i++) {
      rest += DataProvider.randomInt(0, 9).toString();
    }
    const numberWith0 = prefix + rest;
    return withCountryCode ? '+84' + numberWith0.slice(1) : numberWith0;
  }

  static generateName() {
    const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Phan', 'Huỳnh'];
    const lastNames = ['Bình', 'Nam', 'Trang', 'Linh', 'Huy', 'Dũng', 'Hà', 'Phúc', 'Tú', 'Nhung', 'Tâm', 'Vy'];

    const first = firstNames[DataProvider.randomInt(0, firstNames.length - 1)];
    const last = lastNames[DataProvider.randomInt(0, lastNames.length - 1)];

    return [first, `${last}${DataProvider.randomInt(0, 10000)}`];
  }

  static generateEducation() {
    const educations = ['Cao đẳng', 'Đại học'];
    return educations[DataProvider.randomInt(0, educations.length - 1)];
  }

  static generateGender() {
    const educations = ['Nam', 'Nữ'];
    return educations[DataProvider.randomInt(0, educations.length - 1)];
  }

  /**
   * Sinh ngày sinh (DOB).
   *
   * @param {Object} options
   * @param {number} options.minAge - tuổi tối thiểu (mặc định 18)
   * @param {number} options.maxAge - tuổi tối đa (mặc định 65)
   * @param {('date'|'datetime'|'timestamp'|'object')} options.format
   *        - 'date' (mặc định): "YYYY-MM-DD"
   *        - 'datetime': full ISO datetime "YYYY-MM-DDTHH:mm:ss.sssZ"
   *        - 'timestamp': epoch milliseconds (number)
   *        - 'object': { year, month, day, iso }
   * @returns {string|number|Object}
   */
  static generateDOB({ minAge = 18, maxAge = 65, format = 'date' } = {}) {
    if (minAge < 0) minAge = 0;
    if (maxAge < minAge) {
      // nếu max < min, đổi chỗ cho hợp lý
      [minAge, maxAge] = [maxAge, minAge];
    }

    const today = new Date();

    // Ngày sinh tối đa (người trẻ nhất) => today - minAge years
    const latest = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    // Ngày sinh tối thiểu (người già nhất) => today - maxAge years
    const earliest = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());

    // Sinh timestamp ngẫu nhiên trong khoảng earliest..latest
    const randTs = DataProvider.randomInt(earliest.getTime(), latest.getTime());
    const d = new Date(randTs);

    // helper format YYYY-MM-DD
    const pad = (n) => (n < 10 ? '0' + n : String(n));
    const isoDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    if (format === 'date') return isoDate;
    if (format === 'datetime') return d.toISOString();
    if (format === 'timestamp') return d.getTime();
    if (format === 'object') {
      return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        iso: isoDate
      };
    }

    // fallback
    return isoDate;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// ---

const __dirname = path.dirname(process.argv[1]);

let product = "all";
let isPLNTB = true;
let isXSTU = true;

// Phân tích tham số --func --manual
const args = process.argv.slice(2);
console.log('Arg', args);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  console.log(arg);
  if (arg.startsWith("--product=")) product = arg.split("=")[1];
  else if (arg === "--product") product = args[++i];
}
console.log('Product', product);
if (product.toLocaleLowerCase() == 'plntb') {
  isPLNTB = true;
  isXSTU = false;
} else if (product.toLocaleLowerCase() == 'xstu') {
  isPLNTB = false;
  isXSTU = true;
}

if (isPLNTB) {
  const inputPath = path.join(__dirname, 'plntb-template.json');
  const testData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const name = DataProvider.generateName();
  testData.firstName = name[0];
  testData.lastName = name[1];
  testData.fullName = `${testData.firstName} ${testData.lastName}`;
  testData.dob = DataProvider.generateDOB();
  testData.gender = DataProvider.generateGender();
  testData.education = DataProvider.generateEducation();
  testData.phoneNumber = DataProvider.generateVNPhone();
  testData.idCard = DataProvider.generateIDCard();
  testData.idCard2 = DataProvider.generateIDCard();

  const outputPath = path.join(__dirname, 'plntb-data.json');
  console.log('Generate Lead: PLNTB');
  fs.writeFileSync(outputPath, JSON.stringify(testData, null, 2), 'utf-8');
  console.log('Output', outputPath);
  console.log(testData);
}

if (isXSTU) {
  const inputPath = path.join(__dirname, 'xstu-template.json');
  const testData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const name = DataProvider.generateName();
  testData.firstName = name[0];
  testData.lastName = name[1];
  testData.fullName = `${testData.firstName} ${testData.lastName}`;
  testData.dob = DataProvider.generateDOB();
  testData.gender = DataProvider.generateGender();
  testData.education = DataProvider.generateEducation();
  testData.phoneNumber = DataProvider.generateVNPhone();
  testData.idCard = DataProvider.generateIDCard();
  testData.idCard2 = DataProvider.generateIDCard();

  const outputPath = path.join(__dirname, 'xstu-data.json');
  console.log('Generate Lead: XSTU');
  fs.writeFileSync(outputPath, JSON.stringify(testData, null, 2), 'utf-8');
  console.log('Output', outputPath);
  console.log(testData);
}



const fs = require("fs");
const path = require("path");

const VN_PREFIXES = [
  "032","033","034","035","036","037","038","039",
  "056","058","059",
  "070","076","077","078","079",
  "081","082","083","084","085","086","088","089",
  "090","091","092","093","094","095","096","097","098","099"
];

class DataProvider {
  static generateIDCard(length = 12) {
    const nums = "0123456789";
    let out = "";
    for (let i = 0; i < length; i++) {
      out += nums.charAt(DataProvider.randomInt(0, nums.length - 1));
    }
    return out;
  }

  static generateVNPhone({ withCountryCode = false } = {}) {
    const prefix = VN_PREFIXES[DataProvider.randomInt(0, VN_PREFIXES.length - 1)];
    const remainLen = 10 - prefix.length;
    let rest = "";
    for (let i = 0; i < remainLen; i++) rest += DataProvider.randomInt(0, 9).toString();
    const numberWith0 = prefix + rest;
    return withCountryCode ? "+84" + numberWith0.slice(1) : numberWith0;
  }

  static generateName() {
    const firstNames = ["Nguyễn","Trần","Lê","Phạm","Hoàng","Vũ","Võ","Đặng","Bùi","Đỗ","Phan","Huỳnh"];
    const lastNames = ["Bình","Nam","Trang","Linh","Huy","Dũng","Hà","Phúc","Tú","Nhung","Tâm","Vy"];
    const first = firstNames[DataProvider.randomInt(0, firstNames.length - 1)];
    const last = lastNames[DataProvider.randomInt(0, lastNames.length - 1)];
    return [first, `${last}${DataProvider.randomInt(0, 10000)}`];
  }

  static generateEducation() {
    const educations = ["Cao đẳng","Đại học"];
    return educations[DataProvider.randomInt(0, educations.length - 1)];
  }

  static generateGender() {
    const genders = ["Nam","Nữ"];
    return genders[DataProvider.randomInt(0, genders.length - 1)];
  }

  static generateDOB({ minAge = 18, maxAge = 65 } = {}) {
    const today = new Date();
    const latest = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const earliest = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const randTs = DataProvider.randomInt(earliest.getTime(), latest.getTime());
    const d = new Date(randTs);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// --- CLI ARG PARSING ---
const __dirname = path.dirname(process.argv[1]);
let product = "all";
let outputDir = path.join(__dirname, "output");

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--product=")) product = arg.split("=")[1];
  else if (arg === "--product") product = args[++i];
  else if (arg.startsWith("--output=")) outputDir = arg.split("=")[1];
  else if (arg === "--output") outputDir = args[++i];
}

const isPLNTB = product.toLowerCase() === "plntb" || product === "all";
const isXSTU = product.toLowerCase() === "xstu" || product === "all";

// --- GENERATE FUNCTION ---
function generateData(templateFile, defaultOutputFile) {
  const inputPath = path.join(__dirname, templateFile);
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Template not found: ${inputPath}`);
    process.exit(1);
  }

  const testData = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
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

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created output folder: ${outputDir}`);
  }

  const outFile = path.join(outputDir, defaultOutputFile);
  fs.writeFileSync(outFile, JSON.stringify(testData, null, 2), "utf-8");
  console.log(`✅ Generated: ${outFile}`);
}

// --- EXECUTION ---
if (isPLNTB) {
  console.log("🚀 Generating PLNTB data...");
  generateData("plntb-template.json", "plntb-data.json");
}

if (isXSTU) {
  console.log("🚀 Generating XSTU data...");
  generateData("xstu-template.json", "xstu-data.json");
}

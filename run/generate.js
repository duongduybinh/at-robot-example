// generate.js
var fs = require("fs");
var path = require("path");
var VN_PREFIXES = [
  "032",
  "033",
  "034",
  "035",
  "036",
  "037",
  "038",
  "039",
  // 03x
  "056",
  "058",
  "059",
  // 05x
  "070",
  "076",
  "077",
  "078",
  "079",
  // 07x
  "081",
  "082",
  "083",
  "084",
  "085",
  "086",
  "088",
  "089",
  // 08x
  "090",
  "091",
  "092",
  "093",
  "094",
  "095",
  "096",
  "097",
  "098",
  "099"
  // 09x
];
var DataProvider = class _DataProvider {
  static generateIDCard(length = 12) {
    const nums = "0123456789";
    let out = "";
    for (let i = 0; i < length; i++) {
      out += nums.charAt(_DataProvider.randomInt(0, nums.length - 1));
    }
    return out;
  }
  static generateVNPhone({ withCountryCode = false } = {}) {
    const prefix = VN_PREFIXES[_DataProvider.randomInt(0, VN_PREFIXES.length - 1)];
    const remainLen = 10 - prefix.length;
    let rest = "";
    for (let i = 0; i < remainLen; i++) {
      rest += _DataProvider.randomInt(0, 9).toString();
    }
    const numberWith0 = prefix + rest;
    return withCountryCode ? "+84" + numberWith0.slice(1) : numberWith0;
  }
  static generateName() {
    const firstNames = ["Nguy\u1EC5n", "Tr\u1EA7n", "L\xEA", "Ph\u1EA1m", "Ho\xE0ng", "V\u0169", "V\xF5", "\u0110\u1EB7ng", "B\xF9i", "\u0110\u1ED7", "Phan", "Hu\u1EF3nh"];
    const lastNames = ["B\xECnh", "Nam", "Trang", "Linh", "Huy", "D\u0169ng", "H\xE0", "Ph\xFAc", "T\xFA", "Nhung", "T\xE2m", "Vy"];
    const first = firstNames[_DataProvider.randomInt(0, firstNames.length - 1)];
    const last = lastNames[_DataProvider.randomInt(0, lastNames.length - 1)];
    return [first, `${last}${_DataProvider.randomInt(0, 1e4)}`];
  }
  static generateEducation() {
    const educations = ["Cao \u0111\u1EB3ng", "\u0110\u1EA1i h\u1ECDc"];
    return educations[_DataProvider.randomInt(0, educations.length - 1)];
  }
  static generateGender() {
    const educations = ["Nam", "N\u1EEF"];
    return educations[_DataProvider.randomInt(0, educations.length - 1)];
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
  static generateDOB({ minAge = 18, maxAge = 65, format = "date" } = {}) {
    if (minAge < 0) minAge = 0;
    if (maxAge < minAge) {
      [minAge, maxAge] = [maxAge, minAge];
    }
    const today = /* @__PURE__ */ new Date();
    const latest = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const earliest = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const randTs = _DataProvider.randomInt(earliest.getTime(), latest.getTime());
    const d = new Date(randTs);
    const pad = (n) => n < 10 ? "0" + n : String(n);
    const isoDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (format === "date") return isoDate;
    if (format === "datetime") return d.toISOString();
    if (format === "timestamp") return d.getTime();
    if (format === "object") {
      return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        iso: isoDate
      };
    }
    return isoDate;
  }
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
var __dirname = path.dirname(process.argv[1]);
var test = "all";
var isPLNTB = true;
var isXSTU = true;
var args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--test=")) test = arg.split("=")[1];
  else if (arg === "--test") test = args[++i];
}
if (test.toLocaleLowerCase() == "plntb") {
  isPLNTB = true;
  isXSTU = false;
} else if (test.toLocaleLowerCase() == "xstu") {
  isPLNTB = false;
  isXSTU = true;
}
if (isPLNTB) {
  const inputPath = path.join(__dirname, "plntb-template.json");
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
  const outputPath = path.join(__dirname, "plntb-data.json");
  console.log("Generate Lead: PLNTB");
  fs.writeFileSync(outputPath, JSON.stringify(testData, null, 2), "utf-8");
  console.log("Output", outputPath);
  console.log(testData);
}
if (isXSTU) {
  const inputPath = path.join(__dirname, "xstu-template.json");
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
  const outputPath = path.join(__dirname, "xstu-data.json");
  console.log("Generate Lead: XSTU");
  fs.writeFileSync(outputPath, JSON.stringify(testData, null, 2), "utf-8");
  console.log("Output", outputPath);
  console.log(testData);
}

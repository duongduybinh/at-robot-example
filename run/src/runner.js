const path = require("path");
const { runCommand, parseBoolean } = require("./spawn-runner");

// --- Parse CLI Args ---
const args = process.argv.slice(2);

let funcName = "";
let test = "all";
let isManual = false;
let isSchedule = false;
let inputPath = "";
let outputPath = "";
const childArgs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--func=")) funcName = arg.split("=")[1];
  else if (arg === "--func") funcName = args[++i];
  else if (arg.startsWith("--manual=")) isManual = parseBoolean(arg.split("=")[1]);
  else if (arg === "--manual") isManual = parseBoolean(args[++i]);
  else if (arg.startsWith("--product=")) test = arg.split("=")[1];
  else if (arg === "--product") test = args[++i];
  else if (arg.startsWith("--schedule=")) isSchedule = parseBoolean(arg.split("=")[1]);
  else if (arg === "--schedule") isSchedule = parseBoolean(args[++i]);
  else if (arg.startsWith("--input=")) inputPath = arg.split("=")[1];
  else if (arg === "--input") inputPath = args[++i];
  else if (arg.startsWith("--output=")) outputPath = arg.split("=")[1];
  else if (arg === "--output") outputPath = args[++i];
  else childArgs.push(arg);
}

// --- Argument Summary ---
console.log("=== Argument Summary ===");
console.log("Function:", funcName);
console.log("Product:", test);
console.log("Manual Mode:", isManual);
console.log("Schedule Mode:", isSchedule);
console.log("Input Path:", inputPath || "(default)");
console.log("Output Path:", outputPath || "(default)");
console.log("Extra Args:", childArgs.length ? childArgs : "(none)");
console.log("=========================");

// --- Script selection ---
let file;
switch (funcName) {
  case "test": file = "test.js"; break;
  case "generate": file = "generate.js"; break;
  case "json2csv": file = "json2csv.js"; break;
  case "csv2json": file = "csv2json.js"; break;
  case "robot": file = "robot.js"; break;
  default:
    console.error("❌ Unknown command:", funcName);
    process.exit(1);
}

const scriptPath = path.join(__dirname, file);

// --- Compute output and DATA_PATH ---
const safeOutputDir = outputPath || path.join(__dirname, "output");
const normalizedProduct = test.toLowerCase();

let dataFileName;
switch (normalizedProduct) {
  case "plntb":
    dataFileName = "plntb-data.json";
    break;
  case "xstu":
    dataFileName = "xstu-data.json";
    break;
  default:
    dataFileName = "test-data.json";
    break;
}

const dataFilePath = path.join(safeOutputDir, dataFileName);

// --- Execute ---
(async () => {
  // Nếu func = robot, có thể cần chạy generate trước
  if (funcName === "robot") {
    const scriptFile = isManual ? "csv2json.js" : "generate.js";
    console.log(`Run with mode: ${isManual ? "MANUAL" : "AUTOMATIC"}`);

    const exitCodeGen = await runCommand("node", [
      path.join(__dirname, scriptFile),
      "--product", test,
      "--output", safeOutputDir,
    ], {
      cwd: __dirname,
      stdio: "inherit",
    });

    if (exitCodeGen !== 0) process.exit(exitCodeGen);
    if (isSchedule) process.exit(0);
  }

  // Gọi script chính với DATA_PATH
  const exitCode = await runCommand("node", [
    scriptPath,
    ...childArgs,
    "--variable",
    `DATA_PATH:"${dataFilePath}"`
  ], {
    cwd: __dirname,
    stdio: "inherit",
  });

  process.exit(exitCode);
})();

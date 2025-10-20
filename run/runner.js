var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// spawn-runner.js
var require_spawn_runner = __commonJS({
  "spawn-runner.js"(exports2, module2) {
    var { spawn } = require("child_process");
    function runCommand2(command, args2 = [], options = {}) {
      return new Promise((resolve) => {
        const spawnOptions = { stdio: "inherit", ...options };
        console.log(`[${command}] Starting execution with arguments: ${args2.join(" ")}`);
        const proc = spawn(command, args2, spawnOptions);
        proc.on("close", (code) => {
          console.log(`[${command}] Execution finished with exit code: ${code}`);
          resolve(code);
        });
        proc.on("error", (err) => {
          console.error(`[${command}] Error spawning command:`, err);
          resolve(1);
        });
      });
    }
    function parseBoolean2(value) {
      if (typeof value !== "string") return value;
      const v = value.toLowerCase();
      if (v === "true" || v === "1") return true;
      if (v === "false" || v === "0") return false;
      return value;
    }
    module2.exports = { runCommand: runCommand2, parseBoolean: parseBoolean2 };
  }
});

// runner.js
var path = require("path");
var { runCommand, parseBoolean } = require_spawn_runner();
var args = process.argv.slice(2);
var funcName = "";
var test = "all";
var isManual = false;
var isSchedule = false;
var inputPath = "";
var outputPath = "";
var childArgs = [];
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
console.log("=== Argument Summary ===");
console.log("Function:", funcName);
console.log("Product:", test);
console.log("Manual Mode:", isManual);
console.log("Schedule Mode:", isSchedule);
console.log("Input Path:", inputPath || "(default)");
console.log("Output Path:", outputPath || "(default)");
console.log("Extra Args:", childArgs.length ? childArgs : "(none)");
console.log("=========================");
var file;
switch (funcName) {
  case "test":
    file = "test.js";
    break;
  case "generate":
    file = "generate.js";
    break;
  case "json2csv":
    file = "json2csv.js";
    break;
  case "csv2json":
    file = "csv2json.js";
    break;
  case "robot":
    file = "robot.js";
    break;
  default:
    console.error("\u274C Unknown command:", funcName);
    process.exit(1);
}
var scriptPath = path.join(__dirname, file);
var safeOutputDir = outputPath || path.join(__dirname, "output");
var normalizedProduct = test.toLowerCase();
var dataFileName;
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
var dataFilePath = path.join(safeOutputDir, dataFileName);
(async () => {
  if (funcName === "robot") {
    const scriptFile = isManual ? "csv2json.js" : "generate.js";
    console.log(`Run with mode: ${isManual ? "MANUAL" : "AUTOMATIC"}`);
    const exitCodeGen = await runCommand("node", [
      path.join(__dirname, scriptFile),
      "--product",
      test,
      "--output",
      safeOutputDir
    ], {
      cwd: __dirname,
      stdio: "inherit"
    });
    if (exitCodeGen !== 0) process.exit(exitCodeGen);
    if (isSchedule) process.exit(0);
  }
  const exitCode = await runCommand("node", [
    scriptPath,
    ...childArgs,
    "--variable",
    `DATA_PATH:"${dataFilePath}"`
  ], {
    cwd: __dirname,
    stdio: "inherit"
  });
  process.exit(exitCode);
})();

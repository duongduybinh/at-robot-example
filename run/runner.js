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
var isManual = false;
var childArgs = [];
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--func=")) funcName = arg.split("=")[1];
  else if (arg === "--func") funcName = args[++i];
  else if (arg.startsWith("--manual=")) isManual = parseBoolean(arg.split("=")[1]);
  else if (arg === "--manual") isManual = parseBoolean(args[++i]);
  else childArgs.push(arg);
}
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
    console.error("Unknown command:", funcName);
    process.exit(1);
}
var scriptPath = path.join(__dirname, file);
(async () => {
  console.log(...process.argv.slice(1));
  if (funcName == "robot") {
    const scriptFile = isManual ? "csv2json.js" : "generate.js";
    console.log(`Run with mode ${isManual ? "MANUAL" : "AUTOMATIC"}`);
    const exitCode2 = await runCommand("node", [path.join(__dirname, scriptFile)], {
      cwd: __dirname,
      stdio: "inherit"
    });
    if (exitCode2 != 0)
      process.exit(exitCode2);
  }
  const exitCode = await runCommand("node", [scriptPath, ...childArgs], {
    cwd: __dirname,
    stdio: "inherit"
    // log trực tiếp ra terminal
  });
  process.exit(exitCode);
})();

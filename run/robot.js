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
    function parseBoolean(value) {
      if (typeof value !== "string") return value;
      const v = value.toLowerCase();
      if (v === "true" || v === "1") return true;
      if (v === "false" || v === "0") return false;
      return value;
    }
    module2.exports = { runCommand: runCommand2, parseBoolean };
  }
});

// robot.js
var { runCommand } = require_spawn_runner();
var args = process.argv.slice(2);
var testPath = "";
var childArgs = [];
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--testpath=")) testPath = arg.split("=")[1];
  else if (arg === "--testpath") testPath = args[++i];
  else childArgs.push(arg);
}
if (args.length === 0) {
  console.error("Please provide Robot Framework arguments.");
  process.exit(1);
}
(async () => {
  const exitCode = await runCommand(
    "robot",
    [testPath, ...args],
    {
      cwd: __dirname,
      stdio: "inherit"
    }
  );
  process.exit(exitCode);
})();

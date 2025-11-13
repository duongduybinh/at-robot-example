const { runCommand, extractQuotedValue } = require('./spawn-runner'); // import thư viện tổng quát

// Lấy tất cả tham số sau node robot.js
const args = process.argv.slice(2);

var testPath = "";
var childArgs = [];
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--testpath=")) {
    testPath = extractQuotedValue(arg.split("=")[1]);
  } else if (arg === "--testpath") {
    testPath = extractQuotedValue(args[++i]);
  }
  else childArgs.push(arg);

}

console.log("[robot.js] Argument Summary ==============");
console.log("Test Path:", testPath || "(default)");
console.log("Extra Args:", childArgs.length ? childArgs : "(none)");
console.log("===========================================");

if (args.length === 0) {
  console.error("Please provide Robot Framework arguments.");
  process.exit(1);
}

(async () => {
  const exitCode = await runCommand(
    "robot",
    [...childArgs, testPath],
    {
      cwd: __dirname,
      stdio: "inherit"
    }
  );
  process.exit(exitCode);
})();

const { runCommand } = require('./spawn-runner'); // import thư viện tổng quát

// Lấy tất cả tham số sau node robot.js
const args = process.argv.slice(2);
let testPath = "";
const childArgs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--testpath=")) testPath = arg.split("=")[1];
  else if (arg === "--testpath") testPath = args[++i];
  else childArgs.push(arg);
}

if (args.length === 0) {
  console.error('Please provide Robot Framework arguments.');
  process.exit(1);
}

(async () => {
  // Chạy Robot Framework, log trực tiếp (thụt vào 2 space)
  const exitCode = await runCommand('robot', [testPath, ...args],
    {
      cwd: __dirname,
      stdio: "inherit",
    });
  process.exit(exitCode);
})();

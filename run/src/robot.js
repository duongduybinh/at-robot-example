const { runCommand } = require('./spawn-runner'); // import thư viện tổng quát

// Lấy tất cả tham số sau node robot.js
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide Robot Framework arguments.');
  process.exit(1);
}

(async () => {
  // Chạy Robot Framework, log trực tiếp (thụt vào 2 space)
  const exitCode = await runCommand('robot', args);
  process.exit(exitCode);
})();

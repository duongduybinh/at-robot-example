const { spawn } = require('child_process');

/**
 * Chạy một lệnh CLI bất kỳ, log trực tiếp và trả về exit code
 * @param {string} command - Lệnh CLI (vd: 'robot', 'ls', 'python')
 * @param {string[]} args - Danh sách tham số cho lệnh
 * @param {object} options - Tùy chọn
 *   - stdio: cách spawn xử lý I/O (mặc định pipe để xử lý indent)
 *   - indent: string dùng để thụt log (mặc định: '')
 *   - ...các tùy chọn spawn khác
 * @returns {Promise<number>} - Promise resolve với exit code
 */
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve) => {
    const spawnOptions = { stdio: 'inherit', ...options }; // mặc định inherit để child log trực tiếp

    // In thông báo Execute
    console.log(`[${command}] Starting execution with arguments: ${args.join(' ')}`);

    const proc = spawn(command, args, spawnOptions);

    proc.on('close', (code) => {
      console.log(`[${command}] Execution finished with exit code: ${code}`);
      resolve(code);
    });

    proc.on('error', (err) => {
      console.error(`[${command}] Error spawning command:`, err);
      resolve(1);
    });
  });
}

/**
 * Chuyển string thành boolean
 * @param {string} value - giá trị string
 * @returns {boolean|string} - true/false nếu là "true"/"false"/"1"/"0", ngược lại trả về nguyên giá trị string
 */
function parseBoolean(value) {
  if (typeof value !== "string") return value;
  const v = value.toLowerCase();
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return value;
}

module.exports = { runCommand, parseBoolean };

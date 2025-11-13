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
        printLine();
        console.log(`> ${command} ${args.join(' ')}`);
        // In thông báo Execute
        console.log(`[${command}] Starting execution with arguments: ${args.join(' ')}`);

        const proc = spawn(command, args, spawnOptions);
        const pid = proc.pid;
        printLine(`[PID:${pid}][${command}] Start`, '-');
        proc.on('close', (code) => {
            console.log(`[${command}] Execution finished with exit code: ${code}`);
            printLine(`[PID:${pid}][${command}] End`,'/');
            resolve(code);
        });

        proc.on('error', (err) => {
            console.error(`[${command}] Error spawning command:`, err);
            console.log(`[PID:${pid}][${command}] Error`,'/');
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

function extractQuotedValue(str) {
    const match = str.match(/^['"](.*)['"]$/);
    return match ? match[1] : str; // nếu có ngoặc kép, trả phần giữa; nếu không, trả nguyên gốc
}

function printLine(label = '', char = '=', length = 100) {
    if (!label) return console.log(char.repeat(length));

    const padding = Math.max(0, length - label.length - 2);
    const left = Math.floor(padding / 2);
    const right = padding - left;
    console.log(char.repeat(left) + ' ' + label + ' ' + char.repeat(right));
}

module.exports = { runCommand, parseBoolean, extractQuotedValue };

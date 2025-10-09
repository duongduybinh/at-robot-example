const path = require("path");
const { runCommand, parseBoolean } = require("./spawn-runner");

// Lấy tất cả tham số sau node runner.js
const args = process.argv.slice(2);

let funcName = "";
let isManual = false;

const childArgs = [];

// Phân tích tham số --func --manual
for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--func=")) funcName = arg.split("=")[1];
    else if (arg === "--func") funcName = args[++i];
    else if (arg.startsWith("--manual=")) isManual = parseBoolean(arg.split("=")[1]);
    else if (arg === "--manual") isManual = parseBoolean(args[++i]);
    else childArgs.push(arg);
}

// Chọn file script tương ứng
let file;
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

// Đường dẫn đầy đủ tới script
const scriptPath = path.join(__dirname, file);

// Thực thi bằng runCommand
(async () => {
    console.log(...process.argv.slice(1));

    if (funcName == "robot") {
        const scriptFile = isManual ? "csv2json.js" : "generate.js";

        console.log(`Run with mode ${isManual ? "MANUAL" : "AUTOMATIC"}`);

        const exitCode = await runCommand("node", [path.join(__dirname, scriptFile)], {
            cwd: __dirname,
            stdio: "inherit",
        });

        if (exitCode != 0)
            process.exit(exitCode);

    }

    const exitCode = await runCommand("node", [scriptPath, ...childArgs], {
        cwd: __dirname,
        stdio: "inherit", // log trực tiếp ra terminal
    });

    process.exit(exitCode);
})();
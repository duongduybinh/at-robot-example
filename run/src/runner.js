var path = require("path");
var fs = require("fs");
var { runCommand, parseBoolean, extractQuotedValue } = require('./spawn-runner');
var args = process.argv.slice(2);
var funcName = "";
var test = "all";
var isManual = false;
var isSchedule = false;
var inputPath = "";
var outputPath = "";
var testPath = "";
var childArgs = [];

for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--func=")) {
        funcName = extractQuotedValue(arg.split("=")[1]);
    } else if (arg === "--func") {
        funcName = extractQuotedValue(args[++i]);
    }

    else if (arg.startsWith("--manual=")) {
        isManual = parseBoolean(arg.split("=")[1]);
    } else if (arg === "--manual") {
        isManual = parseBoolean(args[++i]);
    }

    else if (arg.startsWith("--product=")) {
        test = extractQuotedValue(arg.split("=")[1]);
    } else if (arg === "--product") {
        test = extractQuotedValue(args[++i]);
    }

    else if (arg.startsWith("--schedule=")) {
        isSchedule = parseBoolean(arg.split("=")[1]);
    } else if (arg === "--schedule") {
        isSchedule = parseBoolean(args[++i]);
    }

    else if (arg.startsWith("--input=")) {
        inputPath = extractQuotedValue(arg.split("=")[1]);
    } else if (arg === "--input") {
        inputPath = extractQuotedValue(args[++i]);
    }

    else if (arg.startsWith("--output=")) {
        outputPath = extractQuotedValue(arg.split("=")[1]);
    } else if (arg === "--output") {
        outputPath = extractQuotedValue(args[++i]);
    }

    else if (arg.startsWith("--testpath=")) {
        testPath = extractQuotedValue(arg.split("=")[1]);
    } else if (arg === "--testpath") {
        testPath = extractQuotedValue(args[++i]);
    }

    else {
        childArgs.push(arg);
    }
}

console.log("[runner.js] Argument Summary ==============");
console.log(`Starting execution with arguments: ${args.join(' ')}`);
console.log("Function:", funcName);
console.log("Product:", test);
console.log("Manual Mode:", isManual);
console.log("Schedule Mode:", isSchedule);
console.log("Input Path:", inputPath || "(default)");
console.log("Output Path:", outputPath || "(default)");
console.log("Test Path:", testPath || "(default)");
console.log("Extra Args:", childArgs.length ? childArgs : "(none)");
console.log("===========================================");

// Chọn file script để chạy
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

// Chọn file test data
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
var dataFilePath = path.join(outputPath, dataFileName);
var fileCSVInputPath = path.join(inputPath, "data.csv");

(async () => {
    if (funcName === "robot") {
        if (isSchedule) {
            console.log(`Run with mode: SCHEDULE & MANUAL`);
            if (fs.existsSync(fileCSVInputPath)) {
                // Nếu chưa có thư mục outputPath thì tạo
                if (!fs.existsSync(outputPath)) {
                    fs.mkdirSync(outputPath, { recursive: true });
                }
                var _fileCSVInputPath = path.join(outputPath, path.basename(fileCSVInputPath));
                console.log(`Move file ${fileCSVInputPath} --> ${_fileCSVInputPath}`);
                fs.renameSync(fileCSVInputPath, _fileCSVInputPath);
                fileCSVInputPath = _fileCSVInputPath;

                const exitCodeGen = await runCommand("node", [
                    path.join(__dirname, "csv2json.js"),
                    "--product",
                    test,
                    "--input",
                    inputPath,
                    "--output",
                    outputPath
                ], {
                    cwd: __dirname,
                    stdio: "inherit"
                });
                if (exitCodeGen !== 0) process.exit(exitCodeGen);

            } else {
                console.log(`Không tìm thấy file ${fileCSVInputPath} -> generate`);
                const exitCodeGen = await runCommand("node", [
                    path.join(__dirname, "generate.js"),
                    "--product",
                    test,
                    "--output",
                    outputPath
                ], {
                    cwd: __dirname,
                    stdio: "inherit"
                });
                if (exitCodeGen !== 0) process.exit(exitCodeGen);
            }
        } else {
            const scriptFile = isManual ? "csv2json.js" : "generate.js";
            console.log(`Run with mode: ${isManual ? "MANUAL" : "AUTOMATIC"}`);
            const exitCodeGen = await runCommand("node", [
                path.join(__dirname, scriptFile),
                "--product",
                test,
                "--output",
                outputPath
            ], {
                cwd: __dirname,
                stdio: "inherit"
            });
            if (exitCodeGen !== 0) process.exit(exitCodeGen);
        }
    }

    const exitCode = await runCommand("node", [
        scriptPath,
        "--variable",
        `DATA_PATH:${dataFilePath}`,
        "--testpath",
        testPath,
        ...childArgs
    ], {
        cwd: __dirname,
        stdio: "inherit"
    });
    process.exit(exitCode);
})();

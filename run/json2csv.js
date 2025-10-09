var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/@json2csv/formatters/dist/cjs/default.js
var require_default = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/default.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function defaultFormatter(value) {
      if (value === null || value === void 0)
        return "";
      return `${value}`;
    }
    exports2.default = defaultFormatter;
  }
});

// node_modules/@json2csv/formatters/dist/cjs/number.js
var require_number = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/number.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function numberFormatter(opts = {}) {
      const { separator, decimals } = opts;
      if (separator) {
        if (decimals) {
          return (value) => value.toFixed(decimals).replace(".", separator);
        }
        return (value) => `${value}`.replace(".", separator);
      }
      if (decimals) {
        return (value) => value.toFixed(decimals);
      }
      return (value) => `${value}`;
    }
    exports2.default = numberFormatter;
  }
});

// node_modules/@json2csv/formatters/dist/cjs/string.js
var require_string = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/string.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function stringFormatter(opts = {}) {
      const quote = typeof opts.quote === "string" ? opts.quote : '"';
      const escapedQuote = typeof opts.escapedQuote === "string" ? opts.escapedQuote : `${quote}${quote}`;
      if (!quote || quote === escapedQuote) {
        return (value) => value;
      }
      const quoteRegExp = new RegExp(quote, "g");
      return (value) => {
        if (value.includes(quote)) {
          value = value.replace(quoteRegExp, escapedQuote);
        }
        return `${quote}${value}${quote}`;
      };
    }
    exports2.default = stringFormatter;
  }
});

// node_modules/@json2csv/formatters/dist/cjs/stringQuoteOnlyIfNecessary.js
var require_stringQuoteOnlyIfNecessary = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/stringQuoteOnlyIfNecessary.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var string_js_1 = __importDefault(require_string());
    function stringQuoteOnlyIfNecessaryFormatter(opts = {}) {
      const quote = typeof opts.quote === "string" ? opts.quote : '"';
      const escapedQuote = typeof opts.escapedQuote === "string" ? opts.escapedQuote : `${quote}${quote}`;
      const separator = typeof opts.separator === "string" ? opts.separator : ",";
      const eol = typeof opts.eol === "string" ? opts.eol : "\n";
      const stringFormatter = (0, string_js_1.default)({ quote, escapedQuote });
      return (value) => {
        if ([quote, separator, eol].some((char) => value.includes(char))) {
          return stringFormatter(value);
        }
        return value;
      };
    }
    exports2.default = stringQuoteOnlyIfNecessaryFormatter;
  }
});

// node_modules/@json2csv/formatters/dist/cjs/stringExcel.js
var require_stringExcel = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/stringExcel.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var quote = '"';
    var escapedQuote = '""""';
    var quoteRegExp = new RegExp(quote, "g");
    function stringExcel(value) {
      return `"=""${value.replace(quoteRegExp, escapedQuote)}"""`;
    }
    exports2.default = stringExcel;
  }
});

// node_modules/@json2csv/formatters/dist/cjs/symbol.js
var require_symbol = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/symbol.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var string_js_1 = __importDefault(require_string());
    function symbolFormatter(opts = { stringFormatter: (0, string_js_1.default)() }) {
      return (value) => opts.stringFormatter(value.toString().slice(7, -1));
    }
    exports2.default = symbolFormatter;
  }
});

// node_modules/@json2csv/formatters/dist/cjs/object.js
var require_object = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/object.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var string_js_1 = __importDefault(require_string());
    function objectFormatter(opts = { stringFormatter: (0, string_js_1.default)() }) {
      return (value) => {
        if (value === null)
          return "";
        let stringifiedValue = JSON.stringify(value);
        if (stringifiedValue === void 0)
          return "";
        if (stringifiedValue[0] === '"')
          stringifiedValue = stringifiedValue.replace(/^"(.+)"$/, "$1");
        return opts.stringFormatter(stringifiedValue);
      };
    }
    exports2.default = objectFormatter;
  }
});

// node_modules/@json2csv/formatters/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@json2csv/formatters/dist/cjs/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.object = exports2.symbol = exports2.stringExcel = exports2.stringQuoteOnlyIfNecessary = exports2.string = exports2.number = exports2.default = void 0;
    var default_js_1 = require_default();
    Object.defineProperty(exports2, "default", { enumerable: true, get: function() {
      return __importDefault(default_js_1).default;
    } });
    var number_js_1 = require_number();
    Object.defineProperty(exports2, "number", { enumerable: true, get: function() {
      return __importDefault(number_js_1).default;
    } });
    var string_js_1 = require_string();
    Object.defineProperty(exports2, "string", { enumerable: true, get: function() {
      return __importDefault(string_js_1).default;
    } });
    var stringQuoteOnlyIfNecessary_js_1 = require_stringQuoteOnlyIfNecessary();
    Object.defineProperty(exports2, "stringQuoteOnlyIfNecessary", { enumerable: true, get: function() {
      return __importDefault(stringQuoteOnlyIfNecessary_js_1).default;
    } });
    var stringExcel_js_1 = require_stringExcel();
    Object.defineProperty(exports2, "stringExcel", { enumerable: true, get: function() {
      return __importDefault(stringExcel_js_1).default;
    } });
    var symbol_js_1 = require_symbol();
    Object.defineProperty(exports2, "symbol", { enumerable: true, get: function() {
      return __importDefault(symbol_js_1).default;
    } });
    var object_js_1 = require_object();
    Object.defineProperty(exports2, "object", { enumerable: true, get: function() {
      return __importDefault(object_js_1).default;
    } });
  }
});

// node_modules/@json2csv/plainjs/dist/cjs/utils.js
var require_utils = __commonJS({
  "node_modules/@json2csv/plainjs/dist/cjs/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fastJoin = exports2.flattenReducer = exports2.getProp = void 0;
    var rePropName = RegExp(
      // Match anything that isn't a dot or bracket.
      `[^.[\\]]+|\\[(?:([^"'][^[]*)|(["'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))`,
      "g"
    );
    function castPath(value) {
      var _a, _b, _c;
      const result = [];
      let match;
      while (match = rePropName.exec(value)) {
        result.push((_c = (_a = match[3]) !== null && _a !== void 0 ? _a : (_b = match[1]) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : match[0]);
      }
      return result;
    }
    function getProp(obj, path2, defaultValue) {
      if (path2 in obj) {
        const value = obj[path2];
        return value === void 0 ? defaultValue : value;
      }
      const processedPath = Array.isArray(path2) ? path2 : castPath(path2, obj);
      let currentValue = obj;
      for (const key of processedPath) {
        currentValue = currentValue === null || currentValue === void 0 ? void 0 : currentValue[key];
        if (currentValue === void 0)
          return defaultValue;
      }
      return currentValue;
    }
    exports2.getProp = getProp;
    function flattenReducer(acc, arr) {
      try {
        Array.isArray(arr) ? acc.push(...arr) : acc.push(arr);
        return acc;
      } catch (err) {
        return acc.concat(arr);
      }
    }
    exports2.flattenReducer = flattenReducer;
    function fastJoin(arr, separator) {
      let isFirst = true;
      return arr.reduce((acc, elem) => {
        if (elem === null || elem === void 0) {
          elem = "";
        }
        if (isFirst) {
          isFirst = false;
          return `${elem}`;
        }
        return `${acc}${separator}${elem}`;
      }, "");
    }
    exports2.fastJoin = fastJoin;
  }
});

// node_modules/@json2csv/plainjs/dist/cjs/BaseParser.js
var require_BaseParser = __commonJS({
  "node_modules/@json2csv/plainjs/dist/cjs/BaseParser.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FormatterTypes = void 0;
    var formatters_1 = __importStar(require_cjs());
    var utils_js_1 = require_utils();
    var FormatterTypes;
    (function(FormatterTypes2) {
      FormatterTypes2["header"] = "header";
      FormatterTypes2["undefined"] = "undefined";
      FormatterTypes2["boolean"] = "boolean";
      FormatterTypes2["number"] = "number";
      FormatterTypes2["bigint"] = "bigint";
      FormatterTypes2["string"] = "string";
      FormatterTypes2["symbol"] = "symbol";
      FormatterTypes2["function"] = "function";
      FormatterTypes2["object"] = "object";
    })(FormatterTypes || (exports2.FormatterTypes = FormatterTypes = {}));
    var JSON2CSVBase = class {
      constructor(opts) {
        this.opts = this.preprocessOpts(opts);
      }
      /**
       * Check passing opts and set defaults.
       *
       * @param {Json2CsvOptions} opts Options object containing fields,
       * delimiter, default value, header, etc.
       */
      preprocessOpts(opts) {
        const processedOpts = Object.assign({}, opts);
        if (processedOpts.fields) {
          processedOpts.fields = this.preprocessFieldsInfo(processedOpts.fields, processedOpts.defaultValue);
        }
        processedOpts.transforms = processedOpts.transforms || [];
        const stringFormatter = processedOpts.formatters && processedOpts.formatters["string"] || (0, formatters_1.string)();
        const objectFormatter = (0, formatters_1.object)({ stringFormatter });
        const defaultFormatters = {
          header: stringFormatter,
          undefined: formatters_1.default,
          boolean: formatters_1.default,
          number: (0, formatters_1.number)(),
          bigint: formatters_1.default,
          string: stringFormatter,
          symbol: (0, formatters_1.symbol)({ stringFormatter }),
          function: objectFormatter,
          object: objectFormatter
        };
        processedOpts.formatters = Object.assign(Object.assign({}, defaultFormatters), processedOpts.formatters);
        processedOpts.delimiter = processedOpts.delimiter || ",";
        processedOpts.eol = processedOpts.eol || "\n";
        processedOpts.header = processedOpts.header !== false;
        processedOpts.includeEmptyRows = processedOpts.includeEmptyRows || false;
        processedOpts.withBOM = processedOpts.withBOM || false;
        return processedOpts;
      }
      /**
       * Check and normalize the fields configuration.
       *
       * @param {(string|object)[]} fields Fields configuration provided by the user
       * or inferred from the data
       * @returns {object[]} preprocessed FieldsInfo array
       */
      preprocessFieldsInfo(fields, globalDefaultValue) {
        return fields.map((fieldInfo) => {
          if (typeof fieldInfo === "string") {
            return {
              label: fieldInfo,
              value: (row) => (0, utils_js_1.getProp)(row, fieldInfo, globalDefaultValue)
            };
          }
          if (typeof fieldInfo === "object") {
            const defaultValue = "default" in fieldInfo ? fieldInfo.default : globalDefaultValue;
            if (typeof fieldInfo.value === "string") {
              const fieldPath = fieldInfo.value;
              return {
                label: fieldInfo.label || fieldInfo.value,
                value: (row) => (0, utils_js_1.getProp)(row, fieldPath, defaultValue)
              };
            }
            if (typeof fieldInfo.value === "function") {
              const label = fieldInfo.label || fieldInfo.value.name || "";
              const field = { label, default: defaultValue };
              const valueGetter = fieldInfo.value;
              return {
                label,
                value(row) {
                  const value = valueGetter(row, field);
                  return value === void 0 ? defaultValue : value;
                }
              };
            }
          }
          throw new Error("Invalid field info option. " + JSON.stringify(fieldInfo));
        });
      }
      /**
       * Create the title row with all the provided fields as column headings
       *
       * @returns {String} titles as a string
       */
      getHeader() {
        return (0, utils_js_1.fastJoin)(this.opts.fields.map((fieldInfo) => this.opts.formatters.header(fieldInfo.label)), this.opts.delimiter);
      }
      /**
       * Preprocess each object according to the given transforms (unwind, flatten, etc.).
       * @param {Object} row JSON object to be converted in a CSV row
       */
      preprocessRow(row) {
        return this.opts.transforms.reduce((rows, transform) => rows.map((row2) => transform(row2)).reduce(utils_js_1.flattenReducer, []), [row]);
      }
      /**
       * Create the content of a specific CSV row
       *
       * @param {Object} row JSON object to be converted in a CSV row
       * @returns {String} CSV string (row)
       */
      processRow(row) {
        if (!row) {
          return void 0;
        }
        const processedRow = this.opts.fields.map((fieldInfo) => this.processCell(row, fieldInfo));
        if (!this.opts.includeEmptyRows && processedRow.every((field) => field === "")) {
          return void 0;
        }
        return (0, utils_js_1.fastJoin)(processedRow, this.opts.delimiter);
      }
      /**
       * Create the content of a specfic CSV row cell
       *
       * @param {Object} row JSON object representing the  CSV row that the cell belongs to
       * @param {FieldInfo} fieldInfo Details of the field to process to be a CSV cell
       * @returns {String} CSV string (cell)
       */
      processCell(row, fieldInfo) {
        return this.processValue(fieldInfo.value(row));
      }
      /**
       * Create the content of a specfic CSV row cell
       *
       * @param {T} value Value to be included in a CSV cell
       * @returns {String} Value stringified and processed
       */
      processValue(value) {
        const formatter = this.opts.formatters[typeof value];
        return formatter(value);
      }
    };
    exports2.default = JSON2CSVBase;
  }
});

// node_modules/@json2csv/plainjs/dist/cjs/Parser.js
var require_Parser = __commonJS({
  "node_modules/@json2csv/plainjs/dist/cjs/Parser.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var BaseParser_js_1 = __importDefault(require_BaseParser());
    var utils_js_1 = require_utils();
    var JSON2CSVParser = class extends BaseParser_js_1.default {
      constructor(opts) {
        super(opts);
      }
      /**
       * Main function that converts json to csv.
       *
       * @param {Array|Object} data Array of JSON objects to be converted to CSV
       * @returns {String} The CSV formated data as a string
       */
      parse(data) {
        const preprocessedData = this.preprocessData(data);
        this.opts.fields = this.opts.fields || this.preprocessFieldsInfo(preprocessedData.reduce((fields, item) => {
          Object.keys(item).forEach((field) => {
            if (!fields.includes(field)) {
              fields.push(field);
            }
          });
          return fields;
        }, []), this.opts.defaultValue);
        const header = this.opts.header ? this.getHeader() : "";
        const rows = this.processData(preprocessedData);
        const csv2 = (this.opts.withBOM ? "\uFEFF" : "") + header + (header && rows ? this.opts.eol : "") + rows;
        return csv2;
      }
      /**
       * Preprocess the data according to the give opts (unwind, flatten, etc.)
        and calculate the fields and field names if they are not provided.
       *
       * @param {Array|Object} data Array or object to be converted to CSV
       */
      preprocessData(data) {
        const processedData = Array.isArray(data) ? data : [data];
        if (!this.opts.fields) {
          if (data === void 0 || data === null || processedData.length === 0) {
            throw new Error('Data should not be empty or the "fields" option should be included');
          }
          if (typeof processedData[0] !== "object") {
            throw new Error('Data items should be objects or the "fields" option should be included');
          }
        }
        if (this.opts.transforms.length === 0)
          return processedData;
        return processedData.map((row) => this.preprocessRow(row)).reduce(utils_js_1.flattenReducer, []);
      }
      /**
       * Create the content row by row below the header
       *
       * @param {Array} data Array of JSON objects to be converted to CSV
       * @returns {String} CSV string (body)
       */
      processData(data) {
        return (0, utils_js_1.fastJoin)(
          data.map((row) => this.processRow(row)).filter((row) => row),
          // Filter empty rows
          this.opts.eol
        );
      }
    };
    exports2.default = JSON2CSVParser;
  }
});

// node_modules/@streamparser/json/dist/cjs/utils/utf-8.js
var require_utf_8 = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/utils/utf-8.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.escapedSequences = exports2.charset = void 0;
    var charset;
    (function(charset2) {
      charset2[charset2["BACKSPACE"] = 8] = "BACKSPACE";
      charset2[charset2["FORM_FEED"] = 12] = "FORM_FEED";
      charset2[charset2["NEWLINE"] = 10] = "NEWLINE";
      charset2[charset2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
      charset2[charset2["TAB"] = 9] = "TAB";
      charset2[charset2["SPACE"] = 32] = "SPACE";
      charset2[charset2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
      charset2[charset2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
      charset2[charset2["NUMBER_SIGN"] = 35] = "NUMBER_SIGN";
      charset2[charset2["DOLLAR_SIGN"] = 36] = "DOLLAR_SIGN";
      charset2[charset2["PERCENT_SIGN"] = 37] = "PERCENT_SIGN";
      charset2[charset2["AMPERSAND"] = 38] = "AMPERSAND";
      charset2[charset2["APOSTROPHE"] = 39] = "APOSTROPHE";
      charset2[charset2["LEFT_PARENTHESIS"] = 40] = "LEFT_PARENTHESIS";
      charset2[charset2["RIGHT_PARENTHESIS"] = 41] = "RIGHT_PARENTHESIS";
      charset2[charset2["ASTERISK"] = 42] = "ASTERISK";
      charset2[charset2["PLUS_SIGN"] = 43] = "PLUS_SIGN";
      charset2[charset2["COMMA"] = 44] = "COMMA";
      charset2[charset2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
      charset2[charset2["FULL_STOP"] = 46] = "FULL_STOP";
      charset2[charset2["SOLIDUS"] = 47] = "SOLIDUS";
      charset2[charset2["DIGIT_ZERO"] = 48] = "DIGIT_ZERO";
      charset2[charset2["DIGIT_ONE"] = 49] = "DIGIT_ONE";
      charset2[charset2["DIGIT_TWO"] = 50] = "DIGIT_TWO";
      charset2[charset2["DIGIT_THREE"] = 51] = "DIGIT_THREE";
      charset2[charset2["DIGIT_FOUR"] = 52] = "DIGIT_FOUR";
      charset2[charset2["DIGIT_FIVE"] = 53] = "DIGIT_FIVE";
      charset2[charset2["DIGIT_SIX"] = 54] = "DIGIT_SIX";
      charset2[charset2["DIGIT_SEVEN"] = 55] = "DIGIT_SEVEN";
      charset2[charset2["DIGIT_EIGHT"] = 56] = "DIGIT_EIGHT";
      charset2[charset2["DIGIT_NINE"] = 57] = "DIGIT_NINE";
      charset2[charset2["COLON"] = 58] = "COLON";
      charset2[charset2["SEMICOLON"] = 59] = "SEMICOLON";
      charset2[charset2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
      charset2[charset2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
      charset2[charset2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
      charset2[charset2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
      charset2[charset2["COMMERCIAL_AT"] = 64] = "COMMERCIAL_AT";
      charset2[charset2["LATIN_CAPITAL_LETTER_A"] = 65] = "LATIN_CAPITAL_LETTER_A";
      charset2[charset2["LATIN_CAPITAL_LETTER_B"] = 66] = "LATIN_CAPITAL_LETTER_B";
      charset2[charset2["LATIN_CAPITAL_LETTER_C"] = 67] = "LATIN_CAPITAL_LETTER_C";
      charset2[charset2["LATIN_CAPITAL_LETTER_D"] = 68] = "LATIN_CAPITAL_LETTER_D";
      charset2[charset2["LATIN_CAPITAL_LETTER_E"] = 69] = "LATIN_CAPITAL_LETTER_E";
      charset2[charset2["LATIN_CAPITAL_LETTER_F"] = 70] = "LATIN_CAPITAL_LETTER_F";
      charset2[charset2["LATIN_CAPITAL_LETTER_G"] = 71] = "LATIN_CAPITAL_LETTER_G";
      charset2[charset2["LATIN_CAPITAL_LETTER_H"] = 72] = "LATIN_CAPITAL_LETTER_H";
      charset2[charset2["LATIN_CAPITAL_LETTER_I"] = 73] = "LATIN_CAPITAL_LETTER_I";
      charset2[charset2["LATIN_CAPITAL_LETTER_J"] = 74] = "LATIN_CAPITAL_LETTER_J";
      charset2[charset2["LATIN_CAPITAL_LETTER_K"] = 75] = "LATIN_CAPITAL_LETTER_K";
      charset2[charset2["LATIN_CAPITAL_LETTER_L"] = 76] = "LATIN_CAPITAL_LETTER_L";
      charset2[charset2["LATIN_CAPITAL_LETTER_M"] = 77] = "LATIN_CAPITAL_LETTER_M";
      charset2[charset2["LATIN_CAPITAL_LETTER_N"] = 78] = "LATIN_CAPITAL_LETTER_N";
      charset2[charset2["LATIN_CAPITAL_LETTER_O"] = 79] = "LATIN_CAPITAL_LETTER_O";
      charset2[charset2["LATIN_CAPITAL_LETTER_P"] = 80] = "LATIN_CAPITAL_LETTER_P";
      charset2[charset2["LATIN_CAPITAL_LETTER_Q"] = 81] = "LATIN_CAPITAL_LETTER_Q";
      charset2[charset2["LATIN_CAPITAL_LETTER_R"] = 82] = "LATIN_CAPITAL_LETTER_R";
      charset2[charset2["LATIN_CAPITAL_LETTER_S"] = 83] = "LATIN_CAPITAL_LETTER_S";
      charset2[charset2["LATIN_CAPITAL_LETTER_T"] = 84] = "LATIN_CAPITAL_LETTER_T";
      charset2[charset2["LATIN_CAPITAL_LETTER_U"] = 85] = "LATIN_CAPITAL_LETTER_U";
      charset2[charset2["LATIN_CAPITAL_LETTER_V"] = 86] = "LATIN_CAPITAL_LETTER_V";
      charset2[charset2["LATIN_CAPITAL_LETTER_W"] = 87] = "LATIN_CAPITAL_LETTER_W";
      charset2[charset2["LATIN_CAPITAL_LETTER_X"] = 88] = "LATIN_CAPITAL_LETTER_X";
      charset2[charset2["LATIN_CAPITAL_LETTER_Y"] = 89] = "LATIN_CAPITAL_LETTER_Y";
      charset2[charset2["LATIN_CAPITAL_LETTER_Z"] = 90] = "LATIN_CAPITAL_LETTER_Z";
      charset2[charset2["LEFT_SQUARE_BRACKET"] = 91] = "LEFT_SQUARE_BRACKET";
      charset2[charset2["REVERSE_SOLIDUS"] = 92] = "REVERSE_SOLIDUS";
      charset2[charset2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
      charset2[charset2["CIRCUMFLEX_ACCENT"] = 94] = "CIRCUMFLEX_ACCENT";
      charset2[charset2["LOW_LINE"] = 95] = "LOW_LINE";
      charset2[charset2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
      charset2[charset2["LATIN_SMALL_LETTER_A"] = 97] = "LATIN_SMALL_LETTER_A";
      charset2[charset2["LATIN_SMALL_LETTER_B"] = 98] = "LATIN_SMALL_LETTER_B";
      charset2[charset2["LATIN_SMALL_LETTER_C"] = 99] = "LATIN_SMALL_LETTER_C";
      charset2[charset2["LATIN_SMALL_LETTER_D"] = 100] = "LATIN_SMALL_LETTER_D";
      charset2[charset2["LATIN_SMALL_LETTER_E"] = 101] = "LATIN_SMALL_LETTER_E";
      charset2[charset2["LATIN_SMALL_LETTER_F"] = 102] = "LATIN_SMALL_LETTER_F";
      charset2[charset2["LATIN_SMALL_LETTER_G"] = 103] = "LATIN_SMALL_LETTER_G";
      charset2[charset2["LATIN_SMALL_LETTER_H"] = 104] = "LATIN_SMALL_LETTER_H";
      charset2[charset2["LATIN_SMALL_LETTER_I"] = 105] = "LATIN_SMALL_LETTER_I";
      charset2[charset2["LATIN_SMALL_LETTER_J"] = 106] = "LATIN_SMALL_LETTER_J";
      charset2[charset2["LATIN_SMALL_LETTER_K"] = 107] = "LATIN_SMALL_LETTER_K";
      charset2[charset2["LATIN_SMALL_LETTER_L"] = 108] = "LATIN_SMALL_LETTER_L";
      charset2[charset2["LATIN_SMALL_LETTER_M"] = 109] = "LATIN_SMALL_LETTER_M";
      charset2[charset2["LATIN_SMALL_LETTER_N"] = 110] = "LATIN_SMALL_LETTER_N";
      charset2[charset2["LATIN_SMALL_LETTER_O"] = 111] = "LATIN_SMALL_LETTER_O";
      charset2[charset2["LATIN_SMALL_LETTER_P"] = 112] = "LATIN_SMALL_LETTER_P";
      charset2[charset2["LATIN_SMALL_LETTER_Q"] = 113] = "LATIN_SMALL_LETTER_Q";
      charset2[charset2["LATIN_SMALL_LETTER_R"] = 114] = "LATIN_SMALL_LETTER_R";
      charset2[charset2["LATIN_SMALL_LETTER_S"] = 115] = "LATIN_SMALL_LETTER_S";
      charset2[charset2["LATIN_SMALL_LETTER_T"] = 116] = "LATIN_SMALL_LETTER_T";
      charset2[charset2["LATIN_SMALL_LETTER_U"] = 117] = "LATIN_SMALL_LETTER_U";
      charset2[charset2["LATIN_SMALL_LETTER_V"] = 118] = "LATIN_SMALL_LETTER_V";
      charset2[charset2["LATIN_SMALL_LETTER_W"] = 119] = "LATIN_SMALL_LETTER_W";
      charset2[charset2["LATIN_SMALL_LETTER_X"] = 120] = "LATIN_SMALL_LETTER_X";
      charset2[charset2["LATIN_SMALL_LETTER_Y"] = 121] = "LATIN_SMALL_LETTER_Y";
      charset2[charset2["LATIN_SMALL_LETTER_Z"] = 122] = "LATIN_SMALL_LETTER_Z";
      charset2[charset2["LEFT_CURLY_BRACKET"] = 123] = "LEFT_CURLY_BRACKET";
      charset2[charset2["VERTICAL_LINE"] = 124] = "VERTICAL_LINE";
      charset2[charset2["RIGHT_CURLY_BRACKET"] = 125] = "RIGHT_CURLY_BRACKET";
      charset2[charset2["TILDE"] = 126] = "TILDE";
    })(charset || (exports2.charset = charset = {}));
    exports2.escapedSequences = {
      [
        34
        /* charset.QUOTATION_MARK */
      ]: 34,
      [
        92
        /* charset.REVERSE_SOLIDUS */
      ]: 92,
      [
        47
        /* charset.SOLIDUS */
      ]: 47,
      [
        98
        /* charset.LATIN_SMALL_LETTER_B */
      ]: 8,
      [
        102
        /* charset.LATIN_SMALL_LETTER_F */
      ]: 12,
      [
        110
        /* charset.LATIN_SMALL_LETTER_N */
      ]: 10,
      [
        114
        /* charset.LATIN_SMALL_LETTER_R */
      ]: 13,
      [
        116
        /* charset.LATIN_SMALL_LETTER_T */
      ]: 9
    };
  }
});

// node_modules/@streamparser/json/dist/cjs/utils/bufferedString.js
var require_bufferedString = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/utils/bufferedString.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BufferedString = exports2.NonBufferedString = void 0;
    var NonBufferedString = class {
      constructor() {
        this.decoder = new TextDecoder("utf-8");
        this.strings = [];
        this.byteLength = 0;
      }
      appendChar(char) {
        this.strings.push(String.fromCharCode(char));
        this.byteLength += 1;
      }
      appendBuf(buf, start = 0, end = buf.length) {
        this.strings.push(this.decoder.decode(buf.subarray(start, end)));
        this.byteLength += end - start;
      }
      reset() {
        this.strings = [];
        this.byteLength = 0;
      }
      toString() {
        return this.strings.join("");
      }
    };
    exports2.NonBufferedString = NonBufferedString;
    var BufferedString = class {
      constructor(bufferSize) {
        this.decoder = new TextDecoder("utf-8");
        this.bufferOffset = 0;
        this.string = "";
        this.byteLength = 0;
        this.buffer = new Uint8Array(bufferSize);
      }
      appendChar(char) {
        if (this.bufferOffset >= this.buffer.length)
          this.flushStringBuffer();
        this.buffer[this.bufferOffset++] = char;
        this.byteLength += 1;
      }
      appendBuf(buf, start = 0, end = buf.length) {
        const size = end - start;
        if (this.bufferOffset + size > this.buffer.length)
          this.flushStringBuffer();
        this.buffer.set(buf.subarray(start, end), this.bufferOffset);
        this.bufferOffset += size;
        this.byteLength += size;
      }
      flushStringBuffer() {
        this.string += this.decoder.decode(this.buffer.subarray(0, this.bufferOffset));
        this.bufferOffset = 0;
      }
      reset() {
        this.string = "";
        this.bufferOffset = 0;
        this.byteLength = 0;
      }
      toString() {
        this.flushStringBuffer();
        return this.string;
      }
    };
    exports2.BufferedString = BufferedString;
  }
});

// node_modules/@streamparser/json/dist/cjs/utils/types/tokenType.js
var require_tokenType = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/utils/types/tokenType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var TokenType;
    (function(TokenType2) {
      TokenType2[TokenType2["LEFT_BRACE"] = 0] = "LEFT_BRACE";
      TokenType2[TokenType2["RIGHT_BRACE"] = 1] = "RIGHT_BRACE";
      TokenType2[TokenType2["LEFT_BRACKET"] = 2] = "LEFT_BRACKET";
      TokenType2[TokenType2["RIGHT_BRACKET"] = 3] = "RIGHT_BRACKET";
      TokenType2[TokenType2["COLON"] = 4] = "COLON";
      TokenType2[TokenType2["COMMA"] = 5] = "COMMA";
      TokenType2[TokenType2["TRUE"] = 6] = "TRUE";
      TokenType2[TokenType2["FALSE"] = 7] = "FALSE";
      TokenType2[TokenType2["NULL"] = 8] = "NULL";
      TokenType2[TokenType2["STRING"] = 9] = "STRING";
      TokenType2[TokenType2["NUMBER"] = 10] = "NUMBER";
      TokenType2[TokenType2["SEPARATOR"] = 11] = "SEPARATOR";
    })(TokenType || (TokenType = {}));
    exports2.default = TokenType;
  }
});

// node_modules/@streamparser/json/dist/cjs/tokenizer.js
var require_tokenizer = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/tokenizer.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TokenizerError = void 0;
    var utf_8_js_1 = require_utf_8();
    var bufferedString_js_1 = require_bufferedString();
    var tokenType_js_1 = __importDefault(require_tokenType());
    var TokenizerStates;
    (function(TokenizerStates2) {
      TokenizerStates2[TokenizerStates2["START"] = 0] = "START";
      TokenizerStates2[TokenizerStates2["ENDED"] = 1] = "ENDED";
      TokenizerStates2[TokenizerStates2["ERROR"] = 2] = "ERROR";
      TokenizerStates2[TokenizerStates2["TRUE1"] = 3] = "TRUE1";
      TokenizerStates2[TokenizerStates2["TRUE2"] = 4] = "TRUE2";
      TokenizerStates2[TokenizerStates2["TRUE3"] = 5] = "TRUE3";
      TokenizerStates2[TokenizerStates2["FALSE1"] = 6] = "FALSE1";
      TokenizerStates2[TokenizerStates2["FALSE2"] = 7] = "FALSE2";
      TokenizerStates2[TokenizerStates2["FALSE3"] = 8] = "FALSE3";
      TokenizerStates2[TokenizerStates2["FALSE4"] = 9] = "FALSE4";
      TokenizerStates2[TokenizerStates2["NULL1"] = 10] = "NULL1";
      TokenizerStates2[TokenizerStates2["NULL2"] = 11] = "NULL2";
      TokenizerStates2[TokenizerStates2["NULL3"] = 12] = "NULL3";
      TokenizerStates2[TokenizerStates2["STRING_DEFAULT"] = 13] = "STRING_DEFAULT";
      TokenizerStates2[TokenizerStates2["STRING_AFTER_BACKSLASH"] = 14] = "STRING_AFTER_BACKSLASH";
      TokenizerStates2[TokenizerStates2["STRING_UNICODE_DIGIT_1"] = 15] = "STRING_UNICODE_DIGIT_1";
      TokenizerStates2[TokenizerStates2["STRING_UNICODE_DIGIT_2"] = 16] = "STRING_UNICODE_DIGIT_2";
      TokenizerStates2[TokenizerStates2["STRING_UNICODE_DIGIT_3"] = 17] = "STRING_UNICODE_DIGIT_3";
      TokenizerStates2[TokenizerStates2["STRING_UNICODE_DIGIT_4"] = 18] = "STRING_UNICODE_DIGIT_4";
      TokenizerStates2[TokenizerStates2["STRING_INCOMPLETE_CHAR"] = 19] = "STRING_INCOMPLETE_CHAR";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_INITIAL_MINUS"] = 20] = "NUMBER_AFTER_INITIAL_MINUS";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_INITIAL_ZERO"] = 21] = "NUMBER_AFTER_INITIAL_ZERO";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_INITIAL_NON_ZERO"] = 22] = "NUMBER_AFTER_INITIAL_NON_ZERO";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_FULL_STOP"] = 23] = "NUMBER_AFTER_FULL_STOP";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_DECIMAL"] = 24] = "NUMBER_AFTER_DECIMAL";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_E"] = 25] = "NUMBER_AFTER_E";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_E_AND_SIGN"] = 26] = "NUMBER_AFTER_E_AND_SIGN";
      TokenizerStates2[TokenizerStates2["NUMBER_AFTER_E_AND_DIGIT"] = 27] = "NUMBER_AFTER_E_AND_DIGIT";
      TokenizerStates2[TokenizerStates2["SEPARATOR"] = 28] = "SEPARATOR";
      TokenizerStates2[TokenizerStates2["BOM_OR_START"] = 29] = "BOM_OR_START";
      TokenizerStates2[TokenizerStates2["BOM"] = 30] = "BOM";
    })(TokenizerStates || (TokenizerStates = {}));
    function TokenizerStateToString(tokenizerState) {
      return [
        "START",
        "ENDED",
        "ERROR",
        "TRUE1",
        "TRUE2",
        "TRUE3",
        "FALSE1",
        "FALSE2",
        "FALSE3",
        "FALSE4",
        "NULL1",
        "NULL2",
        "NULL3",
        "STRING_DEFAULT",
        "STRING_AFTER_BACKSLASH",
        "STRING_UNICODE_DIGIT_1",
        "STRING_UNICODE_DIGIT_2",
        "STRING_UNICODE_DIGIT_3",
        "STRING_UNICODE_DIGIT_4",
        "STRING_INCOMPLETE_CHAR",
        "NUMBER_AFTER_INITIAL_MINUS",
        "NUMBER_AFTER_INITIAL_ZERO",
        "NUMBER_AFTER_INITIAL_NON_ZERO",
        "NUMBER_AFTER_FULL_STOP",
        "NUMBER_AFTER_DECIMAL",
        "NUMBER_AFTER_E",
        "NUMBER_AFTER_E_AND_SIGN",
        "NUMBER_AFTER_E_AND_DIGIT",
        "SEPARATOR",
        "BOM_OR_START",
        "BOM"
      ][tokenizerState];
    }
    var defaultOpts = {
      stringBufferSize: 0,
      numberBufferSize: 0,
      separator: void 0,
      emitPartialTokens: false
    };
    var TokenizerError = class _TokenizerError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _TokenizerError.prototype);
      }
    };
    exports2.TokenizerError = TokenizerError;
    var Tokenizer = class {
      constructor(opts) {
        this.state = 29;
        this.bomIndex = 0;
        this.separatorIndex = 0;
        this.bytes_remaining = 0;
        this.bytes_in_sequence = 0;
        this.char_split_buffer = new Uint8Array(4);
        this.encoder = new TextEncoder();
        this.offset = -1;
        opts = Object.assign(Object.assign({}, defaultOpts), opts);
        this.emitPartialTokens = opts.emitPartialTokens === true;
        this.bufferedString = opts.stringBufferSize && opts.stringBufferSize > 4 ? new bufferedString_js_1.BufferedString(opts.stringBufferSize) : new bufferedString_js_1.NonBufferedString();
        this.bufferedNumber = opts.numberBufferSize && opts.numberBufferSize > 0 ? new bufferedString_js_1.BufferedString(opts.numberBufferSize) : new bufferedString_js_1.NonBufferedString();
        this.separator = opts.separator;
        this.separatorBytes = opts.separator ? this.encoder.encode(opts.separator) : void 0;
      }
      get isEnded() {
        return this.state === 1;
      }
      write(input) {
        try {
          let buffer;
          if (input instanceof Uint8Array) {
            buffer = input;
          } else if (typeof input === "string") {
            buffer = this.encoder.encode(input);
          } else if (Array.isArray(input)) {
            buffer = Uint8Array.from(input);
          } else if (ArrayBuffer.isView(input)) {
            buffer = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
          } else {
            throw new TypeError("Unexpected type. The `write` function only accepts Arrays, TypedArrays and Strings.");
          }
          for (let i = 0; i < buffer.length; i += 1) {
            const n = buffer[i];
            switch (this.state) {
              // @ts-ignore fall through case
              case 29:
                if (input instanceof Uint8Array && n === 239) {
                  this.bom = [239, 187, 191];
                  this.bomIndex += 1;
                  this.state = 30;
                  continue;
                }
                if (input instanceof Uint16Array) {
                  if (n === 254) {
                    this.bom = [254, 255];
                    this.bomIndex += 1;
                    this.state = 30;
                    continue;
                  }
                  if (n === 255) {
                    this.bom = [255, 254];
                    this.bomIndex += 1;
                    this.state = 30;
                    continue;
                  }
                }
                if (input instanceof Uint32Array) {
                  if (n === 0) {
                    this.bom = [0, 0, 254, 255];
                    this.bomIndex += 1;
                    this.state = 30;
                    continue;
                  }
                  if (n === 255) {
                    this.bom = [255, 254, 0, 0];
                    this.bomIndex += 1;
                    this.state = 30;
                    continue;
                  }
                }
              // Allow cascading
              case 0:
                this.offset += 1;
                if (this.separatorBytes && n === this.separatorBytes[0]) {
                  if (this.separatorBytes.length === 1) {
                    this.state = 0;
                    this.onToken({
                      token: tokenType_js_1.default.SEPARATOR,
                      value: this.separator,
                      offset: this.offset + this.separatorBytes.length - 1
                    });
                    continue;
                  }
                  this.state = 28;
                  continue;
                }
                if (n === 32 || n === 10 || n === 13 || n === 9) {
                  continue;
                }
                if (n === 123) {
                  this.onToken({
                    token: tokenType_js_1.default.LEFT_BRACE,
                    value: "{",
                    offset: this.offset
                  });
                  continue;
                }
                if (n === 125) {
                  this.onToken({
                    token: tokenType_js_1.default.RIGHT_BRACE,
                    value: "}",
                    offset: this.offset
                  });
                  continue;
                }
                if (n === 91) {
                  this.onToken({
                    token: tokenType_js_1.default.LEFT_BRACKET,
                    value: "[",
                    offset: this.offset
                  });
                  continue;
                }
                if (n === 93) {
                  this.onToken({
                    token: tokenType_js_1.default.RIGHT_BRACKET,
                    value: "]",
                    offset: this.offset
                  });
                  continue;
                }
                if (n === 58) {
                  this.onToken({
                    token: tokenType_js_1.default.COLON,
                    value: ":",
                    offset: this.offset
                  });
                  continue;
                }
                if (n === 44) {
                  this.onToken({
                    token: tokenType_js_1.default.COMMA,
                    value: ",",
                    offset: this.offset
                  });
                  continue;
                }
                if (n === 116) {
                  this.state = 3;
                  continue;
                }
                if (n === 102) {
                  this.state = 6;
                  continue;
                }
                if (n === 110) {
                  this.state = 10;
                  continue;
                }
                if (n === 34) {
                  this.bufferedString.reset();
                  this.state = 13;
                  continue;
                }
                if (n >= 49 && n <= 57) {
                  this.bufferedNumber.reset();
                  this.bufferedNumber.appendChar(n);
                  this.state = 22;
                  continue;
                }
                if (n === 48) {
                  this.bufferedNumber.reset();
                  this.bufferedNumber.appendChar(n);
                  this.state = 21;
                  continue;
                }
                if (n === 45) {
                  this.bufferedNumber.reset();
                  this.bufferedNumber.appendChar(n);
                  this.state = 20;
                  continue;
                }
                break;
              // STRING
              case 13:
                if (n === 34) {
                  const string = this.bufferedString.toString();
                  this.state = 0;
                  this.onToken({
                    token: tokenType_js_1.default.STRING,
                    value: string,
                    offset: this.offset
                  });
                  this.offset += this.bufferedString.byteLength + 1;
                  continue;
                }
                if (n === 92) {
                  this.state = 14;
                  continue;
                }
                if (n >= 128) {
                  if (n >= 194 && n <= 223) {
                    this.bytes_in_sequence = 2;
                  } else if (n <= 239) {
                    this.bytes_in_sequence = 3;
                  } else {
                    this.bytes_in_sequence = 4;
                  }
                  if (this.bytes_in_sequence <= buffer.length - i) {
                    this.bufferedString.appendBuf(buffer, i, i + this.bytes_in_sequence);
                    i += this.bytes_in_sequence - 1;
                    continue;
                  }
                  this.bytes_remaining = i + this.bytes_in_sequence - buffer.length;
                  this.char_split_buffer.set(buffer.subarray(i));
                  i = buffer.length - 1;
                  this.state = 19;
                  continue;
                }
                if (n >= 32) {
                  this.bufferedString.appendChar(n);
                  continue;
                }
                break;
              case 19:
                this.char_split_buffer.set(buffer.subarray(i, i + this.bytes_remaining), this.bytes_in_sequence - this.bytes_remaining);
                this.bufferedString.appendBuf(this.char_split_buffer, 0, this.bytes_in_sequence);
                i = this.bytes_remaining - 1;
                this.state = 13;
                continue;
              case 14:
                const controlChar = utf_8_js_1.escapedSequences[n];
                if (controlChar) {
                  this.bufferedString.appendChar(controlChar);
                  this.state = 13;
                  continue;
                }
                if (n === 117) {
                  this.unicode = "";
                  this.state = 15;
                  continue;
                }
                break;
              case 15:
              case 16:
              case 17:
                if (n >= 48 && n <= 57 || n >= 65 && n <= 70 || n >= 97 && n <= 102) {
                  this.unicode += String.fromCharCode(n);
                  this.state += 1;
                  continue;
                }
                break;
              case 18:
                if (n >= 48 && n <= 57 || n >= 65 && n <= 70 || n >= 97 && n <= 102) {
                  const intVal = parseInt(this.unicode + String.fromCharCode(n), 16);
                  if (this.highSurrogate === void 0) {
                    if (intVal >= 55296 && intVal <= 56319) {
                      this.highSurrogate = intVal;
                    } else {
                      this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(intVal)));
                    }
                  } else {
                    if (intVal >= 56320 && intVal <= 57343) {
                      this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(this.highSurrogate, intVal)));
                    } else {
                      this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(this.highSurrogate)));
                    }
                    this.highSurrogate = void 0;
                  }
                  this.state = 13;
                  continue;
                }
                break;
              // Number
              case 20:
                if (n === 48) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 21;
                  continue;
                }
                if (n >= 49 && n <= 57) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 22;
                  continue;
                }
                break;
              case 21:
                if (n === 46) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 23;
                  continue;
                }
                if (n === 101 || n === 69) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 25;
                  continue;
                }
                i -= 1;
                this.state = 0;
                this.emitNumber();
                continue;
              case 22:
                if (n >= 48 && n <= 57) {
                  this.bufferedNumber.appendChar(n);
                  continue;
                }
                if (n === 46) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 23;
                  continue;
                }
                if (n === 101 || n === 69) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 25;
                  continue;
                }
                i -= 1;
                this.state = 0;
                this.emitNumber();
                continue;
              case 23:
                if (n >= 48 && n <= 57) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 24;
                  continue;
                }
                break;
              case 24:
                if (n >= 48 && n <= 57) {
                  this.bufferedNumber.appendChar(n);
                  continue;
                }
                if (n === 101 || n === 69) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 25;
                  continue;
                }
                i -= 1;
                this.state = 0;
                this.emitNumber();
                continue;
              // @ts-ignore fall through case
              case 25:
                if (n === 43 || n === 45) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 26;
                  continue;
                }
              // Allow cascading
              case 26:
                if (n >= 48 && n <= 57) {
                  this.bufferedNumber.appendChar(n);
                  this.state = 27;
                  continue;
                }
                break;
              case 27:
                if (n >= 48 && n <= 57) {
                  this.bufferedNumber.appendChar(n);
                  continue;
                }
                i -= 1;
                this.state = 0;
                this.emitNumber();
                continue;
              // TRUE
              case 3:
                if (n === 114) {
                  this.state = 4;
                  continue;
                }
                break;
              case 4:
                if (n === 117) {
                  this.state = 5;
                  continue;
                }
                break;
              case 5:
                if (n === 101) {
                  this.state = 0;
                  this.onToken({
                    token: tokenType_js_1.default.TRUE,
                    value: true,
                    offset: this.offset
                  });
                  this.offset += 3;
                  continue;
                }
                break;
              // FALSE
              case 6:
                if (n === 97) {
                  this.state = 7;
                  continue;
                }
                break;
              case 7:
                if (n === 108) {
                  this.state = 8;
                  continue;
                }
                break;
              case 8:
                if (n === 115) {
                  this.state = 9;
                  continue;
                }
                break;
              case 9:
                if (n === 101) {
                  this.state = 0;
                  this.onToken({
                    token: tokenType_js_1.default.FALSE,
                    value: false,
                    offset: this.offset
                  });
                  this.offset += 4;
                  continue;
                }
                break;
              // NULL
              case 10:
                if (n === 117) {
                  this.state = 11;
                  continue;
                }
                break;
              case 11:
                if (n === 108) {
                  this.state = 12;
                  continue;
                }
                break;
              case 12:
                if (n === 108) {
                  this.state = 0;
                  this.onToken({
                    token: tokenType_js_1.default.NULL,
                    value: null,
                    offset: this.offset
                  });
                  this.offset += 3;
                  continue;
                }
                break;
              case 28:
                this.separatorIndex += 1;
                if (!this.separatorBytes || n !== this.separatorBytes[this.separatorIndex]) {
                  break;
                }
                if (this.separatorIndex === this.separatorBytes.length - 1) {
                  this.state = 0;
                  this.onToken({
                    token: tokenType_js_1.default.SEPARATOR,
                    value: this.separator,
                    offset: this.offset + this.separatorIndex
                  });
                  this.separatorIndex = 0;
                }
                continue;
              // BOM support
              case 30:
                if (n === this.bom[this.bomIndex]) {
                  if (this.bomIndex === this.bom.length - 1) {
                    this.state = 0;
                    this.bom = void 0;
                    this.bomIndex = 0;
                    continue;
                  }
                  this.bomIndex += 1;
                  continue;
                }
                break;
              case 1:
                if (n === 32 || n === 10 || n === 13 || n === 9) {
                  continue;
                }
            }
            throw new TokenizerError(`Unexpected "${String.fromCharCode(n)}" at position "${i}" in state ${TokenizerStateToString(this.state)}`);
          }
          if (this.emitPartialTokens) {
            switch (this.state) {
              case 3:
              case 4:
              case 5:
                this.onToken({
                  token: tokenType_js_1.default.TRUE,
                  value: true,
                  offset: this.offset,
                  partial: true
                });
                break;
              case 6:
              case 7:
              case 8:
              case 9:
                this.onToken({
                  token: tokenType_js_1.default.FALSE,
                  value: false,
                  offset: this.offset,
                  partial: true
                });
                break;
              case 10:
              case 11:
              case 12:
                this.onToken({
                  token: tokenType_js_1.default.NULL,
                  value: null,
                  offset: this.offset,
                  partial: true
                });
                break;
              case 13: {
                const string = this.bufferedString.toString();
                this.onToken({
                  token: tokenType_js_1.default.STRING,
                  value: string,
                  offset: this.offset,
                  partial: true
                });
                break;
              }
              case 21:
              case 22:
              case 24:
              case 27:
                try {
                  this.onToken({
                    token: tokenType_js_1.default.NUMBER,
                    value: this.parseNumber(this.bufferedNumber.toString()),
                    offset: this.offset,
                    partial: true
                  });
                } catch (err) {
                }
            }
          }
        } catch (err) {
          this.error(err);
        }
      }
      emitNumber() {
        this.onToken({
          token: tokenType_js_1.default.NUMBER,
          value: this.parseNumber(this.bufferedNumber.toString()),
          offset: this.offset
        });
        this.offset += this.bufferedNumber.byteLength - 1;
      }
      parseNumber(numberStr) {
        return Number(numberStr);
      }
      error(err) {
        if (this.state !== 1) {
          this.state = 2;
        }
        this.onError(err);
      }
      end() {
        switch (this.state) {
          case 21:
          case 22:
          case 24:
          case 27:
            this.state = 1;
            this.emitNumber();
            this.onEnd();
            break;
          case 29:
          case 0:
          case 2:
          case 28:
            this.state = 1;
            this.onEnd();
            break;
          default:
            this.error(new TokenizerError(`Tokenizer ended in the middle of a token (state: ${TokenizerStateToString(this.state)}). Either not all the data was received or the data was invalid.`));
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onToken(parsedToken) {
        throw new TokenizerError(`Can't emit tokens before the "onToken" callback has been set up.`);
      }
      onError(err) {
        throw err;
      }
      onEnd() {
      }
    };
    exports2.default = Tokenizer;
  }
});

// node_modules/@streamparser/json/dist/cjs/tokenparser.js
var require_tokenparser = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/tokenparser.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TokenParserError = void 0;
    var tokenType_js_1 = __importDefault(require_tokenType());
    var TokenParserState;
    (function(TokenParserState2) {
      TokenParserState2[TokenParserState2["VALUE"] = 0] = "VALUE";
      TokenParserState2[TokenParserState2["KEY"] = 1] = "KEY";
      TokenParserState2[TokenParserState2["COLON"] = 2] = "COLON";
      TokenParserState2[TokenParserState2["COMMA"] = 3] = "COMMA";
      TokenParserState2[TokenParserState2["ENDED"] = 4] = "ENDED";
      TokenParserState2[TokenParserState2["ERROR"] = 5] = "ERROR";
      TokenParserState2[TokenParserState2["SEPARATOR"] = 6] = "SEPARATOR";
    })(TokenParserState || (TokenParserState = {}));
    function TokenParserStateToString(state) {
      return ["VALUE", "KEY", "COLON", "COMMA", "ENDED", "ERROR", "SEPARATOR"][state];
    }
    var defaultOpts = {
      paths: void 0,
      keepStack: true,
      separator: void 0,
      emitPartialValues: false
    };
    var TokenParserError = class _TokenParserError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _TokenParserError.prototype);
      }
    };
    exports2.TokenParserError = TokenParserError;
    var TokenParser = class {
      constructor(opts) {
        this.state = 0;
        this.mode = void 0;
        this.key = void 0;
        this.value = void 0;
        this.stack = [];
        opts = Object.assign(Object.assign({}, defaultOpts), opts);
        if (opts.paths) {
          this.paths = opts.paths.map((path2) => {
            if (path2 === void 0 || path2 === "$*")
              return void 0;
            if (!path2.startsWith("$"))
              throw new TokenParserError(`Invalid selector "${path2}". Should start with "$".`);
            const pathParts = path2.split(".").slice(1);
            if (pathParts.includes(""))
              throw new TokenParserError(`Invalid selector "${path2}". ".." syntax not supported.`);
            return pathParts;
          });
        }
        this.keepStack = opts.keepStack || false;
        this.separator = opts.separator;
        if (!opts.emitPartialValues) {
          this.emitPartial = () => {
          };
        }
      }
      shouldEmit() {
        if (!this.paths)
          return true;
        return this.paths.some((path2) => {
          var _a;
          if (path2 === void 0)
            return true;
          if (path2.length !== this.stack.length)
            return false;
          for (let i = 0; i < path2.length - 1; i++) {
            const selector2 = path2[i];
            const key = this.stack[i + 1].key;
            if (selector2 === "*")
              continue;
            if (selector2 !== key)
              return false;
          }
          const selector = path2[path2.length - 1];
          if (selector === "*")
            return true;
          return selector === ((_a = this.key) === null || _a === void 0 ? void 0 : _a.toString());
        });
      }
      push() {
        this.stack.push({
          key: this.key,
          value: this.value,
          mode: this.mode,
          emit: this.shouldEmit()
        });
      }
      pop() {
        const value = this.value;
        let emit;
        ({
          key: this.key,
          value: this.value,
          mode: this.mode,
          emit
        } = this.stack.pop());
        this.state = this.mode !== void 0 ? 3 : 0;
        this.emit(value, emit);
      }
      emit(value, emit) {
        if (!this.keepStack && this.value && this.stack.every((item) => !item.emit)) {
          delete this.value[this.key];
        }
        if (emit) {
          this.onValue({
            value,
            key: this.key,
            parent: this.value,
            stack: this.stack
          });
        }
        if (this.stack.length === 0) {
          if (this.separator) {
            this.state = 6;
          } else if (this.separator === void 0) {
            this.end();
          }
        }
      }
      emitPartial(value) {
        if (!this.shouldEmit())
          return;
        if (this.state === 1) {
          this.onValue({
            value: void 0,
            key: value,
            parent: this.value,
            stack: this.stack,
            partial: true
          });
          return;
        }
        this.onValue({
          value,
          key: this.key,
          parent: this.value,
          stack: this.stack,
          partial: true
        });
      }
      get isEnded() {
        return this.state === 4;
      }
      write({ token, value, partial }) {
        try {
          if (partial) {
            this.emitPartial(value);
            return;
          }
          if (this.state === 0) {
            if (token === tokenType_js_1.default.STRING || token === tokenType_js_1.default.NUMBER || token === tokenType_js_1.default.TRUE || token === tokenType_js_1.default.FALSE || token === tokenType_js_1.default.NULL) {
              if (this.mode === 0) {
                this.value[this.key] = value;
                this.state = 3;
              } else if (this.mode === 1) {
                this.value.push(value);
                this.state = 3;
              }
              this.emit(value, this.shouldEmit());
              return;
            }
            if (token === tokenType_js_1.default.LEFT_BRACE) {
              this.push();
              if (this.mode === 0) {
                this.value = this.value[this.key] = {};
              } else if (this.mode === 1) {
                const val = {};
                this.value.push(val);
                this.value = val;
              } else {
                this.value = {};
              }
              this.mode = 0;
              this.state = 1;
              this.key = void 0;
              this.emitPartial();
              return;
            }
            if (token === tokenType_js_1.default.LEFT_BRACKET) {
              this.push();
              if (this.mode === 0) {
                this.value = this.value[this.key] = [];
              } else if (this.mode === 1) {
                const val = [];
                this.value.push(val);
                this.value = val;
              } else {
                this.value = [];
              }
              this.mode = 1;
              this.state = 0;
              this.key = 0;
              this.emitPartial();
              return;
            }
            if (this.mode === 1 && token === tokenType_js_1.default.RIGHT_BRACKET && this.value.length === 0) {
              this.pop();
              return;
            }
          }
          if (this.state === 1) {
            if (token === tokenType_js_1.default.STRING) {
              this.key = value;
              this.state = 2;
              this.emitPartial();
              return;
            }
            if (token === tokenType_js_1.default.RIGHT_BRACE && Object.keys(this.value).length === 0) {
              this.pop();
              return;
            }
          }
          if (this.state === 2) {
            if (token === tokenType_js_1.default.COLON) {
              this.state = 0;
              return;
            }
          }
          if (this.state === 3) {
            if (token === tokenType_js_1.default.COMMA) {
              if (this.mode === 1) {
                this.state = 0;
                this.key += 1;
                return;
              }
              if (this.mode === 0) {
                this.state = 1;
                return;
              }
            }
            if (token === tokenType_js_1.default.RIGHT_BRACE && this.mode === 0 || token === tokenType_js_1.default.RIGHT_BRACKET && this.mode === 1) {
              this.pop();
              return;
            }
          }
          if (this.state === 6) {
            if (token === tokenType_js_1.default.SEPARATOR && value === this.separator) {
              this.state = 0;
              return;
            }
          }
          throw new TokenParserError(`Unexpected ${tokenType_js_1.default[token]} (${JSON.stringify(value)}) in state ${TokenParserStateToString(this.state)}`);
        } catch (err) {
          this.error(err);
        }
      }
      error(err) {
        if (this.state !== 4) {
          this.state = 5;
        }
        this.onError(err);
      }
      end() {
        if (this.state !== 0 && this.state !== 6 || this.stack.length > 0) {
          this.error(new Error(`Parser ended in mid-parsing (state: ${TokenParserStateToString(this.state)}). Either not all the data was received or the data was invalid.`));
        } else {
          this.state = 4;
          this.onEnd();
        }
      }
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      onValue(parsedElementInfo) {
        throw new TokenParserError(`Can't emit data before the "onValue" callback has been set up.`);
      }
      onError(err) {
        throw err;
      }
      onEnd() {
      }
    };
    exports2.default = TokenParser;
  }
});

// node_modules/@streamparser/json/dist/cjs/jsonparser.js
var require_jsonparser = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/jsonparser.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tokenizer_js_1 = __importDefault(require_tokenizer());
    var tokenparser_js_1 = __importDefault(require_tokenparser());
    var JSONParser = class {
      constructor(opts = {}) {
        this.tokenizer = new tokenizer_js_1.default(opts);
        this.tokenParser = new tokenparser_js_1.default(opts);
        this.tokenizer.onToken = this.tokenParser.write.bind(this.tokenParser);
        this.tokenizer.onEnd = () => {
          if (!this.tokenParser.isEnded)
            this.tokenParser.end();
        };
        this.tokenParser.onError = this.tokenizer.error.bind(this.tokenizer);
        this.tokenParser.onEnd = () => {
          if (!this.tokenizer.isEnded)
            this.tokenizer.end();
        };
      }
      get isEnded() {
        return this.tokenizer.isEnded && this.tokenParser.isEnded;
      }
      write(input) {
        this.tokenizer.write(input);
      }
      end() {
        this.tokenizer.end();
      }
      set onToken(cb) {
        this.tokenizer.onToken = (parsedToken) => {
          cb(parsedToken);
          this.tokenParser.write(parsedToken);
        };
      }
      set onValue(cb) {
        this.tokenParser.onValue = cb;
      }
      set onError(cb) {
        this.tokenizer.onError = cb;
      }
      set onEnd(cb) {
        this.tokenParser.onEnd = () => {
          if (!this.tokenizer.isEnded)
            this.tokenizer.end();
          cb.call(this.tokenParser);
        };
      }
    };
    exports2.default = JSONParser;
  }
});

// node_modules/@streamparser/json/dist/cjs/utils/types/jsonTypes.js
var require_jsonTypes = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/utils/types/jsonTypes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@streamparser/json/dist/cjs/utils/types/parsedTokenInfo.js
var require_parsedTokenInfo = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/utils/types/parsedTokenInfo.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@streamparser/json/dist/cjs/utils/types/parsedElementInfo.js
var require_parsedElementInfo = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/utils/types/parsedElementInfo.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@streamparser/json/dist/cjs/utils/types/stackElement.js
var require_stackElement = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/utils/types/stackElement.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TokenParserMode = void 0;
    var TokenParserMode;
    (function(TokenParserMode2) {
      TokenParserMode2[TokenParserMode2["OBJECT"] = 0] = "OBJECT";
      TokenParserMode2[TokenParserMode2["ARRAY"] = 1] = "ARRAY";
    })(TokenParserMode || (exports2.TokenParserMode = TokenParserMode = {}));
  }
});

// node_modules/@streamparser/json/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@streamparser/json/dist/cjs/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TokenType = exports2.TokenParserMode = exports2.ParsedElementInfo = exports2.ParsedTokenInfo = exports2.JsonTypes = exports2.utf8 = exports2.TokenParserError = exports2.TokenParser = exports2.TokenizerError = exports2.Tokenizer = exports2.JSONParser = void 0;
    var jsonparser_js_1 = require_jsonparser();
    Object.defineProperty(exports2, "JSONParser", { enumerable: true, get: function() {
      return __importDefault(jsonparser_js_1).default;
    } });
    var tokenizer_js_1 = require_tokenizer();
    Object.defineProperty(exports2, "Tokenizer", { enumerable: true, get: function() {
      return __importDefault(tokenizer_js_1).default;
    } });
    Object.defineProperty(exports2, "TokenizerError", { enumerable: true, get: function() {
      return tokenizer_js_1.TokenizerError;
    } });
    var tokenparser_js_1 = require_tokenparser();
    Object.defineProperty(exports2, "TokenParser", { enumerable: true, get: function() {
      return __importDefault(tokenparser_js_1).default;
    } });
    Object.defineProperty(exports2, "TokenParserError", { enumerable: true, get: function() {
      return tokenparser_js_1.TokenParserError;
    } });
    exports2.utf8 = __importStar(require_utf_8());
    exports2.JsonTypes = __importStar(require_jsonTypes());
    exports2.ParsedTokenInfo = __importStar(require_parsedTokenInfo());
    exports2.ParsedElementInfo = __importStar(require_parsedElementInfo());
    var stackElement_js_1 = require_stackElement();
    Object.defineProperty(exports2, "TokenParserMode", { enumerable: true, get: function() {
      return stackElement_js_1.TokenParserMode;
    } });
    var tokenType_js_1 = require_tokenType();
    Object.defineProperty(exports2, "TokenType", { enumerable: true, get: function() {
      return __importDefault(tokenType_js_1).default;
    } });
  }
});

// node_modules/@json2csv/plainjs/dist/cjs/StreamParser.js
var require_StreamParser = __commonJS({
  "node_modules/@json2csv/plainjs/dist/cjs/StreamParser.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var json_1 = require_cjs2();
    var BaseParser_js_1 = __importDefault(require_BaseParser());
    var JSON2CSVStreamParser = class extends BaseParser_js_1.default {
      constructor(opts, asyncOpts) {
        super(opts);
        this._hasWritten = false;
        if (this.opts.fields)
          this.preprocessFieldsInfo(this.opts.fields, this.opts.defaultValue);
        this.initTokenizer(this.opts, asyncOpts);
      }
      initTokenizer(opts, asyncOpts = {}) {
        if (asyncOpts.objectMode) {
          this.tokenizer = this.getObjectModeTokenizer();
          return;
        }
        if (opts.ndjson) {
          this.tokenizer = this.getNdJsonTokenizer(asyncOpts);
          return;
        }
        this.tokenizer = this.getBinaryModeTokenizer(asyncOpts);
        return;
      }
      getObjectModeTokenizer() {
        return {
          write: (data) => this.pushLine(data),
          end: () => {
            this.pushHeaderIfNotWritten();
            this.onEnd();
          }
        };
      }
      configureCallbacks(tokenizer, tokenParser) {
        tokenizer.onToken = tokenParser.write.bind(this.tokenParser);
        tokenizer.onError = (err) => this.onError(err);
        tokenizer.onEnd = () => {
          if (!this.tokenParser.isEnded)
            this.tokenParser.end();
        };
        tokenParser.onValue = ({ value }) => this.pushLine(value);
        tokenParser.onError = (err) => this.onError(err);
        tokenParser.onEnd = () => {
          this.pushHeaderIfNotWritten();
          this.onEnd();
        };
      }
      getNdJsonTokenizer(asyncOpts) {
        const tokenizer = new json_1.Tokenizer(Object.assign(Object.assign({}, asyncOpts), { separator: this.opts.eol }));
        this.tokenParser = new json_1.TokenParser({
          paths: ["$"],
          keepStack: false,
          separator: this.opts.eol
        });
        this.configureCallbacks(tokenizer, this.tokenParser);
        return tokenizer;
      }
      getBinaryModeTokenizer(asyncOpts) {
        const tokenizer = new json_1.Tokenizer(asyncOpts);
        tokenizer.onToken = ({ token, value }) => {
          if (token === json_1.TokenType.LEFT_BRACKET) {
            this.tokenParser = new json_1.TokenParser({
              paths: ["$.*"],
              keepStack: false
            });
          } else if (token === json_1.TokenType.LEFT_BRACE) {
            this.tokenParser = new json_1.TokenParser({ paths: ["$"], keepStack: false });
          } else {
            this.onError(new Error('Data items should be objects or the "fields" option should be included'));
            return;
          }
          this.configureCallbacks(tokenizer, this.tokenParser);
          this.tokenParser.write({ token, value });
        };
        tokenizer.onError = (err) => this.onError(err instanceof json_1.TokenizerError ? new Error("Data should be a valid JSON object or array") : err);
        tokenizer.onEnd = () => {
          this.pushHeaderIfNotWritten();
          this.onEnd();
        };
        return tokenizer;
      }
      // TODO this should be narrowed based on options
      write(data) {
        this.tokenizer.write(data);
      }
      end() {
        if (this.tokenizer && !this.tokenizer.isEnded)
          this.tokenizer.end();
      }
      pushHeaderIfNotWritten() {
        if (this._hasWritten)
          return;
        if (!this.opts.fields) {
          this.onError(new Error('Data should not be empty or the "fields" option should be included'));
          return;
        }
        this.pushHeader();
      }
      /**
       * Generate the csv header and pushes it downstream.
       */
      pushHeader() {
        if (this.opts.withBOM) {
          this.onData("\uFEFF");
        }
        if (this.opts.header) {
          const header = this.getHeader();
          this.onHeader(header);
          this.onData(header);
          this._hasWritten = true;
        }
      }
      /**
       * Transforms an incoming json data to csv and pushes it downstream.
       *
       * @param {Object} data JSON object to be converted in a CSV row
       */
      pushLine(data) {
        const processedData = this.preprocessRow(data);
        if (!this._hasWritten) {
          if (!this.opts.fields) {
            if (typeof processedData[0] !== "object") {
              throw new Error('Data items should be objects or the "fields" option should be included');
            }
            this.opts.fields = this.preprocessFieldsInfo(Object.keys(processedData[0]), this.opts.defaultValue);
          }
          this.pushHeader();
        }
        processedData.forEach((row) => {
          const line = this.processRow(row);
          if (line === void 0)
            return;
          this.onLine(line);
          this.onData(this._hasWritten ? this.opts.eol + line : line);
          this._hasWritten = true;
        });
      }
      // No idea why eslint doesn't detect the usage of these
      /* eslint-disable @typescript-eslint/no-unused-vars */
      /* c8 ignore start */
      onHeader(header) {
      }
      onLine(line) {
      }
      onData(data) {
      }
      onError(err) {
      }
      onEnd() {
      }
    };
    exports2.default = JSON2CSVStreamParser;
  }
});

// node_modules/@json2csv/plainjs/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@json2csv/plainjs/dist/cjs/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StreamParser = exports2.Parser = exports2.FormatterTypes = exports2.BaseParser = void 0;
    var BaseParser_js_1 = require_BaseParser();
    Object.defineProperty(exports2, "BaseParser", { enumerable: true, get: function() {
      return __importDefault(BaseParser_js_1).default;
    } });
    Object.defineProperty(exports2, "FormatterTypes", { enumerable: true, get: function() {
      return BaseParser_js_1.FormatterTypes;
    } });
    var Parser_js_1 = require_Parser();
    Object.defineProperty(exports2, "Parser", { enumerable: true, get: function() {
      return __importDefault(Parser_js_1).default;
    } });
    var StreamParser_js_1 = require_StreamParser();
    Object.defineProperty(exports2, "StreamParser", { enumerable: true, get: function() {
      return __importDefault(StreamParser_js_1).default;
    } });
  }
});

// json2csv.js
var fs = require("fs");
var path = require("path");
var { Parser } = require_cjs3();
var __dirname = path.dirname(process.argv[1]);
var outputPath = path.join(__dirname, "data.csv");
var test = "all";
var isPLNTB = true;
var isXSTU = true;
var args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--test=")) test = arg.split("=")[1];
  else if (arg === "--test") test = args[++i];
}
if (test.toLocaleLowerCase() == "plntb") {
  isPLNTB = true;
  isXSTU = false;
} else if (test.toLocaleLowerCase() == "xstu") {
  isPLNTB = false;
  isXSTU = true;
}
console.log("JSON -> CSV");
var dataArray = [];
if (isPLNTB) {
  const inputPath = path.join(__dirname, "plntb-data.json");
  console.log("Input", inputPath);
  const testData = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  dataArray.push(testData);
}
if (isXSTU) {
  const inputPath = path.join(__dirname, "xstu-data.json");
  console.log("Input", inputPath);
  const testData = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  dataArray.push(testData);
}
function flattenObject(obj, parentKey = "", res = {}) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else if (Array.isArray(value)) {
      res[newKey] = value.map((v) => typeof v === "object" ? JSON.stringify(v) : v).join(";");
    } else {
      res[newKey] = value;
    }
  }
  return res;
}
var flatData = dataArray.map((item) => flattenObject(item));
var parser = new Parser({});
var csv = parser.parse(flatData);
console.log(dataArray);
fs.writeFileSync(outputPath, csv, "utf-8");
console.log("Output", outputPath);
console.log(csv);

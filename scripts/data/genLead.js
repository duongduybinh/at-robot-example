const fs = require('fs');
const csv2Json = require('csvtojs');

const VN_PREFIXES = [
    '032', '033', '034', '035', '036', '037', '038', '039', // 03x
    '056', '058', '059',                               // 05x
    '070', '076', '077', '078', '079',                   // 07x
    '081', '082', '083', '084', '085', '086', '088', '089', // 08x
    '090', '091', '092', '093', '094', '095', '096', '097', '098', '099' // 09x & 09xx blocks
];

class DataProvider {
    static generateIDCard(length = 12) {
        const nums = '0123456789';
        let out = '';
        for (let i = 0; i < length; i++) {
            // inject 1 letter in the middle to ensure it's not a valid pure numeric ID
            out += nums.charAt(DataProvider.randomInt(0, nums.length - 1));
        }
        return out;
    }

    static generateVNPhone({ withCountryCode = false } = {}) {
        const prefix = VN_PREFIXES[DataProvider.randomInt(0, VN_PREFIXES.length - 1)];
        // prefix length là 3, tổng số di động VN = 10 chữ số (ví dụ 032xxxxxxx)
        const remainLen = 10 - prefix.length; // 7
        let rest = '';
        for (let i = 0; i < remainLen; i++) {
            rest += DataProvider.randomInt(0, 9).toString();
        }
        const numberWith0 = prefix + rest; // ex: "0321234567"
        if (withCountryCode) {
            // chuyển 0xxx... -> +84 xxx...
            return '+84' + numberWith0.slice(1);
        }
        return numberWith0;
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

var dataTest = {
    lastName: `Binh Test${DataProvider.randomInt(0, 10000)}`,
    gender: 'Nam',

    phoneNumber: DataProvider.generateVNPhone(),
    idCard: DataProvider.generateIDCard(),
    assignedTo: {
        id: 5782,
        text: 'new 6'
    },
    product: 'CRC NTB',
    subCamp: 'LG',
    disbursementChannel: 'Cash',
    education: 'Cao đẳng'
}

fs.writeFileSync('./data.json', JSON.stringify(dataTest, null, 2), 'utf-8');
console.log(dataTest);

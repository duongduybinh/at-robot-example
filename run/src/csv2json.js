const path = require('path');
const fs = require('fs');
const csvtojson = require('csvtojson');

// Lấy đường dẫn tuyệt đối tới file cùng thư mục
const inputPath = path.join(__dirname, 'data.csv');
console.log('CSV -> JSON');

(async () => {
    try {
        // Parse CSV → JSON
        const csv = fs.readFileSync(inputPath, 'utf-8');
        console.log('Input', inputPath);
        console.log(csv);
        const jsonArray = await csvtojson({
            colParser: {
                confirmInforConsultation: (item) => {
                    if (!item) return [];
                    return item
                        .split(';')                   // tách theo dấu ';'
                        .map(x => x.trim())           // loại bỏ khoảng trắng dư
                        .filter(x => x.length > 0);   // bỏ phần rỗng
                }
            }
        }).fromString(csv);
        if (!jsonArray || jsonArray.length == 0)
            throw new Error('Không có dữ liệu');

        for (let index = 0; index < jsonArray.length; index++) {
            const json = jsonArray[index];
            const outputPath = path.join(__dirname, json.testType.toLocaleLowerCase() + '-data.json');
            // Ghi ra file JSON
            fs.writeFileSync(outputPath, JSON.stringify(json, null, 2), 'utf-8');
            console.log('Output', outputPath);
            console.log(json);
        }
    } catch (err) {
        console.error('Lỗi khi đọc CSV:', err);
    }
})();

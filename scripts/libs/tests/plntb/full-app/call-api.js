Tester.console.log('Call api');
let testData = Tester.getTestData();
Tester.console.log(`testData: ${JSON.stringify(testData)}`);
Tester.console.log('testData.idCard', testData.idCard);
Tester.console.log('testData.lastName', testData.lastName);

await Tester.asyncEvent.executeAndWait("post.click.relatedListLoad",
    () => {
        Tester.detailView.selectTab('NTB Entry')
    },
    () => {
        Tester.console.log('Select Tab', "NTB Entry");
    },
    () => {
        Tester.console.log('Selected', "NTB Entry");
    }
);

const $row = Tester.detailView.ntbEntry.select(testData.lastName, "SUCCESS").closest('.listViewEntries');
if($row.length <=0)
    throw new Error('Không tim thấy NTB Entry');

const recordId = $row.attr('data-id');

let requestParam ={
    "element": {
        "id": `142x${recordId}`,
        "cf_fecntbentry_laststatuspega": "Pending-Request-FullApp",
        "cf_fecntbentry_laststagepega": "Full App",
        "cf_fecntbentry_loslaststaus": "Processing Full App",
        "cf_fecntbentry_ulosstatus": "Short Application Successed",
        "cf_fecntbentry_pendingrejectreasons": "",
        "cf_fecntbentry_ntbentrystatus": "Active"
    }
}
try {
    var fullUrlApi = Tester.api.getFullUrl('restapi/v1/vtiger/default/revise');
    Tester.console.log('restapi/v1/vtiger/default/revise', fullUrlApi, requestParam);
    const response = await Tester.api
        .post('restapi/v1/vtiger/default/revise', JSON.stringify(requestParam));
    var jsonResponse = await response.json();
    Tester.console.log('restapi/v1/vtiger/default/revise', 'Response', jsonResponse);
    if(!jsonResponse.success)
        throw new Error(`Lỗi cal api ${JSON.stringify(jsonResponse)}`)

} catch (error) {
    Tester.console.error('Call Api', JSON.stringify(error));
    throw error;
}

Tester.detailView.ntbEntry.selectAndOpen(testData.lastName, "SUCCESS")
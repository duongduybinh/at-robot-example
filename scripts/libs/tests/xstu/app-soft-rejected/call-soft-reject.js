Tester.console.log('Application Soft-Rejected');
let testData = Tester.getTestData();

let recordId = new URLSearchParams(window.location.search).get("record");
let requestParam = {
  "element": {
    "id": `91x${recordId}`,
    "cf_fecdataentry_statusforsalescustomer": "Application Soft-Rejected",
    "cf_fecdataentry_loslaststatus": "Full App",
    "cf_fecdataentry_pegastage": "Alternate Stage - Soft-Reject"
  }
}

try {
    Tester.console.log('restapi/v1/vtiger/default/revise', 'Request', requestParam);
    const response = await Tester.api
        .post('restapi/v1/vtiger/default/revise', JSON.stringify(requestParam));
    var jsonResponse = await response.json();
    Tester.console.log('restapi/v1/vtiger/default/revise', 'Response', jsonResponse);

} catch (error) {
    Tester.console.error('Application Soft-Rejected', JSON.stringify(error));
    throw error;
}
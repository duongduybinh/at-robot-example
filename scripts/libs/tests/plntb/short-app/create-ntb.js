Tester.console.log('Create NTB Entry');
let testData = Tester.getTestData();
Tester.console.log(`testData: ${JSON.stringify(testData)}`);
Tester.console.log('testData.idCard', testData.idCard);
Tester.console.log('testData.lastName', testData.lastName);

let recordId = new URLSearchParams(window.location.search).get("record");
let requestParam = {
    "PLNTBCRMID": `60x${recordId}`,
    "NationalID": testData.idCard,
    "FirstName": testData.firstName,
    "MiddleName": "",
    "LastName": testData.lastName,
    "DOB": testData.dob,
    "IssueDate": (new Date()).toISOString().split("T")[0],
    "AppID": recordId,
    "PID": "f5d78dfa-751f-9cf9c16dui8",
    "SocialStatus": "Tri thức",
    "ContractNumber": null,
    "Insurer": null,
    "Premium": null,
    "NumberOfPremiumPerYear": null,
    "EVNBillAmount": null,
    "EVNBillReferenceNumber": null,
    "BikeCapacity": "149",
    "Brand": "123",
    "AssetModel": "3314",
    "FirstRegistrationDate": null,
    "MRCIssuanceDate": "2019-11-21",
    "RemainDoc": 0,
    "VPBAcStatus": "",
    "Documents": [
        {
            "DocumentTypeID": "5",
            "DocID": "1674215",
            "ImageIndex": "1674149#100"
        },
        {
            "DocumentTypeID": "198",
            "DocID": "1674216",
            "ImageIndex": "1674150#100"
        },
        {
            "DocumentTypeID": "199",
            "DocID": "1674217",
            "ImageIndex": "1674151#100"
        }
    ],
    "_version": "v1",
    "_service": "customizer",
    "_operation": "api",
    "_type": "nc_update_customer_info",
    "operation": "nc_update_customer_info"
}
try {
    var fullUrlApi = Tester.api.getFullUrl('restapi/v1/customizer/api/nc_update_customer_info');
    Tester.console.log('nc_update_customer_info', fullUrlApi, requestParam);
    const response = await Tester.api
        .post('restapi/v1/customizer/api/nc_update_customer_info', JSON.stringify(requestParam));
    var jsonResponse = await response.json();
    Tester.console.log('nc_update_customer_info', 'Response', jsonResponse);

} catch (error) {
    Tester.console.error('Create NTB Entry', JSON.stringify(error));
    throw error;
}
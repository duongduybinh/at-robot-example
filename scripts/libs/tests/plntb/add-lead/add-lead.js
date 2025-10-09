let testData = Tester.getTestData();
try {
    $('#FecLead_editView_fieldName_feclead_lastname').val(testData.lastName);
    $('#FecLead_editView_fieldName_feclead_phonenumber').val(testData.phoneNumber);
    $('#FecLead_editView_fieldName_feclead_idcardnumber').val(testData.idCard);
    $('[name="assigned_user_id"]').val(testData.assignedTo.id).trigger('change');
    $('[name="cf_feclead_product"]').val(testData.product).trigger('change');
    if(testData.product === "PL NTB")
        $('[name="cf_feclead_subcampaign"]').val(testData.subCamp).trigger('change');
    $('#EditView').submit();

} catch (error) {
    Tester.console.error(JSON.stringify(error));
    throw error;
}
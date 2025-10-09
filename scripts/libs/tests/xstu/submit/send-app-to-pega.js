
Tester.console.log('Send app to pega');
const testData = Tester.getTestData();



$('[name="cf_fecdataentry_pegaaction"]').val('Submit Application').trigger('change');
$('[name="cf_fecdataentry_gender2"]').val(testData.gender).trigger('change');

await Tester.asyncEvent.executeAndWait("post.dynamicfield.handle",
    () => {
        $('[name="cf_fecdataentry_maritalstatus"]').val(testData.maritalStatus).trigger('change');
    },
    () => {
        Tester.console.log('Marial Status Change');
    },
    () => {
        Tester.console.log('Marial Status Changed to', testData.maritalStatus);
    }
);

$('#FecDataEntry_editView_fieldName_fecdataentry_birthday').datepicker('setDate', new Date( testData.dob));


await Tester.asyncEvent.executeAndWait("post.dynamicfield.handle",
    () => {
        $('[name="cf_fecdataentry_socialstatus"]').val(testData.socialStatus).trigger('change');
    },
    () => {
        Tester.console.log('Social Status Change');
    },
    () => {
        Tester.console.log('Social Status Changed to', testData.maritalStatus);
    }
);



$('[name="cf_fecdataentry_education"]').val(testData.education).trigger('change');
$('#FecDataEntry_editView_fieldName_fecdataentry_idcardnumber2').val(testData.idCard2).trigger('change');

$('#FecDataEntry_editView_fieldName_fecdataentry_dateofissue1').datepicker('setDate', new Date( testData.dateOfIssue1));
$('[name="cf_fecdataentry_placeofissue1"]').val(testData.placeOfIssue1).trigger('change');
$('[name="select_cf_fecdataentry_placeofissue1code"]').val(testData.newPlaceOfIssue1).trigger('change');

$('#FecDataEntry_editView_fieldName_fecdataentry_dateofissue2').datepicker('setDate', new Date( testData.dateOfIssue2));
$('[name="cf_fecdataentry_placeofissue2"]').val(testData.placeOfIssue2).trigger('change');
$('[name="select_cf_fecdataentry_placeofissue2code"]').val(testData.newPlaceOfIssue2).trigger('change');


$('[name="cf_fecntbentry_nationalidplaceissuecode"]').val(testData.nationalIdPlaceIssueCode).trigger('change');
$('[name="select_cf_fecntbentry_nationalidplaceissuecodecode"]').val('579').trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_companyname').val(testData.companyName).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_companytaxcode').val(testData.companyTaxCode).trigger('change');
$('[name="cf_fecntbentry_loanpurpose"]').val(testData.loanPurpose).trigger('change');

$('#fecntbentry_editView_fieldName_cf_fecntbentry_customermonthlynetincome_currency_value').val(testData.monthlyNetIncome).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_customermonthlyexpense_currency_value').val(testData.monthlyExpense).trigger('change');


await Tester.asyncEvent.executeAndWait("Pre.Record.Save",
    () => {
        $('#EditView .saveButton').click();
    },
    () => {
        Tester.console.log('#EditView .saveButton Click');
    },
    () => {
        Tester.console.log('Saved');
    }
);

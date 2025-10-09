
Tester.console.log('Submit short app to pega');
const testData = Tester.getTestData();
await Tester.asyncEvent.executeAndWait("post.dynamicfield.handle",
    () => {
        $('[name="cf_fecntbentry_ulosstatus"]').val('Submit Short Application').trigger('change');
    },
    () => {
        // Tắt các bước trước cũ khi retry
        const $overlayPageContent = $('#overlayPageContent');
        if ($overlayPageContent.length === 0 || !$overlayPageContent.is(':visible'))
            throw new Error('#overlayPageContent chưa tồn tại hoặc chưa hiển thị');
    },
    () => {
        Tester.console.log('Pega ULOS Action Changed to', "Submit Short Application");
    }
);


$('[name="cf_fecntbentry_gender"]').val(testData.gender).trigger('change');
$('[name="cf_fecntbentry_educationid"]').val(testData.education).trigger('change');

await Tester.asyncEvent.executeAndWait("post.dynamicfield.handle",
    () => {
        $('[name="cf_fecntbentry_martialstatus"]').val(testData.maritalStatus).trigger('change');
    },
    () => {
        Tester.console.log('Marial Status Change');
    },
    () => {
        Tester.console.log('Marial Status Changed to', testData.maritalStatus);
    }
);

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

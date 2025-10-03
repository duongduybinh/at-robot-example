(async () => await window.ClassProvider.Tester.runWithRetry(async () => {
    // await Tester.asyncEvent.onceAsync('post.loaded.overLayEditView');
    // Tester.console.log('asyncEvent', "post.loaded.overLayEditView");
    Tester.console.log('Submit short app to pega');
    $('[name="cf_fecntbentry_ulosstatus"]').val('Submit Short Application').trigger('change');
    // Chờ các sự kiện xử lý
    await Tester.asyncEvent.onceAsync("post.dynamicfield.handle");
    Tester.console.log('asyncEvent', "Submit Short Application");

    $('[name="cf_fecntbentry_gender"]').val('Nam').trigger('change');
    $('[name="cf_fecntbentry_educationid"]').val('Cao đẳng').trigger('change');
    $('[name="cf_fecntbentry_martialstatus"]').val('Độc thân').trigger('change');
    await Tester.asyncEvent.onceAsync("post.dynamicfield.handle");
    Tester.console.log('asyncEvent', "Độc thân");

    $('[name="cf_fecntbentry_nationalidplaceissuecode"]').val('TP Hồ Chí Minh-125').trigger('change');
    $('[name="select_cf_fecntbentry_nationalidplaceissuecodecode"]').val('579').trigger('change');
    $('#fecntbentry_editView_fieldName_cf_fecntbentry_companyname').val('FEC').trigger('change');
    $('#fecntbentry_editView_fieldName_cf_fecntbentry_companytaxcode').val('123456').trigger('change');
    $('[name="cf_fecntbentry_loanpurpose"]').val('HHH-MUA PHƯƠNG TIỆN ĐI LẠI/ ĐỒ DÙNG/ TRANG THIẾT BỊ GIA ĐÌNH').trigger('change');

    $('#fecntbentry_editView_fieldName_cf_fecntbentry_customermonthlynetincome_currency_value').val('10000000').trigger('change');
    $('#fecntbentry_editView_fieldName_cf_fecntbentry_customermonthlyexpense_currency_value').val('7000000').trigger('change');
    $('#EditView .saveButton').click();
}))();


(async () => await window.ClassProvider.Tester.runWithRetry(async () => {
    Tester.console.log('Change Sales Stage');
    $("#vtcmplntb_detailView_fieldValue_fld_salestage_3832").click();

    $("#field_vtcmplntb_fld_salestage_3832").val('Theo dõi lần 1').trigger('change');
    await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
    Tester.console.log('asyncEvent', "Dependent Fields Loaded");
    $('.custom-popup').remove()

    $('[name="fld_leadstatus_3838"]').val('Không có nhu cầu').trigger('change');
    await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
    Tester.console.log('asyncEvent', "Không có nhu cầu");

    $('[name="cf_vtcmplntb_childleadstatus"]').val('Không đủ khả năng chi trả').trigger('change');

    $('#saveDependency').click();
    await Tester.asyncEvent.onceAsync("Post.DependencyPopup.Save");

}))();
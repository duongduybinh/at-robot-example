(async () => await window.ClassProvider.Tester.runWithRetry(async () => {
    let testData = Tester.getTestData();
    const $input = $('[name="fld_vtcmplntbname"]');
    if($input.length === 0 || !$input.is(':visible')){
        throw new Error('[name="fld_vtcmplntbname"] chưa tồn tại hoặc chưa hiển thị')
    }

    $input.val(testData.lastName).trigger('change'); 
    $('[data-trigger="listSearch"]').click()
    await Tester.asyncEvent.onceAsync("post.click.listViewFilter");
    Tester.console.log("Filter", testData.lastName, 'submit');
    Tester.listView.selectAndOpen(testData.lastName);

    Tester.console.log("Filter and Select", 'Success');
}))();

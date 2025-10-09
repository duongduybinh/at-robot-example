let testData = Tester.getTestData();

await Tester.asyncEvent.executeAndWait("post.click.listViewFilter",
    () => {
        $('[name="cf_vtcmplntb_originalphonenumber"]').val(testData.phoneNumber).trigger('change');
        $('[name="cf_vtcmplntb_originalidcardnumber"]').val(testData.idCard).trigger('change');
        $('[data-trigger="listSearch"]').click();
    },
    () => {
        const $searchBar = $('#listViewContent .listViewSearchContainer');
        if ($searchBar.length <= 0) {
            $('#listColumnFilterContainer .fa-search').click();
            const $input = $('[name="cf_vtcmplntb_originalphonenumber"]');
            if ($input.length === 0 || !$input.is(':visible')) {
                throw new Error('[name="cf_vtcmplntb_originalphonenumber"] chưa tồn tại hoặc chưa hiển thị')
            }
        }
    },
    () => {
        Tester.console.log("Filter", testData.lastName, 'Loaded');
        Tester.listView.selectAndOpen([
            {selector: '[data-name="cf_vtcmplntb_originalphonenumber"]', value: Tester.masking(testData.phoneNumber,4,3)},
            {selector: '[data-name="cf_vtcmplntb_originalidcardnumber"]', value: Tester.masking(testData.idCard,3,4)}
        ])
    }
);
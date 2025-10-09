let testData = Tester.getTestData();

await Tester.asyncEvent.executeAndWait("post.click.listViewFilter",
    () => {
        $('[name="fld_fecntbentryname"]').val(testData.lastName).trigger('change');
        $('[data-trigger="listSearch"]').click();
    },
    () => {
        const $searchBar = $('#listViewContent .listViewSearchContainer');
        if ($searchBar.length <= 0) {
            $('#listColumnFilterContainer .fa-search').click();
            const $input = $('[name="fld_fecntbentryname"]');
            if ($input.length === 0 || !$input.is(':visible')) {
                throw new Error('[name="fld_fecntbentryname"] chưa tồn tại hoặc chưa hiển thị')
            }
        }
    },
    () => {
        Tester.console.log("Filter", testData.lastName, 'Loaded');
        Tester.listView.selectAndOpen(testData.lastName);
    }
);

Tester.console.log("Filter and Select", 'Success');
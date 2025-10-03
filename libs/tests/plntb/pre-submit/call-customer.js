(async () => await window.ClassProvider.Tester.runWithRetry(async () => {
    window.alert = function (message) {
        console.log("[Alert blocked]:", message);
    };

    $('.cf_vtcmplntb_originalphonenumber a').click();
    Tester.detailView.selectTab('Phone Calls');
    await Tester.asyncEvent.onceAsync("post.click.relatedListLoad");

    let apiUrl = Tester.detailView.getTab('Phone Calls').attr('href');
    const html = await Tester.api.getHtml(apiUrl);
    const $table = $(html).find('#listview-table');

    let count = Tester.detailView.count($table) 
    if(count <= 0)
        throw new Error('Không có Phone Calls')

    Tester.console.log("Select filter", 'Success');
}))();

Tester.detailView.selectTab('Updates');
await Tester.asyncEvent.onceAsync("post.click.relatedListLoad");

Tester.console.log('Check Action', "Webservice", ["Response status changed From Queue To Success", "Response Description changed From Request in Queue To Success"]);
let wls = await Tester.detailView.filterActionLogs("Webservice", ["Response status changed From Queue To Success", "Response Description changed From Request in Queue To Success"], "Action")

if (!(wls && (wls.length > 0))) {
    throw new Error('Không tìm thấy Action "Webservice" ["Response status changed From Queue To Success", "Response Description changed From Request in Queue To Success"]');
}
Tester.console.log("Check Action", 'Success');
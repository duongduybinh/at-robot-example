Tester.detailView.selectTab('Updates');
await Tester.asyncEvent.onceAsync("post.click.relatedListLoad");

Tester.console.log('Check workflow', "send request to LM service", ["Retry updated To Yes", "Response status updated To Queue"]);
let wls = await Tester.detailView.filterActionLogs("send request to LM service", ["Retry updated To Yes", "Response status updated To Queue"], 'Workflow')

if (!(wls && (wls.length > 0))) {
    throw new Error('Không tìm thấy Workflow "send request to LM service" ["Retry updated To Yes", "Response status updated To Queue"]')
}
Tester.console.log("Check Workflow", 'Sucess');
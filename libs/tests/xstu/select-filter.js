(async () => await window.ClassProvider.Tester.runWithRetry(async () => {
    Tester.listView.filter.select('Ngoc Test');
    await Tester.asyncEvent.onceAsync("post.click.listViewFilter");

    Tester.console.log("Select filter", 'Success');
}))();

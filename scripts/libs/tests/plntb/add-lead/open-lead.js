let testData = Tester.getTestData();
try {
    $('[name="feclead_lastname"]').val(testData.lastName)
    $('[data-trigger="listSearch"]').click()
    await Tester.asyncEvent.onceAsync("post.click.listViewFilter");
    Tester.listView.selectAndOpen(testData.lastName);
} catch (error) {
    Tester.console.error(JSON.stringify(error));
    throw error;
}
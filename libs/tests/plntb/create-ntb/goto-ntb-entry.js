(async () => await window.ClassProvider.Tester.runWithRetry(async () => {
    Tester.console.log('asyncEvent', "Check Short App");

    Tester.detailView.ntbEntry.selectAndOpen(Tester.getTestData().lastName, 'SUCCESS');
}))();


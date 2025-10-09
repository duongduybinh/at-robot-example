Tester.console.log("Check Short App PLNTB");

await Tester.asyncEvent.executeAndWait("post.click.relatedListLoad",
    () => {
        Tester.detailView.selectTab('NTB Entry')
    },
    () => {
        Tester.console.log('Select Tab', "NTB Entry");
    },
    () => {
        Tester.console.log('Selected', "NTB Entry");
    }
);

Tester.detailView.ntbEntry.selectAndOpen(Tester.getTestData().lastName, 'SUCCESS');
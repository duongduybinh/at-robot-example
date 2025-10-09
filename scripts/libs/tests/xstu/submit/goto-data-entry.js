Tester.console.log("Go to Data Entry");

await Tester.asyncEvent.executeAndWait("post.click.relatedListLoad",
    () => {
        Tester.detailView.selectTab('Data Entry')
    },
    () => {
        Tester.console.log('Select Tab', "Data Entry");
    },
    () => {
        Tester.console.log('Selected', "Data Entry");
    }
);



Tester.detailView.dataEntry.selectAndOpen(Tester.getTestData().fullName);
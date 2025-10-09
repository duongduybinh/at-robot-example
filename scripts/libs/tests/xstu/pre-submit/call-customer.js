Tester.console.log("Call to Customer");

await Tester.asyncEvent.executeAndWait("post.contacts.loaded.phonelist",
    () => {
        $("#showContactPhones").click()
    },
    () => {
        Tester.console.log('Show Contact Phones')
        const $dependencyForm = $('#showphonenumbers');
        if ($dependencyForm.length > 0 && $dependencyForm.is(':visible'))
            $('#showphonenumbers .close').click();
    },
    async () => {
        Tester.console.log('Show Contact Phones Loaded')
    }
);

await Tester.asyncEvent.executeAndWait("genesys.click2call",
    () => {
        $('#showphonenumbers .listViewEntries a.phoneField').click()
    },
    () => {
        Tester.console.log('Call click')
    },
    async () => {
        Tester.console.log('Call clicked')
    }
);

await Tester.asyncEvent.executeAndWait("post.click.relatedListLoad",
    () => {
        Tester.detailView.selectTab('Phone Calls')
    },
    async () => {
        let apiUrl = Tester.detailView.getTab('Phone Calls').attr('href');
        const html = await Tester.api.getHtml(apiUrl);
        const $table = $(html).find('#listview-table');

        let count = Tester.detailView.count($table)
        if (count <= 0)
            throw new Error('Không có Phone Calls')
    },
    async () => {
        Tester.console.log('Phone Calls Selected')
    }
);

Tester.console.log("Call to Customer", 'Success');
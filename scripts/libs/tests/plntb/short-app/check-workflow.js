Tester.console.log("Check Workflow PLNTB");

await Tester.asyncEvent.executeAndWait("post.click.relatedListLoad",
    () => {
        Tester.detailView.selectTab('Updates')
    },
    async () => {
        let wflogs = await Tester.detailView.getWorkflowLogs();

        Tester.console.log('Workflows', wflogs);
        let wf = wflogs.filter(function (w) {
            if (w.name == "[New Location] [PLNTB][NTB Entry] Submit Short Application") {
                let detail = w.details.filter(function (d) {
                    return d == "Application Status updated To Queued"
                });

                return (detail && detail.length > 0)
            }
            return false;
        });

        if (!(wf && (wf.length > 0))) {
            throw new Error('Không tìm thấy Workflow "[New Location] [PLNTB][NTB Entry] Submit Short Application"');
        }
        Tester.console.log('Select Tab', "Updates");
    },
    () => {
        Tester.console.log("Updates Tab Selected");
    }
);


Tester.console.log("Check Workflow PLNTB", 'Sucess');
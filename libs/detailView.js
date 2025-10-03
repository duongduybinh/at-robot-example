console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'detailView.js')
class DetailView {
    constructor() {

    }

    getTab(tabName) {
        let $tabHeader = $('#detailViewtabs li.vtTab .vtTabHeader').filter(function () {
            return $(this).text() === tabName;
        });

        return $tabHeader.closest('a');
    }

    selectTab(tabName) {
        let $tab = this.getTab(tabName);
        $tab.click();
        return $tab;
    }

    openTab(tabName) {
        let $tab = this.getTab(tabName);
        let url = $tab.attr('href');
        window.location.href = Tester.api.getFullUrl(url);
        return $tab;
    }

    getUpdateLogs = async () => {
        // Lấy thông tin url để lấy update log
        let apiUrl = Tester.detailView.getTab('Updates').attr('href');
        try {
            Tester.console.log(apiUrl);
            const html = await Tester.api.getHtml(apiUrl);
            if(!html)
                return [];
            let $html = $(html);
            let logs = $html.find('.history .updates_timeline > li').map((i, el) => {
                let $el = $(el);
                // lấy action
                let $header = $el.find('.updateHeaderInfoText');
                let action = $header.text().replace(/\s+/g, ' ').trim();
                // nếu cùng 1 el có cả 2 class -> bỏ qua details
                Tester.console.log('hasClass', $header.length, $header.hasClass('updateInfoContainer'));
                if ($header.length && $header.hasClass('updateInfoContainer')) {
                    return {
                        action: action,
                        details: []
                    };
                }

                let actionDetails = $el.find('.updateInfoContainer').map((ii, elDetail) => {
                    // Tester.console.info(elDetail);
                    return $(elDetail).text().replace(/\s+/g, ' ').trim();
                });

                return {
                    action: action,
                    details: Array.from({ length: actionDetails.length }, (_, i) => actionDetails[i])
                }
            });
            logs = Array.from({ length: logs.length }, (_, i) => logs[i])
            Tester.console.log('DetailView.getUpdateLog', logs);
            return logs;
        } catch (error) {
            Tester.console.error('DetailView.getUpdateLog', error);
            return [];
        }
    }

    parseToActionLogs = (log) => {
        const patterns = [
            // Pattern 1: Workflow <name> has <status> the record via task <task>
            /^(Workflow)\s+(.+?)\s+has\s+(\w+)\s+the\s+record\s+via\s+task\s+(.+)$/i,

            // Pattern 2: Workflow <name> <status> via task <task>
            /^(Workflow)\s+(.+?)\s+(\w+)\s+via task\s+(.+)$/i,

            // Pattern 3: <Entity> <name> <status> (ví dụ Webservice updated)
            // /^(\w+)\s+(.+?)\s+(\w+)$/i
            /^(.+?)\s+(\w+)$/i
        ];

        let match = log.action.match(patterns[0]);
        if (match) {
            return {
                type: match[1]?.trim() || null,
                name: match[2]?.trim() || null,
                status: match[3]?.trim().toLowerCase() || null,
                task: match[4]?.trim() || null,
                details: log.details,
                raw: log.action,
                regex: patterns[0]
            };
        }

        match = log.action.match(patterns[1]);
        if (match) {
            return {
                type: match[1]?.trim() || null,
                name: match[2]?.trim() || null,
                status: match[3]?.trim().toLowerCase() || null,
                task: match[4]?.trim() || null,
                details: log.details,
                raw: log.action,
                regex: patterns[1]
            };
        }

        match = log.action.match(patterns[2]);
        if (match) {
            return {
                type: 'Action',
                name: match[1].trim(),
                status: match[2].trim().toLowerCase(),
                task: null,
                details: log.details,
                raw: log.action,
                regex: patterns[2]
            };
        }

        // fallback: unknown
        return {
            type: "Unknown",
            name: log.action,
            details: log.details,
            raw: log.action,
            regex: null
        };
    }

    getActionLogs = async () => {
        let logs = await this.getUpdateLogs();
        Tester.console.log('DetailView.getEntityLogs', 'logs', logs);

        return logs.map(log => {
            Tester.console.log('DetailView.getEntityLogs', 'logs.map', log);

            return this.parseToActionLogs(log);
        });
    }

    getWorkflowLogs = async () => {
        let logs = await this.getActionLogs();
        Tester.console.log('DetailView.getWorkflowLogs', 'logs', logs);
        return logs.filter(log => log.type == 'Workflow'); // bỏ những phần tử null
    }

    filterActionLogs = async (name, details, type) => {
        let logs = await this.getActionLogs();

        // lọc theo type (nếu có)
        let filteredLogs = type ? logs.filter(log => log.type === type) : logs;

        // lọc theo name (nếu có)
        filteredLogs = name ? filteredLogs.filter(log => log.name === name) : filteredLogs;

        // nếu không có details hoặc rỗng -> return
        if (!details || details.length === 0) {
            return filteredLogs;
        }

        // lọc các log mà log.details chứa toàn bộ details truyền vào
        return filteredLogs.filter(log =>
            details.every(d => {
                const result = Array.isArray(log.details) && log.details.includes(d);
                console.log('Check detail:', d, result, log.details);
                return result;
            })
        );
    };

    count = ($table) => {
        if ($table.hasClass('listview-table-norecords'))
            return 0;
        return $table.find('tbody tr.listViewEntries').length;
    }

    ntbEntry = {
        count: () => {
            let $table = $('#listview-table');

            if ($table.hasClass('listview-table-norecords'))
                return 0;
            return $table.find('tbody tr.listViewEntries').length;
        },
        select: (entryname, appDescription) => {
            return $('#listview-table [data-name="fld_fecntbentryname"] a').filter(function () {
                if ($(this).text() === entryname) {
                    return ($(this).closest('tr').find('[data-name="cf_fecntbentry_applicationdescription"]').text() === appDescription);
                }
                return false;
            });
        },
        selectAndOpen: (entryname, appDescription) => {
            let $select = this.ntbEntry.select(entryname, appDescription);
            if ($select.length == 0) {
                Tester.console.error(`Không tìm thấy NTB Entry(${entryname}) trong list`);
                return;
            }

            let href = $select.attr('href');
            let fullUrl = Tester.api.getFullUrl(href);
            Tester.console.log('DetailView', 'selectAndOpen', fullUrl);
            window.location.href = fullUrl;
            return $select;
        }
    }

}

window.ClassProvider.DetailView = DetailView;
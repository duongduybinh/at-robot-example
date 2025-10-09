console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'listView.js')
class ListView {
    constructor() {
        this.filter = new ClassProvider.Filter();
        this.filter.preventHover();
    }

    count($table) {
        $table = $table ?? $('#listViewContent #listview-table');
        if ($table.hasClass('listview-table-norecords'))
            return 0;
        return $table.find('tbody tr.listViewEntries').length;
    }

    select(filterValue, $table) {
        $table = $table ?? $('#listViewContent #listview-table');
        const $rows = $table.find('.listViewEntries');
        Tester.console.log(!(filterValue instanceof Array));
        if (!(filterValue instanceof Array))
            return $rows.find('.value').filter(
                function () { return $(this).text().trim() == filterValue; }
            ).closest('.listViewEntries');
        return $rows.filter(
            function () {
                return filterValue.every(fv => {
                    const { selector, value } = fv;
                    Tester.console.log(selector, value);
                    Tester.console.log($(this).find($(selector)));
                    return $(this).find($(selector)).text().trim() == value
                });
            });

        return $table.find('.listViewEntryValue a').filter(function () {
            return $(this).text() === offerName;
        });
    }

    selectAndOpen(filterValue, $table) {
        let $select = this.select(filterValue, $table);
        if ($select.length == 0) {
            Tester.console.error(`Không tìm thấy Offer Name(${filterValue}) trong list`);
            throw new Error(`Không tìm thấy Offer Name(${filterValue}) trong list`);
        }

        let href = $select.find('.listViewEntryValue a').attr('href');
        let fullUrl = Tester.api.getFullUrl(href);

        window.location.href = fullUrl;
    }
}

window.ClassProvider.ListView = ListView;

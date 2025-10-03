console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'listView.js')
class ListView {
    constructor() {
        this.filter = new ClassProvider.Filter();
        this.filter.preventHover();
    }

    count($table){
        $table = $table ?? $('#listViewContent #listview-table');
        if($table.hasClass('listview-table-norecords'))
            return 0;
        return $table.find('tbody tr.listViewEntries').length;
    }

    select(offerName,$table) {
        $table = $table ?? $('#listViewContent #listview-table');
        return $table.find('.listViewEntryValue a').filter(function(){
            return $(this).text() === offerName;
        });
    }

    selectAndOpen(offerName, $table){
        let $select = this.select(offerName, $table);
        if($select.length == 0){
            Tester.console.error(`Không tìm thấy Offer Name(${offerName}) trong list`);
            return;
        }
        
        let href = $select.attr('href');
        let fullUrl = Tester.api.getFullUrl(href);
        
        window.location.href = fullUrl;
    }
}

window.ClassProvider.ListView = ListView;

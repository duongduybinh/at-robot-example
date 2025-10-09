Tester.detailView.selectTab('PL NTB');
await Tester.asyncEvent.onceAsync("post.click.relatedListLoad");
let apiUrl = Tester.detailView.getTab('PL NTB').attr('href');
const html = await Tester.api.getHtml(apiUrl);
const $table = $(html).find('#listview-table');

let count = Tester.detailView.count($table)
if (count <= 0)
    throw new Error('Không có PL NTB')

Tester.console.log("Check PL NTB", 'Sucess');

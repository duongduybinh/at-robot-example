Tester.console.log('Check Pega Info');

await Tester.asyncEvent.executeAndWait("post.click.relatedListLoad",
    () => {
        Tester.detailView.selectTab('Details')
    },
    () => {
        Tester.console.log('Select Tab', "Details");
    },
    () => {
        Tester.console.log('Selected', "Details");
    }
);



const $appCode = $('#fecntbentry_detailView_fieldValue_cf_fecntbentry_applicationcode')
if($appCode.length <=0 )
    throw new Error("Không tìm thấy Pega Info ");

const $appCodeValue = $appCode.find('[data-field-name="cf_fecntbentry_applicationcode"]');
if($appCodeValue.length <=0 )
    throw new Error('Pega Info chưa có thông tin')

const appCode = $appCode.find('[data-field-name="cf_fecntbentry_applicationcode"]').text().trim();
if(appCode && appCode == '')
    throw new Error('Pega Info chưa có thông tin');



await Tester.asyncEvent.sleep(500);

Tester.page.scrollIntoView($appCode[0])

const appStatus = $('[data-field-name="cf_fecntbentry_applicationstatus"]').text().trim();

if(appStatus !== 'Success')
    throw new Error('App Status ' + appStatus);

await Tester.asyncEvent.sleep(500);

Tester.console.log('Check Pega Info', "Success");
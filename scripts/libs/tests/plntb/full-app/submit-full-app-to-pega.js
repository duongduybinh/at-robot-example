
Tester.console.log('Submit short app to pega');
const testData = Tester.getTestData();

await Tester.asyncEvent.executeAndWait("post.ajaxedit.handle",
    () => {
        $('#headerForm [data-field-name="cf_fecntbentry_ulosstatus"]').click();
    },
    async () => {
        // Tắt các bước trước cũ khi retry
        const $dependencyForm = $('#dependencyFormSave');
        if ($dependencyForm.length > 0 && $dependencyForm.is(':visible'))
            $('#dependencyFormSave .close').click();

        const $ulosstatus = $('#headerForm [data-field-name="cf_fecntbentry_ulosstatus"]');

        const $cancelField = $ulosstatus.closest('.fieldValue').find('.input-group-addon-cancel');
        if ($cancelField.length > 0 && $cancelField.is(':visible')) {
            await Tester.asyncEvent.executeAndWait("post.ajaxedit.cancel",
                () => {
                    $cancelField.click();
                },
                () => {
                    Tester.console.log('Field Reset')
                },
                async () => {
                    Tester.console.log('Field Reseted')
                }
            );
        }

        Tester.console.log('Pega ULOS Action Click')
    },
    () => {
        Tester.console.log('Pega ULOS Action Clicked')
    }
);

await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
    () => {
        $('[name="cf_fecntbentry_ulosstatus"]').val('Submit Full Application').trigger('change');
    },
    () => {
        Tester.console.log('Pega ULOS Action Change to', 'Submit Full Application')
    },
    async () => {
        Tester.console.log('Pega ULOS Action Changed to', 'Submit Full Application');
        await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
        Tester.console.log('asyncEvent', "Dependent Fields Loaded");
        $('.custom-popup').remove()
    }
);

$('#fecntbentry_editView_fieldName_cf_fecntbentry_companyphonenumber').val(testData.companyPhoneNumber).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_yearinpresentjob').val(testData.yearInPresentJob).trigger('change');
$('[name="cf_fecntbentry_position"]').val(testData.position).trigger('change');



await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
    () => {
        $('[name="cf_fecntbentry_currenthousetype"]').val(testData.currentHouseType).trigger('change');
        $('[name="cf_fecntbentry_permanenthousetype"]').val(testData.permanentHouseType).trigger('change');
    },
    () => {
        Tester.console.log('Current Location Change')
    },
    async () => {
        $('[name="cf_fecntbentry_currentprovincecity"]').val(testData.currentProvince).trigger('change');
        $('[name="cf_fecntbentry_currentdistricttown"]').val(testData.currentDistrict).trigger('change');
        $('[name="cf_fecntbentry_currentward"]').val(testData.currentWard).trigger('change');
    }
);

$('#fecntbentry_editView_fieldName_cf_fecntbentry_currentstreethamlet').val(testData.currentStreet).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_currenthousenumber').val(testData.currentHouseNumber).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_currentprovincecode').val(testData.currentProvince).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_currentwardcode').val(testData.currentWard).trigger('change');

$('[name="cf_fecntbentry_permanentprovincecity"]').val(testData.permanentProvince).trigger('change');
$('[name="cf_fecntbentry_permanentdistricttown"]').val(testData.permanentDistrict).trigger('change');
$('[name="cf_fecntbentry_permanentward"]').val(testData.permanentWard).trigger('change');

$('#fecntbentry_editView_fieldName_cf_fecntbentry_permanentprovincecode').val(testData.newPermanentProvince).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_permanentwardcode').val(testData.newPermanentWard).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_permanentstreethamlet').val(testData.permanentStreet).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_permanenthousenumber').val(testData.permanentHouseNumber).trigger('change');

$('[name="cf_fecntbentry_officeprovincecity"]').val(testData.officeProvince).trigger('change');
$('[name="cf_fecntbentry_officedistricttown"]').val(testData.officeDistrict).trigger('change');
$('[name="cf_fecntbentry_officeward"]').val(testData.officeWard).trigger('change');

$('#fecntbentry_editView_fieldName_cf_fecntbentry_officeprovincecode').val(testData.newOfficeProvince).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_officewardcode').val(testData.newOfficeWard).trigger('change');

$('#fecntbentry_editView_fieldName_cf_fecntbentry_officestreethamlet').val(testData.officeStreet).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_officehousenumber').val(testData.officeHouseNumber).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_permanentprovincename').val(testData.permanentProvince).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_currentwardname').val(testData.currentWard).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_permanentwardname').val(testData.permanentWard).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_currentprovincename').val(testData.currentProvince).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_officeprovincename').val(testData.officeProvince).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_officewardname').val(testData.officeWard).trigger('change');
$('[name="cf_fecntbentry_referencerelation"]').val(testData.referenceRelation).trigger('change');

$('#fecntbentry_editView_fieldName_cf_fecntbentry_lastname1').val(testData.relationLastName).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_firstname1').val(testData.relationFirstName).trigger('change');
$('#fecntbentry_editView_fieldName_cf_fecntbentry_phonenumber1').val(testData.relationPhoneNumber).trigger('change');


await Tester.asyncEvent.executeAndWait("Post.DependencyPopup.Save",
    () => {
        $('#saveDependency').click();
    },
    () => {
        Tester.console.log('#saveDependency Click');
    },
    () => {
        Tester.console.log('Saved');
    }
);

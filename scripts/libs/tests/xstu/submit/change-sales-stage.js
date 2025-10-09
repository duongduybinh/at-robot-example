Tester.console.log('Change Sales Stage');
let testData = Tester.getTestData();

await Tester.asyncEvent.executeAndWait("post.ajaxedit.handle",
    () => {
        $("#vtcmcrcxstu_detailView_fieldValue_cf_vtcmcrcxstu_salesstage").click();
    },
    async () => {
        // Tắt các bước trước cũ khi retry
        const $dependencyForm = $('#dependencyFormSave');
        if ($dependencyForm.length > 0 && $dependencyForm.is(':visible'))
            $('#dependencyFormSave .close').click();
        const $cancelField = $("#vtcmcrcxstu_detailView_fieldValue_cf_vtcmcrcxstu_salesstage .input-group-addon-cancel");
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

    },
    () => {
        Tester.console.log('Sales Stage Clicked')
    }
);

await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
    () => {
        $("#field_vtcmcrcxstu_cf_vtcmcrcxstu_salesstage").val('Xử lý').trigger('change');
    },
    () => {
        Tester.console.log('Sales Stage Change to Xử lý')
    },
    async () => {
        Tester.console.log('Sales Stage Changed')
        await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
        Tester.console.log('asyncEvent', "Dependent Fields Loaded");
        $('.custom-popup').remove()
    }
);


$('[name="cf_vtcmcrcxstu_leadstatus"]').val('Chuyển giao cho CC POS').trigger('change');
$('[name="cf_vtcmcrcxstu_consenttoopenubankaccount"]').val('No').trigger('change');
$('#vtcmcrcxstu_PicklistPopupAction_fieldName_cf_vtcmcrcxstu_confirminforconsultation')
    .val(testData.confirmInforConsultation)
    .trigger('change')


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

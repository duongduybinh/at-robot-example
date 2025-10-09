Tester.console.log('Change Sales Stage');

await Tester.asyncEvent.executeAndWait("post.ajaxedit.handle",
    () => {
        $('#vtcmcrcxstu_detailView_fieldValue_cf_vtcmcrcxstu_salesstage').click();
    },
    async () => {
        // Tắt các bước trước cũ khi retry
        const $dependencyForm = $('#dependencyFormSave');
        if ($dependencyForm.length > 0 && $dependencyForm.is(':visible'))
            $('#dependencyFormSave .close').click();

        const $field = $('#vtcmcrcxstu_detailView_fieldValue_cf_vtcmcrcxstu_salesstage');

        const $cancelField = $field.find('.input-group-addon-cancel');
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

        Tester.console.log('Sales Status Click')
    },
    () => {
        Tester.console.log('Sales Status Clicked')
    }
);

await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
    () => {
        $('[name="cf_vtcmcrcxstu_salesstage"]').val('Theo dõi lần 1').trigger('change');
    },
    () => {
        Tester.console.log('Sales Status Change to', 'Theo dõi lần 1')
    },
    async () => {
        Tester.console.log('Sales Status Changed to', 'Theo dõi lần 1');
        await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
        Tester.console.log('asyncEvent', "Dependent Fields Loaded");
        $('.custom-popup').remove()
    }
);

$('[name="cf_vtcmcrcxstu_leadstatus"]').val('Không có nhu cầu').trigger('change');
$('[name="cf_vtcmcrcxstu_childleadstatus"]').val('Không đủ khả năng chi trả').trigger('change');

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

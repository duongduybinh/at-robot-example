Tester.console.log('Change Sales Stage');
let testData = Tester.getTestData();

await Tester.asyncEvent.executeAndWait("post.ajaxedit.handle",
    () => {
        $("#vtcmplntb_detailView_fieldValue_fld_salestage_3832").click();
    },
    async () => {
        // Tắt các bước trước cũ khi retry
        const $dependencyForm = $('#dependencyFormSave');
        if ($dependencyForm.length > 0 && $dependencyForm.is(':visible'))
            $('#dependencyFormSave .close').click();
        const $cancelField = $("#vtcmplntb_detailView_fieldValue_fld_salestage_3832 .input-group-addon-cancel");
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
        $("#field_vtcmplntb_fld_salestage_3832").val('Xử lý').trigger('change');
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

await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
    () => {
        $('[name="fld_leadstatus_3838"]').val('Chuyển hồ sơ qua hệ thống LOS').trigger('change');
    },
    () => {
        Tester.console.log('Lead Status Change to', "Chuyển hồ sơ qua hệ thống LOS");
    },
    () => {
        Tester.console.log('Lead Status Changed');
    }
);


// $('[name="cf_vtcmplntb_disbursementchannel"]').val('Cash').trigger('change');
// await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
// Tester.console.log('asyncEvent', "Cash");
if (testData.product === "PL NTB")
    await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
        () => {
            $('[name="cf_vtcmplntb_disbursementchannel"]').val(testData.disbursementChannel).trigger('change');
        },
        () => {
            Tester.console.log('Disbursement channel Change to', testData.disbursementChannel);
        },
        () => {
            Tester.console.log('Disbursement channel Changed');
        }
    );

$('#vtcmplntb_editView_fieldName_cf_vtcmplntb_tenure').val(testData.finalTenor).trigger('change');
$('#vtcmplntb_editView_fieldName_cf_vtcmplntb_requestedamount_currency_value').val(testData.requestAmount).trigger('change');
$('#vtcmplntb_PicklistPopupAction_fieldName_cf_vtcmplntb_confirminforconsultation')
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

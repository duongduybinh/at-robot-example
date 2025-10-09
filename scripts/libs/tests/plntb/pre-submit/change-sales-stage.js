Tester.console.log('Change Sales Stage');

await Tester.asyncEvent.executeAndWait("post.ajaxedit.handle",
    () => {
        $("#vtcmplntb_detailView_fieldValue_fld_salestage_3832").click();
    },
    async () => {
        Tester.console.log('Sales Stage Click')

    },
    () => {
        Tester.console.log('Sales Stage Clicked')
    }
);

await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
    () => {
        $("#field_vtcmplntb_fld_salestage_3832").val('Theo dõi lần 1').trigger('change');
    },
    () => {
        Tester.console.log('Sales Stage Change to Theo dõi lần 1')
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
        $('[name="fld_leadstatus_3838"]').val('Không có nhu cầu').trigger('change');
    },
    () => {
        Tester.console.log('Lead status change', "Không có nhu cầu");
    },
    () => {
        Tester.console.log('Lead status Changed');
        $('[name="cf_vtcmplntb_childleadstatus"]').val('Không đủ khả năng chi trả').trigger('change');
    }
);

await Tester.asyncEvent.executeAndWait("dependency.dependency.dynamic.popup.popup.shown.shown",
    () => {
        $('[name="fld_leadstatus_3838"]').val('Không có nhu cầu').trigger('change');
    },
    () => {
        Tester.console.log('Lead status change', "Không có nhu cầu");
    },
    () => {
        Tester.console.log('Lead status Changed');
    }
);

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

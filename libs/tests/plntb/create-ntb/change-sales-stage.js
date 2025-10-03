Tester.console.log('Change Sales Stage');
$("#vtcmplntb_detailView_fieldValue_fld_salestage_3832").click();
$("#vtcmplntb_editView_fieldName_fld_meetingdate").datepicker({"disabled": true});
$("#vtcmplntb_editView_fieldName_cf_vtcmplntb_meetingtime").datepicker("option", "disabled", true);

$("#field_vtcmplntb_fld_salestage_3832").val('Xử lý').trigger('change');
await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
Tester.console.log('asyncEvent', "Dependent Fields Loaded");
$('.custom-popup').remove()

$('[name="fld_leadstatus_3838"]').val('Chuyển hồ sơ qua hệ thống LOS').trigger('change');
await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
Tester.console.log('asyncEvent', "Chuyển hồ sơ qua hệ thống LOS");

// $('[name="cf_vtcmplntb_disbursementchannel"]').val('Cash').trigger('change');
// await Tester.asyncEvent.onceAsync("dependency.dependency.dynamic.popup.popup.shown.shown");
// Tester.console.log('asyncEvent', "Cash");

$('#vtcmplntb_editView_fieldName_cf_vtcmplntb_tenure').val(6).trigger('change');
$('#vtcmplntb_editView_fieldName_cf_vtcmplntb_requestedamount_currency_value').val(20000000).trigger('change');
$('#vtcmplntb_PicklistPopupAction_fieldName_cf_vtcmplntb_confirminforconsultation')
    .val(['1- Số tiền cấp tín dụng / khoản cấp tín dụng', '2- Thời hạn HĐ', '3- Số tiền góp',
        '4- Lãi suất', '5- Bảo hiểm khoản cấp tín dụng', '6- Phí tất toán HĐ trước hạn',
        '7- Phí trễ hạn', '8- Phí xử lý giao dịch',
        '9- Hướng dẫn KH đọc kĩ thông tin HĐ', '10- Nhắc số tiền góp có thể chênh lệch kì đầu/cuối',
        '11- Không tốn phí khi làm hồ sơ (trước và sau giải ngân)',
        '12- Ngày thanh toán:Tư vấn theo kịch bản+lưu ý nếu KH có thẻ tín dụng FEC/khoản tín dụng qua thẻ'])
    .trigger('change')

$('#saveDependency').click();
await Tester.asyncEvent.onceAsync("Post.DependencyPopup.Save");
Tester.console.log('asyncEvent', "Post.DependencyPopup.Save");

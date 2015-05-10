// GetUserID() is in the portlet settings in order to get
// the @@UserID from logged in user.

function numbersOnly(source) {
    var strOut = new String(source);
    strOut = strOut.replace(/[^0-9]/g, '');
    return strOut;
}
function ensPhoneValidation() {
    var ensPhone = $('#ENS_SELF_CELL').val();
    var phonefilter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phonefilter.test(ensPhone)) {
        $('#ENS_SELF_CELL').css('border', '3px #C33 solid');
        return false;
    } else {
        $('#ENS_SELF_CELL').css('border', '3px #090 solid');
        return true;
    }
}
function ensEmailValidation() {
    var ensEmail = $('#ENS_EMAIL').val();
    var emailfilter = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (!emailfilter.test(ensEmail)) {
        $('#ENS_EMAIL').css('border', '3px #C33 solid');
        return false;
    } else {
        $('#ENS_EMAIL').css('border', '3px #090 solid');
        return true;
    }
}
function iceNameValidation() {
    var iceName = $('#ICE_NAME').val();
    var icenamefilter = /^[A-Za-z\.\s]{3,}$/;
    if (!icenamefilter.test(iceName)) {
        $('#ICE_NAME').css('border', '3px #C33 solid');
        return false;
    } else {
        $('#ICE_NAME').css('border', '3px #090 solid');
        return true;
    }
}
function icePhone1Validation() {
    var icePhone = $('#ICE_PHONE1').val();
    var trimPhone = numbersOnly(icePhone);
    if (trimPhone.length < 10) {
        $('#ICE_PHONE1').css('border', '3px #C33 solid');
        return false;
    } else {
        $('#ICE_PHONE1').css('border', '3px #090 solid');
        return true;
    }
}
function icePhone2Validation() {
    var icePhone2 = $('#ICE_PHONE2').val();
    if(icePhone2.length == 0) {
        $('#ICE_PHONE2').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(icePhone2);
        if (trimPhone.length < 10) {
            $('#ICE_PHONE2').css('border', '3px #C33 solid');
            return false;
        } else {
            if(icePhone2.length == 0)
                $('#ICE_PHONE2').css('border', '3px #ccc solid');
            else
                $('#ICE_PHONE2').css('border', '3px #090 solid');
            return true;
        }
    }
}
function icePhone3Validation() {
    var icePhone3 = $('#ICE_PHONE3').val();
    if(icePhone3.length == 0) {
        $('#ICE_PHONE3').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(icePhone3);
        if (trimPhone.length < 10) {
            $('#ICE_PHONE3').css('border', '3px #C33 solid');
            return false;
        } else {
            if(icePhone3.length == 0)
                $('#ICE_PHONE3').css('border', '3px #ccc solid');
            else
                $('#ICE_PHONE3').css('border', '3px #090 solid');
            return true;
        }
    }
}
function ice2NameValidation() {
    var ice2Name = $('#ICE2_NAME').val();
    if(ice2Name.length == 0)
        var ice2Namefilter = /^$/;
    else
        var ice2Namefilter = /^[A-Za-z\s]{3,}$/;
    if (!ice2Namefilter.test(ice2Name)) {
        $('#ICE2_NAME').css('border', '3px #C33 solid');
        return false;
    } else {
        if(ice2Name.length == 0)
            $('#ICE2_NAME').css('border', '3px #ccc solid');
        else
            $('#ICE2_NAME').css('border', '3px #090 solid');
        return true;
    }
}
function ice2Phone1Validation() {
    var ice2Phone1 = $('#ICE2_PHONE1').val();
    if(ice2Phone1.length == 0) {
        $('#ICE2_PHONE1').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(ice2Phone1);
        if (trimPhone.length < 10) {
            $('#ICE2_PHONE1').css('border', '3px #C33 solid');
            return false;
        } else {
            if(ice2Phone1.length == 0)
                $('#ICE2_PHONE1').css('border', '3px #ccc solid');
            else
                $('#ICE2_PHONE1').css('border', '3px #090 solid');
            return true;
        }
    }
}
function ice2Phone2Validation() {
    var ice2Phone2 = $('#ICE2_PHONE2').val();
    if(ice2Phone2.length == 0) {
        $('#ICE2_PHONE2').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(ice2Phone2);
        if (trimPhone.length < 10) {
            $('#ICE2_PHONE2').css('border', '3px #C33 solid');
            return false;
        } else {
            if(ice2Phone2.length == 0)
                $('#ICE2_PHONE2').css('border', '3px #ccc solid');
            else
                $('#ICE2_PHONE2').css('border', '3px #090 solid');
            return true;
        }
    }
}
function ice2Phone3Validation() {
    var ice2Phone3 = $('#ICE2_PHONE3').val();
    if(ice2Phone3.length == 0) {
        $('#ICE2_PHONE3').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(ice2Phone3);
        if (trimPhone.length < 10) {
            $('#ICE2_PHONE3').css('border', '3px #C33 solid');
            return false;
        } else {
            if(ice2Phone3.length == 0)
                $('#ICE2_PHONE3').css('border', '3px #ccc solid');
            else
                $('#ICE2_PHONE3').css('border', '3px #090 solid');
            return true;
        }
    }
}
function mis1NameValidation() {
    var ice2Name = $('#MIS1_NAME').val();
    var ice2Namefilter = /^[A-Za-z\s]{3,}$/;
    if (!ice2Namefilter.test(ice2Name)) {
        $('#MIS1_NAME').css('border', '3px #C33 solid');
        return false;
    } else {
        if(ice2Name.length == 0)
            $('#MIS1_NAME').css('border', '3px #ccc solid');
        else
            $('#MIS1_NAME').css('border', '3px #090 solid');
        return true;
    }
}
function mis1Phone1Validation() {
    var ice2Phone3 = $('#MIS1_PHONE1').val();
    var trimPhone = numbersOnly(ice2Phone3);
    if (trimPhone.length < 10) {
            $('#MIS1_PHONE1').css('border', '3px #C33 solid');
        return false;
    } else {
    if(ice2Phone3.length == 0)
        $('#MIS1_PHONE1').css('border', '3px #ccc solid');
    else
        $('#MIS1_PHONE1').css('border', '3px #090 solid');
    return true;
    }

}
function mis1Phone2Validation() {
    var ice2Phone3 = $('#MIS1_PHONE2').val();
    if(ice2Phone3.length == 0) {
        $('#MIS1_PHONE2').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(ice2Phone3);
        if (trimPhone.length < 10) {
            $('#MIS1_PHONE2').css('border', '3px #C33 solid');
            return false;
        } else {
            if(ice2Phone3.length == 0)
                $('#MIS1_PHONE2').css('border', '3px #ccc solid');
            else
                $('#MIS1_PHONE2').css('border', '3px #090 solid');
            return true;
        }
    }
}
function mis1Phone3Validation() {
    var ice2Phone3 = $('#MIS1_PHONE3').val();
    if(ice2Phone3.length == 0) {
        $('#MIS1_PHONE3').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(ice2Phone3);
        if (trimPhone.length < 10) {
            $('#MIS1_PHONE3').css('border', '3px #C33 solid');
            return false;
        } else {
            if(ice2Phone3.length == 0)
                $('#MIS1_PHONE3').css('border', '3px #ccc solid');
            else
                $('#MIS1_PHONE3').css('border', '3px #090 solid');
            return true;
        }
    }
}
function mis2NameValidation() {
    var ice2Name = $('#MIS2_NAME').val();
    if(ice2Name.length == 0)
        var ice2Namefilter = /^$/;
    else
        var ice2Namefilter = /^[A-Za-z\s]{3,}$/;
    if (!ice2Namefilter.test(ice2Name)) {
        $('#MIS2_NAME').css('border', '3px #C33 solid');
        return false;
    } else {
        if(ice2Name.length == 0)
            $('#MIS2_NAME').css('border', '3px #ccc solid');
        else
            $('#MIS2_NAME').css('border', '3px #090 solid');
        return true;
    }
}
function mis2Phone1Validation() {
    var ice2Phone3 = $('#MIS2_PHONE1').val();
    if(ice2Phone3.length == 0) {
        $('#MIS2_PHONE1').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(ice2Phone3);
        if (trimPhone.length < 10) {
            $('#MIS2_PHONE1').css('border', '3px #C33 solid');
            return false;
        } else {
            if(ice2Phone3.length == 0)
                $('#MIS2_PHONE1').css('border', '3px #ccc solid');
            else
                $('#MIS2_PHONE1').css('border', '3px #090 solid');
            return true;
        }
    }
}
function mis3NameValidation() {
    var ice2Name = $('#MIS3_NAME').val();
    if(ice2Name.length == 0)
        var ice2Namefilter = /^$/;
    else
        var ice2Namefilter = /^[A-Za-z\s]{3,}$/;
    if (!ice2Namefilter.test(ice2Name)) {
        $('#MIS3_NAME').css('border', '3px #C33 solid');
        return false;
    } else {
        if(ice2Name.length == 0)
            $('#MIS3_NAME').css('border', '3px #ccc solid');
        else
            $('#MIS3_NAME').css('border', '3px #090 solid');
        return true;
    }
}
function mis3Phone1Validation() {
    var ice2Phone3 = $('#MIS3_PHONE1').val();
    if(ice2Phone3.length == 0) {
        $('#MIS3_PHONE1').css('border', '3px #ccc solid');
        return true;
    } else {
        var trimPhone = numbersOnly(ice2Phone3);
        if (trimPhone.length < 10) {
            $('#MIS3_PHONE1').css('border', '3px #C33 solid');
            return false;
        } else {
            if(ice2Phone3.length == 0)
                $('#MIS3_PHONE1').css('border', '3px #ccc solid');
            else
                $('#MIS3_PHONE1').css('border', '3px #090 solid');
            return true;
        }
    }
}

// Bind onBlur event handlers to each field to validate
// as people fill out the form
function initializeHandlers() {
    $.mask.definitions['8']='[23456789]';
    $('#ENS_SELF_CELL').blur(ensPhoneValidation);
    $('#ENS_SELF_CELL').mask("899-999-9999");
    $('#ENS_EMAIL').blur(ensEmailValidation);
    $('#ICE_NAME').blur(iceNameValidation);
    $('#ICE_PHONE1').blur(icePhone1Validation);
    $('#ICE_PHONE1').mask("899-999-9999");
    $('#ICE_PHONE2').blur(icePhone2Validation);
    $('#ICE_PHONE2').mask("899-999-9999");
    $('#ICE_PHONE3').blur(icePhone3Validation);
    $('#ICE_PHONE3').mask("899-999-9999");
    $('#ICE2_NAME').blur(ice2NameValidation);
    $('#ICE2_PHONE1').blur(ice2Phone1Validation);
    $('#ICE2_PHONE1').mask("899-999-9999");
    $('#ICE2_PHONE2').blur(ice2Phone2Validation);
    $('#ICE2_PHONE2').mask("899-999-9999");
    $('#ICE2_PHONE3').blur(ice2Phone3Validation);
    $('#ENS_SELF_CELL').mask("899-999-9999");
    $('#MIS1_NAME').blur(mis1NameValidation);
    $('#MIS1_PHONE1').blur(mis1Phone1Validation);
    $('#MIS1_PHONE1').mask("899-999-9999");
    $('#MIS1_PHONE2').blur(mis1Phone2Validation);
    $('#MIS1_PHONE2').mask("899-999-9999");
    $('#MIS1_PHONE3').blur(mis1Phone3Validation);
    $('#MIS1_PHONE3').mask("899-999-9999");
    $('#MIS2_NAME').blur(mis2NameValidation);
    $('#MIS2_PHONE1').blur(mis2Phone1Validation);
    $('#MIS2_PHONE1').mask("899-999-9999");
    $('#MIS3_NAME').blur(mis3NameValidation);
    $('#MIS3_PHONE1').blur(mis3Phone1Validation);
    $('#MIS3_PHONE1').mask("899-999-9999");
}

// set the CSS feedback for required and/or invalid fields
function initialvalidation() {
    ensPhoneValidation();
    ensEmailValidation();
    iceNameValidation();
    icePhone1Validation();
    icePhone2Validation();
    icePhone3Validation();
    ice2NameValidation();
    ice2Phone1Validation();
    ice2Phone2Validation();
    ice2Phone3Validation();
    mis1NameValidation();
    mis1Phone1Validation();
    mis1Phone2Validation();
    mis1Phone3Validation();
    mis2NameValidation();
    mis2Phone1Validation();
    mis3NameValidation();
    mis3Phone1Validation();
}
// Called when the save button is clicked. Either returns
// true or throws an alert box and returns false
function isValid() {
    // this variable will tell us if any of the subsequent
    // validations fail, or if they all succeed
    var errors = "";
    // test each field, appending errors as invalid fields are encountered.
    if (!ensPhoneValidation())
        errors = errors + "\nPlease check the 'contact you' phone number(s).";
    if (!ensEmailValidation())
        errors = errors + "\nPlease check the 'contact you' email address.";
    if (!iceNameValidation())
        errors = errors + "\nPlease check the 'in case of emergency' name(s).";
    if (!icePhone1Validation())
        errors = errors + "\nPlease check the 'in case of emergency' phone number(s).";
    if (!icePhone2Validation())
        errors = errors + "\nPlease check the 'in case of emergency' phone number(s).";
    if (!icePhone3Validation())
        errors = errors + "\nPlease check the 'in case of emergency' phone number(s).";
    if (!ice2NameValidation())
        errors = errors + "\nPlease check the 'in case of emergency' name(s).";
    if (!ice2Phone1Validation())
        errors = errors + "\nPlease check the 'in case of emergency' phone number(s).";
    if (!ice2Phone2Validation())
        errors = errors + "\nPlease check the 'in case of emergency' phone number(s).";
    if (!ice2Phone3Validation())
        errors = errors + "\nPlease check the 'in case of emergency' phone number(s).";

    //ONLY FOR STUDENTS
    if(GetUserType() == "student") {
        if(!mis1NameValidation())
        errors = errors + "\nPlease check the 'in case of missing' names(s).";
        if(!mis1Phone1Validation())
        errors = errors + "\nPlease check the 'in case of missing' phone number 1.";
        if(!mis1Phone2Validation())
        errors = errors + "\nPlease check the 'in case of missing' phone number 2.";
        if(!mis1Phone3Validation())
        errors = errors + "\nPlease check the 'in case of missing' phone number 3.";
        if(!mis2Phone1Validation())
        errors = errors + "\nPlease check the 'in case of missing' contact 2 phone number.";
        if(!mis2NameValidation())
        errors = errors + "\nPlease check the 'in case of missing' contact 2 name.";
        if(!mis3Phone1Validation())
        errors = errors + "\nPlease check the 'in case of missing' contact 3 phone number.";
        if(!mis3NameValidation())
        errors = errors + "\nPlease check the 'in case of missing' contact 3 name.";
    }

    if (errors != "") {
        alert(errors);
        return false;
    } else {
        return true;
    }
}

function changeStyle(title) {
    var lnks = document.getElementsByTagName('link');
    for (var i = lnks.length - 1; i >= 0; i--) {
        if (lnks[i].getAttribute('rel').indexOf('style')> -1 && lnks[i].getAttribute('title')) {
            lnks[i].disabled = true;
            if (lnks[i].getAttribute('title') == title) {
                    lnks[i].disabled = false;
            }
        }
    }
}

// this must be all in here so that when the ajax is done then the actions
// will be attatched to the button and form that is turned into a dialog.
function saveDone(data) {
    $("#main_modal").dialog('close');
}

function jsonResponcePopulate(data) {
    $("#MIS1_NAME").val(data.MIS1.line1);
    $("#MIS1_REL").val(data.MIS1.cell_carrier);
    $("#MIS1_PHONE1").val(data.MIS1.phone);
    $("#MIS1_PHONE2").val(data.MIS1.line2);
    $("#MIS1_PHONE3").val(data.MIS1.line3);
    $("#MIS2_NAME").val(data.MIS2.line1);
    $("#MIS2_PHONE1").val(data.MIS2.phone);
    $("#MIS3_NAME").val(data.MIS3.line1);
    $("#MIS3_PHONE1").val(data.MIS3.phone);
    $("#ENS_SELF_CELL").val(data.ENS.phone);
    if(data.ENS.opt_out == 1) {
        $('input:radio[name=ENS_SMS]')[0].checked = true;
    } else {
        $('input:radio[name=ENS_SMS]')[1].checked = true;
    }
    $("#ENS_CARRIER").val(data.ENS.cell_carrier);
    $("#ENS_EMAIL").val(data.ENS.line1);
    $("#ICE_NAME").val(data.ICE.line1);
    $("#ICE_PHONE1").val(data.ICE.phone);
    $("#ICE_PHONE2").val(data.ICE.line2);
    $("#ICE_PHONE3").val(data.ICE.line3);
    $("#ICE_REL").val(data.ICE.cell_carrier);
    $("#ICE2_NAME").val(data.ICE2.line1);
    $("#ICE2_PHONE1").val(data.ICE2.phone);
    $("#ICE2_PHONE2").val(data.ICE2.line2);
    $("#ICE2_PHONE3").val(data.ICE2.line3);
    $("#ICE2_REL").val(data.ICE2.cell_carrier);
    if (data.ENS.end_date) {
        checkIfStale(data.ENS.end_date);
    }
}
function makeDialog() {
    changeStyle('emergency_index');
    $("#main_modal").dialog({
        autoOpen: true,
        height: 620,
        width: 850,
        modal: true,
        top: 10,
        buttons: { "Save": function(){
            if(isValid() && !isNaN(GetUserID())) {
                var a = $("#MIS1_NAME").val();
                var b = $("#MIS1_REL").val();
                var c = $("#MIS1_PHONE1").val();
                var d = $("#MIS1_PHONE2").val();
                var e = $("#MIS1_PHONE3").val();
                var f = $("#MIS2_NAME").val();
                var g = $("#MIS2_PHONE1").val();
                var h = $("#MIS3_NAME").val();
                var i = $("#MIS3_PHONE1").val();
                var j = $("#ENS_SELF_CELL").val();
                var k = $('input[name=ENS_SMS]:checked').val();
                var l = $("#ENS_CARRIER").val();
                var m = $("#ENS_EMAIL").val();
                var n = $("#ICE_NAME").val();
                var o = $("#ICE_PHONE1").val();
                var p = $("#ICE_PHONE2").val();
                var q = $("#ICE_PHONE3").val();
                var r = $("#ICE_REL").val();
                var t = $("#ICE2_NAME").val();
                var u = GetUserID();
                var v = $("#ICE2_PHONE1").val();
                var w = $("#ICE2_PHONE2").val();
                var x = $("#ICE2_PHONE3").val();
                var y = $("#ICE2_REL").val();
                var subdomain = getSubdomain();
                var earl = "https://" + subdomain + ".carthage.edu/emergency/contact/save?callback=?";
                $.getJSON(earl, {
                    MIS1_NAME:a,
                    MIS1_REL:b,
                    MIS1_PHONE1:c,
                    MIS1_PHONE2:d,
                    MIS1_PHONE3:e,
                    MIS2_NAME:f,
                    MIS2_PHONE1:g,
                    MIS3_NAME:h,
                    MIS3_PHONE1:i,
                    ENS_SELF_CELL:j,
                    ENS_SMS:k,
                    ENS_CARRIER:l,
                    ENS_EMAIL:m,
                    ICE_NAME:n,
                    ICE_PHONE1:o,
                    ICE_PHONE2:p,
                    ICE_PHONE3:q,
                    ICE_REL:r,
                    ICE2_NAME:t,
                    UserID:u,
                    ICE2_PHONE1:v,
                    ICE2_PHONE2:w,
                    ICE2_PHONE3:x,
                    ICE2_REL:y
                });
            }
        }}
    });
    $( "#ens_form").accordion({
        active:0,
        header:'div.header',
        fillSpace:false,
        clearStyle:true
    });
    initializeHandlers();
    initialvalidation();
}

function checkIfStale(end_date) {
    var now = new Date();
    end_date_year = end_date.substring(0,4);
    end_date_month = end_date.substring(5,7);
    end_date_day = end_date.substring(8,10);

    var end_date_to_date = new Date(end_date_year, end_date_month-1, end_date_day);
    // end_date_to_date = end_date_to_date.format("yyyy-MM-dd");
    // now = now.format("yyyy-MM-dd");
    if(now > end_date_to_date) {
         // alert before dialog appears alerting why it is appearing
         alert('Your emergency contact information has expired, please review and make updates to your records.');
         makeDialog();
    }
}

function getSubdomain() {
    var fqdn = window.location.host
    var subdomain = fqdn.split('.')[0]
    if (!subdomain || subdomain == "my") {
        var subdomain = "www";
    }
    return subdomain;
}

function doneRendering() {
    var subdomain = getSubdomain();
    if(!isNaN(GetUserID())) {
        $.ajax({
            url:'https://' + subdomain + '.carthage.edu/emergency/contact/populate/?UserID='+GetUserID(),
            type:'GET',
            dataType:'jsonp',
            cache:false,
            jsonpCallbackString:jsonResponcePopulate
        });
    }

    $("#ens_form_button").click(function() {
        makeDialog();
    });

    if(GetUserType() == "fac" || GetUserType() == "staff") {
        $("#missingheader").hide();
    }
}

//this is called and then sets the div that is an empty div in the portlet settings witht he ajax request.
function successCallback(data) {
    $('#emergencyContactFiller').html(data.emc);
    doneRendering();
}

$(document).ready(function() {
    var subdomain = getSubdomain();
    $.getScript("https://raw.githubusercontent.com/digitalBush/jquery.maskedinput/1.4.0/dist/jquery.maskedinput.min.js", function(){ });
    //JSONP call to get the form and button from Django
    $.ajax({
        url: 'https://' + subdomain + '.carthage.edu/emergency/contact/json/',
        type: 'GET',
        dataType: 'jsonp',
        cache: false,
        jsonpCallbackString:successCallback, //JSONP success equivalent, will call the returned jsavascript from the ajax request
    },"json");
});


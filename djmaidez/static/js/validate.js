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
/*
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
*/

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

// this must here so that when ajax is done the actions
// will be attatched to the button and form that is turned
// into a dialog.
function saveDone(data) {
    $("#main_modal").dialog('close');
}

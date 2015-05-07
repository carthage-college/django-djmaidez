//GetUserID() is in the portlet settings in order to get the @@UserID from logged in user.

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
// Bind onBlur event handlers to each field to validate as people fill out the form
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
// Called when the save button is clicked. Either returns true or throws an alert box and returns false
function isValid() {
    // this variable will tell us if any of the subsequent validations fail, or if they all succeed
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

//this must be all in here so that when the ajax is done then the actions will be attatched to the button and form that is turned into a dialog.
function saveDone(data) {
        $("#main_modal").dialog('close');
}
function jsonResponcePopulate(data) {
        $("#MIS1_NAME").val(data.mis1_name);
        $("#MIS1_REL").val(data.mis1_rel);
        $("#MIS1_PHONE1").val(data.mis1_phone1);
        $("#MIS1_PHONE2").val(data.mis1_phone2);
        $("#MIS1_PHONE3").val(data.mis1_phone3);
        $("#MIS2_NAME").val(data.mis2_name);
        $("#MIS2_PHONE1").val(data.mis2_phone1);
        $("#MIS3_NAME").val(data.mis3_name);
        $("#MIS3_PHONE1").val(data.mis3_phone1);
        $("#ENS_SELF_CELL").val(data.ens_sms);
        if(data.ens_self_cell == 1)
                $('input:radio[name=ENS_SMS]')[0].checked = true;
        else
                $('input:radio[name=ENS_SMS]')[1].checked = true;
        $("#ENS_CARRIER").val(data.ens_carrier);
        $("#ENS_EMAIL").val(data.ens_email);
        $("#ICE_NAME").val(data.ice_name);
        $("#ICE_PHONE1").val(data.ice_phone1);
        $("#ICE_PHONE2").val(data.ice_phone2);
        $("#ICE_PHONE3").val(data.ice_phone3);
        $("#ICE_REL").val(data.ice_rel);
        $("#ICE2_NAME").val(data.ice2_name);
        $("#ICE2_PHONE1").val(data.ice2_phone1);
        $("#ICE2_PHONE2").val(data.ice2_phone2);
        $("#ICE2_PHONE3").val(data.ice2_phone3);
        $("#ICE2_REL").val(data.ice2_rel);

        checkIfStale(data.ens_end_date);
}
function makeDialog() {
        changeStyle('emergency_index');
        $("#main_modal").dialog({
            autoOpen: true,
            height: 620,
            width: 850,
            modal: true,
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
                        $.getJSON('https://www.carthage.edu/emergency/contact/save?callback=?', {
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
        $( "#ens_form").accordion({ active:0, header:'div.header', fillSpace:false, clearStyle:true });
        initializeHandlers();
        initialvalidation();
}

function checkIfStale(end_date) {
        var now = new Date();
        end_date_year = end_date.substring(0,4);
        end_date_month = end_date.substring(5,7);
        end_date_day = end_date.substring(8,10);

        var end_date_to_date = new Date(end_date_year, end_date_month-1, end_date_day);
        //end_date_to_date = end_date_to_date.format("yyyy-MM-dd");
        //now = now.format("yyyy-MM-dd");
        if(now > end_date_to_date) {
             //alert before dialog appears alerting why it is appearing
             alert('Your emergency contact information has expired, please review and make updates to your records.');
             makeDialog();
        }
}

function doneRendering() {
        if(!isNaN(GetUserID())) {
                $.ajax({
                     url:'https://www.carthage.edu/emergency/contact/populate/?UserID='+GetUserID(),
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
    //JSONP call to get the form and button from Django
    $.ajax({
        url: 'https://www.carthage.edu/emergency/contact/json/',
        type: 'GET',
        dataType: 'jsonp',
        cache: false,
        jsonpCallbackString:successCallback, //JSONP success equivalent, will call the returned jsavascript from the ajax request
    },"json");
});


/*
    Masked Input plugin for jQuery
    Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.3.1
*/
(function($) {
    function getPasteEvent() {
    var el = document.createElement('input'),
        name = 'onpaste';
    el.setAttribute(name, '');
    return (typeof el[name] === 'function')?'paste':'input';
}

var pasteEventName = getPasteEvent() + ".mask",
    ua = navigator.userAgent,
    iPhone = /iphone/i.test(ua),
    android=/android/i.test(ua),
    caretTimeoutId;

$.mask = {
    //Predefined character definitions
    definitions: {
        '9': "[0-9]",
        'a': "[A-Za-z]",
        '*': "[A-Za-z0-9]"
    },
    dataName: "rawMaskFn",
    placeholder: '_',
};

$.fn.extend({
    //Helper Function for Caret positioning
    caret: function(begin, end) {
        var range;

        if (this.length === 0 || this.is(":hidden")) {
            return;
        }

        if (typeof begin == 'number') {
            end = (typeof end === 'number') ? end : begin;
            return this.each(function() {
                if (this.setSelectionRange) {
                    this.setSelectionRange(begin, end);
                } else if (this.createTextRange) {
                    range = this.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', end);
                    range.moveStart('character', begin);
                    range.select();
                }
            });
        } else {
            if (this[0].setSelectionRange) {
                begin = this[0].selectionStart;
                end = this[0].selectionEnd;
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    },
    unmask: function() {
        return this.trigger("unmask");
    },
    mask: function(mask, settings) {
        var input,
            defs,
            tests,
            partialPosition,
            firstNonMaskPos,
            len;

        if (!mask && this.length > 0) {
            input = $(this[0]);
            return input.data($.mask.dataName)();
        }
        settings = $.extend({
            placeholder: $.mask.placeholder, // Load default placeholder
            completed: null
        }, settings);


        defs = $.mask.definitions;
        tests = [];
        partialPosition = len = mask.length;
        firstNonMaskPos = null;

        $.each(mask.split(""), function(i, c) {
            if (c == '?') {
                len--;
                partialPosition = i;
            } else if (defs[c]) {
                tests.push(new RegExp(defs[c]));
                if (firstNonMaskPos === null) {
                    firstNonMaskPos = tests.length - 1;
                }
            } else {
                tests.push(null);
            }
        });

        return this.trigger("unmask").each(function() {
            var input = $(this),
                buffer = $.map(
                mask.split(""),
                function(c, i) {
                    if (c != '?') {
                        return defs[c] ? settings.placeholder : c;
                    }
                }),
                focusText = input.val();

            function seekNext(pos) {
                while (++pos < len && !tests[pos]);
                return pos;
            }

            function seekPrev(pos) {
                while (--pos >= 0 && !tests[pos]);
                return pos;
            }

            function shiftL(begin,end) {
                var i,
                    j;

                if (begin<0) {
                    return;
                }

                for (i = begin, j = seekNext(end); i < len; i++) {
                    if (tests[i]) {
                        if (j < len && tests[i].test(buffer[j])) {
                            buffer[i] = buffer[j];
                            buffer[j] = settings.placeholder;
                        } else {
                            break;
                        }

                        j = seekNext(j);
                    }
                }
                writeBuffer();
                input.caret(Math.max(firstNonMaskPos, begin));
            }

            function shiftR(pos) {
                var i,
                    c,
                    j,
                    t;

                for (i = pos, c = settings.placeholder; i < len; i++) {
                    if (tests[i]) {
                        j = seekNext(i);
                        t = buffer[i];
                        buffer[i] = c;
                        if (j < len && tests[j].test(t)) {
                            c = t;
                        } else {
                            break;
                        }
                    }
                }
            }

            function keydownEvent(e) {
                var k = e.which,
                    pos,
                    begin,
                    end;

                //backspace, delete, and escape get special treatment
                if (k === 8 || k === 46 || (iPhone && k === 127)) {
                    pos = input.caret();
                    begin = pos.begin;
                    end = pos.end;

                    if (end - begin === 0) {
                        begin=k!==46?seekPrev(begin):(end=seekNext(begin-1));
                        end=k===46?seekNext(end):end;
                    }
                    clearBuffer(begin, end);
                    shiftL(begin, end - 1);

                    e.preventDefault();
                } else if (k == 27) {//escape
                    input.val(focusText);
                    input.caret(0, checkVal());
                    e.preventDefault();
                }
            }

            function keypressEvent(e) {
                var k = e.which,
                    pos = input.caret(),
                    p,
                    c,
                    next;

                if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {//Ignore
                    return;
                } else if (k) {
                    if (pos.end - pos.begin !== 0){
                        clearBuffer(pos.begin, pos.end);
                        shiftL(pos.begin, pos.end-1);
                    }

                    p = seekNext(pos.begin - 1);
                    if (p < len) {
                        c = String.fromCharCode(k);
                        if (tests[p].test(c)) {
                            shiftR(p);

                            buffer[p] = c;
                            writeBuffer();
                            next = seekNext(p);

                            if(android){
                                setTimeout($.proxy($.fn.caret,input,next),0);
                            }else{
                                input.caret(next);
                            }

                            if (settings.completed && next >= len) {
                                settings.completed.call(input);
                            }
                        }
                    }
                    e.preventDefault();
                }
            }

            function clearBuffer(start, end) {
                var i;
                for (i = start; i < end && i < len; i++) {
                    if (tests[i]) {
                        buffer[i] = settings.placeholder;
                    }
                }
            }

            function writeBuffer() { input.val(buffer.join('')); }

            function checkVal(allow) {
                //try to place characters where they belong
                var test = input.val(),
                    lastMatch = -1,
                    i,
                    c;

                for (i = 0, pos = 0; i < len; i++) {
                    if (tests[i]) {
                        buffer[i] = settings.placeholder;
                        while (pos++ < test.length) {
                            c = test.charAt(pos - 1);
                            if (tests[i].test(c)) {
                                buffer[i] = c;
                                lastMatch = i;
                                break;
                            }
                        }
                        if (pos > test.length) {
                            break;
                        }
                    } else if (buffer[i] === test.charAt(pos) && i !== partialPosition) {
                        pos++;
                        lastMatch = i;
                    }
                }
                if (allow) {
                    writeBuffer();
                } else if (lastMatch + 1 < partialPosition) {
                    input.val("");
                    clearBuffer(0, len);
                } else {
                    writeBuffer();
                    input.val(input.val().substring(0, lastMatch + 1));
                }
                return (partialPosition ? i : firstNonMaskPos);
            }

            input.data($.mask.dataName,function(){
                return $.map(buffer, function(c, i) {
                    return tests[i]&&c!=settings.placeholder ? c : null;
                }).join('');
            });

            if (!input.attr("readonly"))
                input
                .one("unmask", function() {
                    input
                        .unbind(".mask")
                        .removeData($.mask.dataName);
                })
                .bind("focus.mask", function() {
                    clearTimeout(caretTimeoutId);
                    var pos,
                        moveCaret;

                    focusText = input.val();
                    pos = checkVal();
                    
                    caretTimeoutId = setTimeout(function(){
                        writeBuffer();
                        if (pos == mask.length) {
                            input.caret(0, pos);
                        } else {
                            input.caret(pos);
                        }
                    }, 10);
                })
                .bind("blur.mask", function() {
                    checkVal();
                    if (input.val() != focusText)
                        input.change();
                })
                .bind("keydown.mask", keydownEvent)
                .bind("keypress.mask", keypressEvent)
                .bind(pasteEventName, function() {
                    setTimeout(function() { 
                        var pos=checkVal(true);
                        input.caret(pos); 
                        if (settings.completed && pos == input.val().length)
                            settings.completed.call(input);
                    }, 0);
                });
            checkVal(); //Perform initial check for existing values
        });
    }
});


})(jQuery);

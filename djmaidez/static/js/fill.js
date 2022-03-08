// GetUserID() is in the portlet settings in order to get
// the @@UserID from logged in user.

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

// munge the host and return the subdomain
function getSubdomain() {
    var fqdn = window.location.host
    var subdomain = fqdn.split('.')[0]
    if ( subdomain == "testportal") {
        var subdomain = "hygiea";
    } else if (!subdomain || subdomain == "my") {
        var subdomain = "my";
    }
    return subdomain;
}

function jsonResponcePopulate(data) {
    if (data.hasOwnProperty('MIS1')) {
        $("#MIS1_NAME").val(data.MIS1.line1);
        $("#MIS1_REL").val(data.MIS1.cell_carrier);
        $("#MIS1_PHONE1").val(data.MIS1.phone);
        $("#MIS1_PHONE2").val(data.MIS1.line2);
        $("#MIS1_PHONE3").val(data.MIS1.line3);
    }
    if (data.hasOwnProperty('MIS2')) {
        $("#MIS2_NAME").val(data.MIS2.line1);
        $("#MIS2_PHONE1").val(data.MIS2.phone);
    }
    if (data.hasOwnProperty('MIS3')) {
        $("#MIS3_NAME").val(data.MIS3.line1);
        $("#MIS3_PHONE1").val(data.MIS3.phone);
    }
    if (data.hasOwnProperty('ENS')) {
        $("#ENS_SELF_CELL").val(data.ENS.phone);
        $("#ENS_CARRIER").val(data.ENS.cell_carrier);
        $("#ENS_EMAIL").val(data.ENS.line1);
        if (data.ENS.end_date) {
            checkIfStale(data.ENS.end_date);
        }
    }
    if (data.hasOwnProperty('EML4')) {
        $("#EML4_EMAIL").val(data.EML4.line1);
        if (data.EML4.end_date) {
            checkIfStale(data.EML4.end_date);
        }
    }
    if (data.hasOwnProperty('CLLP')) {
        $("#CLLP_PHONE").val(data.CLLP.line1);
        if (data.CLLP.end_date) {
            checkIfStale(data.CLLP.end_date);
        }
    }
    if (data.hasOwnProperty('ICE')) {
        $("#ICE_NAME").val(data.ICE.line1);
        $("#ICE_PHONE1").val(data.ICE.phone);
        $("#ICE_PHONE2").val(data.ICE.line2);
        $("#ICE_PHONE3").val(data.ICE.line3);
        $("#ICE_REL").val(data.ICE.cell_carrier);
    }
    if (data.hasOwnProperty('ICE2')) {
        $("#ICE2_NAME").val(data.ICE2.line1);
        $("#ICE2_PHONE1").val(data.ICE2.phone);
        $("#ICE2_PHONE2").val(data.ICE2.line2);
        $("#ICE2_PHONE3").val(data.ICE2.line3);
        $("#ICE2_REL").val(data.ICE2.cell_carrier);
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
                var subdomain = getSubdomain();
                var earl = "https://" + subdomain + ".carthage.edu/djmaidez/contact/save?uid="+GetUuid()+"&callback=?";
                $.getJSON(earl, {
                    MIS1_NAME: $("#MIS1_NAME").val(),
                    MIS1_REL: $("#MIS1_REL").val(),
                    MIS1_PHONE1: $("#MIS1_PHONE1").val(),
                    MIS1_PHONE2: $("#MIS1_PHONE2").val(),
                    MIS1_PHONE3: $("#MIS1_PHONE3").val(),
                    MIS2_NAME: $("#MIS2_NAME").val(),
                    MIS2_PHONE1: $("#MIS2_PHONE1").val(),
                    MIS3_NAME: $("#MIS3_NAME").val(),
                    MIS3_PHONE1: $("#MIS3_PHONE1").val(),
                    ENS_SELF_CELL: $("#ENS_SELF_CELL").val(),
                    ENS_SMS: "1",
                    ENS_CARRIER: $("#ENS_CARRIER").val(),
                    ENS_EMAIL: $("#ENS_EMAIL").val(),
                    CLLP_PHONE: $("#CLLP_PHONE").val(),
                    EML4_EMAIL: $("#EML4_EMAIL").val(),
                    ICE_NAME: $("#ICE_NAME").val(),
                    ICE_PHONE1: $("#ICE_PHONE1").val(),
                    ICE_PHONE2: $("#ICE_PHONE2").val(),
                    ICE_PHONE3: $("#ICE_PHONE3").val(),
                    ICE_REL: $("#ICE_REL").val(),
                    ICE2_NAME: $("#ICE2_NAME").val(),
                    UserID: GetUserID(),
                    ICE2_PHONE1: $("#ICE2_PHONE1").val(),
                    ICE2_PHONE2: $("#ICE2_PHONE2").val(),
                    ICE2_PHONE3: $("#ICE2_PHONE3").val(),
                    ICE2_REL: $("#ICE2_REL").val()
                });
            } else {
                console.log('not valid binch');
                console.log($("#CLLP_PHONE").val());
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

// check if the person's contact data needs to be updated
function checkIfStale(end_date) {
    var now = new Date();
    end_date_year = end_date.substring(0,4);
    end_date_month = end_date.substring(5,7);
    end_date_day = end_date.substring(8,10);

    var end_date_to_date = new Date(end_date_year, end_date_month-1, end_date_day);
    if(now > end_date_to_date) {
        // alert before dialog appears alerting why it is appearing
        alert("Your emergency contact information has expired.\n\
             Please review and make updates to your records.");
        makeDialog();
    }
}

function doneRendering() {
    var subdomain = getSubdomain();
    if(!isNaN(GetUserID())) {
        $.ajax({
            url:'https://' + subdomain + '.carthage.edu/djmaidez/contact/populate/?uid='+GetUuid()+'&UserID='+GetUserID(),
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

// this is called and then sets the div that is an empty div
// in the portlet settings witht he ajax request.
function successCallback(data) {
    $('#emergencyContactFiller').html(data.emc);
    doneRendering();
}

$(document).ready(function() {
    var subdomain = getSubdomain();
    $.getScript("https://www.carthage.edu/static/vendor/jquery/plugins/maskedinput/dist/jquery.maskedinput.min.js", function(){ });
    $.getScript("https://" + subdomain + ".carthage.edu/static/djmaidez/js/validate.js", function(){ });
    // JSONP call to get the form and button from Django
    // jsonpCallbackString:successCallback is success equivalent,
    // and will call the returned javascript from the ajax request
    $.ajax({
        url: 'https://' + subdomain + '.carthage.edu/djmaidez/contact/form/?uid='+GetUuid(),
        type: 'GET',
        dataType: 'jsonp',
        cache: false,
        jsonpCallbackString:successCallback,
    },"json");
});


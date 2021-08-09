/////////////////////FUNCTION CALLS//////////////////////////

// requiredDigitalGov("#field_10_amesi");
// requiredDigitalGov("#field_10_emmesi");
//requiredLegalistics("#field_33");

///////////////////////FUNCTIONS////////////////////////////

//count & limit words
//as of latest requests, word limit no longer required. Code will remain for future needs
function wordsCounter(fieldId, spanId, wordlimit, event) {
    Countable.on(document.getElementById(fieldId), counter => {
        if (counter.words >= wordlimit) {
            event.preventDefault();//if word limit is reached prevent typing by preventing next event
        }
        document.getElementById(spanId).innerHTML = counter.words.toString();
    })
}

function getFullDate(fieldId) {
    $(fieldId).prop("value", new Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" }));
}

function requiredDigitalGov(field) {
    if ($(field).prop("checked")) {
        enableFields($('.digital_gov :input'));
        $('.digital-gov-label').addClass('required');
    } else {
        optionalFields($('.digital_gov :input'));
        $('.digital-gov-label').removeClass('required')
    }
}

function requiredLegalistics(field) {

    let spaceLess = $(field).val().replace(/^\s+|\s+$/g, "");//replace white space
    if (spaceLess) {
        enableFields($('.legalistic :input'));
        $('.legalistic-label').addClass('required');
    } else {
        optionalFields($('.legalistic :input'));
        $('.legalistic-label').removeClass('required')
    }
}
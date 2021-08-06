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


function createRow(index, wordCounterPrefix, prefix1, prefix2, prefix3, prefix4, prefix5) {

    let newRow;
    newRow = `
        <tr id="R${++index}"> 
            <td> 
                <textarea class="form-control" id="${prefix1}${index}" name="${prefix1}${index}" rows="1" ></textarea>                                                           
            </td> 
            <td> 
                <textarea class="form-control" id="${prefix2}${index}" name="${prefix2}${index}" rows="1" onkeypress="wordsCounter('${prefix2}${index}','${wordCounterPrefix}_${index}', event)" onpaste="wordsCounter('${prefix2}${index}','${wordCounterPrefix}_${index}', event)"></textarea>
                <p style="float: right;">Λέξεις: <span id="${wordCounterPrefix}_${index}" ></span></p> 
                <br>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button> 
            </td>    
        </tr>`;
    return newRow;

}
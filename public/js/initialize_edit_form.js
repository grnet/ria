setUserRestrictions(role);
setSubtitle();
setSubText();
setDropdown();
requiredDigitalGov(); //set initial state for fields 10-13
requiredLegalistics(); //set initial state for fields 33-40
if (field_18) {
  $("#field_18_comments").val(field_18);
}

if (field_19) {
  $("#field_19_comments").val(field_19);
}

if (field_20) {
  $("#field_20_comments").val(field_20);
}

let spans = $("span"); //find all spans
//we won;t be needing first 2 spans
// spans = spans.splice(0);
// spans = spans.splice(1);
$.each(spans, function (key, span) {
  let textarea = $(span).closest("p").siblings("textarea");
  let textareaId = $(textarea).prop("id");
  let spanId = $(span).prop("id");
  if (textareaId) {
    //   //if span has a textarea sibling
    wordsCounter(textareaId, spanId); //count words
  }
});

if (pdf_exists) {
  $("#pdf_download").show();
}

//TODO: add classes to reduce code
if (ekpedeusi_politismos) {
  $(".ekpaideysi-politismos").show();
  $("#ekpedeusi_politismos").prop("checked", true);
  $("#politismos_table").show();
  $("#ekpaideysi_table").show();
  for (let i in tables.field_9.ekpaideysi) {
    $("#ekpaideysi_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="ekpaideysi_index${i}" name="ekpaideysi_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ekpaideysi_year1_${i}" type="text" name="ekpaideysi_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.ekpaideysi[i].row[1]}"/>
                <input class="govgr-input" id="ekpaideysi_year2_${i}" type="text" name="ekpaideysi_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.ekpaideysi[i].row[2]}"/>
                <input class="govgr-input" id="ekpaideysi_year3_${i}" type="text" name="ekpaideysi_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.ekpaideysi[i].row[3]}"/>
                <input class="govgr-input" id="ekpaideysi_year4_${i}" type="text" name="ekpaideysi_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.ekpaideysi[i].row[4]}"/>
                <input class="govgr-input" id="ekpaideysi_year5_${i}" type="text" name="ekpaideysi_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.ekpaideysi[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ekpaideysi_stoixeia_${i}" type="text" name="ekpaideysi_stoixeia_${i}" value="${tables.field_9.ekpaideysi[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="ekpaideysi_stoxos_${i}" type="text" name="ekpaideysi_stoxos_${i}" value="${tables.field_9.ekpaideysi[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`ekpaideysi_index${i}`, "ΕΚΠΑΙΔΕΥΣΗ");
    $(`#ekpaideysi_index${i}`).val(tables.field_9.ekpaideysi[i].row[0]);
  }
  for (let i in tables.field_9.politismos) {
    $("#politismos_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="politismos_index${i}" name="politismos_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="politismos_year1_${i}" type="text" name="politismos_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.politismos[i].row[1]}"/>
                <input class="govgr-input" id="politismos_year2_${i}" type="text" name="politismos_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.politismos[i].row[2]}"/>
                <input class="govgr-input" id="politismos_year3_${i}" type="text" name="politismos_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.politismos[i].row[3]}"/>
                <input class="govgr-input" id="politismos_year4_${i}" type="text" name="politismos_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.politismos[i].row[4]}"/>
                <input class="govgr-input" id="politismos_year5_${i}" type="text" name="politismos_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.politismos[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="politismos_stoixeia_${i}" type="text" name="politismos_stoixeia_${i}" value="${tables.field_9.politismos[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="politismos_stoxos_${i}" type="text" name="politismos_stoxos_${i}" value="${tables.field_9.politismos[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`politismos_index${i}`, "ΠΟΛΙΤΙΣΜΟΣ");
    $(`#politismos_index${i}`).val(tables.field_9.politismos[i].row[0]);
  }
} else {
  $(".ekpaideysi-politismos").hide();
}

if (eksoteriki_politiki) {
  $("#eksoteriki_politiki").prop("checked", true).hide();
}

if (forologiki_politiki) {
  $(".oikonomia").show(), $("#forologiki_politiki").prop("checked", true);
  $("#oikonomia_table").show();
  $("#forologia_table").show();
  $("#ergasiakes_sxeseis_table").show();
  for (let i in tables.field_9.oikonomia) {
    $("#oikonomia_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="oikonomia_index${i}" name="oikonomia_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="oikonomia_year1_${i}" type="text" name="oikonomia_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.oikonomia[i].row[1]}"/>
                <input class="govgr-input" id="oikonomia_year2_${i}" type="text" name="oikonomia_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.oikonomia[i].row[2]}"/>
                <input class="govgr-input" id="oikonomia_year3_${i}" type="text" name="oikonomia_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.oikonomia[i].row[3]}"/>
                <input class="govgr-input" id="oikonomia_year4_${i}" type="text" name="oikonomia_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.oikonomia[i].row[4]}"/>
                <input class="govgr-input" id="oikonomia_year5_${i}" type="text" name="oikonomia_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.oikonomia[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="oikonomia_stoixeia_${i}" type="text" name="oikonomia_stoixeia_${i}" value="${tables.field_9.oikonomia[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="oikonomia_stoxos_${i}" type="text" name="oikonomia_stoxos_${i}" value="${tables.field_9.oikonomia[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`oikonomia_index${i}`, "ΟΙΚΟΝΟΜΙΑ");
    $(`#oikonomia_index${i}`).val(tables.field_9.oikonomia[i].row[0]);
  }
  for (let i in tables.field_9.forologia) {
    $("#forologia_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="forologia_index${i}" name="forologia_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="forologia_year1_${i}" type="text" name="forologia_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.forologia[i].row[1]}"/>
                <input class="govgr-input" id="forologia_year2_${i}" type="text" name="forologia_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.forologia[i].row[2]}"/>
                <input class="govgr-input" id="forologia_year3_${i}" type="text" name="forologia_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.forologia[i].row[3]}"/>
                <input class="govgr-input" id="forologia_year4_${i}" type="text" name="forologia_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.forologia[i].row[4]}"/>
                <input class="govgr-input" id="forologia_year5_${i}" type="text" name="forologia_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.forologia[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="forologia_stoixeia_${i}" type="text" name="forologia_stoixeia_${i}" value="${tables.field_9.forologia[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="forologia_stoxos_${i}" type="text" name="forologia_stoxos_${i}" value="${tables.field_9.forologia[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`forologia_index${i}`, "ΦΟΡΟΛΟΓΙΑ");
    $(`#forologia_index${i}`).val(tables.field_9.forologia[i].row[0]);
  }
  for (let i in tables.field_9.ergasiakes_sxeseis) {
    $("#ergasiakes_sxeseis_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="ergasiakes_sxeseis_index${i}" name="ergasiakes_sxeseis_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ergasiakes_sxeseis_year1_${i}" type="text" name="ergasiakes_sxeseis_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.ergasiakes_sxeseis[i].row[1]}"/>
                <input class="govgr-input" id="ergasiakes_sxeseis_year2_${i}" type="text" name="ergasiakes_sxeseis_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.ergasiakes_sxeseis[i].row[2]}"/>
                <input class="govgr-input" id="ergasiakes_sxeseis_year3_${i}" type="text" name="ergasiakes_sxeseis_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.ergasiakes_sxeseis[i].row[3]}"/>
                <input class="govgr-input" id="ergasiakes_sxeseis_year4_${i}" type="text" name="ergasiakes_sxeseis_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.ergasiakes_sxeseis[i].row[4]}"/>
                <input class="govgr-input" id="ergasiakes_sxeseis_year5_${i}" type="text" name="ergasiakes_sxeseis_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.ergasiakes_sxeseis[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ergasiakes_sxeseis_stoixeia_${i}" type="text" name="ergasiakes_sxeseis_stoixeia_${i}" value="${tables.field_9.ergasiakes_sxeseis[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="ergasiakes_sxeseis_stoxos_${i}" type="text" name="ergasiakes_sxeseis_stoxos_${i}" value="${tables.field_9.ergasiakes_sxeseis[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`ergasiakes_sxeseis_index${i}`, "ΕΡΓΑΣΙΑΚΕΣ ΣΧΕΣΕΙΣ");
    $(`#ergasiakes_sxeseis_index${i}`).val(
      tables.field_9.ergasiakes_sxeseis[i].row[0]
    );
  }
} else {
  $(".oikonomia").hide();
}

if (koinoniki_politiki) {
  $(".koinoniki-politiki").show();
  $("#koinoniki_politiki").prop("checked", true);
  $("#apasxolisi_table").show();
  $("#koinoniki_asfalisi_table").show();
  $("#koinoniki_pronoia_table").show();
  $("#ygeia_table").show();
  $("#isotita_fylwn_table").show();
  $("#metanasteytiki_prosfygiki_politiki_table").show();
  for (let i in tables.field_9.apasxolisi) {
    $("#apasxolisi_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="apasxolisi_index${i}" name="apasxolisi_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="apasxolisi_year1_${i}" type="text" name="apasxolisi_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.apasxolisi[i].row[1]}"/>
                <input class="govgr-input" id="apasxolisi_year2_${i}" type="text" name="apasxolisi_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.apasxolisi[i].row[2]}"/>
                <input class="govgr-input" id="apasxolisi_year3_${i}" type="text" name="apasxolisi_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.apasxolisi[i].row[3]}"/>
                <input class="govgr-input" id="apasxolisi_year4_${i}" type="text" name="apasxolisi_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.apasxolisi[i].row[4]}"/>
                <input class="govgr-input" id="apasxolisi_year5_${i}" type="text" name="apasxolisi_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.apasxolisi[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="apasxolisi_stoixeia_${i}" type="text" name="apasxolisi_stoixeia_${i}" value="${tables.field_9.apasxolisi[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="apasxolisi_stoxos_${i}" type="text" name="apasxolisi_stoxos_${i}" value="${tables.field_9.apasxolisi[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`apasxolisi_index${i}`, "ΑΠΑΣΧΟΛΗΣΗ");
    $(`#apasxolisi_index${i}`).val(tables.field_9.apasxolisi[i].row[0]);
  }
  for (let i in tables.field_9.koinoniki_asfalisi) {
    $("#koinoniki_asfalisi_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="koinoniki_asfalisi_index${i}" name="koinoniki_asfalisi_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="koinoniki_asfalisi_year1_${i}" type="text" name="koinoniki_asfalisi_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.koinoniki_asfalisi[i].row[1]}"/>
                <input class="govgr-input" id="koinoniki_asfalisi_year2_${i}" type="text" name="koinoniki_asfalisi_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.koinoniki_asfalisi[i].row[2]}"/>
                <input class="govgr-input" id="koinoniki_asfalisi_year3_${i}" type="text" name="koinoniki_asfalisi_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.koinoniki_asfalisi[i].row[3]}"/>
                <input class="govgr-input" id="koinoniki_asfalisi_year4_${i}" type="text" name="koinoniki_asfalisi_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.koinoniki_asfalisi[i].row[4]}"/>
                <input class="govgr-input" id="koinoniki_asfalisi_year5_${i}" type="text" name="koinoniki_asfalisi_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.koinoniki_asfalisi[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_asfalisi_stoixeia_${i}" type="text" name="koinoniki_asfalisi_stoixeia_${i}" value="${tables.field_9.koinoniki_asfalisi[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_asfalisi_stoxos_${i}" type="text" name="koinoniki_asfalisi_stoxos_${i}" value="${tables.field_9.koinoniki_asfalisi[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`koinoniki_asfalisi_index${i}`, "ΚΟΙΝΩΝΙΚΗ ΑΣΦΑΛΙΣΗ");
    $(`#koinoniki_asfalisi_index${i}`).val(
      tables.field_9.koinoniki_asfalisi[i].row[0]
    );
  }
  for (let i in tables.field_9.koinoniki_pronoia) {
    $("#koinoniki_pronoia_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="koinoniki_pronoia_index${i}" name="koinoniki_pronoia_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="koinoniki_pronoia_year1_${i}" type="text" name="koinoniki_pronoia_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.koinoniki_pronoia[i].row[1]}"/>
                <input class="govgr-input" id="koinoniki_pronoia_year2_${i}" type="text" name="koinoniki_pronoia_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.koinoniki_pronoia[i].row[2]}"/>
                <input class="govgr-input" id="koinoniki_pronoia_year3_${i}" type="text" name="koinoniki_pronoia_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.koinoniki_pronoia[i].row[3]}"/>
                <input class="govgr-input" id="koinoniki_pronoia_year4_${i}" type="text" name="koinoniki_pronoia_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.koinoniki_pronoia[i].row[4]}"/>
                <input class="govgr-input" id="koinoniki_pronoia_year5_${i}" type="text" name="koinoniki_pronoia_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.koinoniki_pronoia[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_pronoia_stoixeia_${i}" type="text" name="koinoniki_pronoia_stoixeia_${i}" value="${tables.field_9.koinoniki_pronoia[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_pronoia_stoxos_${i}" type="text" name="koinoniki_pronoia_stoxos_${i}" value="${tables.field_9.koinoniki_pronoia[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`koinoniki_pronoia_index${i}`, "ΚΟΙΝΩΝΙΚΗ ΠΡΟΝΟΙΑ");
    $(`#koinoniki_pronoia_index${i}`).val(
      tables.field_9.koinoniki_pronoia[i].row[0]
    );
  }
  for (let i in tables.field_9.ygeia) {
    $("#ygeia_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="ygeia_index${i}" name="ygeia_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ygeia_year1_${i}" type="text" name="ygeia_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.ygeia[i].row[1]}"/>
                <input class="govgr-input" id="ygeia_year2_${i}" type="text" name="ygeia_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.ygeia[i].row[2]}"/>
                <input class="govgr-input" id="ygeia_year3_${i}" type="text" name="ygeia_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.ygeia[i].row[3]}"/>
                <input class="govgr-input" id="ygeia_year4_${i}" type="text" name="ygeia_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.ygeia[i].row[4]}"/>
                <input class="govgr-input" id="ygeia_year5_${i}" type="text" name="ygeia_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.ygeia[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ygeia_stoixeia_${i}" type="text" name="ygeia_stoixeia_${i}" value="${tables.field_9.ygeia[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="ygeia_stoxos_${i}" type="text" name="ygeia_stoxos_${i}" value="${tables.field_9.ygeia[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`ygeia_index${i}`, "ΥΓΕΙΑ");
    $(`#ygeia_index${i}`).val(tables.field_9.ygeia[i].row[0]);
  }
  for (let i in tables.field_9.isotita_fylwn) {
    $("#isotita_fylwn_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="isotita_fylwn_index${i}" name="isotita_fylwn_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="isotita_fylwn_year1_${i}" type="text" name="isotita_fylwn_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.isotita_fylwn[i].row[1]}"/>
                <input class="govgr-input" id="isotita_fylwn_year2_${i}" type="text" name="isotita_fylwn_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.isotita_fylwn[i].row[2]}"/>
                <input class="govgr-input" id="isotita_fylwn_year3_${i}" type="text" name="isotita_fylwn_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.isotita_fylwn[i].row[3]}"/>
                <input class="govgr-input" id="isotita_fylwn_year4_${i}" type="text" name="isotita_fylwn_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.isotita_fylwn[i].row[4]}"/>
                <input class="govgr-input" id="isotita_fylwn_year5_${i}" type="text" name="isotita_fylwn_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.isotita_fylwn[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="isotita_fylwn_stoixeia_${i}" type="text" name="isotita_fylwn_stoixeia_${i}" value="${tables.field_9.isotita_fylwn[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="isotita_fylwn_stoxos_${i}" type="text" name="isotita_fylwn_stoxos_${i}" value="${tables.field_9.isotita_fylwn[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`isotita_fylwn_index${i}`, "ΙΣΟΤΗΤΑ ΦΥΛΩΝ");
    $(`#isotita_fylwn_index${i}`).val(tables.field_9.isotita_fylwn[i].row[0]);
  }
  for (let i in tables.field_9.metanasteytiki_prosfygiki_politiki) {
    $("#metanasteytiki_prosfygiki_politiki_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="metanasteytiki_prosfygiki_politiki_index${i}" name="metanasteytiki_prosfygiki_politiki_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year1_${i}" type="text" name="metanasteytiki_prosfygiki_politiki_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[1]}"/>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year2_${i}" type="text" name="metanasteytiki_prosfygiki_politiki_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[2]}"/>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year3_${i}" type="text" name="metanasteytiki_prosfygiki_politiki_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[3]}"/>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year4_${i}" type="text" name="metanasteytiki_prosfygiki_politiki_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[4]}"/>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year5_${i}" type="text" name="metanasteytiki_prosfygiki_politiki_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_stoixeia_${i}" type="text" name="metanasteytiki_prosfygiki_politiki_stoixeia_${i}" value="${tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_stoxos_${i}" type="text" name="metanasteytiki_prosfygiki_politiki_stoxos_${i}" value="${tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(
      `metanasteytiki_prosfygiki_politiki_index${i}`,
      "ΜΕΤΑΝΑΣΤΕΥΤΙΚΗ-ΠΡΟΣΦΥΓΙΚΗ ΠΟΛΙΤΙΚΗ"
    );
    $(`#metanasteytiki_prosfygiki_politiki_index${i}`).val(
      tables.field_9.metanasteytiki_prosfygiki_politiki[i].row[0]
    );
  }
} else {
  $(".koinoniki-politiki").hide();
}

if (dimosia_dioikisi) {
  $(".dimosia-dioikisi").show();
  $("#dimosia_dioikisi").prop("checked", true);
  $("#dimosia_dioikisi_table").show();
  $("#dimosia_asfaleia_table").show();
  $("#dikaiosini_table").show();

  for (let i in tables.field_9.dimosia_dioikisi) {
    $("#dimosia_dioikisi_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="dimosia_dioikisi_index${i}" name="dimosia_dioikisi_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="dimosia_dioikisi_year1_${i}" type="text" name="dimosia_dioikisi_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.dimosia_dioikisi[i].row[1]}"/>
                <input class="govgr-input" id="dimosia_dioikisi_year2_${i}" type="text" name="dimosia_dioikisi_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.dimosia_dioikisi[i].row[2]}"/>
                <input class="govgr-input" id="dimosia_dioikisi_year3_${i}" type="text" name="dimosia_dioikisi_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.dimosia_dioikisi[i].row[3]}"/>
                <input class="govgr-input" id="dimosia_dioikisi_year4_${i}" type="text" name="dimosia_dioikisi_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.dimosia_dioikisi[i].row[4]}"/>
                <input class="govgr-input" id="dimosia_dioikisi_year5_${i}" type="text" name="dimosia_dioikisi_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.dimosia_dioikisi[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="dimosia_dioikisi_stoixeia_${i}" type="text" name="dimosia_dioikisi_stoixeia_${i}" value="${tables.field_9.dimosia_dioikisi[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="dimosia_dioikisi_stoxos_${i}" type="text" name="dimosia_dioikisi_stoxos_${i}" value="${tables.field_9.dimosia_dioikisi[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`dimosia_dioikisi_index${i}`, "ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ");
    $(`#dimosia_dioikisi_index${i}`).val(
      tables.field_9.dimosia_dioikisi[i].row[0]
    );
  }
  for (let i in tables.field_9.dimosia_asfaleia) {
    $("#dimosia_asfaleia_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="dimosia_asfaleia_index${i}" name="dimosia_asfaleia_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="dimosia_asfaleia_year1_${i}" type="text" name="dimosia_asfaleia_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.dimosia_asfaleia[i].row[1]}"/>
                <input class="govgr-input" id="dimosia_asfaleia_year2_${i}" type="text" name="dimosia_asfaleia_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.dimosia_asfaleia[i].row[2]}"/>
                <input class="govgr-input" id="dimosia_asfaleia_year3_${i}" type="text" name="dimosia_asfaleia_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.dimosia_asfaleia[i].row[3]}"/>
                <input class="govgr-input" id="dimosia_asfaleia_year4_${i}" type="text" name="dimosia_asfaleia_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.dimosia_asfaleia[i].row[4]}"/>
                <input class="govgr-input" id="dimosia_asfaleia_year5_${i}" type="text" name="dimosia_asfaleia_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.dimosia_asfaleia[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="dimosia_asfaleia_stoixeia_${i}" type="text" name="dimosia_asfaleia_stoixeia_${i}" value="${tables.field_9.dimosia_asfaleia[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="dimosia_asfaleia_stoxos_${i}" type="text" name="dimosia_asfaleia_stoxos_${i}" value="${tables.field_9.dimosia_asfaleia[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`dimosia_asfaleia_index${i}`, "ΔΗΜΟΣΙΑ ΑΣΦΑΛΕΙΑ");
    $(`#dimosia_asfaleia_index${i}`).val(
      tables.field_9.dimosia_asfaleia[i].row[0]
    );
  }
  for (let i in tables.field_9.dikaiosini) {
    $("#dikaiosini_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="dikaiosini_index${i}" name="dikaiosini_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="dikaiosini_year1_${i}" type="text" name="dikaiosini_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.dikaiosini[i].row[1]}"/>
                <input class="govgr-input" id="dikaiosini_year2_${i}" type="text" name="dikaiosini_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.dikaiosini[i].row[2]}"/>
                <input class="govgr-input" id="dikaiosini_year3_${i}" type="text" name="dikaiosini_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.dikaiosini[i].row[3]}"/>
                <input class="govgr-input" id="dikaiosini_year4_${i}" type="text" name="dikaiosini_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.dikaiosini[i].row[4]}"/>
                <input class="govgr-input" id="dikaiosini_year5_${i}" type="text" name="dikaiosini_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.dikaiosini[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="dikaiosini_stoixeia_${i}" type="text" name="dikaiosini_stoixeia_${i}" value="${tables.field_9.dikaiosini[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="dikaiosini_stoxos_${i}" type="text" name="dikaiosini_stoxos_${i}" value="${tables.field_9.dikaiosini[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(`dikaiosini_index${i}`, "ΔΙΚΑΙΟΣΥΝΗ");
    $(`#dikaiosini_index${i}`).val(tables.field_9.dikaiosini[i].row[0]);
  }
} else {
  $(".dimosia-dioikisi").hide();
}

if (anaptiksi) {
  $(".ependyseis").show();
  $("#anaptiksi").prop("checked", true);
  $("#ependytiki_drastiriotita_table").show();
  $("#perivallon_energeia_table").show();
  for (let i in tables.field_9.ependytiki_drastiriotita) {
    $("#ependytiki_drastiriotita_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="ependytiki_drastiriotita_index${i}" name="ependytiki_drastiriotita_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ependytiki_drastiriotita_year1_${i}" type="text" name="ependytiki_drastiriotita_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.ependytiki_drastiriotita[i].row[1]}"/>
                <input class="govgr-input" id="ependytiki_drastiriotita_year2_${i}" type="text" name="ependytiki_drastiriotita_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.ependytiki_drastiriotita[i].row[2]}"/>
                <input class="govgr-input" id="ependytiki_drastiriotita_year3_${i}" type="text" name="ependytiki_drastiriotita_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.ependytiki_drastiriotita[i].row[3]}"/>
                <input class="govgr-input" id="ependytiki_drastiriotita_year4_${i}" type="text" name="ependytiki_drastiriotita_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.ependytiki_drastiriotita[i].row[4]}"/>
                <input class="govgr-input" id="ependytiki_drastiriotita_year5_${i}" type="text" name="ependytiki_drastiriotita_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.ependytiki_drastiriotita[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ependytiki_drastiriotita_stoixeia_${i}" type="text" name="ependytiki_drastiriotita_stoixeia_${i}" value="${tables.field_9.ependytiki_drastiriotita[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="ependytiki_drastiriotita_stoxos_${i}" type="text" name="ependytiki_drastiriotita_stoxos_${i}" value="${tables.field_9.ependytiki_drastiriotita[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(
      `ependytiki_drastiriotita_index${i}`,
      "ΕΠΙΧΕΙΡΗΜΑΤΙΚΗ/ΕΠΕΝΔΥΤΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ"
    );
    $(`#ependytiki_drastiriotita_index${i}`).val(
      tables.field_9.ependytiki_drastiriotita[i].row[0]
    );
  }
  for (let i in tables.field_9.perivallon_energeia) {
    $("#perivallon_energeia_table_tbody").append(`
        <tr id="R${i}">
            <td>
                <select id="perivallon_energeia_index${i}" name="perivallon_energeia_index${i}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="perivallon_energeia_year1_${i}" type="text" name="perivallon_energeia_year1_${i}" style="width:40%;" placeholder="χρονιά 1" value="${tables.field_9.perivallon_energeia[i].row[1]}"/>
                <input class="govgr-input" id="perivallon_energeia_year2_${i}" type="text" name="perivallon_energeia_year2_${i}" style="width:40%;" placeholder="χρονιά 2" value="${tables.field_9.perivallon_energeia[i].row[2]}"/>
                <input class="govgr-input" id="perivallon_energeia_year3_${i}" type="text" name="perivallon_energeia_year3_${i}" style="width:40%;" placeholder="χρονιά 3" value="${tables.field_9.perivallon_energeia[i].row[3]}"/>
                <input class="govgr-input" id="perivallon_energeia_year4_${i}" type="text" name="perivallon_energeia_year4_${i}" style="width:40%;" placeholder="χρονιά 4" value="${tables.field_9.perivallon_energeia[i].row[4]}"/>
                <input class="govgr-input" id="perivallon_energeia_year5_${i}" type="text" name="perivallon_energeia_year5_${i}" style="width:40%;" placeholder="χρονιά 5" value="${tables.field_9.perivallon_energeia[i].row[5]}"/>
                
            </td>
            <td>
                <input class="govgr-input" id="perivallon_energeia_stoixeia_${i}" type="text" name="perivallon_energeia_stoixeia_${i}" value="${tables.field_9.perivallon_energeia[i].row[6]}"/>
            </td>
            <td>
                <input class="govgr-input" id="perivallon_energeia_stoxos_${i}" type="text" name="perivallon_energeia_stoxos_${i}" value="${tables.field_9.perivallon_energeia[i].row[7]}"/>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>
    `);
    populateIndexSelect(
      `perivallon_energeia_index${i}`,
      "ΠΕΡΙΒΑΛΛΟΝ – ΕΝΕΡΓΕΙΑ"
    );
    $(`#perivallon_energeia_index${i}`).val(
      tables.field_9.perivallon_energeia[i].row[0]
    );
  }
} else {
  $(".ependyseis :input").hide();
}

if ($("#field_4").val() === "Ναι") {
  $("#field_4_wrap").show();
}
if ($("#field_6").val() === "Ναι") {
  $("#field_6_wrap").show();
}
if ($("#field_11").val() === "Ναι") {
  $("#field_11_wrap").show();
}
if ($("#field_12").val() === "Ναι") {
  $("#field_12_wrap").show();
}
if ($("#field_13").val() === "Ναι") {
  $("#field_13_wrap").show();
}
if ($("#field_36").val() === "Ναι") {
  $("#field_36_wrap").show();
}

if (field_10[0] !== undefined && field_10[0] && field_10[0] === "on") {
  $("#field_10_amesi").prop("checked", true);
  $("#amesi_wrap").show();
  requiredDigitalGov("#field_10_amesi");
}

if (field_10[1] !== undefined && field_10[1] && field_10[1] === "on") {
  $("#field_10_emmesi").prop("checked", true);
  $("#emesi_wrap").show();
  requiredDigitalGov("#field_10_emmesi");
}

if (field_25[0] !== undefined && field_25[0] && field_25[0] === "on") {
  $("#field_25_dikaio").prop("checked", true);
  $("#dikaio_wrap").toggle();
}

if (field_25[1] !== undefined && field_25[1] && field_25[1] === "on") {
  $("#field_25_kanonismos").prop("checked", true);
  $("#kanonismos_wrap").toggle();
}

if (field_25[2] !== undefined && field_25[2] && field_25[2] === "on") {
  $("#field_25_odigia").prop("checked", true);
  $("#odigia_wrap").toggle();
}

if (field_25[3] !== undefined && field_25[3] && field_25[3] === "on") {
  $("#field_25_apofasi").prop("checked", true);
  $("#apofasi_wrap").toggle();
}

if (field_26[0] !== undefined && field_26[0] && field_26[0] === "on") {
  $("#field_26_antrwpina_dikaiwmata").prop("checked", true);
  $("#antrwpina_dikaiwmata_wrap").toggle();
}

if (field_26[1] !== undefined && field_26[1] && field_26[1] === "on") {
  $("#field_26_symvaseis").prop("checked", true);
  $("#symvaseis_wrap").toggle();
}

if (field_27[0] !== undefined && field_27[0] && field_27[0] === "on") {
  $("#field_27_dikastirio").prop("checked", true);
  $("#dikastirio_wrap").toggle();
}

if (field_27[1] !== undefined && field_27[1] && field_27[1] === "on") {
  $("#field_27_arxi").prop("checked", true);
  $("#arxi_wrap").toggle();
}
if (field_28[0] !== undefined && field_28[0] && field_28[0] === "on") {
  $("#field_28_nomologia").prop("checked", true);
  $("#nomologia_wrap").toggle();
}
if (field_28[1] !== undefined && field_28[1] && field_28[1] === "on") {
  $("#field_28_nomologia_dikaiwmatwn_anthrwpou").prop("checked", true);
  $("#nomologia_dikaiwmatwn_anthrwpou_wrap").toggle();
}
if (field_28[2] !== undefined && field_28[2] && field_28[2] === "on") {
  $("#field_28_alla_dikastiria").prop("checked", true);
  $("#alla_dikastiria_wrap").toggle();
}

if (ekthesi_glk || $("#status_ekthesis").val() === Status.Pending) {
  $("#ekthesi_glk").prop("checked", true);
}

if (approvals[0] !== undefined && approvals[0]) {
  $("#egkrisi_aksiologisis_nomoparaskeyastikis").prop("checked", true);
  submitVisibility();
}

if (approvals[1] !== undefined && approvals[1]) {
  $("#egkrisi_dieuthinsis_nomoparaskeyastikis").prop("checked", true);
  submitVisibility();
}

if (approvals[2] !== undefined && approvals[2]) {
  $("#egkrisi_kalis_nomothetisis").prop("checked", true);
  submitVisibility();
}

if (approvals[3] !== undefined && approvals[3]) {
  $("#egkrisi_genikou_grammatea").prop("checked", true);
  submitVisibility();
}

if (
  role === Roles.LegislativeCommittee &&
  ($("#typos_analysis").val() == Type.DraftLaw ||
    $("#typos_analysis").val() == Type.Guidelines)
) {
  $(".convert").show();
}
//init_submit date - will be updated when actually submitted
if ($("#last_updated").val() == "") {
  setDate("#last_updated");
}
if ($("#uploads_36 tbody tr").length > 0) {
  $("#field_36").prop("selectedIndex", 1);
  $("#uploads_36_wrap").show();
}

if (tables) {
  if (tables.field_18 && Array.isArray(tables.field_18)) {
    fillTable(tables.field_18);
  }
  if (tables.field_19 && Array.isArray(tables.field_19)) {
    fillTable(tables.field_19);
  }
  if (tables.field_20 && Array.isArray(tables.field_20)) {
    fillTable(tables.field_20);
  }
}

for (let i in ministries) {
  $("#field_15_ypoyrgeio").append(
    `<option value="${ministries[i]}">${ministries[i]}</option>`
  );
  $("#field_17_ypoyrgeio").append(
    `<option value="${ministries[i]}">${ministries[i]}</option>`
  );
}

$("#field_15_ypoyrgeio").val(
  field_15_ministry
    ? field_15_ministry
    : $("#field_15_ypoyrgeio option:first").val()
);
$("#field_17_ypoyrgeio").val(
  field_17_ministry
    ? field_17_ministry
    : $("#field_17_ypoyrgeio option:first").val()
);

let index = $("#tbody_ministers").prop("rows").length;
for (let j in tables.signatories.minister_name) {
  $("#tbody_ministers").append(`
  <tr id="R${++index}">
      </td>
      <td>
        <select id="minister_name${index}" name="minister_name${index}" class="govgr-select" onchange="ministerNameOnChange('minister_name${index}', 'minister_role${index}', 'minister_ministry${index}')" required></select>
      </td>
      <td>
        <textarea class="form-control" id="minister_role${index}" name="minister_role${index}" rows="1" readonly>${
    tables.signatories.minister_role[j]
  }</textarea>
        <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
        <input type="hidden" id="minister_ministry${index}" name="minister_ministry${index}" >
        </td>
    </tr>`);
  populateMinistersNameSelect(`minister_name${index}`);
  if (tables.signatories && tables.signatories.minister_name[j]) {
    $(`#minister_name${index}`).val(tables.signatories.minister_name[j]);
  }
  if (tables.signatories && tables.signatories.minister_ministry[j]) {
    $(`#minister_ministry${index}`).val(
      tables.signatories.minister_ministry[j]
    );
  }
}

index = $("#tbody_17").prop("rows").length;
for (let i in tables.field_17_signatories.field_17_minister_name) {
  $("#tbody_17").append(`
        <tr id="R${++index}">            
            <td>
              <select id="field_17_minister_name${index}" name="field_17_minister_name${index}" class="col-sm-8 form-control" onchange="ministerSurnameOnChange('field_17_minister_name${index}', 'field_17_minister_role${index}', 'field_17_minister_ministry${index}')" required></select>
            </td>
            <td>
                <textarea class="form-control" id="field_17_minister_role${index}" name="field_17_minister_role${index}" readonly rows="1">${
    tables.field_17_signatories.field_17_minister_role[j]
  }</textarea>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
                <input type="hidden" id="field_17_minister_ministry${index}" name="field_17_minister_ministry${index}">
            </td>
        </tr>`);
  populateMinistersNameSelect(`field_17_minister_surname${index}`);
  if (
    tables.field_17_signatories &&
    tables.field_17_signatories.field_17_minister_name[j]
  ) {
    $(`#field_17_minister_name${index}`).val(
      tables.field_17_signatories.field_17_minister_name[j]
    );
  }
  if (
    tables.field_17_signatories &&
    tables.field_17_signatories.field_17_minister_ministry[j]
  ) {
    $(`#field_17_minister_ministry${index}`).val(
      tables.field_17_signatories.field_17_minister_ministry[j]
    );
  }
}

// TODO: refactor
if (role === Roles.GeneralAccountingOffice) {
  $(
    "#edit_form :input:not(#status_ekthesis, .glk :input, .next, .previous, .export-pdf, #save_temporarily, #final_save)"
  ).prop("disabled", true);
  if ($("#status_ekthesis").val() === Status.Pending) {
    $("#export_glk").hide();
  }
} else if (role == Roles.Parliament) {
  $("#edit_form :input:not(.next, .previous)").prop("disabled", true);
} else {
  $(".glk :input:not(#ekthesi_glk, .next, .previous)").prop("disabled", true);
}

if (role === Roles.ResponsibleForMinistry || role === Roles.Parliamentarian) {
  if ($("#status_ekthesis").val() === Status.Completed) {
    $("#edit_form :input:not(.export-pdf, .next, .previous)").prop(
      "disabled",
      true
    );
  }
}

if (role === Roles.QualityEvaluationCommittee) {
  $(
    ".egkrisi_kalis_nomothetisis, .egkrisi_dieuthinsis_nomoparaskeyastikis, .egkrisi_genikou_grammatea, #final_save"
  ).prop("disabled", true);
} else if (role === Roles.GoodLegislationOffice) {
  $(
    ".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_dieuthinsis_nomoparaskeyastikis, .egkrisi_genikou_grammatea, #final_save"
  ).prop("disabled", true);
} else if (role === Roles.LegislativeProcedureDirectorate) {
  $(
    ".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_kalis_nomothetisis, .egkrisi_genikou_grammatea, #final_save"
  ).prop("disabled", true);
} else if (
  role === Roles.GeneralSecretary &&
  $("#status_ekthesis").val() !== Status.Finalized
) {
  $(
    ".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_kalis_nomothetisis, .egkrisi_dieuthinsis_nomoparaskeyastikis, #final_save"
  ).prop("disabled", true);
}

if (
  role === Roles.QualityEvaluationCommittee ||
  role === Roles.GoodLegislationOffice ||
  role === Roles.LegislativeProcedureDirectorate ||
  role === Roles.GeneralSecretary
) {
  if (
    $("#status_ekthesis").val() === Status.Completed ||
    $("#status_ekthesis").val() === Status.Checked
  ) {
    $(".ggnkth").show();
  } else if ($("#status_ekthesis").val() === Status.Finalized) {
    $(".ggnkth").show();
    $(".ggnkth input[type=checkbox]").prop("disabled", true);
  }
}

if (role === Roles.Composer) {
  if ($("#status_ekthesis").val() != Status.Composing) {
    "#edit_form :input:not(.next, .previous)".prop("disabled", true);
  }
}

if ($("#status_ekthesis").val() === Status.Finalized) {
  $("#edit_form :input:not( .next, .previous)").prop("disabled", true);
  //$("#edit_form :input[type=checkbox]").prop("disable",true);
}

if (
  (role === Roles.LegislativeCommittee &&
    $("#pdf_download").prop("hidden") === false &&
    $("#status_ekthesis").val() === Status.Finalized) ||
  ($("#status_ekthesis").val() === Status.Finalized &&
    role === Roles.GeneralSecretary)
) {
  $("#signed_pdf_div").show();
  $("#pdf_download, #signed_pdf_upload, .export-pdf").prop("disabled", false);
  if ("<%= data.egkrisi_genikou_grammatea%>") {
    $(".create-new").prop("disabled", false);
  }
  $(".next").prop("disabled", false);
  $(".previous").prop("disabled", false);
}

if ($("#status_ekthesis").val() === Status.Uploaded) {
  $(
    "#edit_form :input:not(#signed_pdf_div, #upload_signed_pdf, .next, .previous)"
  ).prop("disabled", true);
  $("#signed_pdf_div").show();
}

//TODO: complete functions and fix order
viewFormRoleRestriction();
// viewFormAnalysisRestriction();
// analysisRestrictions();

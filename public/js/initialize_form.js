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

ekpedeusi_politismos
  ? ($(".ekpaideysi-politismos :input").prop("disabled", false),
    $("#ekpedeusi_politismos").prop("checked", true),
    $("#politismos_table").show(),
    $("#ekpaideysi_table").show())
  : $(".ekpaideysi-politismos :input").prop("disabled", true);

if (eksoteriki_politiki) {
  $("#eksoteriki_politiki").prop("checked", true);
}

forologiki_politiki
  ? ($(".oikonomia :input").prop("disabled", false),
    $("#forologiki_politiki").prop("checked", true),
    $("#oikonomia_table").show(),
    $("#forologia_table").show(),
    $("#ergasiakes_sxeseis_table").show())
  : $(".oikonomia :input").prop("disabled", true);

koinoniki_politiki
  ? ($(".koinoniki-politiki :input").prop("disabled", false),
    $("#koinoniki_politiki").prop("checked", true),
    $("#apasxolisi_table").show(),
    $("#koinoniki_asfalisi_table").show(),
    $("#koinoniki_pronoia_table").show(),
    $("#ygeia_table").show(),
    $("#isotita_fylwn_table").show(),
    $("#metanasteytiki_prosfygiki_politiki_table").show())
  : $(".koinoniki-politiki :input").prop("disabled", true);

dimosia_dioikisi
  ? ($(".dimosia-dioikisi :input").prop("disabled", false),
    $("#dimosia_dioikisi").prop("checked", true),
    $("#dimosia_dioikisi_table").show(),
    $("#dimosia_asfaleia_table").show(),
    $("#dikaiosini_table").show())
  : $(".dimosia-dioikisi :input").prop("disabled", true);

anaptiksi
  ? ($(".ependyseis :input").prop("disabled", false),
    $("#anaptiksi").prop("checked", true),
    $("#ependytiki_drastiriotita_table").show(),
    $("#perivallon_energeia_table").show())
  : $(".ependyseis :input").prop("disabled", true);

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

if (
  ekthesi_glk ||
  $("#status_ekthesis").val() ===
    "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"
) {
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
// to here

if (
  role === "Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)" &&
  ($("#typos_analysis").val() == "Προσχέδιο νόμου" ||
    $("#typos_analysis").val() == "Κατευθυντήριες γραμμές")
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
  tables = tables
    .replace(/\\n/g, "\\n")
    .replace(/&#34;/g, '"')
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f")
    .replace(/\\n/g, "");
  tables = JSON.parse(tables);
  var prefix;

  for (var i in tables.checkbox_tables) {
    for (var j in tables.checkbox_tables[i].table) {
      for (var k in tables.checkbox_tables[i].table[j].row) {
        var cbxname = Object.keys(tables.checkbox_tables[i].table[j].row[k]); //get key
        var cbxvalue = Object.values(tables.checkbox_tables[i].table[j].row[k]);
        if (cbxvalue[0]) {
          $("input[name='" + cbxname + "']").prop("checked", true); //if value, target checkbox is checked
        }
      }
    }
  }

  for (var i in tables.static_tables) {
    for (var j in tables.static_tables[i].table) {
      for (var k in tables.static_tables[i].table[j].row) {
        var sttcname = Object.keys(tables.static_tables[i].table[j].row[k]);
        var sttcvalue = Object.values(tables.static_tables[i].table[j].row[k]);
        if (sttcvalue[0]) {
          $("input[name='" + sttcname + "']").prop("value", sttcvalue);
        }
      }
    }
  }
}

for (let i in ministriesArray) {
  $("#field_15_ypoyrgeio").append(
    `<option value="${ministriesArray[i]}">${ministriesArray[i]}</option>`
  );
  $("#field_17_ypoyrgeio").append(
    `<option value="${ministriesArray[i]}">${ministriesArray[i]}</option>`
  );
}

$("#field_15_ypoyrgeio").val(
  f15ministry ? f15ministry : $("#field_15_ypoyrgeio option:first").val()
);
$("#field_17_ypoyrgeio").val(
  f17ministry ? f17ministry : $("#field_17_ypoyrgeio option:first").val()
);

let index = $("#tbody_ministers").prop("rows").length;
for (let j in ministersNames) {
  $("#tbody_ministers").append(`
    <tr id="R${++index}">  
      <td> 
        <textarea class="form-control" id="minister_name${index}" name="minister_name${index}" rows="1" readonly>${
    ministersNames[j].elem
  }</textarea> 
      </td>    
      <td> 
        <select id="minister_surname${index}" name="minister_surname${index}" class="col-sm-8 form-control" onchange="ministerSurnameOnChange('minister_name${index}', 'minister_surname${index}', 'minister_role${index}', 'minister_ministry${index}')" required></select>
      </td> 
      <td> 
        <textarea class="form-control" id="minister_role${index}" name="minister_role${index}" rows="1" readonly>${
    ministersRoles[j].elem
  }</textarea>
        <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
        <input type="hidden" id="minister_ministry${index}" name="minister_ministry${index}" >
        </td> 
    </tr>`);
  populateMinistersSurnameSelect(`minister_surname${index}`);
  $(`#minister_surname${index}`).val(ministersSurnames[j].elem);
  $(`#minister_ministry${index}`).val(ministersMinistry[j].elem);
}

index = $("#tbody_17").prop("rows").length;
for (let i in f17ministersNames) {
  $("#tbody_17").append(`
        <tr id="R${++index}">  
            <td> 
                <textarea class="form-control" id="field_17_minister_name${index}" name="field_17_minister_name${index}" readonly rows="1">${
    f17ministersNames[i].elem
  }</textarea> 
            </td>    
            <td> 
              <select id="field_17_minister_surname${index}" name="field_17_minister_surname${index}" class="col-sm-8 form-control" onchange="ministerSurnameOnChange('field_17_minister_name${index}', 'field_17_minister_surname${index}', 'field_17_minister_role${index}', 'field_17_minister_ministry${index}')" required></select>    
            </td> 
            <td> 
                <textarea class="form-control" id="field_17_minister_role${index}" name="field_17_minister_role${index}" readonly rows="1">${
    f17ministersRoles[i].elem
  }</textarea>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
                <input type="hidden" id="field_17_minister_ministry${index}" name="field_17_minister_ministry${index}">
            </td> 
        </tr>`);
  populateMinistersSurnameSelect(`field_17_minister_surname${index}`);
  $(`#field_17_minister_surname${index}`).val(f17ministersSurnames[i].elem);
  $(`#field_17_minister_ministry${index}`).val(f17ministersMinistry[i].elem);
}

// TODO: refactor
if (role === "Γενικό Λογιστήριο του Κράτους") {
  $(
    "#edit_form :input:not(#status_ekthesis, .glk :input, .next, .previous, .export-pdf, #save_temporarily)" //, #final_save
  ).prop("disabled", true);
  if (
    $("#status_ekthesis").val() ===
    "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"
  ) {
    $("#export_glk").hide();
  }
} else if (role == "Βουλή") {
  $("#edit_form :input:not(.next, .previous)").prop("disabled", true);
} else {
  $(".glk :input:not(#ekthesi_glk, .next, .previous)").prop("disabled", true);
}

if (
  role ===
    "Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων" ||
  role === "Βουλευτής"
) {
  if ($("#status_ekthesis").val() === "Ολοκληρώθηκε") {
    $("#edit_form :input:not(.export-pdf, .next, .previous)").prop(
      "disabled",
      true
    );
  }
}

if (
  role ===
  "Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)"
) {
  $(
    ".egkrisi_kalis_nomothetisis, .egkrisi_dieuthinsis_nomoparaskeyastikis, .egkrisi_genikou_grammatea, #final_save"
  ).prop("disabled", true);
} else if (role === "Γραφείο Καλής Νομοθέτησης (ΓΓΝΚΘ)") {
  $(
    ".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_dieuthinsis_nomoparaskeyastikis, .egkrisi_genikou_grammatea, #final_save"
  ).prop("disabled", true);
} else if (role === "Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)") {
  $(
    ".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_kalis_nomothetisis, .egkrisi_genikou_grammatea, #final_save"
  ).prop("disabled", true);
} else if (
  role === "Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων" &&
  $("#status_ekthesis").val() !== "Οριστικοποιήθηκε"
) {
  $(
    ".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_kalis_nomothetisis, .egkrisi_dieuthinsis_nomoparaskeyastikis, #final_save"
  ).prop("disabled", true);
}

if (
  role ===
    "Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)" ||
  role === "Γραφείο Καλής Νομοθέτησης (ΓΓΝΚΘ)" ||
  role === "Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)" ||
  role === "Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων"
) {
  if (
    $("#status_ekthesis").val() === "Ολοκληρώθηκε" ||
    $("#status_ekthesis").val() ===
      "Ελέγχθηκε από το Γενικό Λογιστήριο του Κράτους"
  ) {
    $(".ggnkth").show();
  } else if ($("#status_ekthesis").val() === "Οριστικοποιήθηκε") {
    $(".ggnkth").show();
    $(".ggnkth input[type=checkbox]").prop("disabled", true);
  }
}

if (role === "Συντάκτης επισπεύδοντος Υπουργείου") {
  if ($("#status_ekthesis").val() != "Συντάσσεται") {
    ("#edit_form :input:not(.next, .previous)").prop('disabled', true);
  }
}

if ($("#status_ekthesis").val() === "Οριστικοποιήθηκε") {
  $("#edit_form :input").prop("disabled", true);
  //$("#edit_form :input[type=checkbox]").prop("disable",true);
}

if (
  (role === "Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)" &&
    $("#pdf_download").prop("hidden") === false &&
    $("#status_ekthesis").val() === "Οριστικοποιήθηκε") ||
  ($("#status_ekthesis").val() === "Οριστικοποιήθηκε" &&
    role === "Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων")
) {
  $("#signed_pdf_div").show();
  $("#pdf_download, #signed_pdf_upload, .export-pdf").prop("disabled", false);
  if ("<%= data.egkrisi_genikou_grammatea%>") {
    $(".create-new").prop("disabled", false);
  }
  $(".next").prop("disabled", false);
  $(".previous").prop("disabled", false);
}

if ($("#status_ekthesis").val() === "Κατατέθηκε") {
  $(
    "#edit_form :input:not(#signed_pdf_div, #upload_signed_pdf, .next, .previous)"
  ).prop("disabled", true);
  $("#signed_pdf_div").show();
}

//TODO: complete functions and fix order
viewFormRoleRestriction();
// viewFormAnalysisRestriction();
// analysisRestrictions();

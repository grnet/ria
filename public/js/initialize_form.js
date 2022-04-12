//declare pdf_exists
// if (pdf_exists) {
//     $("#pdf_download").show();
// }

requiredLegalistics("#field_33"); //set initial state for fields 33-40

let ekpedeusi_politismos = "<%= data.ekpedeusi_politismos %>";
ekpedeusi_politismos
  ? ($(".ekpaideysi-politismos :input").prop("disabled", false),
    $("#ekpedeusi_politismos").prop("checked", true),
    $("#politismos_table").show(),
    $("#ekpaideysi_table").show())
  : $(".ekpaideysi-politismos :input").prop("disabled", true);

if ("<%= data.eksoteriki_politiki %>") {
  $("#eksoteriki_politiki").prop("checked", true);
}

let forologiki_politiki = "<%= data.forologiki_politiki %>";
forologiki_politiki
  ? ($(".oikonomia :input").prop("disabled", false),
    $("#forologiki_politiki").prop("checked", true),
    $("#oikonomia_table").show(),
    $("#forologia_table").show(),
    $("#ergasiakes_sxeseis_table").show())
  : $(".oikonomia :input").prop("disabled", true);

let koinoniki_politiki = "<%= data.koinoniki_politiki %>";
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

let dimosia_dioikisi = "<%= data.dimosia_dioikisi %>";
dimosia_dioikisi
  ? ($(".dimosia-dioikisi :input").prop("disabled", false),
    $("#dimosia_dioikisi").prop("checked", true),
    $("#dimosia_dioikisi_table").show(),
    $("#dimosia_asfaleia_table").show(),
    $("#dikaiosini_table").show())
  : $(".dimosia-dioikisi :input").prop("disabled", true);

let anaptiksi = "<%= data.anaptiksi %>";
anaptiksi
  ? ($(".ependyseis :input").prop("disabled", false),
    $("#anaptiksi").prop("checked", true),
    $("#ependytiki_drastiriotita_table").show(),
    $("#perivallon_energeia_table").show())
  : $(".ependyseis :input").prop("disabled", true);

if ("<%= data.field_10_amesi%>") {
  $("#field_10_amesi").prop("checked", true);
  $("#amesi_wrap").show();
  requiredDigitalGov("#field_10_amesi");
}

if ("<%= data.field_10_emmesi %>") {
  $("#field_10_emmesi").prop("checked", true);
  $("#emesi_wrap").show();
  requiredDigitalGov("#field_10_emmesi");
}

if ("<%= data.field_25_dikaio %>") {
  $("#field_25_dikaio").prop("checked", true);
  $("#dikaio_wrap").toggle();
}

if ("<%= data.field_25_kanonismos %>") {
  $("#field_25_kanonismos").prop("checked", true);
  $("#kanonismos_wrap").toggle();
}

if ("<%= data.field_25_odigia %>") {
  $("#field_25_odigia").prop("checked", true);
  $("#odigia_wrap").toggle();
}

if ("<%= data.field_25_apofasi %>") {
  $("#field_25_apofasi").prop("checked", true);
  $("#apofasi_wrap").toggle();
}

if ("<%= data.field_26_antrwpina_dikaiwmata %>") {
  $("#field_26_antrwpina_dikaiwmata").prop("checked", true);
  $("#antrwpina_dikaiwmata_wrap").toggle();
}

if ("<%= data.field_26_symvaseis %>") {
  $("#field_26_symvaseis").prop("checked", true);
  $("#symvaseis_wrap").toggle();
}

if ("<%= data.field_27_dikastirio %>") {
  $("#field_27_dikastirio").prop("checked", true);
  $("#dikastirio_wrap").toggle();
}

if ("<%= data.field_27_arxi %>") {
  $("#field_27_arxi").prop("checked", true);
  $("#arxi_wrap").toggle();
}
if ("<%= data.field_28_nomologia %>") {
  $("#field_28_nomologia").prop("checked", true);
  $("#nomologia_wrap").toggle();
}
if ("<%= data.field_28_nomologia_dikaiwmatwn_anthrwpou %>") {
  $("#field_28_nomologia_dikaiwmatwn_anthrwpou").prop("checked", true);
  $("#nomologia_dikaiwmatwn_anthrwpou_wrap").toggle();
}
if ("<%= data.field_28_alla_dikastiria %>") {
  $("#field_28_alla_dikastiria").prop("checked", true);
  $("#alla_dikastiria_wrap").toggle();
}
var field_18 = `<%= data.field_18_comments%>`;
if (field_18) {
  $("#field_18_comments").val(field_18);
}

var field_19 = `<%= data.field_19_comments %>`;
if (field_19) {
  $("#field_19_comments").val(field_19);
}

var field_20 = `<%= data.field_20_comments %>`;
if (field_20) {
  $("#field_20_comments").val(field_20);
}

var spans = $("span"); //find all spans
spans.splice(1);
$.each(spans.splice(1), function (key, field) {
  //first span is modal's which we do not need
  var txtarea = $(this).closest("p").siblings("textarea");
  if (txtarea) {
    //if span has a textarea sibling
    wordsCounter(txtarea.prop("id"), $(this).prop("id")); //count words
  }
});

//debug from here
if ("<%= data.egkrisi_aksiologisis_nomoparaskeyastikis %>") {
  $("#egkrisi_aksiologisis_nomoparaskeyastikis").prop("checked", true);
  submitVisibility();
}

if ("<%= data.egkrisi_dieuthinsis_nomoparaskeyastikis %>") {
  $("#egkrisi_dieuthinsis_nomoparaskeyastikis").prop("checked", true);
  submitVisibility();
}

if ("<%= data.egkrisi_kalis_nomothetisis %>") {
  $("#egkrisi_kalis_nomothetisis").prop("checked", true);
  submitVisibility();
}

if ("<%= data.egkrisi_genikou_grammatea %>") {
  $("#egkrisi_genikou_grammatea").prop("checked", true);
  submitVisibility();
}
// to here
if (
  "<%= data.ekthesi_glk%>" ||
  $("#status_ekthesis").val() ===
    "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"
) {
  $("#ekthesi_glk").prop("checked", true);
}

//refactor code bellow
// if (role === "Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)") {
//     optionalFields(".egkrisi_kalis_nomothetisis, .egkrisi_dieuthinsis_nomoparaskeyastikis, .egkrisi_genikou_grammatea");
//     optionalFields(".create-new");
// } else if (role === "Γραφείο Καλής Νομοθέτησης (ΓΓΝΚΘ)") {
//     optionalFields(".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_dieuthinsis_nomoparaskeyastikis, .egkrisi_genikou_grammatea");
//     optionalFields(".create-new");
// } else if (role === "Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)") {
//     optionalFields(".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_kalis_nomothetisis, .egkrisi_genikou_grammatea");
//     optionalFields(".create-new");
// } else if (role === "Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων" && $("#status_ekthesis").val() !== "Οριστικοποιήθηκε") {
//     optionalFields(".egkrisi_aksiologisis_nomoparaskeyastikis, .egkrisi_kalis_nomothetisis, .egkrisi_dieuthinsis_nomoparaskeyastikis");
//     optionalFields(".create-new");
// }

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

if (
  role === "Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)" &&
  ($("#typos_analysis").val() == "Προσχέδιο νόμου" ||
    $("#typos_analysis").val() == "Κατευθυντήριες γραμμές")
) {
  $(".convert").show();
  // enableFields(".convert")
}
//init_submit date - will be updated when actually submitted
if ($("#last_updated").val() == "") {
  setDate("#last_updated");
}
if ($("#uploads_36 tbody tr").length > 0) {
  $("#field_36").prop("selectedIndex", 1);
  $("#uploads_36_wrap").show();
}

setDropdown();

// var tables = "<%= JSON.stringify(tables) %>";
// if (tables) {
//   tables = tables
//     .replace(/\\n/g, "\\n")
//     .replace(/&#34;/g, '"')
//     .replace(/\\'/g, "\\'")
//     .replace(/\\"/g, '\\"')
//     .replace(/\\&/g, "\\&")
//     .replace(/\\r/g, "\\r")
//     .replace(/\\t/g, "\\t")
//     .replace(/\\b/g, "\\b")
//     .replace(/\\f/g, "\\f")
//     .replace(/\\n/g, "");
//   tables = JSON.parse(tables);
//   var prefix;

//   for (var i in tables.checkbox_tables) {
//     for (var j in tables.checkbox_tables[i].table) {
//       for (var k in tables.checkbox_tables[i].table[j].row) {
//         var cbxname = Object.keys(tables.checkbox_tables[i].table[j].row[k]); //get key
//         var cbxvalue = Object.values(tables.checkbox_tables[i].table[j].row[k]);
//         if (cbxvalue[0]) {
//           $("input[name='" + cbxname + "']").prop("checked", true); //if value, target checkbox is checked
//         }
//       }
//     }
//   }

//   for (var i in tables.static_tables) {
//     for (var j in tables.static_tables[i].table) {
//       for (var k in tables.static_tables[i].table[j].row) {
//         var sttcname = Object.keys(tables.static_tables[i].table[j].row[k]);
//         var sttcvalue = Object.values(tables.static_tables[i].table[j].row[k]);
//         if (sttcvalue[0]) {
//           $("input[name='" + sttcname + "']").prop("value", sttcvalue);
//         }
//       }
//     }
//   }
// }

if (role === "Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων" || role === "Βουλευτής") {
  if ($("#status_ekthesis").val() === "Ολοκληρώθηκε") {
    $("#edit_form :input").prop("disabled", true);
    // enableFields(".next");
    // enableFields(".previous");
    $(".export-pdf").prop("disabled", false);
  }
}
if ($("#status_ekthesis").val() === "Κατατέθηκε") {
  $("#edit_form :input").prop("disabled", true);
  $("#signed_pdf_div").show().prop("disabled", false);
  $("#upload_signed_pdf").show();
  $(".next").prop("disabled", false);
  $(".previous").prop("disabled", false);
}
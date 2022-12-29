function convertAnalysis() {
  if (type == Type.Guidelines) {
    $("#typos_analysis").prop("value", Type.DraftLaw);
    $("#title").prop("value", "Αντίγραφο - " + $("#title").val());
  } else if (type == Type.DraftLaw) {
    $("#typos_analysis").prop("value", Type.LawPlan);
    $("#title").prop("value", "Αντίγραφο - " + $("#title").val());
  }
  $("#status_ekthesis").val(Status.Composing);
  getFullDate($("#initial_submit"));
  getFullDate("#last_updated");
}

function submitVisibility() {
  if (
    $("#egkrisi_aksiologisis_nomoparaskeyastikis").prop("checked") &&
    $("#egkrisi_kalis_nomothetisis").prop("checked") &&
    $("#egkrisi_dieuthinsis_nomoparaskeyastikis").prop("checked") &&
    $("#egkrisi_genikou_grammatea").prop("checked")
  ) {
    $(".create-new").show();
  } else {
    $(".create-new").hide();
  }
}

function setDropdown() {
  $("#field_4").val(field4 ? field4 : $("#field_4 option:first").val()); //if value then set  dropdown to value, else set to first dropdown option
  $("#field_6").val(field6 ? field6 : $("#field_6 option:first").val());
  $("#field_11").val(field11 ? field11 : $("#field_11 option:first").val());
  $("#field_12").val(field12 ? field12 : $("#field_12 option:first").val());
  $("#field_13").val(field13 ? field13 : $("#field_13 option:first").val());
  $("#field_36").val(field36 ? field36 : $("#field_36 option:first").val());
}

function setDate(fieldId) {
  $(fieldId).prop(
    "value",
    new Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
  );
}

//restrict access based on role
function viewFormRoleRestriction() {
  let roleRestrictions = {
    //this role should be able to edit/complete a form only when analysis status is 'Συντάσσεται'
    "Συντάκτης επισπεύδοντος Υπουργείου": () => {
      $("#final_save").prop("disabled", true);
      if ($("#status_ekthesis").val() != Status.Composing) {
        $("#edit_form :input:not(.next, .previous)").prop("disable", true);
      }
    },
    "Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)": () => {
      if (
        // role === "Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)" &&
        $("#pdf_download").prop("hidden") === false &&
        $("#status_ekthesis").val() === Status.Finalized
      ) {
        $("#signed_pdf_div").show();
        $(
          "#pdf_download, .next, #signed_pdf_upload, .export-pdf, .previous"
        ).prop("disabled", false);
        // $("#signed_pdf_upload").prop("disabled", false);
        // $(".export-pdf").prop("disabled", false);
        if ("<%= data.egkrisi_genikou_grammatea%>") {
          //TODO: debug if statement
          $(".create-new").prop("disabled", false);
        }
        // $(".next").prop("disabled", false);
        // $(".previous").prop("disabled", false);
      }
    },
    "Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων": () => {
      if ($("#status_ekthesis").val() === "Οριστικοποιήθηκε") {
        $("#signed_pdf_div").show();
        $(
          "#pdf_download, .next, #signed_pdf_upload, .export-pdf, .previous"
        ).prop("disabled", false);
        // $("#signed_pdf_upload").prop("disabled", false);
        // $(".export-pdf").prop("disabled", false);
        if ("<%= data.egkrisi_genikou_grammatea%>") {
          //TODO: debug if statement
          $(".create-new").prop("disabled", false);
        }
        // $(".next").prop("disabled", false);
        // $(".previous").prop("disabled", false);
      }
    },
    "Γενικό Λογιστήριο του Κράτους": () => {},
    "Πρόταση νόμου": () => {},
    "Τροπολογίες Υπουργών": () => {},
    "Τροπολογίες Βουλευτών": () => {},
  };
  roleRestrictions[role];
}

//TODO: complete
function viewFormStatusRestriction() {
  let statusRestrictions = {
    //object with analysis' types as keys and subtext as value
    "Κατευθυντήριες γραμμές": () => {},
    "Προσχέδιο νόμου": () => {},
    "Επείγον ή κατεπείγον νομοσχέδιο": () => {},
    "Διεθνείς συμβάσεις": () => {},
    "Πρόταση νόμου": () => {},
    "Τροπολογίες Υπουργών": () => {},
    Οριστικοποιήθηκε: () => {
      $("#edit_form :input").prop("disabled", true);
    }, //once this status is reached no more editing should be permitted
  };
  restrictions[type];
}

//TODO: complete
function viewFormAnalysisRestriction() {
  let restrictions = {
    //object with analysis' types as keys and subtext as value
    "Κατευθυντήριες γραμμές": () => {},
    "Προσχέδιο νόμου": () => {},
    "Επείγον ή κατεπείγον νομοσχέδιο": () => {},
    "Διεθνείς συμβάσεις": () => {},
    "Πρόταση νόμου": () => {},
    "Τροπολογίες Υπουργών": () => {},
    "Τροπολογίες Βουλευτών": () => {},
  };
  restrictions[type];
}

function fillTable(table) {
  for (let i in table) {
    const key = Object.keys(table[i]);
    const value = Object.values(table[i]);
    $(`#${key}`).val(value);
  }
}

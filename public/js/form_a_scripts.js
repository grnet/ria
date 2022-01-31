function convertAnalysis() {
  if (analysis == "Κατευθυντήριες γραμμές") {
    $("#typos_analysis").prop("value", "Προσχέδιο νόμου");
    $("#title").prop("value", "Αντίγραφο - " + $("#title").val());
  } else if (analysis == "Προσχέδιο νόμου") {
    $("#typos_analysis").prop("value", "Σχέδιο νόμου");
    $("#title").prop("value", "Αντίγραφο - " + $("#title").val());
  }
  $("#status_ekthesis").val("Συντάσσεται");
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
    $(".create-new").prop("disabled", false);
  } else {
    $(".create-new").prop("disabled", true);
  }
}

function setDropdown() {
  var field4 = "<%= data.field_4%>";
  var field6 = "<%= data.field_6%>";
  var field11 = "<%= data.field_11%>";
  var field12 = "<%= data.field_12%>";
  var field13 = "<%= data.field_13%>";
  var field36 = "<%= data.field_36%>";
  $("#field_4").val(field4 ? field4 : $("#field_4 option:first").val()); //if calue then set  dropdown to value, else set to first dropdown option
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

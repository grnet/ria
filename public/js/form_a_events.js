$("#egkrisi_aksiologisis_nomoparaskeyastikis").on("change", function () {
  submitVisibility();
});

$("#egkrisi_kalis_nomothetisis").on("change", function () {
  submitVisibility();
});

$("#egkrisi_dieuthinsis_nomoparaskeyastikis").on("change", function () {
  submitVisibility();
});
$("#egkrisi_genikou_grammatea").on("change", function () {
  submitVisibility();
});

$(".close").on("click", function () {
  $("#errors").hide();
});

$("#ekthesi_glk").on("change", function (ev) {
  //actions to take when ΓΛΚ checks checkbox
  if (role === "Γενικό Λογιστήριο του Κράτους") {
    if (!this.checked) {
      answer = window.confirm(
        "Με την ενέργειά σας αυτή η έκθεση θεωρείται ολοκληρωμένη από μεριά σας και επιστρέφει στον Αρμόδιο Συντάκτη ή στο Αρμόδιο Υπουργείο. Θέλετε να συνεχίσετε;"
      );
      if (answer) {
        $("#status_ekthesis")
          .prop("disabled", false)
          .val("Ελέγχθηκε από το Γενικό Λογιστήριο του Κράτους"); //change status value
        setDate("#field_16_genikos_date");
        updateForm(ev); //once unchecked form is submitted/updated
      } else {
        $("#ekthesi_glk").prop("checked", true);
        $("#status_ekthesis")
          .prop("disabled", false)
          .val("Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"); //change status value
      }
    }
  } else if (this.checked) {
    answer = window.confirm(
      "Με την ενέργειά σας αυτή η έκθεση θα αποσταλλεί στο Γενικό Λογιστήριο του κράτους. Θέλετε να συνεχίσετε;"
    );
    if (answer) {
      $("#status_ekthesis").val(
        "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"
      );
    } else {
      $("#status_ekthesis").val(analysisStatus);
    }
  } else {
    $("#ekthesi_glk").prop("checked", false);
    $("#status_ekthesis").val(analysisStatus); //change hidden input's value
  }
});
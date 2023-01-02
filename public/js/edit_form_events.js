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

$("#versions").on("click", function () {
  var selected = [];
  $("#versions input:checked").each(function () {
    selected.push($(this).attr("name"));
  });
  if (selected.length >= 2) {
    $("#versions tbody tr td input:checkbox:not(:checked)").each(function () {
      $(this).prop("disabled", true);
    });
  } else {
    $("#versions tbody tr td input:checkbox:not(:checked)").each(function () {
      $(this).prop("disabled", false);
    });
  }
});

$("#ekthesi_glk").on("change", function (ev) {
  //actions to take when ΓΛΚ checks checkbox
  if (role === Roles.GeneralAccountingOffice) {
    if (!this.checked) {
      answer = window.confirm(
        "Με την ενέργειά σας αυτή η έκθεση θεωρείται ολοκληρωμένη από μεριά σας και επιστρέφει στον Αρμόδιο Συντάκτη ή στο Αρμόδιο Υπουργείο. Θέλετε να συνεχίσετε;"
      );
      if (answer) {
        $("#status")
          .prop("disabled", false)
          .val(Status.Checked); 
        setDate("#field_16_genikos_date");
        updateForm(ev); //once unchecked form is submitted/updated
      } else {
        $("#ekthesi_glk").prop("checked", true);
        $("#status")
          .prop("disabled", false)
          .val(Status.Pending); 
      }
    }
  } else if (this.checked) {
    answer = window.confirm(
      "Με την ενέργειά σας αυτή η έκθεση θα αποσταλλεί στο Γενικό Λογιστήριο του κράτους. Θέλετε να συνεχίσετε;"
    );
    if (answer) {
      $("#status").val(
        Status.Pending
      );
    } else {
      $("#status").val(analysisStatus);
    }
  } else {
    $("#ekthesi_glk").prop("checked", false);
    $("#status").val(analysisStatus); //change hidden input's value
  }
});

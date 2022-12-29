$("#ekthesi_glk").on("change", function (ev) {
  this.checked
    ? ((answer = window.confirm(
        "Με την ενέργειά σας αυτή η έκθεση θα αποσταλλεί στο Γενικό Λογιστήριο του κράτους. Συνέχεια;"
      )),
      answer
        ? $("#status_ekthesis").val(Status.Pending)
        : $(this).prop("checked", false))
    : $("#status_ekthesis").val(Status.Composing);
});

//TODO: if not needed remove
// function setStatus(ev) {
//   $("#ekthesi_glk").prop("checked")
//     ? (alert(
//         "Για την ανάλυση εκκρεμεί ο έλεγχος του Γενικού Λογιστηρίου του Κράτους που έχετε ζητήσει. Επικοινωνήστε με το Γενικό Λογιστήριο του Κράτους για να τον ολοκληρώσει ή ενημερώστε τον αρμόδιο του Υπουργείου σας για να το επιλύσει."
//       ),
//       ev.preventDefault())
//     : $("#status_ekthesis").val(Status.Completed);
// }

function setStatus() {
  if ($("#ekthesi_glk").prop("checked") && role === Roles.Composer) {
    alert(
      "Για την ανάλυση εκκρεμεί ο έλεγχος του Γενικού Λογιστηρίου του Κράτους που έχετε ζητήσει. Επικοινωνήστε με το Γενικό Λογιστήριο του Κράτους για να τον ολοκληρώσει ή ενημερώστε τον αρμόδιο του Υπουργείου σας για να το επιλύσει."
    );
    // ev.preventDefault();
  } else {
    if ($("#status").val(Status.Composing)) {
      $("#status").val(Status.Completed);
    }
  }
}

function setAnalysisType() {
  let analysisType = getAnalysisType();
  $("#type").prop("value", analysisType);
}

function getAnalysisType() {
  let analysisType = {
    sxedio_nomou: Type.LawPlan,
    kateythintiries_grammes: Type.Guidelines,
    prosxedio_nomou: Type.DraftLaw,
    epeigon_katepeigon: Type.UrgentBill,
    diethneis_symvaseis: Type.InternationalConventions,
    tropologies_upourgwn: Type.MinistersAmendments,
    tropologies_vouleutwn: Type.ParliamentariansAmendments,
    protasi_nomou: Type.LawProposal,
  };
  return analysisType[type];
}
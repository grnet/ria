$("#ekthesi_glk").on("change", function (ev) {

        this.checked ? (answer = window.confirm("Με την ενέργειά σας αυτή η έκθεση θα αποσταλλεί στο Γενικό Λογιστήριο του κράτους. Συνέχεια;"), answer ? $("#status_ekthesis").val("Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους") : $(this).prop('checked', false)) : $("#status_ekthesis").val("Συντάσσεται");
    }
);

function onSubmitStatus(ev) {

    $("#ekthesi_glk").prop("checked") ? (alert("Για την ανάλυση εκκρεμεί ο έλεγχος του Γενικού Λογιστηρίου του Κράτους που έχετε ζητήσει. Επικοινωνήστε με το Γενικό Λογιστήριο του Κράτους για να τον ολοκληρώσει ή ενημερώστε τον αρμόδιο του Υπουργείου σας για να το επιλύσει."), ev.preventDefault()) : $('#status_ekthesis').val("Ολοκληρώθηκε");
}


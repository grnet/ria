function convertAnalysis() {
    if (analysis == 'Κατευθυντήριες γραμμές') {
        $("#typos_analysis").prop('value', 'Προσχέδιο νόμου');
        $("#title").prop('value', 'Αντίγραφο - ' + $("#title").val());
    } else if (analysis == 'Προσχέδιο νόμου') {
        $("#typos_analysis").prop('value', 'Σχέδιο νόμου');
        $("#title").prop('value', 'Αντίγραφο - ' + $("#title").val());
    }
    $("#status_ekthesis").val("Συντάσσεται");
    getFullDate($("#initial_submit"));
    getFullDate("#last_updated");
}


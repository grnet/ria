//count & limit words
//as of latest requests, word limit no longer required. Code will remain for future needs
function wordsCounter(fieldId, spanId, wordlimit, event) {
  Countable.on(document.getElementById(fieldId), (counter) => {
    // if (counter.words >= wordlimit) {
    //   event.preventDefault(); //if word limit is reached prevent typing by preventing next event
    // }
    document.getElementById(spanId).innerHTML = counter.words.toString();
  });
}

function getFullDate(fieldId) {
  $(fieldId).prop(
    "value",
    new Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
  );
}

function requiredDigitalGov() {
  if (
    $("#field_10_amesi").prop("checked") ||
    $("#field_10_emmesi").prop("checked")
  ) {
    $(".digital-gov-label").addClass("required");
    $(".digital_gov :input").prop("disabled", false);
  } else {
    $(".digital_gov :input").prop("disabled", true);
    $(".digital-gov-label").removeClass("required");
  }
}

function requiredLegalistics() {
  let spaceless = $("#field_33")
    .val()
    .replace(/^\s+|\s+$/g, ""); //replace white space
  spaceless
    ? ($(".legalistic :input").prop("disabled", false),
      $(".legalistic-label").addClass("required"))
    : ($(".legalistic :input").prop("disabled", true),
      $(".legalistic-label").removeClass("required"));
}

//set subtext and subtitle according to analysis type
function getSubText() {
  let subTextList = {
    //object with analysis' types as keys and subtext as value
    "Κατευθυντήριες γραμμές": `Σύμφωνα με την παρ. 1 του άρθρου 63 του ν. 4622/2019 «Ο Υπουργός δύναται να υποβάλει στην Γενική Γραμματεία Νομικών και Κοινοβουλευτικών Θεμάτων: […] β) τις κατευθυντήριες γραμμές του σχεδίου νόμου μαζί με όποιο στοιχείο θεωρεί αναγκαίο να συμπεριληφθεί στην Ανάλυση Συνεπειών Ρύθμισης». <br>Στο «εγχειρίδιο νομοπαρασκευαστικής μεθοδολογίας»  αναφέρεται ότι: <br>- «Οι κατευθυντήριες γραμμές αναλύουν το σκεπτικό των αποφάσεων που οδήγησαν στην επιλογή τόσο του επιδιωκόμενου ρυθμιστικού αποτελέσματος, όσο και των μηχανισμών επίτευξής του. Συντάσσονται από στελέχη του Υπουργείου και παρέχουν όλα τα απαραίτητα στοιχεία για την προετοιμασία της νομοθεσίας, προσδιορίζοντας και, όπου είναι δυνατόν, ποσοτικοποιώντας τα επιδιωκόμενα ρυθμιστικά αποτελέσματα.».<br>- «Στην περίπτωση της αποστολής κατευθυντηρίων γραμμών, πέραν των εκθέσεων του Γενικού Λογιστηρίου του Κράτους όπως επίσης του πεδίου που αφορά στην ηλεκτρονική διαβούλευση, δεν προσδοκάται η αποστολή των πεδίων που αφορούν την αιτιολογική έκθεση και την έκθεση εφαρμογής επί των συγκεκριμένων άρθρων.».`,
    "Προσχέδιο νόμου": `Σύμφωνα με την παρ. 1 του άρθρου 63 του ν. 4622/2019 «Ο Υπουργός δύναται να υποβάλει στην Γενική Γραμματεία Νομικών και Κοινοβουλευτικών Θεμάτων: α) προσχέδιο νόμου και προκαταρκτική ανάλυση συνεπειών ρύθμισης η οποία συμπεριλαμβάνει τα στοιχεία του άρθρου 62 που κρίνει αναγκαία …».<br>Στο «εγχειρίδιο νομοπαρασκευαστικής μεθοδολογίας»  αναφέρεται ότι: <br>- «Συστήνεται … η προκαταρκτική Ανάλυση Συνεπειών Ρύθμισης να έχει ως βάση το υπόδειγμα της πλήρους Ανάλυσης, εξαιρουμένων των εκθέσεων του Γενικού Λογιστηρίου του Κράτους όπως επίσης του πεδίου που αφορά στην ηλεκτρονική διαβούλευση».<br>- «Σε κάθε περίπτωση, για να καταστεί δυνατή η περαιτέρω αξιολόγηση της Ανάλυσης απαιτείται οπωσδήποτε αυτή να συμπεριλαμβάνει: i) την εισήγηση των αρμόδιων προϊσταμένων Γενικών Διευθύνσεων Οικονομικών Υποθέσεων όπως ορίζεται στο άρθρο 24 παρ. 5 περ. ε του ν. 4270/2015. […] ii) ειδική αιτιολογία σε περίπτωση πρόβλεψης παρεκκλίσεων από τις διατάξεις του νόμου περί ενιαίου μισθολογίου (ν. 4354/2015 [ΦΕΚ Α’ 176]).».<br>`,
    "Επείγον ή κατεπείγον νομοσχέδιο": `Σύμφωνα με την παρ. 3 του άρθρου 85 του Κανονισμού της Βουλής, εάν ένα νομοσχέδιο έχει χαρακτηρισθεί από την Κυβέρνηση ως επείγον ή κατεπείγον «απαιτείται να συνοδεύεται από συνοπτική Ανάλυση Συνεπειών Ρύθμισης που συμπεριλαμβάνει κατ’ ελάχιστον τις ανωτέρω ενότητες (α) και (ε), καθώς και στοιχεία από τις ενότητες (β) και (δ)», δηλαδή την αιτιολογική έκθεση και τον πίνακα τροποποιούμενων ή καταργούμενων διατάξεων, καθώς και στοιχεία της έκθεσης γενικών συνεπειών και της έκθεσης νομιμότητας. <br>Επίσης, στην περίπτωση νομοσχεδίου που συνεπάγεται επιβάρυνση του κρατικού προϋπολογισμού (βλ. παρ. 5 του άρθρου 88 του Κανονισμού της Βουλής), η Ανάλυση Συνεπειών Ρύθμισης πρέπει να ενσωματώνει: «την έκθεση του άρθρου 75 παρ. 1 του Συντάγματος από το Γενικό Λογιστήριο του Κράτους, η οποία προσδιορίζει τη δημοσιονομική επίπτωση επί του Προϋπολογισμού από τις διατάξεις της ρύθμισης, όπως επίσης, ανάλογα με το περιεχόμενό του, α) την ειδική έκθεση του αρμόδιου Υπουργού και του Υπουργού Οικονομικών που προβλέπει το άρθρο 75 παρ. 3 του Συντάγματος και β) τη γνωμοδότηση του Ελεγκτικού Συνεδρίου που ορίζει το άρθρο 73 παρ. 2 του Συντάγματος.».`,
    "Διεθνείς συμβάσεις": `Προσθήκη εισαγωγικού κειμένου μετά τον νέο υπότιτλο: Η κύρωση μιας διεθνούς σύμβασης εμπίπτει στο πεδίο εφαρμογής των ειδικών νομοθετικών διαδικασιών (βλ. άρθρο 112 του Κανονισμού της Βουλής) και ως εκ τούτου, σύμφωνα με την παρ. 3 του άρθρου 85 του Κανονισμού της Βουλής, το κυρωτικό νομοσχέδιο «απαιτείται να συνοδεύεται από συνοπτική Ανάλυση Συνεπειών Ρύθμισης που συμπεριλαμβάνει κατ’ ελάχιστον τις ανωτέρω ενότητες (α) και (ε), καθώς και στοιχεία από τις ενότητες (β) και (δ)», δηλαδή την αιτιολογική έκθεση και τον πίνακα τροποποιούμενων ή καταργούμενων διατάξεων, καθώς και στοιχεία της έκθεσης γενικών συνεπειών και της έκθεσης νομιμότητας. <br>Επίσης, στην περίπτωση νομοσχεδίου που συνεπάγεται επιβάρυνση του κρατικού προϋπολογισμού (βλ. παρ. 5 του άρθρου 88 του Κανονισμού της Βουλής), η Ανάλυση Συνεπειών Ρύθμισης πρέπει να ενσωματώνει: «την έκθεση του άρθρου 75 παρ. 1 του Συντάγματος από το Γενικό Λογιστήριο του Κράτους, η οποία προσδιορίζει τη δημοσιονομική επίπτωση επί του Προϋπολογισμού από τις διατάξεις της ρύθμισης, όπως επίσης, ανάλογα με το περιεχόμενό του, α) την ειδική έκθεση του αρμόδιου Υπουργού και του Υπουργού Οικονομικών που προβλέπει το άρθρο 75 παρ. 3 του Συντάγματος και β) τη γνωμοδότηση του Ελεγκτικού Συνεδρίου που ορίζει το άρθρο 73 παρ. 2 του Συντάγματος.».`,
    "Πρόταση νόμου": `Σύμφωνα με την παρ. 3 του άρθρου 85 του Κανονισμού της Βουλής «Οι προτάσεις νόμων συνοδεύονται υποχρεωτικώς από συνοπτική Ανάλυση Συνεπειών Ρύθμισης, η οποία συμπεριλαμβάνει κατ’ ελάχιστον τις ανωτέρω ενότητες (α) και (ε)», δηλαδή την αιτιολογική έκθεση και τον πίνακα τροποποιούμενων ή καταργούμενων διατάξεων. <br>Επίσης, σύμφωνα με την παρ. 6 του άρθρου 85 του Κανονισμού της Βουλής «Κάθε πρόταση νόμου διαβιβάζεται στους αρμόδιους Yπoυργoύς, που έχουν υποχρέωση να απαντούν αν αυτή υπάγεται ή όχι στους περιορισμούς τoυ άρθρου 73 παρ. 3 τoυ Συντάγματος, καθώς και στo Γενικό Λoγιστήριo τoυ Kράτoυς για τη σύνταξη της έκθεσης που oρίζει τo άρθρο 75 παρ. 1 τoυ Συντάγματος. To Γενικό Λoγιστήριo τoυ Kράτoυς υπoχρεoύται να υπoβάλει στη Boυλή τη σχετική έκθεση μέσα σε δεκαπέντε ημέρες από την παραλαβή της πρότασης νόμoυ. Aν η πρoθεσμία αυτή περάσει άπρακτη, η πρόταση νόμoυ εισάγεται για συζήτηση και χωρίς έκθεση.».`,
    "Τροπολογίες Υπουργών": `Σύμφωνα με την παρ. 1 του άρθρου 62 του ν. 4622/2019 «Κάθε σχέδιο νόμου, προσθήκη ή τροπολογία, καθώς και κανονιστική απόφαση μείζονος οικονομικής ή κοινωνικής σημασίας, συνοδεύεται από Ανάλυση Συνεπειών Ρύθμισης (εφεξής Ανάλυση).».<br>Ειδικότερα, για τις τροπολογίες Υπουργών, στην παρ. 2 του άρθρου 88 του Κανονισμού της Βουλής προβλέπεται ότι συνοδεύονται από «σύντομη συνοπτική Ανάλυση Συνεπειών Ρύθμισης που συμπεριλαμβάνει κατ’ ελάχιστον τις ενότητες (α) και (ε), καθώς και στοιχεία από τις ενότητες (β) και (δ) της παρ. 3 του άρθρου 85», δηλαδή την αιτιολογική έκθεση και τον πίνακα τροποποιούμενων ή καταργούμενων διατάξεων, καθώς και στοιχεία της έκθεσης γενικών συνεπειών και της έκθεσης νομιμότητας. <br>Επίσης, σύμφωνα με την παρ. 5 του άρθρου 88 του Κανονισμού της Βουλής «Oι τρoπoλoγίες που συνεπάγονται επιβάρυνση του πρoϋπoλoγισμoύ του Κράτους διαβιβάζονται πριν από τη συζήτησή τoυς στo Γενικό Λoγιστήριo τoυ Kράτoυς, αν το ζητήσουν oι αρμόδιοι Yπoυργoί. Σ’ αυτήν την περίπτωση τo Γενικό Λογιστήριο τoυ Kράτoυς υπoχρεoύται να υποβάλει στη Boυλή την έκθεσή τoυ μέσα σε τρεις ημέρες από την παραλαβή τoυς. Mόνo αν η προθεσμία αυτή περάσει άπρακτη, oι τρoπoλoγίες μπoρoύν να συζητηθoύν και χωρίς την έκθεση.».`,
    "Τροπολογίες Βουλευτών": `«Κάθε σχέδιο νόμου, προσθήκη ή τροπολογία, καθώς και κανονιστική απόφαση μείζονος οικονομικής ή κοινωνικής σημασίας, συνοδεύεται από Ανάλυση Συνεπειών Ρύθμισης (εφεξής Ανάλυση).». Ειδικότερα, για τις τροπολογίες Βουλευτών, στην παρ. 2 του άρθρου 88 του Κανονισμού της Βουλής προβλέπεται ότι συνοδεύονται «υποχρεωτικώς από συνοπτική Ανάλυση Συνεπειών Ρύθμισης, η οποία συμπεριλαμβάνει κατ’ ελάχιστον τις ενότητες (α) και (ε) της παρ. 3 του άρθρου 85», δηλαδή την αιτιολογική έκθεση και τον πίνακα τροποποιούμενων ή καταργούμενων διατάξεων.Επίσης, σύμφωνα με την παρ. 5 του άρθρου 88 του Κανονισμού της Βουλής «Oι τρoπoλoγίες που συνεπάγονται επιβάρυνση του πρoϋπoλoγισμoύ του Κράτους διαβιβάζονται πριν από τη συζήτησή τoυς στo Γενικό Λoγιστήριo τoυ Kράτoυς, αν το ζητήσουν oι αρμόδιοι Yπoυργoί. Σ’ αυτήν την περίπτωση τo Γενικό Λογιστήριο τoυ Kράτoυς υπoχρεoύται να υποβάλει στη Boυλή την έκθεσή τoυ μέσα σε τρεις ημέρες από την παραλαβή τoυς. Mόνo αν η προθεσμία αυτή περάσει άπρακτη, oι τρoπoλoγίες μπoρoύν να συζητηθoύν και χωρίς την έκθεση.».`,
  };
  return subTextList[type];
}

function setSubText() {
  let subText = getSubText(type);
  $("#subtext").html(subText);
}

function setSubtitle() {
  if (type !== Type.LawPlan) {
    //law plan by default has no subtitle
    type === Type.DraftLaw || type === Type.Guidelines
      ? $("#subtitle").html("«Προκαταρκτική Ανάλυση Συνεπειών Ρύθμισης»")
      : $("#subtitle").html("««Συνοπτική Ανάλυση Συνεπειών Ρύθμισης»»");
  }
}

//set restrictions based on type
function analysisRestrictions() {
  let restrictions = {
    "Σχέδιο νόμου": function () {
      setAnalysisRestrictions("lawPlan");
    },
    "Κατευθυντήριες γραμμές": function () {
      setAnalysisRestrictions("guidelines");
    },
    "Προσχέδιο νόμου": function () {
      setAnalysisRestrictions("draftLaw");
    },
    "Επείγον ή κατεπείγον νομοσχέδιο": function () {
      setAnalysisRestrictions("ministers");
    },
    "Διεθνείς συμβάσεις": function () {
      setAnalysisRestrictions("ministers");
    },
    "Τροπολογίες Υπουργών": function () {
      setAnalysisRestrictions("ministers");
    },
    "Τροπολογίες Βουλευτών": function () {
      setAnalysisRestrictions("parliamentarians");
    },
    "Πρόταση νόμου": function () {
      setAnalysisRestrictions("parliamentarians");
    },
  };

  restrictions[type](); //calling object literal's function
}

function setAnalysisRestrictions(type) {
  let restrictions = {
    lawPlan: () => {
      return;
    },
    guidelines: function () {
      $(".mostly-optional :input, .optional :input, .table-14 :input").prop(
        "disabled",
        true
      );
      // $(".create-new, .next, .previous").prop("disabled", false);
      $(
        ".mostly-optional-label, .optional-label, .field-23-label, .table-14-label, .table-29-label, .table-30-label"
      ).removeClass("required");
    },
    draftLaw: function () {
      $(".mostly-optional :input").prop("disabled", true);
      // $(".create-new, .next, .previous").prop("disabled", false);
      $(".mostly-optional-label, .field-23-label, .glk").removeClass(
        "required"
      );
    },
    ministers: function () {
      $(".optional :input, .field-22 :input").prop("disabled", true);
      // $(".create-new, .next, .previous").prop("disabled", false);
      $(".optional-label, .field-22-label, .field-23-label").removeClass(
        "required"
      );
    },
    parliamentarians: function () {
      $(".optional :input, .vouleutes :input").prop("disabled", true);
      $(".table-31 :input, .table-32 :input").prop("disabled", false);
      $(".optional-label, .vouleutes-label, .field-23-label").removeClass(
        "required"
      );
      $(".table-31-label, .table-32-label").addClass("required");
    },
  };
  //TODO: remove required class
  $(".glk :input:not(.create-new, .next, .previous, #ekthesi_glk)").prop(
    "disabled",
    true
  ); //disable fields accessible only by General Accounting Office
  restrictions[type]();
  $(
    ".export-pdf, #add_row_ministers_table, #add_row_emd_table, .next, .previous, .create-new"
  ).prop("disabled", false);
}

function populateIndexSelect(select, category) {
  
  $(`#${select}`).empty();
  $(`#${select}`).append(
    `<option value="" selected disabled>Eπιλογή</option>`
  );
  for (i in indexes[`${category}`]) {
    $(`#${select}`).append(
      `<option value="${indexes[`${category}`][i]}">${
        indexes[`${category}`][i]
      }</option>`
    );
  }
}

function populateMinistersNameSelect(ministerNameSelectId) {
  $(`#${ministerNameSelectId}`).empty();
  $(`#${ministerNameSelectId}`).append(
    `<option value="" selected disabled>Eπιλογή</option>`
  );
  for (i in ministers) {
    $(`#${ministerNameSelectId}`).append(
      `<option value="${ministers[i].name}">${ministers[i].name}</option>`
    );
  }
}

function ministerNameOnChange(
  ministerNameSelectId,
  ministerRoleTextareaId,
  ministerMinistryInputId
) {
  let name = $(`#${ministerNameSelectId}`).val();
  for (i in ministers) {
    if (ministers[i].name === name) {
      $(`#${ministerRoleTextareaId}`).val(
        ministers[i].role + " " + ministers[i].responsibility
      );
      $(`#${ministerMinistryInputId}`).val(ministers[i].ministry);
      break;
    }
  }
}
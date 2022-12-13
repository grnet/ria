const Status = {
  Checked: "Ελέγχθηκε από το Γενικό Λογιστήριο του Κράτους",
  Completed: "Ολοκληρώθηκε",
  Composing: "Συντάσσεται",
  Finalized: "Οριστικοποιήθηκε",
  Pending: "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους",
  Uploaded: "Κατατέθηκε",
};

const Roles = {
  Composer: "Συντάκτης επισπεύδοντος Υπουργείου",
  GeneralAccountingOffice: "Γενικό Λογιστήριο του Κράτους",
  GeneralSecretary: "Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων",
  GoodLegislationOffice: "Γραφείο Καλής Νομοθέτησης",
  LegislativeCommittee: "Νομοπαρασκευαστική Επιτροπή",
  LegislativeProcedureDirectorate: "Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας",
  Parliament: "Βουλή",
  Parliamentarian: "Βουλευτής",
  QualityEvaluationCommittee:
    "Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας",
  ResponsibleForMinistry:
    "Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων",
};

const AnalysisType = {
  LawPlan: "Σχέδιο νόμου",
  Guidelines: "Κατευθυντήριες γραμμές",
  DraftLaw: "Προσχέδιο νόμου",
  UrgentBill: "Επείγον ή κατεπείγον νομοσχέδιο",
  InternationalConventions: "Διεθνείς συμβάσεις",
  MinistersAmendments: "Τροπολογίες Υπουργών",
  ParliamentariansAmendments: "Τροπολογίες Βουλευτών",
  LawProposal: "Πρόταση νόμου",
};

module.exports = {
  AnalysisType,
  Roles,
  Status,
};
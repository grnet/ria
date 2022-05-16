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
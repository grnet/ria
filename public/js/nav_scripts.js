$("#ministries").on("click", function (ev) {
  ev.preventDefault();
  $.ajax({
    url: `/ministries`,
    error: function (error) {
      console.log(error);
    },
    success: function (data) {
      window.location.href = "./dashboard";
    },
    type: "POST",
  });
});

$("#exit").on("click", function (ev) {
  ev.preventDefault();
  $.ajax({
    url: `/logout`,
    error: function (error) {
      console.log(error);
    },
    success: function (data) {
      window.location.href = "/login";
    },
    type: "GET",
  });
});


function setUserRestrictions(userRole) {
  if (userRole === "Βουλευτής") {
    $("#analysis_list").children(":not(.vouleftis)").hide(); //hide all children elements without class vouleftis
  } else if (
    userRole === "Συντάκτης επισπεύδοντος Υπουργείου" ||
    userRole == "Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)"
  ) {
    $("#analysis_list").children(".vouleftis").hide(); //hide all children elements with class vouleftis
  } else {
    $("#new_analysis").children().hide(); //hide all children elements
  }
}

const { user } = require("../../services/database");

$("#ministries").on("click", function (ev) {
  ev.preventDefault();
  $.ajax({
    url: `/user_views/ministries/gov`,
    error: function (error) {
      console.log(error);
    },
    success: function (data) {
      window.location.href = "/user_views/dashboard";
    },
    type: "POST",
  });
});

$("#exit").on("click", function (ev) {
  if (user.loginMethod && user.loginMethod === "application") {
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
  }
  window.location.replace(
    "https://www1.gsis.gr/oauth2server/logout/%7bclientId%7d/?url=https://ria.gov.gr/});"
  );
});

function setUserRestrictions(userRole) {
  if (userRole === Roles.Parliamentarian) {
    $("#analysis_list").children(":not(.vouleftis)").hide(); //hide all children elements without class vouleftis
  } else if (
    userRole === Roles.Composer ||
    userRole == Roles.LegislativeCommittee
  ) {
    $("#analysis_list").children(".vouleftis").hide(); //hide all children elements with class vouleftis
  } else {
    $("#new_analysis").children().hide(); //hide all children elements
  }
}

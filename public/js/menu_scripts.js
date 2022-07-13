$(".setup-nav").on( "click", "li", function(){ // attach to Click event
    $(".setup-nav li.active").removeClass("active"); // reset all <li> to no active class
    $(this).addClass("active"); // add active class to this <li> only
});





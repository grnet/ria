/////////////////////////EVENTS/////////////////////////

CKEDITOR.replace('field_15_rythmiseis');
CKEDITOR.replace('field_16_kratikos_proypologismos');
CKEDITOR.replace('field_16_proypologismos_forea');
CKEDITOR.replace('field_17_oikonomika_apotelesmata');

//handle side-menu
$('a.menu').click(function () {
    var href = $.attr(this, 'href');
    current_fs = $("fieldset:visible");
    $(".progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    next_fs = $(href);
    //hide the current fieldset with style
    current_fs.hide();
    //show the next fieldset
    next_fs.show();
    $(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    window.scrollTo(0, 0);
    return false;
});

//click event to remove a row from any table
$('#tbody_14, #tbody_17, #tbody_ministers, #tbody_29, #tbody_30, #tbody_31, #tbody_32').on('click', '.remove', function () { 

    // Getting all the rows close to the one to be removed 
    var child = $(this).closest('tr').nextAll();

    // Iterating across all the rows obtained to change the index 
    child.each(function () {

        // Get <tr> id
        var id = $(this).prop('id');

        // Get row number from <tr> id
        var row_num = parseInt(id.substring(1));

        //Get index
        var idx = $(this).children('.row-index');

        // Modify row index
        idx.html(`Row ${row_num - 1}`);

        // Modify row id
        $(this).prop('id', `R${row_num - 1}`);
    });

    // Remove current row. 
    $(this).closest('tr').remove();
});

$(".back").on("click", function (ev) {
    window.location.href = "/user_views/history";
});

$("#ekpedeusi_politismos").on('change', function (ev) {
    this.checked ? ($("#politismos_table").show(), $("#ekpaideysi_table").show(), $(".ekpaideysi-politismos :input").prop('disabled', false)) : ($("#politismos_table").hide(), $("#ekpaideysi_table").hide(), $(".ekpaideysi-politismos :input").prop('disabled', true))
});

$("#forologiki_politiki").on('change', function (ev) {
    this.checked ? ($("#oikonomia_table").show(), $("#forologia_table").show(), $("#ergasiakes_sxeseis_table").show(), $(".oikonomia :input").prop('disabled', false)) : ($("#oikonomia_table").hide(), $("#forologia_table").hide(), $("#ergasiakes_sxeseis_table").hide(), $(".oikonomia :input").prop('disabled', true))
});

$("#koinoniki_politiki").on('change', function (ev) {
    this.checked ? ($("#apasxolisi_table").show(), $("#koinoniki_asfalisi_table").show(), $("#koinoniki_pronoia_table").show(), $("#ygeia_table").show(), $("#isotita_fylwn_table").show(), $("#metanasteytiki_prosfygiki_politiki_table").show(), $(".koinoniki-politiki :input").prop('disabled', false)) : ($("#apasxolisi_table").hide(), $("#koinoniki_asfalisi_table").hide(), $("#koinoniki_pronoia_table").hide(), $("#ygeia_table").hide(), $("#isotita_fylwn_table").hide(), $("#metanasteytiki_prosfygiki_politiki_table").hide(), $(".koinoniki-politiki :input").prop('disabled', true))
});

$("#dimosia_dioikisi").on('change', function (ev) {
    this.checked ? ($("#dimosia_dioikisi_table").show(), $("#dimosia_asfaleia_table").show(), $("#dikaiosini_table").show(), $(".dimosia-dioikisi :input").prop('disabled', false)) : ($("#dimosia_dioikisi_table").hide(), $("#dimosia_asfaleia_table").hide(), $("#dikaiosini_table").hide(), $(".dimosia-dioikisi :input").prop('disabled', true))
});

$("#anaptiksi").on('change', function (ev) {
    this.checked ? ($("#ependytiki_drastiriotita_table").show(), $("#perivallon_energeia_table").show(), $(".ependyseis :input").prop('disabled', false)) : ($("#ependytiki_drastiriotita_table").hide(), $("#perivallon_energeia_table").hide(), $(".ependyseis :input").prop('disabled', true))
});

$("#field_10_emmesi").on("change", function (ev) {
    requiredDigitalGov("#field_10_emmesi");
    $("#emesi_wrap").toggle();
})

$("#field_10_amesi").on("change", function (ev) {
    requiredDigitalGov("#field_10_amesi");
    $("#amesi_wrap").toggle();
})

$("#field_25_dikaio").on("change", function (ev) {
    $("#dikaio_wrap").toggle();
})

$("#field_25_kanonismos").on("change", function (ev) {
    $("#kanonismos_wrap").toggle();
})

$("#field_25_odigia").on("change", function (ev) {
    $("#odigia_wrap").toggle();
})

$("#field_25_apofasi").on("change", function (ev) {
    $("#apofasi_wrap").toggle();
})

$("#field_26_antrwpina_dikaiwmata").on("change", function (ev) {
    $("#antrwpina_dikaiwmata_wrap").toggle();
})

$("#field_26_symvaseis").on("change", function (ev) {
    $("#symvaseis_wrap").toggle();
})

$("#field_27_dikastirio").on("change", function (ev) {
    $("#dikastirio_wrap").toggle();
})

$("#field_27_arxi").on("change", function (ev) {
    $("#arxi_wrap").toggle();
})

$("#field_28_nomologia").on("change", function (ev) {
    $("#nomologia_wrap").toggle();
})

$("#field_28_nomologia_dikaiwmatwn_anthrwpou").on("change", function (ev) {
    $("#nomologia_dikaiwmatwn_anthrwpou_wrap").toggle();
})

$("#field_28_alla_dikastiria").on("change", function (ev) {
    $("#alla_dikastiria_wrap").toggle();
})

$("#field_4").on("click", function (ev) {
    if ($(this).val() == "Ναι") {
        $("#field_4_wrap").show();
    } else {
        $("#field_4_wrap").hide();
    }
})

$("#field_6").on("change", function (ev) {
    if ($(this).val() == "Ναι") {
        $("#field_6_wrap").show();
    } else {
        $("#field_6_wrap").hide();
    }
})

$("#field_11").on("change", function (ev) {
    if ($(this).val() == "Ναι") {
        $("#field_11_wrap").show();
    } else {
        $("#field_11_wrap").hide();
    }
})

$("#field_12").on("change", function (ev) {
    if ($(this).val() == "Ναι") {
        $("#field_12_wrap").show();
    } else {
        $("#field_12_wrap").hide();
    }
})

$("#field_13").on("change", function (ev) {
    if ($(this).val() == "Ναι") {
        $("#field_13_wrap").show();
    } else {
        $("#field_13_wrap").hide();
    }
})

$("#field_36").on("change", function (ev) {
    if ($(this).val() == "Ναι") {
        $("#field_36_wrap").show();
    } else {
        $("#field_36_wrap").hide();
    }
})
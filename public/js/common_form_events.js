/////////////////////////EVENTS/////////////////////////

CKEDITOR.replace("field_15_rythmiseis");
CKEDITOR.replace("field_16_kratikos_proypologismos");
CKEDITOR.replace("field_16_proypologismos_forea");
CKEDITOR.replace("field_17_oikonomika_apotelesmata");

//handle next-previous button actions
var current_fs, next_fs, previous_fs; //fieldsets

$(".next").click(function () {
  current_fs = $(this).closest("fieldset");
  next_fs = $(this).closest("fieldset").next();

  //activate next step on progressbar using the index of next_fs
  $(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.hide();
  window.scrollTo(0, 0);
});

$(".previous").click(function () {
  current_fs = $(this).closest("fieldset");
  previous_fs = $(this).closest("fieldset").prev();

  //de-activate current step on progressbar
  $(".progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");
  //add class "active" if it doesn't exist
  if (!$(previous_fs).hasClass("active")) {
    $(".progressbar li")
      .eq($("fieldset").index(previous_fs))
      .addClass("active");
  }
  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.hide();
  window.scrollTo(0, 0);
});

//handle side-menu
$("a.menu").click(function () {
  var href = $.attr(this, "href");
  current_fs = $("fieldset:visible");
  $(".progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");
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
$(
  "#tbody_14, #tbody_17, #tbody_ministers, #tbody_29, #tbody_30, #tbody_31, #tbody_32"
).on("click", ".remove", function () {
  // Getting all the rows close to the one to be removed
  var child = $(this).closest("tr").nextAll();

  // Iterating across all the rows obtained to change the index
  child.each(function () {
    // Get <tr> id
    var id = $(this).prop("id");

    // Get row number from <tr> id
    var row_num = parseInt(id.substring(1));

    //Get index
    var idx = $(this).children(".row-index");

    // Modify row index
    idx.html(`Row ${row_num - 1}`);

    // Modify row id
    $(this).prop("id", `R${row_num - 1}`);
  });

  // Remove current row.
  $(this).closest("tr").remove();
});

$("#back").on("click", function (ev) {
  window.location.href = "/user_views/history";
});

//TODO: after field 9 refactoring use a unique to refer to tables to reduce redundant code
//for each checkbox certain tables have to show up or be hidden. Hidden tables have their inputs disabled.
$("#ekpedeusi_politismos").on("change", function (ev) {
  this.checked
    ? ($("#politismos_table").show(),
      $("#ekpaideysi_table").show(),
      $(".ekpaideysi-politismos").show())
    : ($("#politismos_table").hide(),
      $("#ekpaideysi_table").hide(),
      $(".ekpaideysi-politismos").hide());
});

$("#forologiki_politiki").on("change", function (ev) {
  this.checked
    ? ($("#oikonomia_table").show(),
      $("#forologia_table").show(),
      $("#ergasiakes_sxeseis_table").show(),
      $(".oikonomia").show())
    : ($("#oikonomia_table").hide(),
      $("#forologia_table").hide(),
      $("#ergasiakes_sxeseis_table").hide(),
      $(".oikonomia").hide());
});

$("#koinoniki_politiki").on("change", function (ev) {
  this.checked
    ? ($("#apasxolisi_table").show(),
      $("#koinoniki_asfalisi_table").show(),
      $("#koinoniki_pronoia_table").show(),
      $("#ygeia_table").show(),
      $("#isotita_fylwn_table").show(),
      $("#metanasteytiki_prosfygiki_politiki_table").show(),
      $(".koinoniki-politiki").show())
    : ($("#apasxolisi_table").hide(),
      $("#koinoniki_asfalisi_table").hide(),
      $("#koinoniki_pronoia_table").hide(),
      $("#ygeia_table").hide(),
      $("#isotita_fylwn_table").hide(),
      $("#metanasteytiki_prosfygiki_politiki_table").hide(),
      $(".koinoniki-politiki").hide());
});

$("#dimosia_dioikisi").on("change", function (ev) {
  this.checked
    ? ($("#dimosia_dioikisi_table").show(),
      $("#dimosia_asfaleia_table").show(),
      $("#dikaiosini_table").show(),
      $(".dimosia-dioikisi").show())
    : ($("#dimosia_dioikisi_table").hide(),
      $("#dimosia_asfaleia_table").hide(),
      $("#dikaiosini_table").hide(),
      $(".dimosia-dioikisi").hide());
});

$("#anaptiksi").on("change", function (ev) {
  this.checked
    ? ($("#ependytiki_drastiriotita_table").show(),
      $("#perivallon_energeia_table").show(),
      $(".ependyseis").show())
    : ($("#ependytiki_drastiriotita_table").hide(),
      $("#perivallon_energeia_table").hide(),
      $(".ependyseis").hide());
});

//dropdown on change events
$("#field_10_emmesi").on("change", function (ev) {
  requiredDigitalGov("#field_10_emmesi");
  $("#emesi_wrap").toggle();
  if ($("#emesi_wrap").is(":visible")) {
    $("#field_10_emmesi_comments").val("");
  }
});

$("#field_10_amesi").on("change", function (ev) {
  requiredDigitalGov("#field_10_amesi");
  $("#amesi_wrap").toggle();
  if ($("#amesi_wrap").is(":visible")) {
    $("#field_10_amesi_comments").val("");
  }
});

$("#field_25_dikaio").on("change", function (ev) {
  $("#dikaio_wrap").toggle();
  if ($("#dikaio_wrap").is(":visible")) {
    $("#field_25_dikaio_comment").val("");
  }
});

$("#field_25_kanonismos").on("change", function (ev) {
  $("#kanonismos_wrap").toggle();
  if ($("#kanonismos_wrap").is(":visible")) {
    $("#field_25_kanonismos_comment").val("");
  }
});

$("#field_25_odigia").on("change", function (ev) {
  $("#odigia_wrap").toggle();
  if ($("#odigia_wrap").is(":visible")) {
    $("#field_25_odigia_comment").val("");
  }
});

$("#field_25_apofasi").on("change", function (ev) {
  $("#apofasi_wrap").toggle();
  if ($("#apofasi_wrap").is(":visible")) {
    $("#field_25_apofasi_comment").val("");
  }
});

$("#field_26_antrwpina_dikaiwmata").on("change", function (ev) {
  $("#antrwpina_dikaiwmata_wrap").toggle();
  if ($("#antrwpina_dikaiwmata_wrap").is(":visible")) {
    $("#field_26_antrwpina_dikaiwmata_comment").val("");
  }
});

$("#field_26_symvaseis").on("change", function (ev) {
  $("#symvaseis_wrap").toggle();
  if ($("#symvaseis_wrap").is(":visible")) {
    $("#field_26_symvaseis_comment").val("");
  }
});

$("#field_27_dikastirio").on("change", function (ev) {
  $("#dikastirio_wrap").toggle();
  if ($("#dikastirio_wrap").is(":visible")) {
    $("#field_27_dikastirio_comment").val("");
  }
});

$("#field_27_arxi").on("change", function (ev) {
  $("#arxi_wrap").toggle();
  if ($("#arxi_wrap").is(":visible")) {
    $("#field_27_arxi_comment").val("");
  }
});

$("#field_28_nomologia").on("change", function (ev) {
  $("#nomologia_wrap").toggle();
  if ($("#nomologia_wrap").is(":visible")) {
    $("#field_28_nomologia_comment").val("");
  }
});

$("#field_28_nomologia_dikaiwmatwn_anthrwpou").on("change", function (ev) {
  $("#nomologia_dikaiwmatwn_anthrwpou_wrap").toggle();
  if ($("#nomologia_dikaiwmatwn_anthrwpou_wrap").is(":visible")) {
    $("#field_28_nomologia_dikaiwmatwn_anthrwpou_comment").val("");
  }
});

$("#field_28_alla_dikastiria").on("change", function (ev) {
  $("#alla_dikastiria_wrap").toggle();
  if ($("#alla_dikastiria_wrap").is(":visible")) {
    $("#field_28_alla_dikastiria_comment").val("");
  }
});

$("#field_4").on("click", function (ev) {
  if ($(this).val() === "Ναι") {
    $("#field_4_wrap").show();
  } else {
    $("#field_4_wrap").hide();
    $("#field_4_1").val("");
  }
});

$("#field_6").on("change", function (ev) {
  if ($(this).val() == "Ναι") {
    $("#field_6_wrap").show();
  } else {
    $("#field_6_wrap").hide();
    $("#field_6_1").val("");
    $("#field_6_2").val("");
    $("#field_6_3").val("");
  }
});

$("#field_11").on("change", function (ev) {
  if ($(this).val() == "Ναι") {
    $("#field_11_wrap").show();
  } else {
    $("#field_11_wrap").hide();
    $("#field_11_comments").val("");
  }
});

$("#field_12").on("change", function (ev) {
  if ($(this).val() == "Ναι") {
    $("#field_12_wrap").show();
  } else {
    $("#field_12_wrap").hide();
    $("#field_12_comments").val("");
  }
});

$("#field_13").on("change", function (ev) {
  if ($(this).val() == "Ναι") {
    $("#field_13_wrap").show();
  } else {
    $("#field_13_wrap").hide();
    $("#field_13_comments").val("");
  }
});

$("#field_36").on("change", function (ev) {
  if ($(this).val() == "Ναι") {
    $("#field_36_wrap").show();
  } else {
    $("#field_36_wrap").hide();
    $("#uploads_36 > tbody > tr").remove();
  }
});

//add row events for tables
//click event to add a row
$("#add_row_table_14").on("click", function () {
  let index = $("#tbody_14").prop("rows").length;
  $("#tbody_14").append(`
         <tr id="table_14_row${++index}"> 
        <td> 
            <textarea class="govgr-textarea" id="field_14_arthro${
              index - 1
            }" name="field_14_arthro${index - 1}" rows="1" ></textarea>                                   
        </td>    
        <td>
            <br> 
            <textarea class="govgr-textarea" id="field_14_stoxos${
              index - 1
            }" name="field_14_stoxos${index - 1}" onkeypress="wordsCounter('field_14_stoxos${index - 1}','words14_${index - 1}', event)" onpaste="wordsCounter('field_14_stoxos${index - 1}','words14_${index - 1}', event)" rows="1"></textarea>
            <p style="float: right;">Λέξεις: <span id="words14_${
              index - 1
            }" ></span></p>            
            <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button> 
        </td>    
        </tr>`);
});

$("#add_row_table_17").on("click", function () {
  let index = $("#tbody_17").prop("rows").length;
  $("#tbody_17").append(`
        <tr id="R${++index}">   
            <td> 
                <select id="field_17_minister_name${
                  index - 1
                }" name="field_17_minister_name${index - 1}" class="govgr-select" onchange="ministerNameOnChange('field_17_minister_name${index - 1}', 'field_17_minister_role${index - 1}', 'field_17_minister_ministry${index - 1}')"></select>
            </td> 
            <td>
                <br> 
                <textarea class="govgr-textarea" id="field_17_minister_role${
                  index - 1
                }" name="field_17_minister_role${index - 1}" rows="1" readonly></textarea>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
                <input type="hidden" id="field_17_minister_ministry${
                  index - 1
                }" name="field_17_minister_ministry${index - 1}">
            </td> 
        </tr>`);
  populateMinistersNameSelect(`field_17_minister_name${index - 1}`);
});

$("#add_row_ministers_table").on("click", function () {
  let index = $("#tbody_ministers").prop("rows").length;
  $("#tbody_ministers").append(`
        <tr id="R${++index}">              
            <td> 
                <select id="minister_name${
                  index - 1
                }" name="minister_name${index - 1}" class="govgr-select" onchange="ministerNameOnChange('minister_name${index - 1}', 'minister_role${index - 1}', 'minister_ministry${index - 1}')"></select>
            </td> 
            <td>
                <br> 
                <textarea class="govgr-textarea" id="minister_role${
                  index - 1
                }" name="minister_role${index - 1}" rows="1" readonly></textarea>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
                <input type="hidden" id="minister_ministry${
                  index - 1
                }" name="minister_ministry${index - 1}">
            </td>             
        </tr>`);
  populateMinistersNameSelect(`minister_name${index - 1}`);
});

$("#add_row_table_29").on("click", function () {
  let index = $("#tbody_29").prop("rows").length;
  $("#tbody_29").append(`
        <tr id="R${++index}"> 
            <td> 
                <textarea class="govgr-textarea" id="field_29_diatakseis_rythmisis${
                  index - 1
                }" name="field_29_diatakseis_rythmisis${index - 1}" onkeypress="wordsCounter('field_29_diatakseis_rythmisis${index - 1}','words29_diatakeis_rythm_${index - 1}')" onpaste="wordsCounter('field_29_diatakseis_rythmisis${index - 1}','words29_diatakeis_rythm_${index - 1}')" rows="1"></textarea>
                <p style="float: right;">Λέξεις: <span id="words29_diatakeis_rythm_${
                  index - 1
                }" ></span></p>   
            </td> 
            <td> 
                <textarea class="govgr-textarea" id="field_29_yfistamenes_diatakseis${
                  index - 1
                }" name="field_29_yfistamenes_diatakseis${index - 1}" onkeypress="wordsCounter('field_29_yfistamenes_diatakseis${index - 1}','words29_diatakeis_yfist_${index - 1}')" onpaste="wordsCounter('field_29_yfistamenes_diatakseis${index - 1}','words29_diatakeis_yfist_${index - 1}')" rows="1"></textarea>
                <p style="float: right;">Λέξεις: <span id="words29_diatakeis_yfist_${
                  index - 1
                }" ></span></p>   
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button> 
            </td>     
        </tr>`);
});

$("#add_row_table_30").on("click", function () {
  let index = $("#tbody_30").prop("rows").length;
  $("#tbody_30").append(`
        <tr id="R${++index}"> 
            <td> 
                <textarea class="govgr-textarea" id="field_30_diatakseis_katargisi${
                  index - 1
                }" name="field_30_diatakseis_katargisi${index - 1}" onkeypress="wordsCounter('field_30_diatakseis_katargisi${index - 1}','words30_diatakeis_katarg_${index - 1}')" onpaste="wordsCounter('field_30_diatakseis_katargisi${index - 1}','words30_diatakeis_katarg_${index - 1}')" rows="2"></textarea>
                <p style="float: right;">Λέξεις: <span id="words30_diatakeis_katarg_${
                  index - 1
                }" ></span></p>
            </td> 
            <td> 
                <textarea class="govgr-textarea" id="field_30_katargoumenes_diatakseis${
                  index - 1
                }" name="field_30_katargoumenes_diatakseis${index - 1}" onkeypress="wordsCounter('field_30_katargoumenes_diatakseis${index - 1}','words30_diatakeis_katargoum_${index - 1}')" onpaste="wordsCounter('field_30_katargoumenes_diatakseis${index - 1}','words30_diatakeis_katargoum_${index - 1}')" rows="2"></textarea>
                <p style="float: right;">Λέξεις: <span id="words30_diatakeis_katargoum_${
                  index - 1
                }" ></span></p>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button> 
            </td>
        </tr>`);
});

$("#add_row_table_31").on("click", function () {
  let index = $("#tbody_31").prop("rows").length;
  $("#tbody_31").append(`
        <tr id="R${++index}"> 
            <td> 
                <textarea class="govgr-textarea" id="field_31_sxetiki_diataksi${
                  index - 1
                }" name="field_31_sxetiki_diataksi${index - 1}" rows="2" ></textarea>                                                            
            </td> 
            <td> 
                <textarea class="govgr-textarea" id="field_31_synarmodia_ypoyrgeia${
                  index - 1
                }" name="field_31_synarmodia_ypoyrgeia${index - 1}" rows="2"></textarea>
            </td> 
            <td> 
                <br>
                <textarea class="govgr-textarea" id="field_31_antikeimeno_synarmodiotitas${
                  index - 1
                }" name="field_31_antikeimeno_synarmodiotitas${index - 1}" rows="2" onkeypress="wordsCounter('field_31_antikeimeno_synarmodiotitas${index - 1}','words31_${index - 1}',50, event)" onpaste="wordsCounter('field_31_antikeimeno_synarmodiotitas${index - 1}','words31_${index - 1}',50, event)"></textarea>
                <p style="float: right;">Λέξεις: <span id="words31_${
                  index - 1
                }" ></span> /50</p>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button> 
            </td>    
        </tr>`);
});

$("#add_row_table_32").on("click", function () {
  let index = $("#tbody_32").prop("rows").length;
  $("#tbody_32").append(`
        <tr id="R${++index}"> 
            <td> 
                <textarea class="govgr-textarea" id="field_32_eksousiodotiki_diataksi${
                  index - 1
                }" name="field_32_eksousiodotiki_diataksi${index - 1}" placeholder="Εξουσιοδοτική διάταξη" rows="4"></textarea>
            </td> 
            <td> 
                <textarea class="govgr-textarea" id="field_32_eidos_praksis${
                  index - 1
                }" name="field_32_eidos_praksis${index - 1}" placeholder="Είδος πράξης" rows="4"></textarea>
            </td> 
            <td> 
                <textarea class="govgr-textarea" id="field_32_armodio_ypoyrgeio${
                  index - 1
                }" name="field_32_armodio_ypoyrgeio${index - 1}" placeholder="Αρμόδιο ή επισπεύδον Υπουργείο ή υπηρεσία" rows="4"></textarea>
            </td> 
            <td> 
                <br>
                <textarea class="govgr-textarea" id="field_32_antikeimeno${
                  index - 1
                }" name="field_32_antikeimeno${index - 1}" placeholder="Αντικείμενο" rows="4" onkeypress="wordsCounter('field_32_antikeimeno${index - 1}','words32_${index - 1}',50, event)" onpaste="wordsCounter('field_32_antikeimeno${index - 1}','words32_${index - 1}',50, event)"></textarea>
                <p style="float: right;">Λέξεις: <span id="words32_${
                  index - 1
                }" ></span> /50</p>                                            
            </td> 
            <td> 
                <br>
                <textarea class="govgr-textarea" id="field_32_xronodiagramma${
                  index - 1
                }" name="field_32_xronodiagramma${index - 1}" placeholder="Χρονοδιάγραμμα (ενδεικτική ή αποκλειστική προθεσμία)" rows="4"></textarea>
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button> 
            </td>    
        </tr>`);
});

$("#add_row_emd_table").on("click", function () {
  let index = $("#emd_processes_tbody").prop("rows").length;
  $("#emd_processes_tbody").append(`
        <tr id="R${++index}">  
            <td> 
                <textarea id="process${
                  index - 1
                }" name="process${index - 1}" class="govgr-textarea" rows="1" ></textarea> 
            </td>                
        </tr>`);
});

$("#add_row_education").on("click", function () {
  let index = $("#ekpaideysi_table_tbody").prop("rows").length;
  $("#ekpaideysi_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="ekpaideysi_index${
                  index - 1
                }" name="ekpaideysi_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ekpaideysi_year1_${
                  index - 1
                }" type="text" name="ekpaideysi_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="ekpaideysi_year2_${
                  index - 1
                }" type="text" name="ekpaideysi_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="ekpaideysi_year3_${
                  index - 1
                }" type="text" name="ekpaideysi_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="ekpaideysi_year4_${
                  index - 1
                }" type="text" name="ekpaideysi_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="ekpaideysi_year5_${
                  index - 1
                }" type="text" name="ekpaideysi_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ekpaideysi_stoixeia_${
                  index - 1
                }" type="text" name="ekpaideysi_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="ekpaideysi_stoxos_${
                  index - 1
                }" type="text" name="ekpaideysi_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`ekpaideysi_index${index - 1}`, "ΕΚΠΑΙΔΕΥΣΗ");
});

$("#add_row_civ").on("click", function () {
  let index = $("#politismos_table_tbody").prop("rows").length;
  $("#politismos_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="politismos_index${
                  index - 1
                }" name="politismos_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="politismos_year1_${
                  index - 1
                }" type="text" name="politismos_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="politismos_year2_${
                  index - 1
                }" type="text" name="politismos_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="politismos_year3_${
                  index - 1
                }" type="text" name="politismos_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="politismos_year4_${
                  index - 1
                }" type="text" name="politismos_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="politismos_year5_${
                  index - 1
                }" type="text" name="politismos_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="politismos_stoixeia_${
                  index - 1
                }" type="text" name="politismos_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="politismos_stoxos_${
                  index - 1
                }" type="text" name="politismos_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`politismos_index${index - 1}`, "ΠΟΛΙΤΙΣΜΟΣ");
});

$("#add_row_economy").on("click", function () {
  let index = $("#oikonomia_table_tbody").prop("rows").length;
  $("#oikonomia_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="oikonomia_index${
                  index - 1
                }" name="oikonomia_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="oikonomia_year1_${
                  index - 1
                }" type="text" name="oikonomia_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="oikonomia_year2_${
                  index - 1
                }" type="text" name="oikonomia_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="oikonomia_year3_${
                  index - 1
                }" type="text" name="oikonomia_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="oikonomia_year4_${
                  index - 1
                }" type="text" name="oikonomia_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="oikonomia_year5_${
                  index - 1
                }" type="text" name="oikonomia_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="oikonomia_stoixeia_${
                  index - 1
                }" type="text" name="oikonomia_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="oikonomia_stoxos_${
                  index - 1
                }" type="text" name="oikonomia_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`oikonomia_index${index - 1}`, "ΟΙΚΟΝΟΜΙΑ");
});

$("#add_row_taxation").on("click", function () {
  let index = $("#forologia_table_tbody").prop("rows").length;
  $("#forologia_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="forologia_index${
                  index - 1
                }" name="forologia_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="forologia_year1_${
                  index - 1
                }" type="text" name="forologia_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="forologia_year2_${
                  index - 1
                }" type="text" name="forologia_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="forologia_year3_${
                  index - 1
                }" type="text" name="forologia_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="forologia_year4_${
                  index - 1
                }" type="text" name="forologia_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="forologia_year5_${
                  index - 1
                }" type="text" name="forologia_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="forologia_stoixeia_${
                  index - 1
                }" type="text" name="forologia_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="forologia_stoxos_${
                  index - 1
                }" type="text" name="forologia_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`forologia_index${index - 1}`, "ΦΟΡΟΛΟΓΙΑ");
});

$("#add_row_relations").on("click", function () {
  let index = $("#ergasiakes_sxeseis_table_tbody").prop("rows").length;
  $("#ergasiakes_sxeseis_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="ergasiakes_sxeseis_index${
                  index - 1
                }" name="ergasiakes_sxeseis_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ergasiakes_sxeseis_year1_${
                  index - 1
                }" type="text" name="ergasiakes_sxeseis_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="ergasiakes_sxeseis_year2_${
                  index - 1
                }" type="text" name="ergasiakes_sxeseis_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="ergasiakes_sxeseis_year3_${
                  index - 1
                }" type="text" name="ergasiakes_sxeseis_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="ergasiakes_sxeseis_year4_${
                  index - 1
                }" type="text" name="ergasiakes_sxeseis_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="ergasiakes_sxeseis_year5_${
                  index - 1
                }" type="text" name="ergasiakes_sxeseis_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ergasiakes_sxeseis_stoixeia_${
                  index - 1
                }" type="text" name="ergasiakes_sxeseis_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="ergasiakes_sxeseis_stoxos_${
                  index - 1
                }" type="text" name="ergasiakes_sxeseis_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(
    `ergasiakes_sxeseis_index${index - 1}`,
    "ΕΡΓΑΣΙΑΚΕΣ ΣΧΕΣΕΙΣ"
  );
});

$("#add_row_employment").on("click", function () {
  let index = $("#apasxolisi_table_tbody").prop("rows").length;
  $("#apasxolisi_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="apasxolisi_index${
                  index - 1
                }" name="apasxolisi_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="apasxolisi_year1_${
                  index - 1
                }" type="text" name="apasxolisi_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="apasxolisi_year2_${
                  index - 1
                }" type="text" name="apasxolisi_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="apasxolisi_year3_${
                  index - 1
                }" type="text" name="apasxolisi_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="apasxolisi_year4_${
                  index - 1
                }" type="text" name="apasxolisi_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="apasxolisi_year5_${
                  index - 1
                }" type="text" name="apasxolisi_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="apasxolisi_stoixeia_${
                  index - 1
                }" type="text" name="apasxolisi_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="apasxolisi_stoxos_${
                  index - 1
                }" type="text" name="apasxolisi_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`apasxolisi_index${index - 1}`, "ΑΠΑΣΧΟΛΗΣΗ");
});

$("#add_row_insurance").on("click", function () {
  let index = $("#koinoniki_asfalisi_table_tbody").prop("rows").length;
  $("#koinoniki_asfalisi_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="koinoniki_asfalisi_index${
                  index - 1
                }" name="koinoniki_asfalisi_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="koinoniki_asfalisi_year1_${
                  index - 1
                }" type="text" name="koinoniki_asfalisi_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="koinoniki_asfalisi_year2_${
                  index - 1
                }" type="text" name="koinoniki_asfalisi_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="koinoniki_asfalisi_year3_${
                  index - 1
                }" type="text" name="koinoniki_asfalisi_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="koinoniki_asfalisi_year4_${
                  index - 1
                }" type="text" name="koinoniki_asfalisi_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="koinoniki_asfalisi_year5_${
                  index - 1
                }" type="text" name="koinoniki_asfalisi_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_asfalisi_stoixeia_${
                  index - 1
                }" type="text" name="koinoniki_asfalisi_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_asfalisi_stoxos_${
                  index - 1
                }" type="text" name="koinoniki_asfalisi_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(
    `koinoniki_asfalisi_index${index - 1}`,
    "ΚΟΙΝΩΝΙΚΗ ΑΣΦΑΛΙΣΗ"
  );
});

$("#add_row_welfare").on("click", function () {
  let index = $("#koinoniki_pronoia_table_tbody").prop("rows").length;
  $("#koinoniki_pronoia_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="koinoniki_pronoia_index${
                  index - 1
                }" name="koinoniki_pronoia_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="koinoniki_pronoia_year1_${
                  index - 1
                }" type="text" name="koinoniki_pronoia_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="koinoniki_pronoia_year2_${
                  index - 1
                }" type="text" name="koinoniki_pronoia_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="koinoniki_pronoia_year3_${
                  index - 1
                }" type="text" name="koinoniki_pronoia_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="koinoniki_pronoia_year4_${
                  index - 1
                }" type="text" name="koinoniki_pronoia_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="koinoniki_pronoia_year5_${
                  index - 1
                }" type="text" name="koinoniki_pronoia_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_pronoia_stoixeia_${
                  index - 1
                }" type="text" name="koinoniki_pronoia_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="koinoniki_pronoia_stoxos_${
                  index - 1
                }" type="text" name="koinoniki_pronoia_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(
    `koinoniki_pronoia_index${index - 1}`,
    "ΚΟΙΝΩΝΙΚΗ ΠΡΟΝΟΙΑ"
  );
});

$("#add_row_healthcare").on("click", function () {
  let index = $("#ygeia_table_tbody").prop("rows").length;
  $("#ygeia_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="ygeia_index${
                  index - 1
                }" name="ygeia_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ygeia_year1_${
                  index - 1
                }" type="text" name="ygeia_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="ygeia_year2_${
                  index - 1
                }" type="text" name="ygeia_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="ygeia_year3_${
                  index - 1
                }" type="text" name="ygeia_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="ygeia_year4_${
                  index - 1
                }" type="text" name="ygeia_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="ygeia_year5_${
                  index - 1
                }" type="text" name="ygeia_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ygeia_stoixeia_${
                  index - 1
                }" type="text" name="ygeia_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="ygeia_stoxos_${
                  index - 1
                }" type="text" name="ygeia_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`ygeia_index${index - 1}`, "ΥΓΕΙΑ");
});

$("#add_row_equality").on("click", function () {
  let index = $("#isotita_fylwn_table_tbody").prop("rows").length;
  $("#isotita_fylwn_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="isotita_fylwn_index${
                  index - 1
                }" name="isotita_fylwn_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="isotita_fylwn_year1_${
                  index - 1
                }" type="text" name="isotita_fylwn_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="isotita_fylwn_year2_${
                  index - 1
                }" type="text" name="isotita_fylwn_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="isotita_fylwn_year3_${
                  index - 1
                }" type="text" name="isotita_fylwn_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="isotita_fylwn_year4_${
                  index - 1
                }" type="text" name="isotita_fylwn_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="isotita_fylwn_year5_${
                  index - 1
                }" type="text" name="isotita_fylwn_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="isotita_fylwn_stoixeia_${
                  index - 1
                }" type="text" name="isotita_fylwn_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="isotita_fylwn_stoxos_${
                  index - 1
                }" type="text" name="isotita_fylwn_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`isotita_fylwn_index${index - 1}`, "ΙΣΟΤΗΤΑ ΦΥΛΩΝ");
});

$("#add_row_immigration").on("click", function () {
  let index = $("#metanasteytiki_prosfygiki_politiki_table_tbody").prop(
    "rows"
  ).length;
  $("#metanasteytiki_prosfygiki_politiki_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="metanasteytiki_prosfygiki_politiki_index${
                  index - 1
                }" name="metanasteytiki_prosfygiki_politiki_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year1_${
                  index - 1
                }" type="text" name="metanasteytiki_prosfygiki_politiki_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year2_${
                  index - 1
                }" type="text" name="metanasteytiki_prosfygiki_politiki_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year3_${
                  index - 1
                }" type="text" name="metanasteytiki_prosfygiki_politiki_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year4_${
                  index - 1
                }" type="text" name="metanasteytiki_prosfygiki_politiki_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_year5_${
                  index - 1
                }" type="text" name="metanasteytiki_prosfygiki_politiki_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_stoixeia_${
                  index - 1
                }" type="text" name="metanasteytiki_prosfygiki_politiki_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="metanasteytiki_prosfygiki_politiki_stoxos_${
                  index - 1
                }" type="text" name="metanasteytiki_prosfygiki_politiki_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(
    `metanasteytiki_prosfygiki_politiki_index${index - 1}`,
    "ΜΕΤΑΝΑΣΤΕΥΤΙΚΗ-ΠΡΟΣΦΥΓΙΚΗ ΠΟΛΙΤΙΚΗ"
  );
});

$("#add_row_administration").on("click", function () {
  let index = $("#dimosia_dioikisi_table_tbody").prop("rows").length;
  $("#dimosia_dioikisi_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="dimosia_dioikisi_index${
                  index - 1
                }" name="dimosia_dioikisi_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="dimosia_dioikisi_year1_${
                  index - 1
                }" type="text" name="dimosia_dioikisi_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="dimosia_dioikisi_year2_${
                  index - 1
                }" type="text" name="dimosia_dioikisi_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="dimosia_dioikisi_year3_${
                  index - 1
                }" type="text" name="dimosia_dioikisi_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="dimosia_dioikisi_year4_${
                  index - 1
                }" type="text" name="dimosia_dioikisi_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="dimosia_dioikisi_year5_${
                  index - 1
                }" type="text" name="dimosia_dioikisi_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="dimosia_dioikisi_stoixeia_${
                  index - 1
                }" type="text" name="dimosia_dioikisi_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="dimosia_dioikisi_stoxos_${
                  index - 1
                }" type="text" name="dimosia_dioikisi_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`dimosia_dioikisi_index${index - 1}`, "ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ");
});

$("#add_row_security").on("click", function () {
  let index = $("#dimosia_asfaleia_table_tbody").prop("rows").length;
  $("#dimosia_asfaleia_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="dimosia_asfaleia_index${
                  index - 1
                }" name="dimosia_asfaleia_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="dimosia_asfaleia_year1_${
                  index - 1
                }" type="text" name="dimosia_asfaleia_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="dimosia_asfaleia_year2_${
                  index - 1
                }" type="text" name="dimosia_asfaleia_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="dimosia_asfaleia_year3_${
                  index - 1
                }" type="text" name="dimosia_asfaleia_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="dimosia_asfaleia_year4_${
                  index - 1
                }" type="text" name="dimosia_asfaleia_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="dimosia_asfaleia_year5_${
                  index - 1
                }" type="text" name="dimosia_asfaleia_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="dimosia_asfaleia_stoixeia_${
                  index - 1
                }" type="text" name="dimosia_asfaleia_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="dimosia_asfaleia_stoxos_${
                  index - 1
                }" type="text" name="dimosia_asfaleia_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`dimosia_asfaleia_index${index - 1}`, "ΔΗΜΟΣΙΑ ΑΣΦΑΛΕΙΑ");
});

$("#add_row_justice").on("click", function () {
  let index = $("#dikaiosini_table_tbody").prop("rows").length;
  $("#dikaiosini_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="dikaiosini_index${
                  index - 1
                }" name="dikaiosini_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="dikaiosini_year1_${
                  index - 1
                }" type="text" name="dikaiosini_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="dikaiosini_year2_${
                  index - 1
                }" type="text" name="dikaiosini_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="dikaiosini_year3_${
                  index - 1
                }" type="text" name="dikaiosini_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="dikaiosini_year4_${
                  index - 1
                }" type="text" name="dikaiosini_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="dikaiosini_year5_${
                  index - 1
                }" type="text" name="dikaiosini_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="dikaiosini_stoixeia_${
                  index - 1
                }" type="text" name="dikaiosini_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="dikaiosini_stoxos_${
                  index - 1
                }" type="text" name="dikaiosini_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(`dikaiosini_index${index - 1}`, "ΔΙΚΑΙΟΣΥΝΗ");
});

$("#add_row_investments").on("click", function () {
  let index = $("#ependytiki_drastiriotita_table_tbody").prop("rows").length;
  $("#ependytiki_drastiriotita_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="ependytiki_drastiriotita_index${
                  index - 1
                }" name="ependytiki_drastiriotita_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="ependytiki_drastiriotita_year1_${
                  index - 1
                }" type="text" name="ependytiki_drastiriotita_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="ependytiki_drastiriotita_year2_${
                  index - 1
                }" type="text" name="ependytiki_drastiriotita_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="ependytiki_drastiriotita_year3_${
                  index - 1
                }" type="text" name="ependytiki_drastiriotita_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="ependytiki_drastiriotita_year4_${
                  index - 1
                }" type="text" name="ependytiki_drastiriotita_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="ependytiki_drastiriotita_year5_${
                  index - 1
                }" type="text" name="ependytiki_drastiriotita_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="ependytiki_drastiriotita_stoixeia_${
                  index - 1
                }" type="text" name="ependytiki_drastiriotita_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="ependytiki_drastiriotita_stoxos_${
                  index - 1
                }" type="text" name="ependytiki_drastiriotita_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(
    `ependytiki_drastiriotita_index${index - 1}`,
    "ΕΠΙΧΕΙΡΗΜΑΤΙΚΗ/ΕΠΕΝΔΥΤΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ"
  );
});

$("#add_row_energy").on("click", function () {
  let index = $("#perivallon_energeia_table_tbody").prop("rows").length;
  $("#perivallon_energeia_table_tbody").append(`
        <tr id="R${++index}">
            <td>
                <select id="perivallon_energeia_index${
                  index - 1
                }" name="perivallon_energeia_index${index - 1}" class="govgr-select" style="width:40%;" ></select>
            </td>
            <td>
                <br>
                <input class="govgr-input" id="perivallon_energeia_year1_${
                  index - 1
                }" type="text" name="perivallon_energeia_year1_${index - 1}" style="width:40%;" placeholder="χρονιά 1"/>
                <input class="govgr-input" id="perivallon_energeia_year2_${
                  index - 1
                }" type="text" name="perivallon_energeia_year2_${index - 1}" style="width:40%;" placeholder="χρονιά 2" />
                <input class="govgr-input" id="perivallon_energeia_year3_${
                  index - 1
                }" type="text" name="perivallon_energeia_year3_${index - 1}" style="width:40%;" placeholder="χρονιά 3"/>
                <input class="govgr-input" id="perivallon_energeia_year4_${
                  index - 1
                }" type="text" name="perivallon_energeia_year4_${index - 1}" style="width:40%;" placeholder="χρονιά 4"/>
                <input class="govgr-input" id="perivallon_energeia_year5_${
                  index - 1
                }" type="text" name="perivallon_energeia_year5_${index - 1}" style="width:40%;" placeholder="χρονιά 5"/>
                
            </td>
            <td>
                <input class="govgr-input" id="perivallon_energeia_stoixeia_${
                  index - 1
                }" type="text" name="perivallon_energeia_stoixeia_${index - 1}" />                               
            </td>
            <td>
                <input class="govgr-input" id="perivallon_energeia_stoxos_${
                  index - 1
                }" type="text" name="perivallon_energeia_stoxos_${index - 1}" />                               
                <button class="btn remove float-right" type="button"><img src="/img/delete.png" width="20px"></button>
            </td>            
        </tr>`);
  populateIndexSelect(
    `perivallon_energeia_index${index - 1}`,
    "ΠΕΡΙΒΑΛΛΟΝ – ΕΝΕΡΓΕΙΑ"
  );
});

//TODO: remove after field_9 refactoring
$("#eidikoteroi_stoxoi_analogws_tomea table").addClass(
  "govgr-table--light govgr-table govgr-table--with-vertical-header govgr-table--with-vertical-lines"
);
$("#eidikoteroi_stoxoi_analogws_tomea table").removeClass("table");
$("#eidikoteroi_stoxoi_analogws_tomea table > thead").addClass(
  "govgr-table__head govgr-table__header--numeric"
);
$("#eidikoteroi_stoxoi_analogws_tomea table > thead").removeClass("thead");
$("#eidikoteroi_stoxoi_analogws_tomea table > thead > tr").addClass(
  "govgr-table__row"
);
$("#eidikoteroi_stoxoi_analogws_tomea table > thead > tr > th").addClass(
  "govgr-table__header"
);
$("#eidikoteroi_stoxoi_analogws_tomea table > thead > tr > th").prop(
  "scope",
  "col"
);

$("#eidikoteroi_stoxoi_analogws_tomea table > tbody").addClass(
  "govgr-table__body"
);
$("#eidikoteroi_stoxoi_analogws_tomea table > tbody > tr").addClass(
  "govgr-table__row"
);
$("#eidikoteroi_stoxoi_analogws_tomea table > tbody > tr > th").addClass(
  "govgr-table__header govgr-table__header--numeric"
);
$("#eidikoteroi_stoxoi_analogws_tomea tbody > thead > tr > th").prop(
  "scope",
  "col"
);
$(
  "#eidikoteroi_stoxoi_analogws_tomea table > tbody > tr > th > input"
).addClass("govgr-input");
$("#eidikoteroi_stoxoi_analogws_tomea table > tbody > tr > td").addClass(
  "govgr-table__cell govgr-table__cell--numeric"
);
$(
  "#eidikoteroi_stoxoi_analogws_tomea table > tbody > tr > td > input"
).addClass("govgr-input");

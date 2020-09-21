$("form").on("submit",function(ev){
    ev.preventDefault();
    console.log($(this).serialize())//comment this line out to hide query wrote in db

    $.ajax({
        url: '/create',
        data:$(this).serialize(),
        error: function(error) {
            console.log(error)
        },
        success: function(data) {
            window.location.href="/dashboard"
        },
        type: 'POST'
    });
});

$("#ekpedeusi_politismos").click( function(ev){
    if(this.checked) {
        $("#politismos_table").show();
    }    
});

$("#field_10_emmesi").on("change", function(ev){
    $("#emesi_wrap").toggle();
});

$("#field_10_amesi").on("change", function(ev){
    $("#amesi_wrap").toggle();
});

$("#field_25_dikaio").on("change", function(ev){
    $("#dikaio_wrap").toggle();
});

$("#field_25_kanonismos").on("change", function(ev){
    $("#kanonismos_wrap").toggle();
});

$("#field_25_odigia").on("change", function(ev){
    $("#odigia_wrap").toggle();
});

$("#field_25_apofasi").on("change", function(ev){
    $("#apofasi_wrap").toggle();
});

$("#field_26_antrwpina_dikaiwmata").on("change", function(ev){
    $("#antrwpina_dikaiwmata_wrap").toggle();
});

$("#field_26_symvaseis").on("change", function(ev){
    $("#symvaseis_wrap").toggle();
});

$("#field_27_dikastirio").on("change", function(ev){
    $("#dikastirio_wrap").toggle();
});

$("#field_27_arxi").on("change", function(ev){
    $("#arxi_wrap").toggle();
});

$("#field_28_nomologia").on("change", function(ev){
    $("#nomologia_wrap").toggle();
});

$("#field_28_nomologia_dikaiwmatwn_anthrwpou").on("change", function(ev){
    $("#nomologia_dikaiwmatwn_anthrwpou_wrap").toggle();
});

$("#field_28_alla_dikastiria").on("change", function(ev){
    $("#alla_dikastiria_wrap").toggle();
});

$("#field_4").on("click", function(ev){
    if($(this).val()=="yes"){
        $("#field_4_wrap").show();
    }else{
        $("#field_4_wrap").hide();
    }    
});

$("#field_6").on("change", function(ev){
    if($(this).val()=="yes"){
        $("#field_6_wrap").show();
    }else{
        $("#field_6_wrap").hide();
    }    
});

$("#field_11").on("change", function(ev){
    if($(this).val()=="yes"){
        $("#field_11_wrap").show();
    }else{
        $("#field_11_wrap").hide();
    }    
});

$("#field_12").on("change", function(ev){
    if($(this).val()=="yes"){
        $("#field_12_wrap").show();
    }else{
        $("#field_12_wrap").hide();
    }    
});

$("#field_13").on("change", function(ev){
    if($(this).val()=="yes"){
        $("#field_13_wrap").show();
    }else{
        $("#field_13_wrap").hide();
    }    
});

var current_fs, next_fs, previous_fs; //fieldsets


$(".next").click(function(){
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
    current_fs.hide();
});

$(".previous").click(function(){
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
    current_fs.hide();
});

$(".submit").click(function(){
	return false;
});

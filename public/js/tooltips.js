/////////////////////////TOOLTIPS/////////////////////////

function textCleanUp(text) {

    text = text.replace(/&#34;/g, '"')
        .replace(/[\u0000-\u0019]+/g, "")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");//cleaning tooltips with regexs
    text = JSON.parse(text);//parse to JSON obj
    return text;
}

function createTooltips(tooltips) {

    //for rows in csv call function        
    for (i in tooltips) {
        var fieldId = tooltips[i].fieldId
        if (fieldId) {
            if ($("." + fieldId).length > 0) {
                addTooltipByClass(fieldId);
            } else {
                addTooltip(tooltips[i].fieldId);
            }
        }
    }
}

function tooltipEvents(imgId, tooltipClass) {
    const img = document.querySelector('#' + imgId);
    const tooltip = document.querySelector('#' + tooltipClass);
    let popperInstance = null;

    function create() {
        popperInstance = Popper.createPopper(img, tooltip, {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });
    }

    function destroy() {
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
    }

    function show() {
        tooltip.setAttribute('data-show', '');
        create();
    }

    function hide() {
        tooltip.removeAttribute('data-show');
        destroy();
    }

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach(event => {
        img.addEventListener(event, show);
    });

    hideEvents.forEach(event => {
        img.addEventListener(event, hide);
    });
}

function addTooltip(fieldID) {
    var parentDiv = $('#' + fieldID).closest('div.form-group');
    var tooltip = `<div class="tooltip_div" >
                    <img src="/img/information.png"  id="${fieldID}_tooltip_img" aria-describedby="${fieldID}_tooltip_img" 
                        onmouseover="tooltipEvents('${fieldID}_tooltip_img', '${fieldID}_tooltip_div'); setTooltip('${fieldID}_tooltip_div','${fieldID}');" width="20px" >
                    <div id="${fieldID}_tooltip_div" class="tooltip_text" role="tooltip"></div>
                </div>`;
    parentDiv.append(tooltip);
}

function addTooltipByClass(fieldID) {
    var parentDiv = $("." + fieldID);
    parentDiv.each(function (index) {
        var tooltip = `<div class="tooltip_div" >
                    <img src="/img/information.png"  id="${fieldID}_tooltip_img_${index}" aria-describedby="${fieldID}_tooltip_img" 
                        onmouseover="tooltipEvents('${fieldID}_tooltip_img_${index}', '${fieldID}_tooltip_div_${index}'); setTooltip('${fieldID}_tooltip_div_${index}','${fieldID}');" width="20px" >
                    <div id="${fieldID}_tooltip_div_${index}" class="tooltip_text" role="tooltip"></div>
                </div>`;
        $(this).append(tooltip);
    });
}

function setTooltip(divID, fieldId) {

    //var fieldId = fieldId.substring(1)//remove 1st character if #fieldID is passed as parameter
    var tooltip;
    for (i in tooltips) {
        if (tooltips[i].fieldId == fieldId) {
            tooltip = tooltips[i].tooltipText;
            $("#" + divID).html((tooltip));
        }
    }
}
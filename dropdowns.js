$("nav").on('click','.dropButton',function (evt) {
    var sib = $(evt.target).next().one();
    var shown = sib.hasClass('show');
    closeAllDropDowns();
    // open our dropdown, if not shown
    if(!shown) {
        sib.addClass('show');
    }
});

function closeAllDropDowns() {
    $(".dropContent,.dropClickContent").removeClass('show');
}

// This closes all drop-downs if you click anywhere outside the dropContent
// or in it, unless it's a .dropClickContent or the datepicker is open

var datePickerOpen = false;

$(window).click(function (evt) {
    g = evt.target;
    if(datePickerOpen) return;
    var dcc = $(evt.target).closest(".dropClickContent");
    var inDcc = (dcc.length === 1);
    if (!evt.target.matches('.dropButton') &&
        !evt.target.matches('.ui-datepicker') &&
        !inDcc) {
       closeAllDropDowns();
    }
});

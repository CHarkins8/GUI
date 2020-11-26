

/**************
Slider:
  onload, edit table to active tab:
    call update slider function
**************/
/**************
Add tab:
  Check if tabs are > 5, if so error
    Count how many li are in #tabs ul
  If not, add tab then call update slider function
  Add tab by creating new li a into #tabs ul and a new <div> at end of #tabs
**************/
/**************
Remove tab:
Remove  li a from #tabs ul and its <div> at end of #tabs
  Check for href of li that matches id of div
**************/


$(document).ready(function() {
 $("#demoTabs").tabs();
 $("#removeTabs").click(function() {
var tabIndex = parseInt($("#indexValue").val(), 10);
var tab = $( "#demoTabs" ).find(".ui-tabs-nav li:eq(" + tabIndex + ")").remove();
$("#demoTabs").tabs("refresh");
});
$("#addTabs").click(function() {
$("<li><a href='myTab.txt'>New Tab</a></li>").appendTo("#demoTabs .ui-tabs-nav");
$("#demoTabs").tabs("refresh");
});

});

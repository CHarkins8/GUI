
/*******
*Noticable Errors I tried and failed to fix:
*
*If you delete and add a new tab, there will be multiple tabs of the same name
*if you delet one tab of the same name as another, they both will be deleted
*Slider values don't change when you switch tabs
*******/


$(function() {
  // Tab Add and Remove
  $("#tabs").tabs();
  $("#removeTabs").click(function() {
    //var tabIndex = parseInt($("#indexValue").val(), 10);
    //var tab = $( "#tabs" ).find(".ui-tabs-nav li:eq(" + tabIndex + ")").remove();
    var oldtabId = $("#tabs .ui-tabs-panel:visible").attr("id");
    $("#tabs").find(".ui-tabs-nav li a[href='#" + oldtabId + "']").parent().remove();
    $("#tabs").find("div[id=" + oldtabId + "]").remove();
    var value = 0;
    /*
    $('#tabs ul li').each(function() {  value += 1;  });
    var oldtabNumber = parseInt(oldtabId.split("-")[1]);
    if(value >= oldtabNumber){
      $('#tabs ul li').each(function() {
        var tabId = $(this.innerHTML);
        var href = $(tabId).attr('href');
        var tabNumber = parseInt(href.split("-")[1]);
        console.log("tabNum: ", tabNumber);
        if(tabNumber >= value){
          document.getElementById(href.split("#")[1]).setAttribute('id', ("tab-" + tabNumber-1));
          $("a[href='" + href +"']").prop("href", ("tab-" + tabNumber-1));
        }
      });
    }
    */
    $("#tabs").tabs("refresh");
  });
  $("#addTabs").click(function() {
    var value = 0;
    $('#tabs ul li').each(function () {  value += 1;  });
    value += 1;
    if(value <= 5){
      //$("<li><a href='tab-" + value + "'>Table" + value + "</a></li>").appendTo("#tabs .ui-tabs-nav");
      $("#tabs ul").append("<li><a href='#tab-" + value + "'>Table" + value + "</a></li>" );
      $("#tabs").append("<div id='tab-" + value + "'></div>");
      $("#tabs").tabs("refresh");
    }
  });

  //Row slider
  $( "#slider-1" ).slider({
    range: true,
    min: -50,
    max: 50,
    values: [ 5, 50 ],
    slide: function( event, ui ) {
      $( "#amount1" ).val( "MinRow: " + ui.values[ 0 ] + "  MaxRow: " + ui.values[ 1 ] );
      GenerateTable();
    }
  });
  $( "#amount1" ).val( "MinRow: " + $( "#slider-1" ).slider( "values", 0 ) +
  "  MaxRow: " + $( "#slider-1" ).slider( "values", 1 ) );

  // Column slider
  $( "#slider-2" ).slider({
    range: true,
    min: -50,
    max: 50,
    values: [ 5, 50 ],
    slide: function( event, ui ) {
      $( "#amount2" ).val( "MinCol: " + ui.values[ 0 ] + "  MaxCol: " + ui.values[ 1 ] );
      GenerateTable();
    }
  });
  $( "#amount2" ).val( "MinCol: " + $( "#slider-2" ).slider( "values", 0 ) +
  "  MaxCol: " + $( "#slider-2" ).slider( "values", 1 ) );
  
});





// Makes the table
function GenerateTable() {
  // Input handling
  var minRow = $('#slider-1').slider("values", 0);
  var maxRow = $('#slider-1').slider("values", 1);
  var minCol = $('#slider-2').slider("values", 0);
  var maxCol = $('#slider-2').slider("values", 1);
  var diffRow = Math.abs(maxRow-minRow);
  var diffCol = Math.abs(maxCol-minCol);

  /* Set up HTML for new table */
  var newTable = "<table><tr><th></th>";
  for(k = 0; k < diffCol+1; k++) {
    newTable += "<th>";
    newTable += minCol+k;
    newTable += "</th>";
  }
  newTable += "</tr>";

  for(i = 0; i < diffRow+1; i++) {
    newTable += "<tr>";
    for(j = 0; j < diffCol+2; j++) {
        if(j == 0) {
          newTable += "<th>";
          newTable += minRow+i;
          newTable += "</th>";
        }
        else {
          newTable += "<td>";
          newTable += ((minRow+i) * (minCol+j-1));
          newTable += "</td>"; }
    }
    newTable+= "</tr>";
  }
  newTable+= "</table>";

  /* Apply new HTML to active tab table */
  var tabId = $("#tabs .ui-tabs-panel:visible").attr("id");
  document.getElementById(tabId).innerHTML = newTable;
};

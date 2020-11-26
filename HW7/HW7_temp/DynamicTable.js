


/**************
*If number is decimal, round
*If number outisde range, change display to max or min
*LastRow-FirstRow, abs value,+ 1 is number of rows
*LastColumn-FirstColumn, abs value, +1 is number of columns
*First row fill with row numbers leaving Row[0] empty, Row[0] fill with column numbers
*Until ColumnMax(  Until RowMax( ((Row# -1)+RowMin#) * ((Column#-1)+ColumnMin#) )  )
**************/

// Function called by HTML Generate Table button
function generateTable() {
  /*After error check, update input display*/
  var MinRow = parseInt(document.getElementById("FirstRow").value, 10);
  var MaxRow = parseInt(document.getElementById("LastRow").value, 10);
  var MinCol = parseInt(document.getElementById("FirstColumn").value, 10);
  var MaxCol = parseInt(document.getElementById("LastColumn").value, 10);
  var DiffRow = Math.abs(MaxRow-MinRow);
  var DiffCol = Math.abs(MaxCol-MinCol);
  console.log("Row numbers: ", MinRow, " and ", MaxRow);
  console.log("Column numbers: ", MinCol, " and ", MaxCol);

  /* Set up HTML for new table */
  var newTable = "<tr><th></th>";
  for(k = 0; k < DiffCol+1; k++) {
    newTable += "<th>";
    newTable += MinCol+k;
    newTable += "</th>";
  }
  newTable += "</tr>";

  for(i = 0; i < DiffRow+1; i++) {
    newTable += "<tr>";
    for(j = 0; j < DiffCol+2; j++) {
        if(j == 0) {
          newTable += "<th>";
          newTable += MinRow+i;
          newTable += "</th>";
        }
        else {
          newTable += "<td>";
          newTable += ((MinRow+i) * (MinCol+j-1));
          newTable += "</td>"; }
    }
    newTable+= "</tr>";
  }

  /* Apply new HTML to table */
  document.getElementById("MultTable").innerHTML = newTable;
}


// Uses JQuery to do error handeling
$(document).ready(function() {
  // Input handling
  $("#FirstRow").on("input", function() { checkData(); });
  $("#LastRow").on("input", function() { checkData(); });
  $("#FirstColumn").on("input", function() { checkData(); });
  $("#LastColumn").on("input",function() { checkData(); });

  //Button click
  $("#GenerateTable button").click(function(event) {
    var errors = 0;
    $("#Form input").each(function(index) {
      var element = $(this);
      var valid = element.hasClass("valid");
      var error_mess = $("span", element.parent());
      if(!valid) {
        error_mess.removeClass("error").addClass("error_show");
        errors = 1;
      }
      else { error_mess.removeClass("error_show").addClass("error"); }
    });
    if (errors == 0) { generateTable(); event.preventDefault(); }
    else { event.preventDefault(); }
  });
});

function checkData() {
  var minRow = parseInt($("#FirstRow").val());
  var maxRow = parseInt($("#LastRow").val());
  var minColumn = parseInt($("#FirstColumn").val());
  var maxColumn = parseInt($("#LastColumn").val());

  // First Row
  if(minRow) { $("#FirstRow").removeClass("invalid").addClass("valid"); }
  else { $("#FirstRow").removeClass("valid").addClass("invalid"); }
  if(minRow > 50 || minRow < -50) {
    $("#FirstRow").removeClass("valid").addClass("invalid");
  }
  // Last Row
  if(maxRow) { $("#LastRow").removeClass("invalid").addClass("valid"); }
  else { $("#LastRow").removeClass("valid").addClass("invalid"); }
  if(maxRow > 50 || maxRow < -50) {
    $("#LastRow").removeClass("valid").addClass("invalid");
  }
  // Both Rows
  if(minRow && maxRow && (minRow > maxRow)) {
    $("#FirstRow").removeClass("valid").addClass("invalid");
    $("#LastRow").removeClass("valid").addClass("invalid");
  }

  // First Column
  if(minColumn) { $("#FirstColumn").removeClass("invalid").addClass("valid"); }
  else { $("#FirstColumn").removeClass("valid").addClass("invalid"); }
  if(minColumn > 50 || minColumn < -50) {
    $("#FirstColumn").removeClass("valid").addClass("invalid");
  }
  // Last Column
  if(maxColumn) { $("#LastColumn").removeClass("invalid").addClass("valid"); }
  else { $("#LastColumn").removeClass("valid").addClass("invalid"); }
  if(maxColumn > 50 || maxColumn < -50) {
    $("#LastColumn").removeClass("valid").addClass("invalid");
  }
  // Both Columns
  if(minColumn && maxColumn && (minColumn > maxColumn)) {
    $("#FirstColumn").removeClass("valid").addClass("invalid");
    $("#LastColumn").removeClass("valid").addClass("invalid");
  }
}


$( function() {
  $( "#slider" ).slider();
} );

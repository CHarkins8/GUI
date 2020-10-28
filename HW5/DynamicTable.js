


/**************
*If number is decimal, round
*If number outisde range, change display to max or min
*LastRow-FirstRow, abs value,+ 1 is number of rows
*LastColumn-FirstColumn, abs value, +1 is number of columns
*First row fill with row numbers leaving Row[0] empty, Row[0] fill with column numbers
*Until ColumnMax(  Until RowMax( ((Row# -1)+RowMin#) * ((Column#-1)+ColumnMin#) )  )
**************/

function GenerateTable() {
  /* Make sure input is within range for rows */
  errorMess = "";
  MinRow = Math.round( document.getElementById("FirstRow").value );
  MaxRow = Math.round( document.getElementById("LastRow").value);
  console.log("Row numbers: ", MinRow, " and ", MaxRow);
  if(MaxRow < MinRow) {
    temp = MaxRow;  MaxRow = MinRow;  MinRow = temp;
    errorMess += "Row Min and Row Max switched. <br>";
  }
  if(MinRow < -50) {MinRow = -50;  errorMess += "Row Min out of bounds. <br>"; }
  if(MaxRow > 50) {MaxRow = 50;  errorMess += "Row Max out of bounds. <br>";}
  DiffRow = Math.abs(MaxRow-MinRow);

  /* Make sure input is within range for columns */
  MinCol = Math.round( document.getElementById("FirstColumn").value);
  MaxCol = Math.round( document.getElementById("LastColumn").value);
  console.log("Column numbers: ", MinCol, " and ", MaxCol);
  if(MaxCol < MinCol) {
    temp = MaxCol;  MaxCol = MinCol;  MinCol = temp;
    errorMess += "Column Min and Column Max switched. <br>";
  }
  if(MinCol < -50) {MinCol = -50;  errorMess += "Column Min out of bounds. <br>";}
  if(MaxCol > 50) {MaxCol = 50;  errorMess += "Column Max out of bounds. <br>";}
  DiffCol = Math.abs(MaxCol-MinCol);

  /*After error check, update input display*/
  document.getElementById("FirstRow").value = MinRow;
  document.getElementById("LastRow").value = MaxRow;
  document.getElementById("FirstColumn").value = MinCol;
  document.getElementById("LastColumn").value = MaxCol;
  document.getElementById("Error").innerHTML = errorMess;

  /* Set up HTML for new table */
  newTable = "<tr><th></th>";
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
  return;
}

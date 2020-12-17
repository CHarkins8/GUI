
// Cassandra Harkins
// Cassandra_Harkins@student.uml.edu
// Student at UMass Lowell in 91.61 GUI Programming I
// Help from: https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/

/*
// Drag and drop one graphic
// Add multiple graphic sources and multiple graphic targets
// Identify which source was dropped on which target
// Implement Rack for tiles
// Implement a single row of the scrabble board (>1 bonus squares)
// Which letter to which block
// Tally score of user's word
// Tally score button, reset tiles button, restart game button, (back to rack)
// Outside bounds, back to Rack
// Once on board, can't be moved
// First letter can be placed anywhere, but subsequent letters placed adjacent
*/



// Make element dragable
$( init );

function init() {
  // Reset the game
  resetValues();
  deltTiles = 0;
  generateTiles();

  // Make board tiles droppable
  $(".boardTile").droppable({
    accept: '.tile',
    hoverClass: 'hovered',
    drop: handleCardDrop,
  });

}


function handleCardDrop( event, ui ) {
  // Get boardTileNumber and letter of dropped tile
  var boardTileNumber = $(this).attr( "id" ).split("-")[1];
  var tileLetter = ui.draggable.data( 'letter' );
  var tileIndex = ui.draggable.attr( "id" ).split("-")[1];
  //console.log(tileLetter);

  // If tile is first placed, remove droppable class
  tileRackValues["tile-" + tileIndex][1] = boardTileNumber;
  boardTileUsed[$(this).attr("id")] = 1;
  dropEdit();
  //console.log(tileRackValues);

  // Position tile directly
  // Prevent tile from being dragged again
  ui.draggable.draggable( 'disable' );
  $(this).droppable( 'disable' );
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  ui.draggable.draggable( 'option', 'revert', false );
}



function dropEdit() {
  //console.log(boardTileUsed)
  $(".boardTile").each(function(){
    currentBoardTileNumber = parseInt($(this).attr( "id" ).split("-")[1]);
    $(this).droppable("disable");
    // If current boardTile doesn't have tile on it
    // Check if adjacent squares have it
    if(boardTileUsed["boardTile-" + currentBoardTileNumber] != 1) {
      if(currentBoardTileNumber == 0) {
        if(boardTileUsed["boardTile-" + (currentBoardTileNumber + 1)] == 1) {
          $(this).droppable("option", "disabled", false);
        }
      }
      else if(currentBoardTileNumber == 9) {
        if(boardTileUsed["boardTile-" + (currentBoardTileNumber - 1)] == 1) {
          $(this).droppable("option", "disabled", false);
        }
      }
      else if(boardTileUsed["boardTile-" + (currentBoardTileNumber - 1)] == 1 ||
         boardTileUsed["boardTile-" + (currentBoardTileNumber + 1)] == 1) {
           $(this).droppable("option", "disabled", false);
      }
    }
  })
}








function generateTiles() {
  var i = 0;
  var max = 7;
  if(remainingTiles == 0) {alert("Max tiles played, please restart game"); return;}
  if(remainingTiles < 7) {max = remainingTiles}
  boardTileUsed = {"boardTile-0": 0,
                    "boardTile-1": 0,
                    "boardTile-2": 0,
                    "boardTile-3": 0,
                    "boardTile-4": 0,
                    "boardTile-5": 0,
                    "boardTile-6": 0,
                    "boardTile-7": 0,
                    "boardTile-8": 0,
                    "boardTile-9": 0,
                  };
  // If there are values in rack, move to front of array
  for( var key in tileRackValues ) {
    if(tileRackValues[key][1] == "boardTile-x" && tileRackValues[key][0] != undefined){
      temp = tileRackValues[key][0];
      tileRackValues[key][0] = undefined;
      tileRackValues[key][0] = "boardTile-x";
      tileRackValues["tile-" + i][0] = temp;
      i += 1;
    }
    tileRackValues[key][1] = "boardTile-x";
  }


  if(i > max) {max = i;}
  // Empty rack
  $( "#TileRack" ).empty();
  // Add old values if applicable
  for(j = 0; j < i; j++){
    makeTileDiv(j, tileRackValues["tile-" + j][0])
  }

  for ( i; i<max; i++ ) {
    // Generate random tile values
    randomIndex = Math.floor(Math.random() * (remainingTiles - 1) + 1);
    findLetter = 0;
    //console.log("Random: " + randomIndex);

    // Find the letter associated with the index
    // Then decrease the remaining tiles for that letter
    for(var j = 0; findLetter < randomIndex; j++) {
      findLetter += tiles["pieces"][j]["amount"];
    }
    j -= 1;
    random = tiles["pieces"][j]["letter"]
    tiles["pieces"][j]["amount"] -= 1;
    // Create new div
    makeTileDiv(i, random)

    tileRackValues["tile-" + i][0] = random;

    remainingTiles -= 1;
  }
}

function makeTileDiv(index, letter){
  temp = "graphics_data/Scrabble_Tiles/Scrabble_Tile_" + letter +".jpg";
  $('<div id=tile-' + index + ' class="tile"><img src="' + temp + '"></div>').data( 'letter', letter ).appendTo( '#TileRack' ).draggable( {
    containment: "#ScrabbleGame",
    cursor: "move",
    snap: ".boardTile",
    stack: '.tile',
    revert: true,
  } );
}



function resetTiles(){
  // TileRack values
  for(key in tileRackValues){
    if(tileRackValues[key][0] != undefined){
      for (var i=0; i < tiles["pieces"].length; i++) {
        if (tiles["pieces"][i]["letter"] == tileRackValues[key][0]) {
            tiles["pieces"][i]["amount"] += 1;
            remainingTiles += 1;
            break;
        }
      }
    }
  }
  tileRackValues = {"tile-0": [undefined, "boardTile-x"],
                   "tile-1": [undefined, "boardTile-x"],
                   "tile-2": [undefined, "boardTile-x"],
                   "tile-3": [undefined, "boardTile-x"],
                   "tile-4": [undefined, "boardTile-x"],
                   "tile-5": [undefined, "boardTile-x"],
                   "tile-6": [undefined, "boardTile-x"],
                 };
  // Enable dropping
  $(".boardTile").each(function(){
    $(this).droppable("option", "disabled", false);
  })
  generateTiles();
}



function tallyScore(){
  var doubleWord = 0;
  var wordScore = 0;
  for(var key in tileRackValues){
    letterScore = 0;
    if(tileRackValues[key][1] != "boardTile-x"){
      boardTile = tileRackValues[key][1];
      for (var i=0; i < tiles["pieces"].length; i++) {
        if (tiles["pieces"][i]["letter"] == tileRackValues[key][0]) {
            letterScore = parseInt(tiles["pieces"][i]["value"]);
            break;
        }
      }
      if($("#boardTile-" + boardTile).hasClass("doubleWord")) {
        doubleWord += 1;
      }
      if($("#boardTile-" + boardTile).hasClass("doubleLetter")) {
        letterScore = letterScore*2;
      }
    }
    wordScore += letterScore;
  }
  totalScore += wordScore * (Math.pow(2, doubleWord));
  $('#TotalScore').text("Total Score: " + totalScore);
  generateTiles();
  // Enable dropping
  $(".boardTile").each(function(){
    $(this).droppable("option", "disabled", false);
  })
}





// Variables used in all functions
function resetValues() {
  remainingTiles = 100;
  totalScore = 0;

  // Reset HTML
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
  $('#TotalScore').text("Total Score: ");

  // Enable Dropping
  $(".boardTile").each(function(){
    $(this).droppable("option", "disabled", false);
  })

  // Parse JSON data provided in pieces.json
  tiles = JSON.parse('{"pieces": [\
  	{"letter":"A", "value":1,  "amount":9},\
  	{"letter":"B", "value":3,  "amount":2},\
  	{"letter":"C", "value":3,  "amount":2},\
  	{"letter":"D", "value":2,  "amount":4},\
  	{"letter":"E", "value":1,  "amount":12},\
  	{"letter":"F", "value":4,  "amount":2},\
  	{"letter":"G", "value":2,  "amount":3},\
  	{"letter":"H", "value":4,  "amount":2},\
  	{"letter":"I", "value":1,  "amount":9},\
  	{"letter":"J", "value":8,  "amount":1},\
  	{"letter":"K", "value":5,  "amount":1},\
  	{"letter":"L", "value":1,  "amount":4},\
  	{"letter":"M", "value":3,  "amount":2},\
  	{"letter":"N", "value":1,  "amount":6},\
  	{"letter":"O", "value":1,  "amount":8},\
  	{"letter":"P", "value":3,  "amount":2},\
  	{"letter":"Q", "value":10, "amount":1},\
  	{"letter":"R", "value":1,  "amount":6},\
  	{"letter":"S", "value":1,  "amount":4},\
  	{"letter":"T", "value":1,  "amount":6},\
  	{"letter":"U", "value":1,  "amount":4},\
  	{"letter":"V", "value":4,  "amount":2},\
  	{"letter":"W", "value":4,  "amount":2},\
  	{"letter":"X", "value":8,  "amount":1},\
  	{"letter":"Y", "value":4,  "amount":2},\
  	{"letter":"Z", "value":10, "amount":1},\
  	{"letter":"Blank", "value":0,  "amount":2}\
  ],\
  "creator":"Ramon Meza"\
  }');

  // TileRack values
  tileRackValues = {"tile-0": [undefined, "boardTile-x"],
                   "tile-1": [undefined, "boardTile-x"],
                   "tile-2": [undefined, "boardTile-x"],
                   "tile-3": [undefined, "boardTile-x"],
                   "tile-4": [undefined, "boardTile-x"],
                   "tile-5": [undefined, "boardTile-x"],
                   "tile-6": [undefined, "boardTile-x"],
                 };

  // Board values
  boardTileUsed = {"boardTile-0": 0,
                    "boardTile-1": 0,
                    "boardTile-2": 0,
                    "boardTile-3": 0,
                    "boardTile-4": 0,
                    "boardTile-5": 0,
                    "boardTile-6": 0,
                    "boardTile-7": 0,
                    "boardTile-8": 0,
                    "boardTile-9": 0,
                  };
}

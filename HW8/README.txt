
Cassandra Harkins
Cassandra_harkins@student.uml.edu
https://charkins8.github.io/GUI/HW8/scrabble.html
-I used two HW tokens on this assignment

////////////////////////////////////////
CURRENT FEATURES:
  FULLY/CURRENTLY WORKING:
    User is able to drag and drop tiles to board
    User is able to click a button to reset the game
    User is able to refresh rack of tiles
      After rack refresh, any tiles on board or otherwise are put back
        into the total amount of tiles left and the rack is randomized
    User is able to submit tiles on board and calculate their score
      After submitting, any tiles left in the rack are kep and moved left
        and more randomized tiles are added to the end of the rack
      Score is calculated based on what tiles are placed on what boardtiles
        Such as if the letter/word should be doubled
          If the user puts tiles down on more than one double word space,
            both spaces woud count. (i.e.: If a word lands on 2 double word
            spaces, the word will be quadrupled)
    Once a tile has been placed on the board it cannot be moved
    As the player continues to put down tiles, they may run out
      Once a player has run out of tiles to use, a message will pop up that
        no more tiles can be placed and ask the user to restart
        The game doesn't reset itself, so that the user can see thier final
          score


////////////////////////////////////////
  PARTIALLY WORKING
    If the user sizes the page down, the tileboard fold in on itself instead of scrolling
    Letters cannot be placed above or below other letters, but must be
      placed next-to a letter already on the board unless it's the first
      one placed




var uList = document.getElementsByTagName('ul')[0];
var listItems = document.getElementsByTagName('li');
var heading = document.getElementsByTagName('h2')[0];

// ADD NEW ITEM TO END OF LIST
let newNode = document.createElement("li");
let textNode = document.createTextNode("cream");
newNode.appendChild(textNode);
uList.appendChild(newNode);

// ADD NEW ITEM START OF LIST
newNode = document.createElement("li");
textNode = document.createTextNode("kale");
newNode.appendChild(textNode);
uList.insertBefore(newNode, listItems[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
for (var i = 0; i < listItems.length; i++) {
  listItems[i].className = "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
if(!document.getElementsByTagName('span')[0]) {
  newNode = document.createElement("span");
  heading.innerHTML += "<span>" + listItems.length  + "</span>";
}
else {
  heading = document.getElementsByTagName('span')[0]
  heading.innerHTML += listItems.length;
}

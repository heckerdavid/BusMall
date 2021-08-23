'use strict';


// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown
// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

// For each of the three images, increment its property of times it has been shown by one.

// Attach an event listener to the section of the HTML page where the images are going to be displayed.

// Once the users ‘clicks’ a product, generate three new products for the user to pick from.



// ____________________________ to do _________________________________//
// random return from array of items
// event listener 
// keep count of displayed and clicked
// display function


// ______________________________ global variables _________________________________//

const itemsSectionElem = document.getElementById('all_items');
const leftImgElem = document.getElementById('left_item_img');
const middleImgElem = document.getElementById('middle_item_img');
const rightImgElem = document.getElementById('right_item_img');
const leftTextElem = document.getElementById("left_item_p");
const middleTextElem = document.getElementById('middle_item_p');
const rightTextElem = document.getElementById('right_item_p');



// ______________________________ constructor funcs _________________________________//

// item object
function StoreItem(name, img) {
  this.name = name;
  this.img = img;
  this.displayed = 0;
  this.clicked = 0;
  
  // INIT
  StoreItem.allItems.push(this)
  console.log(this)
}

// ______________________________  prototype  _________________________________//
StoreItem.allItems = [];

StoreItem.prototype.renderSingleItem = function(name, img) {
  name.textContent = this.name;
  img.src = this.img;
}

// ______________________________ functions _________________________________//

function handleClick() {
  console.log(event.target)
}

// ______________________________________ event listener _____________________________________//

itemsSectionElem.addEventListener('click', handleClick)

// ______________________________________ calls _____________________________________//

new StoreItem('R2', './img/assets/bag.jpg')
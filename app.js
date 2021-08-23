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
// keep count of displayed and clicked
// display function


// ______________________________ global variables _________________________________//

const itemsSectionElem = document.getElementById('all_items');
const leftImgElem = document.getElementById('left_item_img');
const middleImgElem = document.getElementById('middle_item_img');
const rightImgElem = document.getElementById('right_item_img');
const leftTextElem = document.getElementById('left_item_p');
const middleTextElem = document.getElementById('middle_item_p');
const rightTextElem = document.getElementById('right_item_p');

let leftItem = null;
let middleItem = null;
let rightItem = null;

let flag = 10;



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
  this.displayed++;
}

// ______________________________ functions _________________________________//

function handleClick() {
  console.log(event.target)
  if (event.target === leftImgElem || event.target === rightImgElem || event.target === middleImgElem) {
    flag--;
    if (event.target === leftImgElem) {
      leftItem.clicked++;
    } else if (event.target === rightImgElem) {
      rightItem.clicked++;
    } else {
      middleItem.clicked++;
    }
    if (!flag) {
      itemsSectionElem.removeEventListener('click', handleClick);
      renderResults();
    }

  }

  randomizeItems();
}

function displayThreeItems(item1, item2, item3) {
  item1.renderSingleItem(leftTextElem, leftImgElem)
  item2.renderSingleItem(middleTextElem, middleImgElem)
  item3.renderSingleItem(rightTextElem, rightImgElem)
}

function randomizeItems() {
  let leftIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  let middleIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  let rightIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  
  while ( leftIndex === middleIndex ||  leftIndex === rightIndex) {
     leftIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  }
  while (rightIndex === middleIndex || rightIndex ===  leftIndex) {
    rightIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  }
  leftItem = StoreItem.allItems[leftIndex];
  middleItem = StoreItem.allItems[middleIndex];
  rightItem = StoreItem.allItems[rightIndex];
  displayThreeItems(leftItem, middleItem, rightItem);
  console.log("Index numbers are : ", leftIndex, middleIndex, rightIndex);
}

function renderResults() {
  let ulElem = document.getElementById('click_tracker')
  ulElem.innerHTML = ''
  for (let item of StoreItem.allItems) {
    const liElem = document.createElement('li')
    liElem.textContent = `${item.name}: ${item.clicked} click(s). clicked ${(item.clicked/item.displayed) * 100}% of the time when displayed.`
    ulElem.appendChild(liElem)
  }
}

// ______________________________________ event listener _____________________________________//

itemsSectionElem.addEventListener('click', handleClick)

// ______________________________________ calls _____________________________________//
new StoreItem('bag', './img/assets/bag.jpg')
new StoreItem("banana", "./img/assets/banana.jpg");
new StoreItem("bathroom", "./img/assets/bathroom.jpg");
new StoreItem("boots", "./img/assets/boots.jpg");
new StoreItem("breakfast", "./img/assets/breakfast.jpg");
new StoreItem("bubble gum", "./img/assets/bubblegum.jpg");
new StoreItem("chair", "./img/assets/chair.jpg");
new StoreItem("cthulhu", "./img/assets/cthulhu.jpg");
new StoreItem("dog duck", "./img/assets/dog-duck.jpg");

randomizeItems();
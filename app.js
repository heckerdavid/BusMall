'use strict';



// ____________________________ to do _________________________________//


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

let flag = 5;


var ctx = document.getElementById("chart").getContext("2d");

// ______________________________ constructor funcs _________________________________//

// item object
function StoreItem(name, img) {
  this.name = name;
  this.img = img;
  this.displayed = 0;
  this.clicked = 0;
  
  // INIT
  StoreItem.allItems.push(this)
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
      renderChartData();
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
  let prevItems = [leftItem, middleItem, rightItem]
  let leftIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  let middleIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  let rightIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  
  while ( 
    leftIndex === middleIndex ||
    leftIndex === rightIndex ||
    prevItems.includes(StoreItem.allItems[leftIndex]
    )) {

    leftIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  }
  prevItems.push(StoreItem.allItems[leftIndex])

  while (
    rightIndex === middleIndex ||
    rightIndex === leftIndex ||
    prevItems.includes(StoreItem.allItems[rightIndex]
    )) {

    rightIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  }
  prevItems.push(StoreItem.allItems[rightIndex]);

  while ( prevItems.includes(StoreItem.allItems[middleIndex])) {
    middleIndex = Math.floor(Math.random() * StoreItem.allItems.length);
  }
  

  leftItem = StoreItem.allItems[leftIndex];
  middleItem = StoreItem.allItems[middleIndex];
  rightItem = StoreItem.allItems[rightIndex];
  displayThreeItems(leftItem, middleItem, rightItem);
}

function renderResults() {
  let ulElem = document.getElementById('click_tracker')
  ulElem.innerHTML = ''
  for (let item of StoreItem.allItems) {
    const liElem = document.createElement('li')
    liElem.textContent = `${item.name}: ${item.clicked} click(s). ${(item.clicked/item.displayed) * 100}% clicked when displayed.`
    ulElem.appendChild(liElem)
  }
}

function renderChartData() {
  let numberLabels = [];
  let itemLabels = [];
  for (let chart of StoreItem.allItems) {
    numberLabels.push(chart.clicked);
    itemLabels.push(chart.name);
  }  
  
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: itemLabels,
      datasets: [
        {
          label: "MallonaBus",
          data: numberLabels,
          backgroundColor: ["yellow", "purple",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
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
new StoreItem("dragon", "./img/assets/dragon.jpg");
new StoreItem("pen", "./img/assets/pen.jpg");
new StoreItem("pet-sweep", "./img/assets/pet-sweep.jpg");
new StoreItem("scissors", "./img/assets/scissors.jpg");
new StoreItem("shark", "./img/assets/shark.jpg");
new StoreItem("sweep", "./img/assets/sweep.png");
new StoreItem("tauntaun", "./img/assets/tauntaun.jpg");
new StoreItem("unicorn", "./img/assets/unicorn.jpg");
new StoreItem("water can", "./img/assets/water-can.jpg");
new StoreItem("wine glass", "./img/assets/wine-glass.jpg");

randomizeItems();
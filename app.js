'use strict';

//global vars
var imageSection = document.getElementById('Select');
var ctx = document.getElementById('myChart').getContext('2d');

var itemImageLeft = document.getElementById('left');
var itemImageCenter = document.getElementById('center');
var itemImageRight = document.getElementById('right');

var itemLeftText = document.getElementById('item-1-text');
var itemCenterText = document.getElementById('item-2-text');
var itemRightText = document.getElementById('item-3-text');

var lastDisplayed = [];
var allItems = [];

var clickCounter = 0;

var itemNames = [];
var itemLikes = [];

//item constructor
var Item = function (name, src) {
  this.name = name;
  this.src = src;
  this.timesLiked = 0;
  this.timesShown = 0;
  allItems.push(this);
};

if(!localStorage.getItem('currentTotalVotes')){
  new Item('Bag', './img/bag.jpg');
  new Item('Banana', './img/banana.jpg');
  new Item('Bathroom', './img/bathroom.jpg');
  new Item('Boots', './img/boots.jpg');
  new Item('Breakfast Maker', './img/breakfast.jpg');
  new Item('Meatball Bubblegum', './img/bubblegum.jpg');
  new Item('Chair', './img/chair.jpg');
  new Item('Monster Hulhu', './img/cthulhu.jpg');
  new Item('Duck', './img/dog-duck.jpg');
  new Item('Dragon meat', './img/dragon.jpg');
  new Item('Pen', './img/pen.jpg');
  new Item('Pet-sweep', './img/pet-sweep.jpg');
  new Item('Pizza scissors', './img/scissors.jpg');
  new Item('Shark', './img/shark.jpg');
  new Item('Baby', './img/sweep.png');
  new Item('Tauntaun', './img/tauntaun.jpg');
  new Item('Unicorn meat', './img/unicorn.jpg');
  new Item('Usb', './img/usb.gif');
  new Item('Water can', './img/water-can.jpg');
  new Item('Wine glass', './img/wine-glass.jpg');
} else{
  allItems = JSON.parse(localStorage.getItem('currentTotalVotes'));
}

var ItemClickHandler = function (event) {
  if (event.target.id === 'left' || event.target.id === 'center' || event.target.id === 'right') {

    var randomNumberLeft = Math.floor(Math.random() * allItems.length);
    var randomNumbercenter = Math.floor(Math.random() * allItems.length);
    var randomNumberRight = Math.floor(Math.random() * allItems.length);

    while(lastDisplayed.includes(randomNumberLeft) || lastDisplayed.includes(randomNumbercenter) || lastDisplayed.includes(randomNumberRight) || randomNumberLeft === randomNumbercenter || randomNumbercenter === randomNumberRight || randomNumberRight === randomNumberLeft){
      randomNumberLeft = Math.floor(Math.random() * allItems.length);
      randomNumbercenter = Math.floor(Math.random() * allItems.length);
      randomNumberRight = Math.floor(Math.random() * allItems.length);
    }

    lastDisplayed[0] = randomNumberLeft;
    lastDisplayed[1] = randomNumbercenter;
    lastDisplayed[2] = randomNumberRight;

    if (event.target.id === 'left') {
      allItems[randomNumberLeft].timesLiked++;
    } else if (event.target.id === 'center') {
      allItems[randomNumbercenter].timesLiked++;
    } else {
      allItems[randomNumberRight].timesLiked++;
    }

    allItems[randomNumberLeft].timesShown++;
    allItems[randomNumbercenter].timesShown++;
    allItems[randomNumberRight].timesShown++;

    itemImageLeft.src = allItems[randomNumberLeft].src;
    itemImageCenter.src = allItems[randomNumbercenter].src;
    itemImageRight.src = allItems[randomNumberRight].src;

    itemLeftText.textContent = allItems[randomNumberLeft].name;
    itemCenterText.textContent = allItems[randomNumbercenter].name;
    itemRightText.textContent = allItems[randomNumberRight].name;

    clickCounter++;
    if (clickCounter === 25) {

      localStorage.setItem('currentTotalVotes', JSON.stringify(allItems));

      var chartData = {
        labels: itemNames,
        datasets: [{
          label: 'Total Likes',
          data: itemLikes,
          backgroundColor: [
            'rgba(240, 99, 130, 0.2)',
            'rgba(50, 162, 235, 0.2)',
            'rgba(250, 206, 86, 0.2)',
            'rgba(70, 192, 192, 0.2)',
            'rgba(150, 102, 255, 0.2)',
            'rgba(250, 159, 64, 0.2)',
            'rgba(240, 150, 40, 0.2)',
            'rgba(55, 162, 235, 0.2)',
            'rgba(250, 206, 86, 0.2)',
            'rgba(80, 192, 192, 0.2)',
            'rgba(55, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(250, 206, 86, 0.2)',
            'rgba(80, 192, 192, 0.2)',
            'rgba(55, 162, 235, 0.2)',
            'rgba(250, 206, 86, 0.2)',
            'rgba(65, 192, 192, 0.2)',
            'rgba(55, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(260,99,132,1)',
            'rgba(60, 162, 235, 1)',
            'rgba(260, 206, 86, 1)',
            'rgba(80, 192, 192, 1)',
            'rgba(155, 102, 255, 1)',
            'rgba(250, 159, 64, 1)',
            'rgba(55, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(150, 102, 255, 1)',
            'rgba(250, 159, 64, 1)',
            'rgba(50, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      };


      var chartOptions = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };


      var chart = {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      };

      var renderChart = function () {
        for (var i in allItems) {
          itemNames.push(allItems[i].name);
          itemLikes.push(allItems[i].timesLiked);
        }
        console.log('VALUES', itemNames);
        var myChart = new Chart(ctx, chart);
      };

      imageSection.removeEventListener('click', ItemClickHandler);
      renderChart();

    }

  }
};

imageSection.addEventListener('click', ItemClickHandler);

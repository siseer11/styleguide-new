const weatherChartWrapper = document.querySelector('.weather-chart-holder');
const weatherController = document.querySelectorAll('.weather-controller li');
const temepratureText = document.querySelectorAll('.temeperatures-holder li');


function floorRandom(max, min = 0) {
  return Math.floor(Math.random() * max - min) + min
}

function debounce(func, wait = 10, immediate = false) {
  let timeout;
  return function () {
    let context = this, args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args)
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

window.addEventListener('resize', debounce(resizeWeatherChart));

function resizeWeatherChart(e) {
  drawWeatherChart(temperaturesData[document.querySelector('.weather-controller li.active').dataset.for]);
  if (window.innerWidth < 550) {
    drawSmallChart(nasdaq, 'nasdaq');
    drawSmallChart(dow, 'dow');
  } else {
    drawBigChart(bigGraphData[document.querySelector('.stocks-header li.active').dataset.name].values);
  }
}

weatherController.forEach(el => el.addEventListener('click', () => {
  if (el.classList.contains('active')) return;
  document.querySelector('.weather-controller li.active').classList.remove('active');
  el.classList.add('active');
  updateWeatherChart(temperaturesData[el.dataset.for])

}))

let temperaturesData = {
  today: [
    { 'date': 1, 'tepmerature': 65, 'time': '8AM' },
    { 'date': 2, 'tepmerature': 86, 'time': '12PM' },
    { 'date': 3, 'tepmerature': 79, 'time': '4PM' },
    { 'date': 4, 'tepmerature': 62, 'time': '8PM' },
    { 'date': 5, 'tepmerature': 59, 'time': '12AM' },
    { 'date': 6, 'tepmerature': 52, 'time': '1AM' },
    { 'date': 7, 'tepmerature': 55, 'time': '10AM' },
  ],
  tomorrow: [
    { 'date': 1, 'tepmerature': 45, 'time': '8AM' },
    { 'date': 2, 'tepmerature': 52, 'time': '12PM' },
    { 'date': 3, 'tepmerature': 49, 'time': '4PM' },
    { 'date': 4, 'tepmerature': 62, 'time': '8PM' },
    { 'date': 5, 'tepmerature': 67, 'time': '12AM' },
    { 'date': 6, 'tepmerature': 65, 'time': '1AM' },
    { 'date': 7, 'tepmerature': 58, 'time': '5AM' },
  ],
  week: [
    { 'date': 1, 'tepmerature': 55, 'time': 'MON' },
    { 'date': 2, 'tepmerature': 61, 'time': 'TUE' },
    { 'date': 3, 'tepmerature': 57, 'time': 'WED' },
    { 'date': 4, 'tepmerature': 64, 'time': 'THU' },
    { 'date': 5, 'tepmerature': 50, 'time': 'FRI' },
    { 'date': 6, 'tepmerature': 49, 'time': 'SAT' },
    { 'date': 7, 'tepmerature': 55, 'time': 'SUN' },
  ]
}

let x, y, line;
function drawWeatherChart(temperaturesData) { //temperaturesData -> for one day
  let width = weatherChartWrapper.offsetWidth;
  let height = 250;

  document.querySelector('svg.weather-chart').innerHTML = ''

  let svg = d3.select('svg.weather-chart')
    .attr('width', width)
    .attr('height', height)

  //X and Y scaling
  x = d3.scaleLinear().range([0, width]);
  y = d3.scaleLinear().range([height - 40, 40]);

  line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.tepmerature))
    .curve(d3.curveBasis);

  x.domain(d3.extent(temperaturesData, (d) => d.date));
  y.domain(d3.extent(temperaturesData, (d) => d.tepmerature));

  svg.append('g')
    .attr('class', 'main')
    .append('path')
    .attr('stroke', 'rgb(255, 178, 53)')
    .attr('stroke-width', '5')
    .data([temperaturesData])
    .attr('d', line)

  svg.append('g')
    .attr('class', 'mask')
    .append('path')
    .attr('stroke', 'rgb(255, 178, 53)')
    .attr('stroke-width', '25')
    .attr('transform', 'translate(-2,-12)')
    .data([temperaturesData])
    .attr('d', line)
}


drawWeatherChart(temperaturesData.today)


function updateWeatherChart(data) {

  temepratureText.forEach((el, idx) => {
    el.innerHTML = `<h2>${data[idx].tepmerature}<span>o</span></h2><p>${data[idx].time}</p>`
  })

  y.domain(d3.extent(data, (d) => d.tepmerature));
  d3.select('g.mask path')
    .data([data])
    .transition()
    .duration(1000)
    .attr('d', line)

  d3.select('g.main path')
    .data([data])
    .transition()
    .duration(1000)
    .attr('d', line)

}
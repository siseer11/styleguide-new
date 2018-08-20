const gbGraphWrapper = document.querySelector('.graph-holder');
const gbGraphController = document.querySelectorAll('.graph-data-changer-list li');
const gbGraphBottomScale = document.querySelectorAll('.bottom-graph-scale-list li');


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

window.addEventListener('resize', debounce(resizeGbGraph));

function resizeGbGraph(e) {
  drawGbGraph(gbGraphFakeData[document.querySelector('.graph-data-changer-list li.current').dataset.for]);

}

gbGraphController.forEach(el => el.addEventListener('click', () => {
  if (el.classList.contains('current')) return;
  document.querySelector('.graph-data-changer-list li.current').classList.remove('current');
  el.classList.add('current');
  updateGbGraph(gbGraphFakeData[el.dataset.for])

}))

let gbGraphFakeData = {
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
function drawGbGraph(gbGraphFakeData) { 
  let width = gbGraphWrapper.offsetWidth;
  let height = 250;

  document.querySelector('svg.gb-graph').innerHTML = ''

  let svg = d3.select('svg.gb-graph')
    .attr('width', width)
    .attr('height', height)

  //X and Y scaling
  x = d3.scaleLinear().range([0, width]);
  y = d3.scaleLinear().range([height - 40, 40]);

  line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.tepmerature))
    .curve(d3.curveBasis);

  x.domain(d3.extent(gbGraphFakeData, (d) => d.date));
  y.domain(d3.extent(gbGraphFakeData, (d) => d.tepmerature));

  svg.append('g')
    .attr('class', 'main')
    .append('path')
    .attr('stroke', 'rgb(255, 178, 53)')
    .attr('stroke-width', '5')
    .data([gbGraphFakeData])
    .attr('d', line)

  svg.append('g')
    .attr('class', 'mask')
    .append('path')
    .attr('stroke', 'rgb(255, 178, 53)')
    .attr('stroke-width', '25')
    .attr('transform', 'translate(-2,-12)')
    .data([gbGraphFakeData])
    .attr('d', line)
}


drawGbGraph(gbGraphFakeData.today)


function updateGbGraph(data) {
  gbGraphBottomScale.forEach((el, idx) => {
    el.innerHTML = `<h2 class='gb-text-title-medium'>${data[idx].tepmerature}<span class='top-o'>o</span></h2><p class='gb-text-label gb-text-white'>${data[idx].time}</p>`
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
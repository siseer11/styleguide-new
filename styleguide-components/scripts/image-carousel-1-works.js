const sliderHolder = document.querySelector('.gb-image-carousel-1 .carousel-1-images-list');
const carouselSlideAboutHolder = document.querySelector('.carousel-1-about-slide');
const carousel1Title = document.querySelector('.carousel-1-about-slide .carousel-1-slide-title');
const carousel1Author = document.querySelector('.carousel-1-about-slide .carousel-1-slide-author');
const slides = [];
const sliderBubles = [];
const carousel1ImageList = document.querySelector('.carousel-1-images-list');
const carousel1PaginationList = document.querySelector('.carousel-1-pagination');

let activeSlide = 0;
let clickable = true;

const debounce = (func,wait=10,immediate=false) => {
	let timeout;
	return function(){
		let context =this , args = arguments;
		let later = function(){
		timeout = null;
		if(!immediate) func.apply(context,args)
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later,wait);
		if(callNow) func.apply(context,args);
	}
}

let fakeSlidesData =[
	{
		'image-url' : '../images/slide-image1.jpg' ,
		'slide-title' : 'Lonely Wolf, Sweden',
		'slide-author' : 'James Flinton',
	},
	{
		'image-url' : '../images/slide-image2.jpg' ,
		'slide-title' : 'Melting Ice in Arctic Ocean2',
		'slide-author' : 'John Scurm',
	},
	{
		'image-url' : '../images/slide-image3.jpg' ,
		'slide-title' : 'Frozen Pant',
		'slide-author' : 'Fiol Nohn',
	},
	{
		'image-url' : '../images/slide-image1.jpg' ,
		'slide-title' : 'Melting Ice in Arctic Ocean4',
		'slide-author' : 'Sibo Dingo',
	}
]

// Populate Slides 

fakeSlidesData.forEach((el,idx)=>{
	//Image slide item
	let imageSlideElement = document.createElement('li');
	if(idx == 0) imageSlideElement.classList.add('active');
	imageSlideElement.classList.add('carousel-1-image-item' , 'gallery-slide');
	imageSlideElement.style.backgroundImage = `url('${el["image-url"]}')`;
	carousel1ImageList.appendChild(imageSlideElement);
	slides.push(imageSlideElement);

	//Pagination list item
	let paginationBuble = document.createElement('li');
	if(idx == 0 ) paginationBuble.classList.add('active');
	paginationBuble.classList.add('carousel-1-pagination-buble');
	paginationBuble.dataset.index = idx;
	carousel1PaginationList.appendChild(paginationBuble);
	sliderBubles.push(paginationBuble)
})

//Populate Slides about
carousel1Title.innerText = fakeSlidesData[0]['slide-title'];
carousel1Author.innerText = fakeSlidesData[0]['slide-author'];



sliderBubles.forEach(el => el.addEventListener('click', () => {
	if (el.classList.contains('active') || !clickable) return;
	clickable = false;
	//Change the active pagination
	sliderBubles[activeSlide].classList.remove('active')
	el.classList.add('active');
	slides[activeSlide].classList.remove('active');
	activeSlide = Number(el.dataset.index);
	if (activeSlide == 0) {
		sliderHolder.style.transform = `translateX(15%)`
	} else {
		sliderHolder.style.transform = `translateX(-${55 + 70 * (activeSlide - 1)}%)`
	}

	//Change text
	carouselSlideAboutHolder.classList.add('fade-out');
}))

//when the image is done sliding, let the user click again, show next text info
sliderHolder.addEventListener('transitionend', (e) => {
	if (e.srcElement != sliderHolder || e.propertyName != "transform") return;
	slides[activeSlide].classList.add('active');
	clickable = true;

	carousel1Title.innerText = fakeSlidesData[activeSlide]['slide-title'];
	carousel1Author.innerText = fakeSlidesData[activeSlide]['slide-author'];
	carouselSlideAboutHolder.classList.remove('fade-out')
})







/* REMOVE EVENT LISTENERS OF THE LASTACTIVE SLIDE */

let moveable = true;
let lastActiveSlide = slides[activeSlide]; // do not know exactly how to fix it, must find a better solution

/*Function that update both the slides and the bubbles when the carousel moves */
const updateActiveSlideAndBubble = (n) => {
	lastActiveSlide = slides[activeSlide];
	lastActiveSlide.classList.remove('active');
	lastActiveSlide.style.transform = null;
	sliderBubles[activeSlide].classList.remove('active');
	activeSlide += n;
	sliderBubles[activeSlide].classList.add('active');
	slides[activeSlide].classList.add('active');


	window.setTimeout(()=>lastActiveSlide = '' , 200) // do not know exactly how to fix it, must find a better solution
}


document.querySelectorAll('.carousel-1-image-item')
				.forEach(el=>{
					el.addEventListener('click' , (e) => {
						if(el.classList.contains('active') || el == lastActiveSlide) return;
						const elIdx = slides.indexOf(el);
						updateActiveSlideAndBubble(elIdx-activeSlide);
						const translateHolderTo = 15 - 70 * activeSlide;
						sliderHolder.style.transform = `translateX(${translateHolderTo}%)`
					})
				})


/*Remove the listener of the mousemove for the active element, as well mouseup/leave*/
let removeListener = () => {
	/*Flag to return if this is false, in the move, createa a bug sometimes without it*/
	moveable = false;
	let lastActive = document.querySelector('.carousel-1-image-item.active');
	lastActive.removeEventListener('mousemove',debouncedMouseMoveListener);
	lastActive.removeEventListener('mouseup' , removeListener);
	lastActive.removeEventListener('mouseleave' , removeListener);
	lastActive.removeEventListener('touchmove' , removeListener);
	
	/*Depending on where the user has moved the mouse move the slider that direction */
	console.log(moveDiference)
	if(moveDiference > 0.2 && activeSlide > 0){
		updateActiveSlideAndBubble(-1);
		console.log('up');
	}else if(moveDiference < -0.2 && activeSlide < slides.length - 1){
		console.log('mid');
		updateActiveSlideAndBubble(1)
	}else{
		console.log('down');
		slides[activeSlide].style.transform = null
	}
	const translateHolderTo = 15 - 70 * activeSlide;
	sliderHolder.style.transform = `translateX(${translateHolderTo}%)`
	sliderHolder.style.transition = ' 0.4s linear transform';
	
	/* Reset thos 2 let so for the next slide will start from the point the user have clicked */
	moveDiference = undefined;
	firstTouchAt = undefined;
}


let moveDiference;
let firstTouchAt = undefined;  //keeps track of the first touch, where the user has clicked so the move starts at that pos
let actualHolderPos = 15 - 70 * activeSlide;
let zoomRatio = 1.2;  //the zoom on the active slide


/* LISTENERS FOR THE MOVEMENT OF THE MOUSE/TOUCH */
const mouseMoveListener = (e) => {
	if(!moveable) return; 
	
	let slideWidth = e.target.scrollWidth; //get the width of the slide;
	
	let touchNow = e.changedTouches?(e.changedTouches[0].clientX):(e.clientX);

	/* The diference between first click , and the movement of the mouse(actual position), move and scale slide */
	moveDiference = - ( (firstTouchAt - touchNow) / slideWidth );
	e.target.style.transform = `scale(${zoomRatio - Math.abs(moveDiference/3)})`
	sliderHolder.style.transform = `translateX(${actualHolderPos + moveDiference * 70}%)`


};

let debouncedMouseMoveListener = debounce(mouseMoveListener); // listener debounced

const getFirstTouchPosition = (e) => {
	if(firstTouchAt == undefined){ //if we have not seted the firstTouch do it, just once perTouch
		if(e.changedTouches){
			firstTouchAt = e.changedTouches[0].clientX;
		}else{
			firstTouchAt = e.clientX;
			
		}
		actualHolderPos = 15 - 70 * slides.indexOf(e.target);
	}
}

/* ADD THE CLICKDOWN LISTENER TO ALL THE SLIDES */
document.querySelectorAll('.carousel-1-image-item')
				.forEach(el => {
					el.addEventListener('mousedown' , (e) => {
						if(!el.classList.contains('active')) return; // just if it has the active add the move, if not return
						moveable = true;
						/* remove mousemove when this happens */
						el.addEventListener('mouseup' , removeListener);  
						el.addEventListener('mouseleave' , removeListener);
						sliderHolder.style.transition = ' 0s';
						/* add mousemove */
						el.addEventListener('mousemove' , debouncedMouseMoveListener);
						getFirstTouchPosition(e)
					})
					el.addEventListener('touchstart' , (e) => {
						if(!el.classList.contains('active')) return; // just if it has the active add the move, if not return
						moveable = true;
						/* remove mousemove when this happens */
						el.addEventListener('touchend' , removeListener);  
						sliderHolder.style.transition = ' 0s';
						/* add mousemove */
						el.addEventListener('touchmove' , debouncedMouseMoveListener);
						getFirstTouchPosition(e)
					})
				}
				)



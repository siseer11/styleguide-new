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
	activeSlide = el.dataset.index;
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
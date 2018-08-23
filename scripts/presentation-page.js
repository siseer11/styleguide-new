let filterInputs = document.querySelectorAll('.filters-list-item input');
let mainSections = document.querySelectorAll('.main-section');
let sectionsToShow = [];
let classToCopyElements = document.querySelectorAll('.class-to-copy');
let textareaCopyHelper = document.querySelector('.hidden-textarea');
let popOutCopy = document.querySelector('.pop-out-copied');
let expandDivButton = document.querySelectorAll('.styleguide-navigation .navigation-section-title');
let colapsableLists = document.querySelectorAll('.colapsable-list')


filterInputs.forEach(el => el.addEventListener('change', (e) => {
	const inputValue = el.value;
	if (el.checked) {
		sectionsToShow.push(inputValue);
	} else {
		sectionsToShow.splice(sectionsToShow.indexOf(inputValue), 1)
	}
	filterSections();
}))

function filterSections() {
	mainSections.forEach(el => {
		const sectionName = el.dataset.sectionname
		if (sectionsToShow.length == 0) {
			el.style.display = 'block';
		} else {
			el.style.display = (sectionsToShow.indexOf(sectionName) >= 0) ? 'block' : 'none'
		}


	})
}

let popOutTimeOut;

classToCopyElements.forEach(el => {
	el.addEventListener('click', (e) => {
		textareaCopyHelper.value = el.dataset.class; // Set value of the fake textarea to the class of element to be copied
		textareaCopyHelper.select();
		document.execCommand('copy');
		
		if(popOutTimeOut){
			window.clearTimeout(popOutTimeOut)
		}

		popOutCopy.style.transform = 'translateY(0)';
		popOutTimeOut = window.setTimeout(() => {
			popOutCopy.style.transform = 'translateY(-100%)';
		},500)

		textareaCopyHelper.value = ''; // Reset the textarea to null
	})
})


colapsableLists.forEach(el=>{
	el.style.minHeight = el.scrollHeight + 'px';
	el.style.maxHeight = el.scrollHeight + 240 + 'px'
})


expandDivButton.forEach(el=>{
	el.addEventListener('click', (e)=> {
		const parent = el.parentElement;
		const parentList = parent.querySelector('ul');

		

		if(!parentList.classList.contains('expanded')){
			parentList.classList.add('expanded');

			let collapsedChildren = parent.querySelectorAll('.colapsable-list');

			let suplimentarHeight = 0;

			parentList.style.minHeight = parentList.scrollHeight + 'px';
			parentList.style.maxHeight = parentList.scrollHeight + 240 + 'px';
		}else{
			parentList.classList.remove('expanded');

			parentList.style.minHeight = 0;
			parentList.style.maxHeight = 0;
		}

	})
})
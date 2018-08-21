let filterInputs = document.querySelectorAll('.filters-list-item input');
let mainSections = document.querySelectorAll('.main-section');
let sectionsToShow = [];
let classToCopyElements = document.querySelectorAll('.class-to-copy');
let textareaCopyHelper = document.querySelector('.hidden-textarea');

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

classToCopyElements.forEach(el => {
	el.addEventListener('click', (e) => {
		textareaCopyHelper.value = el.dataset.class; // Set value of the fake textarea to the class of element to be copied
		textareaCopyHelper.select();
		document.execCommand('copy');

		textareaCopyHelper.value = ''; // Reset the textarea to null

	})
})
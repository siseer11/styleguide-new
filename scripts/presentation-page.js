let filterInputs = document.querySelectorAll('.filters-list-item input');
let mainSections = document.querySelectorAll('.main-section');
let sectionsToShow = [];

filterInputs.forEach(el=>el.addEventListener('change',(e)=>{
    const inputValue = el.value;
    if(el.checked){
        sectionsToShow.push(inputValue);
    }else{
        sectionsToShow.splice(sectionsToShow.indexOf(inputValue),1)
    }
   filterSections();
}))

function filterSections(){
    mainSections.forEach(el=>{
        const sectionName = el.dataset.sectionname
        if(sectionsToShow.length == 0){
            el.style.display = 'block';
        }else{
            el.style.display = (sectionsToShow.indexOf(sectionName)>=0)?'block':'none'
        }
        

    })
}
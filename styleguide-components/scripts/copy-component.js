const copyButton = document.querySelector('.copy-button');
const componentToCopy = document.querySelector('.component-to-copy');
const copyHelper = document.querySelector('.hidden-textarea'); 
const popOutCopy = document.querySelector('.pop-out-copied');

let popOutTimeOut;

copyButton.addEventListener('click' , (e) => {
    copyHelper.value = componentToCopy.outerHTML.replace('component-to-copy ' , '');
    copyHelper.select()
    document.execCommand('copy')

    if(popOutTimeOut) window.clearTimeout(popOutTimeOut)

    popOutCopy.style.transform = 'translateY(0)';
    popOutTimeOut = window.setTimeout(() => {
        popOutCopy.style.transform = 'translateY(-100%)';
    },500)
})


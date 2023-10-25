const btn = document.querySelector('.btn');
const ulList = document.querySelector('.list-item');
const inputData = document.querySelector('.inputData');
let inputDataArr = JSON.parse(localStorage.getItem('LiData')) || [];

inputDataArr.forEach((value) => {
    const liSetction = createLiElement(value);
    ulList.appendChild(liSetction);
});

btn.addEventListener('click', () => {
    let inputValue = inputData.value;

    if (inputValue.trim() === '') {
        alert('Введіть дані для збереження інформації');
        return;
    }

    inputDataArr.push(inputValue);
    localStorage.setItem('LiData', JSON.stringify(inputDataArr));

    const liSetction = createLiElement(inputValue);
    ulList.appendChild(liSetction);
    inputData.value = '';
});

function createLiElement(value) {
    const liSetction = document.createElement('li');
    liSetction.classList = 'liStyle';
    liSetction.innerText = value;

    liSetction.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const index = inputDataArr.indexOf(value);
        if (index > -1) {
            inputDataArr.splice(index, 1);
            localStorage.setItem('LiData', JSON.stringify(inputDataArr));
            ulList.removeChild(liSetction);
        }
    });

    liSetction.addEventListener('click', (event) => {
        const target = event.target;
        if (target.contentEditable !== 'true') {
            target.contentEditable = 'true';
            target.focus();
        }
    });
    
    liSetction.addEventListener('blur', (event) => {
        const target = event.target;
        const updatedValue = target.innerText;
        const index = inputDataArr.indexOf(value);
    
        if (index > -1) {
            inputDataArr[index] = updatedValue;
            localStorage.setItem('LiData', JSON.stringify(inputDataArr));
            value = updatedValue;
        }
    });

    liSetction.addEventListener('keypress', (event) => {
        const target = event.target;
        if (event.key === 'Enter') {
            target.blur();
        }
    });

    return liSetction;
}

function clearData() {
    localStorage.clear();
    inputDataArr = [];
    ulList.innerHTML = '';
}

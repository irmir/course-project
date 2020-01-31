
const wrapper = document.getElementById('wrapper');

const text = wrapper.firstElementChild.firstElementChild.innerText;

const slides = document.getElementsByClassName('slide');

const switchGroop = document.getElementById('switch-group');
switchGroop.addEventListener('click', changeText);
const switches = switchGroop.children;

function changeText(event) {
    if (!event.target.classList.contains('switch')) {
        return;
    }
    for (let item of switchGroop.children) {
        item.style.background = '#755d6e';
    }
    event.target.style.background = '#fff';

    const slide = Array.from(slides).filter(element => {
        return element.dataset.id === event.target.dataset.id;
    });

    const changingText = wrapper.firstElementChild.firstElementChild;

    changingText.style.opacity = "0";

    changingText.addEventListener("transitionend", emersion, false);

    function emersion() {
        if (slide[0].dataset.id === "1") {
            changingText.innerText = text;
        } else {
            changingText.innerText = slide[0].firstElementChild.innerText;
        }
        changingText.style.opacity = "1";

    }
}

//плавный скролл до выбранной секции

document.getElementById('menu').addEventListener('click', scrollPage)

function scrollPage() {
    if (!event.target.tagName === 'A') {
        return;
    }
    const href = event.target.getAttribute('href').slice(1);
    const elem = document.getElementById(href);

    let currentTop = scrollY;
    if (currentTop < getCoordTop(elem)) {
        let t = 2;
        for (let i = currentTop; i <= getCoordTop(elem); i += 10) {
            t += 10;
            setTimeout(function () {
                window.scrollTo(0, i);
            }, t / 1.8);
        }
    }
}

const getCoordTop = function (elem) {
    const coord = elem.getBoundingClientRect();
    const top = coord.top + pageYOffset;
    return top;
};

//всплывающее окно в секции с работами

document.getElementById('works').addEventListener('click', showPopUp, false);
// const images = 

function showPopUp() {

    if (!event.target.classList.contains('item-works-bg')) {
        return
    };
    // event.target.dataset.id
    const figure = event.target.parentElement;

    const background = document.createElement('div');
    background.addEventListener('click', closePopUp);

    const popUp = background.appendChild(document.createElement('div'));
    popUp.classList.add('pop-up');



    // const buttClose = popUp.appendChild('button');
    // buttClose.classList.add('button-close');
    // const rightArrow  = popUp.appendChild('button');
    // rightArrow.classList.add('right-arrow');
    // const leftArrow = popUp.appendChild('button');
    // leftArrow.classList.add('left-arrow');

    const clone = figure.cloneNode(true);
    clone.lastElementChild.classList.remove('item-works-bg');
    clone.lastElementChild.classList.add('active-item-works-bg');
    clone.classList.add('active-item-works');

    const buttClose = clone.appendChild(document.createElement('button'));
    buttClose.classList.add('button-close');
    const rightArrow  = clone.appendChild(document.createElement('button'));
    rightArrow.classList.add('right-arrow');
    const leftArrow = clone.appendChild(document.createElement('button'));
    leftArrow.classList.add('left-arrow');


    popUp.appendChild(clone);
    // const src = event.target.previousElementSibling.src
    // const img = popUp.appendChild(document.createElement('img'));
    // img.src = src;


    document.body.appendChild(background);
    background.classList.add('background', 'active-background');

    popUp.classList.add('active-pop-up');

    function closePopUp() {
        popUp.parentNode.removeChild(popUp);

        background.classList.remove('background');
        background.parentNode.removeChild(background);
    }
}






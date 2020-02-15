
//smooth scroll to the selected section

document.getElementById('menu').addEventListener('click', scrollPage)
document.getElementById('btn-more').addEventListener('click', scrollPage)

function scrollPage() {
    if (!event.target.tagName === 'A') {
        return;
    }
    const href = event.target.getAttribute('href').slice(1);
    const elem = document.getElementById(href);

    let currentTop = scrollY;

    const topElem = getCoordTop(elem);

    let t = 0;
    for (let i = currentTop; i <= topElem + 10; i += 10) {
        t += 10;
        setTimeout(function () {
            window.scrollTo(0, i);
        }, t / 1.7);
    }
}

function getCoordTop(elem) {
    const coord = elem.getBoundingClientRect();
    const top = coord.top;
    return top;
};

//slider

document.getElementById('works').addEventListener('click', showPopUp, false);

function showPopUp() {

    if (!event.target.classList.contains('item-works-bg')) {
        return
    };

    const figures = document.getElementsByClassName('item-works');
    const figure = event.target.parentElement;

    const background = document.createElement('div');

    const popUp = background.appendChild(document.createElement('div'));
    popUp.classList.add('pop-up');

    let clone = figure.cloneNode(true);
    clone.lastElementChild.classList.remove('item-works-bg');
    clone.lastElementChild.classList.add('active-item-works-bg');
    clone.classList.add('active-item-works');

    const buttClose = clone.appendChild(document.createElement('button'));
    buttClose.classList.add('button-close');
    buttClose.addEventListener('click', closePopUp);

    const rightArrow = clone.appendChild(document.createElement('button'));
    rightArrow.classList.add('right-arrow');
    rightArrow.addEventListener('click', slideForward);

    const leftArrow = clone.appendChild(document.createElement('button'));
    leftArrow.classList.add('left-arrow');
    leftArrow.addEventListener('click', slideBack)

    popUp.appendChild(clone);

    document.body.appendChild(background);
    background.classList.add('background', 'active-background');

    popUp.classList.add('active-pop-up');

    function closePopUp() {
        popUp.parentNode.removeChild(popUp);

        background.classList.remove('background');
        background.parentNode.removeChild(background);
    }

    let idFirstElementSlide = +clone.dataset.id;

    function slideForward() {

        if (idFirstElementSlide < figures.length - 2) {
            clone.firstElementChild.src = figures[idFirstElementSlide + 1].firstElementChild.src;
            clone.children[1].firstElementChild.innerText = figures[idFirstElementSlide + 1].children[1].firstElementChild.innerText;
            clone.children[1].lastElementChild.innerText = figures[idFirstElementSlide + 1].children[1].lastElementChild.innerText;
            idFirstElementSlide++;
        }
    }

    function slideBack() {

        if (idFirstElementSlide < figures.length - 1) {
            clone.firstElementChild.src = figures[idFirstElementSlide - 1].firstElementChild.src;
            clone.children[1].firstElementChild.innerText = figures[idFirstElementSlide - 1].children[1].firstElementChild.innerText;
            clone.children[1].lastElementChild.innerText = figures[idFirstElementSlide - 1].children[1].lastElementChild.innerText;
            idFirstElementSlide--;
        }
    }
}

//fading and appearing text

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




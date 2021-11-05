// portfolio slider

// declaração variaveis do slider
var sliderContainer = document.querySelector('.jl-slider-container');
var sliderList = document.querySelector('.jl-slider-list');
var sliderItem = document.querySelectorAll('.jl-slider-item');
const sliderTotalItems = sliderItem.length; // pega total dos sliders

var sliderListWidth = null;     // pega tamanho da lista

// captura larguras individuais
var containerWidth = sliderContainer.parentElement.offsetWidth; // pega a largura do pai

// faz animação do slider onClick
var prevItem = document.querySelector('.jl-item-prev');
var nextItem = document.querySelector('.jl-item-next');

var sliderPos = 0;  // pega tamanho do container dos sliders
var currentSlide = document.querySelector('.jl-current-slide');
var totalSlide = document.querySelector('.jl-total-slide');
var currentCounter = 1;
var navItems = document.querySelectorAll('.jl-item-navigator a');
var navCounter = document.querySelector('.jl-navigator-counter span');

// passa larguras dinamicas

sliderContainer.style.width = containerWidth+'px';

sliderItem.forEach(i => {
    i.style.width = containerWidth+'px';    // cada slide recebe a largura do pai

    let sliderItemWidth = i.offsetWidth;    // pega lagura do item

    sliderListWidth += sliderItemWidth;     // add some de largura a lista de itens
});

sliderList.style.width = sliderListWidth+'px';

// HANDLERS

var nextSlideAnim = ()=> {
    let lastItem = sliderListWidth - containerWidth;

    if((-1*(sliderPos) === lastItem))   // se for a mesma posição do ultimo item, então retorne
        return;

    sliderPos -= containerWidth;    // desloca o tamanho do container dos sliders

    anime({
        targets: sliderList,
        translateX: sliderPos
    });
}

var prevSlideAnim = ()=> {
    if((sliderPos === 0))   // se for a mesma posição do primeiro item, então retorne
        return;

    sliderPos += containerWidth;    // desloca o tamanho do container dos sliders

    anime({
        targets: sliderList,
        translateX: sliderPos
    });
}

// Counter Formatter
var counterFormatter = (n)=> {
    if(n < 10){
        return '0'+n;
    }else{
        return n;
    }
}

//Counter Add
var counterAdd = ()=> {
    if(currentCounter >= 0 && currentCounter < sliderTotalItems)
        currentCounter++
        currentSlide.innerHTML = counterFormatter(currentCounter);

        navCounter.innerHTML = counterFormatter(currentCounter);    // mostra no contador dos slider
}

//Counter Remove
var counterRemove = ()=> {
    if(currentCounter > 1 && currentCounter <= sliderTotalItems)
        currentCounter--;
        currentSlide.innerHTML = counterFormatter(currentCounter);
        
        navCounter.innerHTML = counterFormatter(currentCounter);    // mostra no contador dos slider
}

//Set Active Nave

var setActiveNav = ()=>{
    for(var nv = 0; nv < navItems.length; nv++){
        let myNavNum = parseInt(navItems[nv].getAttribute('data-nav'));
        if(myNavNum === currentCounter){
            navItems[nv].classList.add('jl-item-active');

            anime({
                targets: '.jl-item-active',
                width: 90
            });
        }
    }
}

var changeActive = ()=>{
    for(var rm = 0; rm < navItems.length; rm++){
        
        // diminui tamanho da linha do slide ativo
        anime({
            targets: '.jl-item-active',
            width: 20
        });

        navItems[rm].classList.remove('jl-item-active');
    }

    setActiveNav(); 
}

//ACTIONS

// anima primeira linha do slide ativo
anime({
    targets: '.jl-item-active',
    width: 90
});

totalSlide.innerHTML = counterFormatter(sliderTotalItems);

// faz sliders irem pra esquerda
nextItem.addEventListener('click', ()=>{

    nextSlideAnim();    // faz slide ir pra esquerda
    counterAdd();       // contador dos sliders
    changeActive();     // mostra o slide ativo

});

// faz sliders irem pra direita
prevItem.addEventListener('click', ()=>{

    prevSlideAnim();    // faz slide ir pra direita
    counterRemove();    // contador dos sliders
    changeActive();     // mostra o slide ativo
    
});
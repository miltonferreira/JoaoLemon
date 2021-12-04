// portfolio slider

// declaração variaveis do slider
var sliderContainer = document.querySelector('.jl-slider-container');
var sliderList = document.querySelector('.jl-slider-list');
var sliderItem = document.querySelectorAll('.jl-portfolio-item');
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

// Animação de avançar
var nextSlideAnim = ()=> {
    let lastItem = sliderListWidth - containerWidth;

    if((-1*(sliderPos) === lastItem))   // se for a mesma posição do ultimo item, então retorne
        return;

    sliderPos -= containerWidth;    // desloca o tamanho do container dos sliders

    anime({
        targets: sliderList,
        translateX: sliderPos,
        easing: 'cubicBezier(0,1.01,.32,1)' // https://cubic-bezier.com/#.17,.67,.83,.67
    });
}

// animação de volta
var prevSlideAnim = ()=> {
    if((sliderPos === 0))   // se for a mesma posição do primeiro item, então retorne
        return;

    sliderPos += containerWidth;    // desloca o tamanho do container dos sliders

    anime({
        targets: sliderList,
        translateX: sliderPos,
        easing: 'cubicBezier(0,1.01,.32,1)' // https://cubic-bezier.com/#.17,.67,.83,.67
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

//Set Active Nav

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

//Set Active Slide

var setActiveSlide = ()=>{
    for(var sld = 0; sld < sliderItem.length; sld++){
        let mySlideNum = parseInt(sliderItem[sld].getAttribute('data-slide'));
        if(mySlideNum === currentCounter){
            sliderItem[sld].classList.add('jl-slide-active');
            sliderItem[sld].querySelector('.jl-portfolio-item-box').classList.add('jl-scale-right');        // chama animação do slide
            sliderItem[sld].querySelector('.jl-portfolio-item-thumb img').classList.add('jl-scale-up');     // chama animação da imagem do slide
            sliderItem[sld].querySelector('.jl-portfolio-item-info').classList.add('jl-fade-from-left');     // chama animação da imagem do slide
        }
    }
}

var changeActive = ()=>{

    // NAV -------------------------------------------------------------
    // limpa as classes para add o ativo na cena
    for(var rm = 0; rm < navItems.length; rm++){
        
        // diminui tamanho da linha do slide ativo
        anime({
            targets: '.jl-item-active',
            width: 20
        });

        navItems[rm].classList.remove('jl-item-active');
    }

    setActiveNav();

    // Slide -------------------------------------------------------------
    // limpa as classes para add o ativo na cena
    for(var rms = 0; rms < sliderItem.length; rms++){
        sliderItem[rms].classList.remove('jl-slide-active');
        // Limpa animação dentro do Slide ------------------------------------------
        sliderItem[rms].querySelector('.jl-portfolio-item-box').classList.remove('jl-scale-right');        // chama animação do slide
        sliderItem[rms].querySelector('.jl-portfolio-item-thumb img').classList.remove('jl-scale-up');     // chama animação da imagem do slide
        sliderItem[rms].querySelector('.jl-portfolio-item-info').classList.remove('jl-fade-from-left');     // chama animação da imagem do slide
    }

    setActiveSlide();
    
    

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
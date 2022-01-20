var overlay = document.querySelector('.jl-overlay');
var frameContainer = document.querySelector('.jl-gallery-frame-container');
var frameImage = document.querySelector('.jl-gallery-frame-image');
var galleryImages = document.querySelectorAll('.jl-thumb-img');

var closeGallery = document.querySelectorAll('.jl-toggle-gallery');

// passador de imagens no gallery
var btnNext = document.querySelector('.jl-item-next');
var btnPrev = document.querySelector('.jl-item-prev');

const getImageSrc = function(){
    for(var i =0; i<galleryImages.length; i++){
        galleryImages[i].addEventListener('click', function(){

            var imageSrc = this.getAttribute('data-src');
            frameImage.setAttribute('src', imageSrc);

            var itemNum = this.getAttribute('data-item');
            frameImage.setAttribute('data-index', itemNum);

            overlay.classList.add('jl-is-open');
            frameContainer.classList.add('jl-is-open');
        });
    }
}

for(var c=0; c < closeGallery.length; c++){
    closeGallery[c].addEventListener('click', function(){
        overlay.classList.remove('jl-is-open');
        frameContainer.classList.remove('jl-is-open');
    });
}

getImageSrc();

// passador de imagens no gallery

const nextItem = function(){

    var currItemNum = frameImage.getAttribute('data-index');

    var nextItemNum = parseInt(currItemNum) + 1;  // indica qual é a proxima imagem

    for(var n=0; n<galleryImages.length; n++){  // identifica qual o proximo numero do item

        var item = galleryImages[n];
        var itemNum = parseInt(item.getAttribute('data-item'));

        if(itemNum === nextItemNum){    // verifica se é o proximo valor para pegar o data-src
            var nextSrc = item.getAttribute('data-src');
            var nextIndex = item.getAttribute('data-item');

            frameImage.setAttribute('src', nextSrc);
            frameImage.setAttribute('data-index', nextIndex);
        }
    }

}

const prevItem = function(){

    var currItemNum = frameImage.getAttribute('data-index');

    var prevItemNum = parseInt(currItemNum) - 1;  // indica qual é a proxima imagem

    for(var p=0; p<galleryImages.length; p++){  // identifica qual o proximo numero do item

        var item = galleryImages[p];
        var itemNum = parseInt(item.getAttribute('data-item'));

        if(itemNum === prevItemNum){    // verifica se é o proximo valor para pegar o data-src
            var prevSrc = item.getAttribute('data-src');
            var prevIndex = item.getAttribute('data-item');

            frameImage.setAttribute('src', prevSrc);
            frameImage.setAttribute('data-index', prevIndex);
        }
    }

}

btnNext.addEventListener('click', function(){
    nextItem();
});

btnPrev.addEventListener('click', function(){
    prevItem();
});
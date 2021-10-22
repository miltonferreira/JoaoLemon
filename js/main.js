
var btnContact = document.querySelector('.jl-btn-contact');     // botao toggle de abrir fecha caixa de contatos

var toggleModal = document.querySelectorAll('.jl-toggle-modal');

// Page Preloader, quando carrega a página, tira o Preloader da frente
window.addEventListener('load', function(){
    var pagePreloader = document.querySelector('.jl-preloader');
    pagePreloader.classList.add('jl-fade-out');
    setTimeout(function(){
        pagePreloader.style.display = 'none';
    }, 2000);
});

// Abrindo e Fechando Informações de Contatos
btnContact.addEventListener('click', function(){
    let boxContact = document.querySelector('.jl-contact-info');
    boxContact.classList.toggle('jl-is-open');  //indica pra mostra ou não caixa de contatos
    this.classList.toggle('jl-change-icon');
});

//Abrindo e Fechando Modal de Orçamento

for(var i = 0; i < toggleModal.length; i++){
    toggleModal[i].addEventListener('click', () =>{

        let overlay = document.querySelector('.jl-overlay');
        let modalOrcamento = document.querySelector('#jl-modal-orcamento');

        overlay.classList.toggle('jl-is-open');             // mostra ou não modal

        modalOrcamento.classList.toggle('jl-is-open');      // mostra ou não modal de orçamento
        modalOrcamento.classList.toggle('jl-slide-top-in'); // chama animação do modal descendo

    });
}

// Animação Elementos on Scroll com waypoints

var myScrollDown = document.querySelector('.jl-scroll-down');

var waypoint = new Waypoint({
    element: myScrollDown,
    handler: function() {
        myScrollDown.classList.toggle('jl-fade-out');
    },
    offset: '80%'
});
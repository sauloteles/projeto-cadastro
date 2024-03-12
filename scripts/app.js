const main =document.getElementsByClassName('main')[0]
const crud = document.getElementsByClassName('main__crud')[0]
const form = document.getElementsByClassName('main__form')[0]
const cardMain = document.getElementsByClassName('main__card')[0]
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const numero = document.getElementById('telefone')
const btnCadastrar = document.getElementById('btn-cadastrar')
const btnVizualizar = document.getElementById('btn-vizualizar')

let listaCards = []
let index = 0
let editar = false
let indexEditar

class Card{
    constructor(cardHTML,btnEditar,btnDeletar,nome,email,numero,index){
        this.cardHTML = cardHTML;
        this.btnEditar = btnEditar;
        this.btnDeletar = btnDeletar;
        this.nome = nome;
        this.email = email;
        this.numero = numero;
        this.index = index;
    }

}

function criarElemento(tipoElemento, tipoSeletor, nomeSeletor, conteudo) {
    let elemento = document.createElement(tipoElemento);

    if(tipoSeletor == "class"){
        elemento.className = nomeSeletor
    }else{
        elemento.id = nomeSeletor
    }
    if(conteudo)  {
        elemento.innerHTML = conteudo;
    }
    return elemento;
}

function criarCard(nome,email,numero,index) {
    let card = criarElemento("div", "class", "card", false);
    let cardBox1 = criarElemento("div", "class", "card-box", false);
    let cardBox2 = criarElemento("div", "class", "card-box", false);
    let cardBox3 = criarElemento("div", "class", "card-box", false);

    let tiposDados1 =  criarElemento("h3", "class", "", 'nome: ');
    let tiposDados2 =  criarElemento("h3", "class", " ", 'email: ');
    let tiposDados3 =  criarElemento("h3", "class", "dados", 'numero: ');

    let dados1 =  criarElemento("p", "class", "dados", nome);
    let dados2=  criarElemento("p", "class", "dados", email);
    let dados3 =  criarElemento("p", "class", "dados", numero);
    let div1 = criarElemento("div", "class", '', false);
    let div2 = criarElemento("div", "class", '', false);
    let btnDeletar = criarElemento("button", "class", '', 'deletar');
    let btnEditar = criarElemento("button", "class", '', 'editar');

    [div1,div2].map((elem) => {card.appendChild(elem)});

    div1.appendChild(cardBox1)
    div1.appendChild(cardBox2)
    div1.appendChild(cardBox3)

    div2.appendChild(btnDeletar)
    div2.appendChild(btnEditar)
    
    cardBox1.appendChild(tiposDados1)
    cardBox2.appendChild(tiposDados2)
    cardBox3.appendChild(tiposDados3)
    
    cardBox1.appendChild(dados1)
    cardBox2.appendChild(dados2)
    cardBox3.appendChild(dados3)

    listaCards.push(new Card(card,btnEditar,btnDeletar,dados1,dados2,dados3,index))
    cardMain.appendChild(card)
}


function limparInput(){
    nome.value=''
    email.value=''
    numero.value=''
}

form.addEventListener('submit',function(event){
    event.preventDefault()
   
    if(!editar){ 
        console.log('cadastrar')
        criarCard(nome.value,email.value,numero.value,index)
        ++index
    }if(editar){
        editar = false;
        console.log(listaCards,indexEditar)
        listaCards[indexEditar].nome.textContent = nome.value;
        listaCards[indexEditar].email.textContent = email.value; 
        listaCards[indexEditar].numero.textContent= numero.value; 
    }
    limparInput()
   
})


function telaCard(){
    cardMain.classList.remove('none')
    form.classList.add('none')
}
function telaForm(){
    cardMain.classList.add('none')
    form.classList.remove('none')
}

function apagarDados(elem){
    console.log('click apagar')
    cardMain.removeChild(elem.cardHTML)
    elem.index = listaCards.findIndex(elem)
    listaCards.splice(elem.index,1)
    console.log(listaCards)
    editar = false;
}
function editarDados(elem){
    console.log('click editar')
    nome.value = elem.nome.textContent
    email.value = elem.email.textContent
    numero.value = elem.numero.textContent
    editar = true
    indexEditar = elem.index;
    
}

addEventListener('click',(e)=>{
    listaCards.forEach((elem)=>{
        if(e.target == elem.btnDeletar){
            apagarDados(elem)
        }if(e.target == elem.btnEditar){
            editarDados(elem)
        }            
    })
})
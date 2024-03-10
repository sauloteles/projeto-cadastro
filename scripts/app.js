const main =document.getElementsByClassName('main')[0]
const crud = document.getElementsByClassName('main__crud')[0]
const form = document.getElementsByClassName('main__form')[0]
const cardMain = document.getElementsByClassName('main__card')[0]
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const numero = document.getElementById('numero')
const btnCadastrar = document.getElementById('btn-cadastrar')
const btnVizualizar = document.getElementById('btn-vizualizar')
let listaCadastros = [];
let listaCards = []
let index = 0

class Usuario{
    constructor(nome,email,numero){
        this.nome = nome;
        this.email = email;
        this.numero = numero;
        this.index = index; 
    }

}

function salvarUsuario(){    
    let usuario = new Usuario(nome.value,email.value,numero.value)
    listaCadastros.push(usuario)
    console.log(listaCadastros)
    ++index;
    limparInput()
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

    listaCards.push({cardConteudo:card,btnDeletar:btnDeletar,btnEditar:btnEditar,nome:nome,email:email,numero:numero,cardIndex:index})
    cardMain.appendChild(card)
}

function vizualizarCards(lista){
    let ultimoItem= lista.length-1
    criarCard(lista[ultimoItem].nome,lista[ultimoItem].email,lista[ultimoItem].numero,email,lista[ultimoItem].index)

}

function limparInput(){
    nome.value=''
    email.value=''
    numero.value=''

}
form.addEventListener('submit',function(event){
    event.preventDefault()
    salvarUsuario()
    vizualizarCards(listaCadastros)
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
    cardMain.removeChild(elem.cardConteudo)
    listaCadastros.splice(elem.cardIndex,1)
    console.log(listaCadastros)
}
function editarDados(elem){
    console.log('click editar')
    apagarDados(elem)
    nome.value = elem.nome
    email.value = elem.email
    numero.value = elem.numero
}

addEventListener('click',(e)=>{
    listaCards.forEach((elem)=>{
        if(e.target == elem.btnDeletar){
            apagarDados(elem)
        }if(e.target == elem.btnEditar){
            // telaForm()
            editarDados(elem)
        }            
    })
})
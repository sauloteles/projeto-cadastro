const nome = document.getElementById('nome')
const email = document.getElementById('email')
const numero = document.getElementById('numero')
const btnCadastrar = document.getElementById('btn-cadastrar')
console.log(btnCadastrar)

let listaCadastros = [];
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
    console.log(nome.value  )
    let usuario = new Usuario(nome.value,email.value,numero.value)
    listaCadastros.push(usuario)
    console.log(listaCadastros)
    ++index;
}

btnCadastrar.addEventListener('click',salvarUsuario)
// Está variavel pega o formulario do html
const form = document.getElementById('novoItem')

//Está varaivel armazena a lista do html
const lista = document.getElementById("lista")

//const items = []

// Pode haver dados no localStorage, na verdade é isso que queremos. Entao pode ser necessário salvar essess dados existentes numa lista.

//const items =localStorage.getItem("items") || []

//Contudo a lista items na verdade é uma string, deve o método json usada para arazena os dados no localStorage. Por isso deve ser utilizado uma funão que o retorne como uma lista

const items =JSON.parse(localStorage.getItem("item")) || []

items.forEach(elemento => {
    criaElementos(elemento)
    
});


//o formulario recebe evetos. Com a função addVeventoLister eu consigo receptar esses evento. 

// A função addEventListener funciona recendo outra função. Nesse caso ao receber o evento submit, que ococrre ao apertao o botão, ela ela vai executar a função anonima que interrponte o evento, chamado evento.
form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    // Crio variaveis que recebem esses elementos
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    // Apos interromper o evento serão criados elementos apartir do evento acionad.
    

    const existe = items.find(elemento => elemento.nome ==nome.value)
    
    const listaAtual ={
            "nome":nome.value,
            "quantidade":quantidade.value
        }
    
    if(existe){
        listaAtual.id = existe.id
        atalizaElemento(listaAtual)
        //items[existe.id]=listaAtual
        items[items.findIndex(elemento => elemento.id === id),1] =listaAtual
    } else{
        listaAtual.id=items[items.length -1] ? items[items.length - 1] : 0
        
        criaElementos(
        listaAtual
        ) 
        
        items.push(listaAtual)
    }
    

     //Salvar esses dados no cliente previne que eles se percam
    //localStorage.setItem("nome",nome)
    //localStorage.setItem("quantidade", quantidade)


    //Foi criada uma lista para guardar esses dados
   

    // O localtorage só permite guradr strings, então foi utilizad o método hjson stringfy
    localStorage.setItem("item",JSON.stringify(items))


    // Agora depois de submeter o formulario ele o esvazia
    nome.value =''
    quantidade.value=''
    
})


//A fnção cria elementos ira criar os elementos que serão adicionaddos ao meu html
function criaElementos(item) {
    
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id=item.id

    //novoItem.innerHTML = numeroItem + nome, é necessário primeiro criar a tag filha <strong>, dentro da tag pai <li>. Para depois acrecentar um novo valor a tag pai

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(deletaItem(item.id))

    lista.appendChild(novoItem)
    
}

function atalizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deletaItem(id){
    const elementoBotao= document.createElement('button')
    elementoBotao.innerText="X"

    //Um botão criado dinamicamente pelo javascript não possui eveento
    //O evento deve ser criado na propria função js
    // a arrow function não interpreta eventos criados por botãos dinamicos 
    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id) // O pai dessa tag
    })

    return elementoBotao
}

function deletaElemento(tag,id){
    tag.remove()

    items.splice(items.findIndex(elemento => elemento.id === id),1)

    localStorage.setItem("item", JSON.stringify(items))
}
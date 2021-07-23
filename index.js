document.getElementById('adiciona').onclick=adiciona;
let mensagens = [];

async function getMessage(){
    const {data: mensagem} = await axios.get('https://recados-api.herokuapp.com/listar')

    mensagens = mensagem;
    geraLista();
}

async function adiciona(){
    let titulo = document.getElementById("titulo").value;
    let mensagem = document.getElementById("mensagem").value;

    if(titulo == '' || mensagem == ''){
        return;
    }

    const {data: {id,title,message}} = await axios.post('https://recados-api.herokuapp.com/adicionar',{title: titulo,message: mensagem})
    mensagens.push({id,title,message});
    getMessage()
    
}

/*let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];*/

function geraLista(){
    let tBody = document.getElementById("tbody");
    tBody.innerHTML = "";
    for(let message of mensagens){

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let tdTitulo = document.createElement("td");
        let tdMensagem = document.createElement("td");
        let tdGerenciar = document.createElement("td");

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","btn btn-danger mx-2");
        deleteBtn.setAttribute("id",message.id);
        deleteBtn.onclick = async function () {
            await axios.delete(`https://recados-api.herokuapp.com/apaga/${message.id}`)
            getMessage()
        };
        deleteBtn.innerHTML = "Excluir"

        let editBtn = document.createElement("button");
        editBtn.setAttribute("class","btn btn-warning mx-2");
        editBtn.setAttribute("id","myBtn");
        editBtn.onclick = function() {
            modal.style.display = "block";
            let editaModalBtn = document.getElementById("editaModal");

            document.getElementById("tituloModal").value = message.title;
            document.getElementById("mensagemModal").value = message.message;

            editaModalBtn.onclick = async function () {
                let titulo = document.getElementById("tituloModal").value;
                let mensagem = document.getElementById("mensagemModal").value 
                await 
                axios.put(`https://recados-api.herokuapp.com/mudar/${message.id}`,{title: titulo,message: mensagem});
                getMessage()
            }
        }
        editBtn.innerHTML = "Editar"

        tdGerenciar.appendChild(editBtn);
        tdGerenciar.appendChild(deleteBtn);

        th.innerHTML = message.id;
        tdTitulo.innerHTML = message.title;
        tdMensagem.innerHTML = message.message;

        tr.appendChild(th);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdMensagem);
        tr.appendChild(tdGerenciar);

        tBody.appendChild(tr);
    }
}

getMessage();

function salvaLocalStorage(){
    localStorage.setItem('mensagens',JSON.stringify(mensagens));
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

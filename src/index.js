let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

function geraLista(){
    let tBody = document.getElementById("tbody");
    for(let i = 0; i < mensagens.length; i++){
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let tdTitulo = document.createElement("td");
        let tdMensagem = document.createElement("td");
        let tdGerenciar = document.createElement("td");

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","btn btn-danger mx-2");
        deleteBtn.setAttribute("id",i+1);
        deleteBtn.onclick = function () {
            let filtro = mensagens.filter(function(value){
                return value != mensagens[i];
            });
            localStorage.setItem('mensagens',JSON.stringify(filtro));
            window.location.reload();
        };
        deleteBtn.innerHTML = "Excluir"

        let editBtn = document.createElement("button");
        editBtn.setAttribute("class","btn btn-warning mx-2");
        editBtn.setAttribute("id","myBtn");
        editBtn.onclick = function() {
            modal.style.display = "block";
            let editaModalBtn = document.getElementById("editaModal");

            document.getElementById("tituloModal").value = mensagens[i].titulo;
            document.getElementById("mensagemModal").value = mensagens[i].mensagem;

            editaModalBtn.onclick = function () {
                let titulo = document.getElementById("tituloModal").value;
                let mensagem = document.getElementById("mensagemModal").value 
                let filtro = mensagens;
                filtro[i] = {titulo,mensagem};
                localStorage.setItem('mensagens',JSON.stringify(filtro));
                window.location.reload();
            }
        }
        editBtn.innerHTML = "Editar"

        tdGerenciar.appendChild(editBtn);
        tdGerenciar.appendChild(deleteBtn);

        th.innerHTML = i+1;
        tdTitulo.innerHTML = mensagens[i].titulo;
        tdMensagem.innerHTML = mensagens[i].mensagem;

        tr.appendChild(th);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdMensagem);
        tr.appendChild(tdGerenciar);

        tBody.appendChild(tr);
    }
}

geraLista();

function adiciona(){
    let titulo = document.getElementById("titulo").value;
    let mensagem = document.getElementById("mensagem").value;

    window.location.reload();

    mensagens.push({titulo,mensagem});
    salvaLocalStorage();
}

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

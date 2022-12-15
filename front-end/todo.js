const API_URL = "http://localhost/Tarefa5/back-end/";

var token = "";
var form;
token = localStorage.getItem('token');

/*function login() {
    var resposta = document.getElementById("response");
    // FAz requisiçao para a API
    const email = document.getElementById("frm_login_email").value;
    const senha = document.getElementById("frm_login_senha").value;
    var json = JSON.stringify({ email, senha});
    console.log(json);
    request = new XMLHttpRequest()
    request.open("POST", API_URL+"auth/auth.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        //console.log(request);
         if (request.readyState === 4 && request.status === 200) {
            // Print received data from server
            var resposta = this.response;
            response.innerHTML = this.responseText;
            
            console.log(typeof(resposta));
            //dataType: 'json'
            //response.setRequestHeader("Content-type", "application/json");
            let obj = JSON.parse(resposta);
         
        
            //var obj = rawResponse.json();
        
            console.log("Alo?")
            console.log("Este é o token: " + obj.token);
            console.log("Este é o id_usuario: " + obj.id_usuario);
            console.log("Este é o nome: " + obj.nome);
        
            localStorage.setItem("token", obj.token);
            localStorage.setItem("id_usuario", obj.id_usuario);
            localStorage.setItem("nome", obj.nome);
        }
    };
    request.send(json);        
    }*/
        
function cadastrarAfazer(){

    var resposta = document.getElementById("response")
    form = document.getElementById("formAfazer");
    dadosForm = new FormData(form)
    var titulo = dadosForm.get("titulo")
    var descricao = dadosForm.get("descricao")
    var data = dadosForm.get("data")
    console.log("Titulo: " + titulo);
    console.log("Descrição: " + descricao);
    console.log("Data: " + data);
    console.log("Alo?");
    var arrayFormData = {};
    dadosForm.forEach((valor, nome) => arrayFormData[nome] = valor);
    arrayFormData["token"] = token;
    var json = JSON.stringify(arrayFormData);
    console.log(json)
    request = new XMLHttpRequest()
    request.open("POST", API_URL+"todo/create.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {

            // Print received data from server
            response.innerHTML = this.responseText;

        }
    };
    request.send(json);
    listarAfazer();
    listarAfazer();
    listarAfazer();
}

function verificarUsuario() {

    if(token == null) {
        const container = document.getElementById("container");
        a = document.createElement("a");

        a.innerHTML = "Faça login para acessar as suas to-dos";
        a.classList.add("btn")/***************/
        a.classList.add("bg-danger")/***************/
        a.classList.add("btn")/***************/
        a.setAttribute("href", "index.html");
        container.appendChild(a);
        //container.classList.add("glyphicon")/***************/
        //container.classList.add("glyphicon-plus")/***************/
                    
    } else {
        var arrayToken = {};
        arrayToken["token"] = token;
        console.log(arrayToken);
        var json = JSON.stringify(arrayToken);   
        request = new XMLHttpRequest();     
        console.log("Testando com a testa: "+json)
        request.open("POST", API_URL+"user/decoder.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.onreadystatechange = function () {
            /*console.log("Essa é a resposta: "+this.responseText);
            let stringfyResponse = JSON.stringify(this.responseText);
            let obj = this.responseText//JSON.parse(stringfyResponse);
            console.log("stringfy"+obj);
            
            document.getElementById("usuario_ativo").innerHTML = obj.nome;
            document.getElementById("tipo_usuario").innerHTML = obj.type;
            
            if (request.readyState === 4 && request.status === 200/* response.result && response.result === true) {
                console.log("DEntro da request do verificarusuario")
                document.getElementById("response_verifica").innerHTML = this.responseText
                var resposta = this.responseText;
                
                console.log(resposta);
                console.log(resposta);
                console.log("Teste"+obj.nome)
                document.getElementById("usuario_ativo").innerHTML(resposta.nome);
                document.getElementById("tipo_usuario").innerHTML(resposta.type);
            }*/
        };
        request.send(json);
    }
}

function listarAfazer() {
    var response = document.getElementById("response");
    
    var arrayFormData = {};
    
    arrayFormData["token"] = token;
    var json = JSON.stringify(arrayFormData);
    console.log(json)
    request = new XMLHttpRequest()
    request.open("POST", API_URL+"todo/list.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
        
            var resposta = JSON.parse(this.responseText);
            // Verifica se a resposta é uma array vazia
            if(resposta.length === 0) {
                response.innerHTML = "Não há afazeres";
            } else {
                var listaAfazeres = document.getElementById("listaAfazeres");
                listaAfazeres.innerHTML = "";
                tarefas.innerHTML = "";
                for(var i=0;i<resposta.length;i++){
                    var ul = document.createElement("ul");

                    afazer = resposta[i]
                    var idAfazer = afazer.id;
                
                    //console.log("Olha só, esse aqui é o id desta tarfea: "+idAfazer)
                    /*var item = document.createElement("li");
                    var textnode = document.createTextNode("Título: "+afazer.titulo);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Descrição: "+afazer.descricao);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Data: "+afazer.data);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Horário: "+afazer.horario);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Concluído: "+afazer.concluido);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("button");
                    item.innerHTML = "Editar";
                    //item.classList.add("edit")/***************/
                    /*item.setAttribute("data-tipobutton", "edit");
					item.id = idAfazer
                    item.classList.add("btn")
                    item.classList.add("bg-primary")
                    item.classList.add("btn-lg")
                    item.classList.add("glyphicon")
                    item.classList.add("glyphicon-plus")
                    item.setAttribute("data-toggle", "modal");
                    item.setAttribute("data-target", "#editmodal");
                    /*item.addEventListener('click', () => {
                        console.log("Reposta aqui: "+afazer);
                        console.log("Isso não era para aparecer")
                        editarButton(idAfazer);
                    })
                    item.onclick = (function(afazer){
                        return function(){
                            buttonEditar(afazer);
                        }
                     })(afazer);

                    ul.appendChild(item);
                    item = document.createElement("button");
                    item.innerHTML = "Deletar";
					item.setAttribute("data-editbutton", idAfazer
					item.id = idAfazer
                    item.classList.add(idAfazer)/*
                    item.classList.add("btn")/*************
                    item.classList.add("bg-primary")/***************
                    item.classList.add("btn-lg")/***************
                    item.classList.add("glyphicon")/***************
                    item.classList.add("glyphicon-plus")/***************
                    /*item.addEventListener('click', () => {
                        buttonDeletar(this.id)
                    })
                    item.onclick = (function(idAfazer){
                        return function(){
                            buttonDeletar(idAfazer);
                        }
                     })(idAfazer);
                    /*item.addEventListener('click', () => {
                        deletar(idAfazer);
                    });


					// data-toggle="modal" id="newtask" data-target="#modaltask">Novo</button>


                    /*ul.appendChild(item);*/
                    
                    listaAfazeres.appendChild(ul);


                    const tr = document.createElement('tr');
                    const td = document.createElement('td');
                    const div = document.createElement('div');
                    const h3 = document.createElement('h3');
                    const h5 = document.createElement('h5');
                    const h6 = document.createElement('h6');
                    const buttons = document.createElement('div');
                    const subdiv = document.createElement('div');
                    const editButton = document.createElement('button');
                    const deleteButton = document.createElement('button');
                    
                    h3.innerHTML = afazer.titulo;
                    h5.innerHTML = afazer.descricao;
                    h6.innerHTML = "Programado para " + formatarData(afazer.data) + ", às " + afazer.horario;
                    div.classList.add("d-flex");
                    div.classList.add("justify-content-between");
                    subdiv.classList.add("d-flex");
                    subdiv.classList.add("justify-content-center");
                    subdiv.classList.add("p-2");
                    subdiv.classList.add("rounded-pill");
                    subdiv.style.width = "75px";
                    subdiv.style.height = "30px";


                    deleteButton.innerHTML = "Deletar";
					//item.setAttribute("data-editbutton", idAfazer)/***************/
					deleteButton.id = idAfazer
                    //item.classList.add(idAfazer)/***************/
                    deleteButton.classList.add("btn")/***************/
                    deleteButton.classList.add("bg-danger")/***************/
                    deleteButton.classList.add("btn-lg")/***************/
                    deleteButton.classList.add("glyphicon")/***************/
                    deleteButton.classList.add("npm")/***************/
                    deleteButton.classList.add("i")/***************/
                    deleteButton.classList.add("bi-trash-fill")/***************/
                    deleteButton.classList.add("glyphicon-plus")/***************/
                    /*item.addEventListener('click', () => {
                        buttonDeletar(this.id)
                    })*/
                    deleteButton.onclick = (function(idAfazer){
                        return function(){
                            buttonDeletar(idAfazer);
                        }
                    })(idAfazer);

                    editButton.innerHTML = "Editar";
                    //editButtonem.classList.add("edit")/***************/
                    editButton.setAttribute("data-tipobutton", "edit");
					editButton.id = idAfazer/***************/
                    editButton.classList.add("btn")/***************/
                    editButton.classList.add("bg-info")/***************/
                    editButton.classList.add("btn-lg")/***************/
                    editButton.classList.add("glyphicon")/***************/
                    editButton.classList.add("glyphicon-plus")/***************/
                    editButton.classList.add("npm")/***************/
                    editButton.classList.add("i")/***************/
                    editButton.classList.add("bi-pencil-square")/***************/
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editmodal");
                    /*item.addEventListener('click', () => {
                        console.log("Reposta aqui: "+afazer);
                        console.log("Isso não era para aparecer")
                        editarButton(idAfazer);
                    })*/
                    editButton.onclick = (function(afazer){
                        return function(){
                            buttonEditar(afazer);
                        }
                    })(afazer);

                     
                    if(afazer.concluido == 0) {
                     
                        const aux = calcularTempo(afazer.data);
                        
                        if(aux == 0){
                             subdiv.innerHTML = "Hoje";
                             subdiv.classList.add("bg-warning");
                            } else if(aux == 1) {
                            subdiv.innerHTML = "Amanhã";
                            subdiv.classList.add("bg-warning");
                        } else if(aux < 0) {
                            subdiv.innerHTML = "Atrasado";
                            subdiv.classList.add("bg-danger");
                            subdiv.classList.add("text-white");
                        } else {
                            subdiv.innerHTML = "Daqui a " + calcularTempo(afazer.data) + " dias";
                            subdiv.classList.add("bg-secondary");
                            subdiv.style = "--bs-bg-opacity: .4;";
                            subdiv.style.height = "30px"
                        }
                    } else {
                        subdiv.innerHTML = "Concluido"
                        subdiv.classList.add("bg-success")
                        subdiv.classList.add("text-white");

                    }
                    
                    tr.setAttribute("data-bs-toggle", "modal");
                    tr.setAttribute("data-bs-target", "#exampleModal");
                    
                    div.appendChild(h3);
                    div.appendChild(deleteButton);                  
                    div.appendChild(editButton);
                    div.appendChild(subdiv);
                    
                    td.appendChild(div);
                    td.appendChild(h5);
                    td.appendChild(h6);
                    
                    tr.appendChild(td);
                    tarefas.appendChild(tr);
                    
					
                    
                    
                    
                    
                    
                    
                    
                }
            }
        }
    };
    request.send(json)
}

function buttonEditar(afazer) {
    
    console.log("Aqui"+afazer); 
    document.getElementById("titulo").value = afazer.titulo; 
    document.getElementById("descricao").value = afazer.descricao;
    document.getElementById("data").value = afazer.data;
    document.getElementById("horario").value = afazer.horario;
    document.getElementById("concluido").value = afazer.concluido;
    window.idEdicaoAtual = afazer.id;

}

function buttonDeletar(idAfazer) {
    //deletar(idAfazer);
    console.log("Opa, estou dentro de buttonDeletar, e esse é o afazer: "+idAfazer);
    console.log("Epa")
    deletar(idAfazer)

}

function editar(afazer){
	
    var resposta = document.getElementById("response")
    form = document.getElementById("formEditar");
    console.log(idEdicaoAtual)

    dadosForm = new FormData(form)
    var titulo = dadosForm.get("titulo")
    var descricao = dadosForm.get("descricao")
    var data = dadosForm.get("data")
    console.log("Titulo: " + titulo);
    console.log("Descrição: " + descricao);
    console.log("Data: " + data);
    console.log("Alo?");
    var arrayFormData = {};
    dadosForm.forEach((valor, nome) => arrayFormData[nome] = valor);
    arrayFormData["token"] = token;
    arrayFormData["id"] = idEdicaoAtual;
    var json = JSON.stringify(arrayFormData);
    console.log(json)
    request = new XMLHttpRequest()
    request.open("POST", API_URL+"todo/edit.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            response.innerHTML = this.responseText;
        }
    };
    request.send(json);
    listarAfazer();
    listarAfazer();

    /*console.log("Teste editar");
    var json = JSON.stringify({id_afazer, token});
    request = new XMLHttpRequest()
    request.open("POST", API_URL+"todo/edit.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Print received data from server
            response.innerHTML = this.responseText;

        }
    };
    request.send(json);
    listarAfazer();
    listarAfazer();*/
    console.log("Teste editar");
}

function deletar(id_afazer) {
    console.log("Teste deletar");
    console.log("Este é o id: "+id_afazer);
    var json = JSON.stringify({token, id_afazer});
    request = new XMLHttpRequest()
    request.open("POST", API_URL+"todo/delete.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        console.log("DELETOU!!!");
        response.innerHTML = "Afazer deletado";
        if (request.readyState === 4 && request.status === 200) {
            // Print received data from server
            console.log("DEntro de request.readystatedekik")

        }
    };
    request.send(json);
    listarAfazer();
    listarAfazer();
}


function calcularTempo(data) {
    const dataHJ = new Date();
    dataHJ.setDate(dataHJ.getDate());
    const dataPick = new Date(data);

    const diff = dataPick.getTime() - dataHJ.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days;
}

function zeroFill(n) {
    return n < 10 ? `0${n}` : `${n}`;
}

function formatarData(data) {
    const newData = new Date(data);
    const d = zeroFill(newData.getDate() +1);
    const mo = zeroFill(newData.getMonth() + 1);
    const y = zeroFill(newData.getFullYear());
    const h = newData.getHours();
    const m = newData.getMinutes();

    return `${d}/${mo}/${y}`;
}


function getAfazer() {



    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
    

}


verificarUsuario();
listarAfazer();

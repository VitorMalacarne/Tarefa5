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
        
function CadastrarAfazer(){

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
}

function verificarUsuario() {

    if(token == null) {
        document.getElementById("container").innerHTML = "Faça login para acessar as suas to-dos";
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
            if (request.readyState === 4 && request.status === 200) {
            
                console.log("Essa é a resposta: ")
            
                document.getElementById("response_verifica").innerHTML = this.responseText
                var resposta = this.responseText;
                
                console.log(resposta);
                console.log(resposta);
                /*let obj = JSON.parse(resposta);
                console.log("Teste"+obj.nome)
                document.getElementById("usuario_ativo").innerHTML(resposta.nome);
                document.getElementById("tipo_usuario").innerHTML(resposta.type);*/
            }
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
                for(var i=0;i<resposta.length;i++){
                    var ul = document.createElement("ul");

                    var idAfazer = resposta[i].id;
                
                    //console.log("Olha só, esse aqui é o id desta tarfea: "+idAfazer)
                    var item = document.createElement("li");
                    var textnode = document.createTextNode("Título: "+resposta[i].titulo);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Descrição: "+resposta[i].descricao);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Data: "+resposta[i].data);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Horário: "+resposta[i].horario);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("li");
                    textnode = document.createTextNode("Concluído: "+resposta[i].concluido);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    item = document.createElement("button");
                    item.innerHTML = "Editar";
                    item.className = "editar"/***************/
                    item.className = idAfazer/***************/
                    item.addEventListener('click', (idAfazer) => {
                        editar(idAfazer);
                        getAfazer();
                    })
                    ul.appendChild(item);
                    item = document.createElement("button");
                    item.innerHTML = "Deletar";
                    item.className = "deletar"/***************/
                    item.className = idAfazer/***************/
                    item.addEventListener('click', () => {
                        deletar(idAfazer);
                    });
                    ul.appendChild(item);
                    
                    listaAfazeres.appendChild(ul);
                }
            }
        }
    };
    request.send(json)
}

function buttonEditar() {
    
}

function buttonDeletar() {
    //deletar(idAfazer);
    console.log("Opa, estou dentro de buttonDeletar, e esse é o afazer: "+this.idAfazer);
    console.log("Epa")


}

function editar(id_afazer){

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
    arrayFormData["id_afazer"] = id_afazer;
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
        if (request.readyState === 4 && request.status === 200) {
            // Print received data from server
            response.innerHTML = this.responseText;

        }
    };
    request.send(json);
    listarAfazer();
    listarAfazer();
}

function getAfazer() {



    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
    

}


verificarUsuario();
listarAfazer();

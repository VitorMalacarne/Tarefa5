const API_URL = "http://localhost/Tarefa5/back-end/";

var token = "";
var form;
token = localStorage.getItem('token');

function login() {
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
    }
        
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
}

function verificarUsuario() {

    if(token == ""){

    } else {
        var arrayToken = {};
        arrayToken["token"] = token;
        var json = JSON.stringify(arrayToken);   
        request = new XMLHttpRequest();     
        request.open("POST", API_URL+"user/decoder.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                console.log("Essa é a resposta: ")
            
                        var resposta = this.responseText;
                        console.log(resposta);
                        console.log(resposta);
                        let obj = JSON.parse(resposta);
                        console.log("Teste"+obj.nome)

                        document.getElementById("usuario_ativo").innerHTML(resposta.nome);
                        document.getElementById("tipo_usuario").innerHTML(resposta.type);
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
                for(var i=0;i<resposta.length;i++){
                    var ul = document.createElement("ul");

                    var item = document.createElement("li");
                    var textnode = document.createTextNode("Título: "+resposta[i].titulo);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    var item = document.createElement("li");
                    var textnode = document.createTextNode("Descrição: "+resposta[i].descricao);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    var item = document.createElement("li");
                    var textnode = document.createTextNode("Data: "+resposta[i].data);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    var item = document.createElement("li");
                    var textnode = document.createTextNode("Horário: "+resposta[i].horario);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    var item = document.createElement("li");
                    var textnode = document.createTextNode("Concluído: "+resposta[i].concluido);
                    item.appendChild(textnode);
                    ul.appendChild(item);
                    
                    listaAfazeres.appendChild(ul);
                }
            }
        }
    };
    request.send(json)
}

verificarUsuario();
listarAfazer();

/*<?php else: ?>
<?php foreach($acomodacoes as $index => $acomodacao): ?>
    <div class="card">
        <ul>
            <li>
                <p><?= @$acomodacao->tipo_acomodacao ?></p>
                
            </li>
            <li>
                <p><?= @$acomodacao->tipo_apartamento ?></p>
                
            </li>
            <li>
                <p><?= @$acomodacao->qtd_camas_casal ?> cama(s) de casal</p>
            </li>
            <li>
                <p><?= @$acomodacao->qtd_camas_solteiro ?> cama(s) de solteiro</p>
            </li>

        </ul>
        <?php if(empty($_SESSION) !== true): ?>
        <form action="../view_adm/ctrl_reserva.php?action=reservar&qtd_adultos=<?= @$_REQUEST['qtd_adultos']?>&qtd_criancas=<?= @$_REQUEST['qtd_criancas']?>&data_entrada=<?= @$_REQUEST['data_entrada']?>&data_saida=<?= @$_REQUEST['data_saida']?>" method="post">
            <input type="hidden" name="id_acomodacao" value="<?= $acomodacao->id ?>">
            <input type="hidden" name="id_tarifa" value="<?= @$acomodacao->id_tarifa ?>">
            <input type="submit" value="Reservar">
        </form>
        <?php endif; ?>
        
    </div>
<?php endforeach; ?>
<?php endif; ?>*/
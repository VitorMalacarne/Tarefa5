const API_URL = "http://localhost/Tarefa5/back-end/";

var form

localStorage.clear();

function login() {
    //var resposta = document.getElementById("response");
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
        var resposta = this.response;
        
        if (request.readyState === 4 && request.status === 200) {
            // Print received data from server
            //response.innerHTML = this.responseText;
            //console.log(JSON.parse("{\"name\":\"alan\",\"age\":34}"));
            
            //console.log(typeof(resposta));
            //dataType: 'json'
            //response.setRequestHeader("Content-type", "application/json");
            let obj = JSON.parse(resposta);
            
            //var obj = rawResponse.json();
            
            console.log("Alo?");
            console.log("Este é o token: " + obj.token);
            
            localStorage.setItem("token", obj.token);
            
            document.getElementById("acessar_todo").removeAttribute("hidden");
            document.getElementById("response").setAttribute("hidden", true);
            
            

        } else {
            document.getElementById("response").innerHTML = this.response
            console.log(resposta)
        
        }
    };
    request.send(json);
    


}

// login();

// alert(localStorage.getItem("token"));

			
function CadastrarUsuario(){
    var resposta = document.getElementById("response")
    form = document.getElementById("formCadastro");
    dadosForm = new FormData(form)
    var nome = dadosForm.get("nome")
    var email = dadosForm.get("email")
    var nascimento = dadosForm.get("nascimento")
    console.log("Nome: " + nome);
    console.log("Email: " + email);
    console.log("Nascimento: " + nascimento);
    var arrayFormData = {};
    dadosForm.forEach((valor, nome) => arrayFormData[nome] = valor);
	//arrayFormData["token"] = token;
    var json = JSON.stringify(arrayFormData);
    console.log(json)
    request = new XMLHttpRequest()
    request.open("POST", API_URL+"user/create.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Print received data from server
            response.innerHTML = this.responseText;
        }
    };
    request.send(json)
}
function login() {
    // FAz requisiçao para a API
    let token = "xx";

    localStorage.setItem("token", token);
}

login();

alert(localStorage.getItem("token"));

var form
			
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
    var json = JSON.stringify(arrayFormData);
    console.log(json)
    request = new XMLHttpRequest()
    request.open("POST", "../back-end/api/controller/create_usuario.php", true)
    request.setRequestHeader("Content-type", "application/json")
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Print received data from server
            response.innerHTML = this.responseText;
        }
    };
    request.send(json)
}
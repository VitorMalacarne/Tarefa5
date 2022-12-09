const API_URL = "http://localhost/back-end/api/";

        var form

        function login() {
          // FAz requisiçao para a API
          let token = "xx";
    
          localStorage.setItem("token", token);
        }

		login();

        
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
            var arrayFormData = {};
            dadosForm.forEach((valor, nome) => arrayFormData[nome] = valor);
            var json = JSON.stringify(arrayFormData);
            console.log(json)
            request = new XMLHttpRequest()
            request.open("POST", API_URL+"controller/create_afazer.php", true)
            request.setRequestHeader("Content-type", "application/json")

            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
 
                    // Print received data from server
                    response.innerHTML = this.responseText;
 
                }
            };
            request.send(json)
        }
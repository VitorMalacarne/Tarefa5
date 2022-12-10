const API_URL = "http://localhost/back-end/";

        var form;
        const token = localStorage.getItem('token');

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
                    console.log(JSON.parse("{\"name\":\"alan\",\"age\":34}"));
                    
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
            request.send(json)
        }
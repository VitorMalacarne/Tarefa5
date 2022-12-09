<?php
    require "jwtutil.class.php";
    require "config.php";
    require "http://localhost/back-end/user/usuario.dao.php";

    //1)Receber as credenciais do usuário
    //Obtendo o body da requisição HTTP
    $json = file_get_contents('php://input');
    //Transforma o JSON em objeto PHP
    $credenciais = json_decode($json);
    $email = $credenciais->email;
    $senha = $credenciais->senha;

    $usuarioDAO = new UsuarioDAO($credenciais);
    $usuario = $usuarioDAO->getUsuarioByEmail($email);

    if(empty($usuario)){
        echo "Digite um email válido";
    }else{
        if($senha == $usuario->senha){

            $payload = [
                "id_usuario"=> $usuario->id,
                "nome"=> $usuario->nome, 
                "type"=> $usuario->type 
            ];
    
            //Gerar o Token
            $jwt = JwtUtil::encode($payload, JWT_SECRET_KEY);
            $responseBody = "{\"token\": \"$jwt\", "id": ".$usuario->id." }";

        }else{
            http_response_code(401);//Status não auturozado
            $responseBody = '{"message": "Credenciais inválidas" }';
        }
    }

    header('Content-type: application/json');
    print_r($responseBody)

?>
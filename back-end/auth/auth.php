<?php
    require "jwtutil.class.php";
    require "config.php";
    require "../user/usuario.dao.php";
    require_once("../api/database/connection.inc.php");
    // require_once("http://localhost/back-end/api/database/connection.inc.php");
    //1)Receber as credenciais do usuário
    //Obtendo o body da requisição HTTP
    $json = file_get_contents('php://input');
    //Transforma o JSON em objeto PHP
    $credenciais = json_decode($json);
    $email = $credenciais->email;
    $senha = $credenciais->senha;

    $usuarioDAO = new UsuarioDAO($pdo);
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
            $responseBody = "{\"token\": \"$jwt\", \"id_usuario\": \"$usuario->id\", \"nome\": \"$usuario->nome\" }";
            //$responseBody = "{\"token\": \"$jwt\", "id_usuario": ".$usuario->id." }";

        }else{
            http_response_code(401);//Status não auturozado
            $responseBody = '{"message": "Credenciais inválidas" }';
        }
    }

    header('Content-type: application/json');
    print_r($responseBody)

?>
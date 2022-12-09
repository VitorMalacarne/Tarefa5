<?php
    require "jwtutil.class.php";
    require "config.php";
    //1)Receber as credenciais do usuário
    //Obtendo o body da requisição HTTP
    $json = file_get_contents('php://input');
    //Transforma o JSON em objeto PHP
    $credentials = json_decode($json);

    //2)Validar as credenciais do usuário
    if(@$credentials->login == "admin" && @$credentials->password == "1234"){
        //3)Devolver o token caso o usuário esteja ok
        $payload = [
            "sub"=> "1", //ID do usuário
            "name"=> "Administrador", //Nome do usuário
            "role"=> "admin"//papel do usário
        ];

        //Gerar o Token
        $jwt = JwtUtil::encode($payload, JWT_SECRET_KEY);
        $responseBody = "{\"token\": \"$jwt\" }";
    }else{
        //Caso o usuário ou senha sejam inválidos
        http_response_code(401);//Status não auturozado
        $responseBody = '{"message": "Credenciais inválidas" }';
    }

    header('Content-type: application/json');
    print_r($responseBody)

?>
<?php
    require "jwtutil.class.php";
    require "config.php";

    $token = @getallheaders()['authorization'];

    $responseBody = '';
    if($token){
        $decoded = JwtUtil::decode($token, JWT_SECRET_KEY);
    }else{
        http_response_code(401);//não autorizado
        $responseBody = '{"message": "Sem token"}';
    }
    
    //Se existir $responseBody == não está autorizado
    if($responseBody){//mostra a resposta para o cliente
        header("Content-type:application/json");
        print_r($responseBody);
        exit;//encerra o script
    }

?>
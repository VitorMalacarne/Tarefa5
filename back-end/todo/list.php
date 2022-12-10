<?php


$responseBody = "";
    if($token){
        $decoded = JwtUtil::decode($token, JWT_SECRET_KEY);
    } else {
        http_response_code(401); // Não autorizado
        $responseBody = '{ "message": "Sem token"}';
    }

    // Se existir $responseBody == não está autorizado
    if($responseBody) { // Mostrar a resposta para o cliente
        header("Content-type: application/json");
        print_r($responseBody);
        exit; // Encerra o script
    }


    ?>
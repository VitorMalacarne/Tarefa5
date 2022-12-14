<?php
require "../auth/jwtutil.class.php";
require "../auth/config.php";
require_once("../api/database/connection.inc.php");

header("Content-Type: application/json");

$json = file_get_contents('php://input');

$dadosJSON = json_decode($json);

$token = $dadosJSON->token;
    
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
        exit; // Encerra o scripts
    }

$nome = $decoded['nome'];
$type = $decoded['type'];

$responseBody = "{\"nome\":\"$nome\",\"type\":\"$type\" }";
//$responseBody = "{\"token\":\"$jwt\",\"id_usuario\":\"$id_usuario\",\"nome\":\"$nome\" }";
/*
$arrayJSON = array('nome'=>$nome, 'type'=>$type);
$jsonFile = json_encode($arrayJSON);
$responseBody = $jsonFile;*/

// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
print_r($responseBody);

?>
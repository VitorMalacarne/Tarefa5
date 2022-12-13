<?php
require "../auth/jwtutil.class.php";
require "../auth/config.php";
require_once('../api/database/connection.inc.php');
require_once("afazer.dao.php");


$afazerDAO = new AfazerDAO($pdo);

header("Content-Type: application/json");

$json = file_get_contents('php://input');

$dadosAfazer = json_decode($json);

$token = $dadosAfazer->token;
    
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

$response = $afazerDAO->delete($dadosAfazer->id_afazer);

if(!$response) {
    echo "Erro ao salvar afazer";
} else {
    echo 'Salvou!';
}

/*$responseBody = '';

try {
    $dadosAfazer = $afazerDAO->insert($dadosAfazer);
    $responseBody = json_encode($dadosAfazer);
} catch (Exception $e) {
    
    // Muda o código de resposta HTTP para 'bad request'
    http_response_code(400);
    $responseBody = '{ "message": "Ocorreu um erro ao tentar executar esta ação. Erro: Código: ' .  $e->getCode() . '. Mensagem: ' . $e->getMessage() . '" }';
}*/





// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
print_r($response);

?>
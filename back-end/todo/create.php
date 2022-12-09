<?php
require_once("http://localhost/back-end/api/database/connection.inc.php");
require_once("afazer.dao.php");

$afazerDAO = new AfazerDAO($pdo);

header("Content-Type: application/json");

$json = file_get_contents('php://input');

$dadosAfazer = json_decode($json);

$response = $afazerDAO->insert($dadosAfazer);

if(!$response) {
    echo "Erro ao salvar afazer";
} else {
    echo 'Salvou!';
}

$responseBody = '';

try {
    $dadosAfazer = $afazerDAO->insert($dadosAfazer);
    $responseBody = json_encode($dadosAfazer);
} catch (Exception $e) {
    
    // Muda o código de resposta HTTP para 'bad request'
    http_response_code(400);
    $responseBody = '{ "message": "Ocorreu um erro ao tentar executar esta ação. Erro: Código: ' .  $e->getCode() . '. Mensagem: ' . $e->getMessage() . '" }';
}


// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta
print_r($responseBody);

?>
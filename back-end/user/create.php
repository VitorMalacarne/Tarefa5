<?php
require_once '../api/database/connection.inc.php';
require_once 'usuario.dao.php';

$usuarioDAO = new UsuarioDAO($pdo);

header("Content-Type: application/json");

$json = file_get_contents('php://input');

$dadosUsuario = json_decode($json);

$response = "";

echo $dadosUsuario->email;


if(empty($usuarioDAO->getUsuarioByEmail(@$dadosUsuario->email))){
            
    $response = $usuarioDAO->insert(@$dadosUsuario);
    
    $id = $usuarioDAO->getUsuarioByEmail(@$dadosUsuario->email)->id;
    echo $id;
    /*$_SESSION['id'] = $id;
    $_SESSION['nome'] = @$dadosUsuario->nome;*/
} else {

    echo "O email ".$dadosUsuario->email." já está sendo utilizado, escolha outro";
}


echo $dadosUsuario->nome;
echo $dadosUsuario->email;
echo $dadosUsuario->nascimento;
echo $dadosUsuario->type;
echo $dadosUsuario->senha;

echo $response;
if(!$response) {
    echo "Erro ao salvar usuário";
} else {
    echo 'Salvou!';
}

$responseBody = '';

try {
    $dadosUsuario = $usuarioDAO->insert($dadosUsuario);
    $responseBody = json_encode($dadosUsuario);
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
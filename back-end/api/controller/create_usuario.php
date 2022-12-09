<?php
require_once("../database/connection.inc.php");
require_once("usuario.dao.php");

$usuarioDAO = new UsuarioDAO($pdo);

header("Content-Type: application/json");

$json = file_get_contents('php://input');

$dadosUsuario = json_decode($json);


if(empty($usuarioDAO->getUsuarioByEmail(@$_POST['email']))){
            
    $usuarioDAO->insert(@$_POST);
    $view = '../view_usuario/principal.php';
    
    $id = $usuarioDAO->getUsuarioByEmail(@$_POST['email'])->id;
    echo $id;
    $_SESSION['id'] = $id;
    $_SESSION['nome'] = @$_POST['nome'];
    
    header('location: '.$view);
    
}
$message = "O email ".$_POST['email']." já está sendo utilizado, escolha outro";


$response = $usuarioDAO->insert($dadosUsuario);

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
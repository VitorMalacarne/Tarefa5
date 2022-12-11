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

            $id_usuario = $usuario->id;
            $nome = $usuario->nome;
            $type = $usuario->type;

            $payload = [
                "id_usuario"=> $id_usuario,
                "nome"=> $nome, 
                "type"=> $type 
            ];
    
            //Gerar o Token
            $jwt = JwtUtil::encode($payload, JWT_SECRET_KEY);
            //$responseBody = "{\"token\": \"$jwt\", \"id_usuario\": \"$usuario->id\", \"nome\": \"$usuario->nome\" }";
            //$responseBody = "{\"token\": \"$jwt\", "id_usuario": ".$usuario->id." }";
            $responseBody = "{\"token\":\"$jwt\",\"id_usuario\":\"$id_usuario\",\"nome\":\"$nome\" }";
            //"{\"name\":\"alan\",\"age\":34}"

            $arrayJSON = array('token'=>$jwt, 'id_usuario'=>$id_usuario, 'nome'=>$nome);
            $jsonFile = json_encode($arrayJSON);

            //echo $jsonFile;

            header('Content-type: application/json');
            print_r($responseBody);


        }else{
            http_response_code(401);//Status não auturozado
            $responseBody = '{"message": "Credenciais inválidas" }';
            header('Content-type: application/json');
            print_r($responseBody);
        }
    }


?>
<?php

class UsuarioDAO
{
    function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function get($id) {/*
        //Prepare our select statement.
        $stmt = $this->pdo->prepare("SELECT * FROM tb_usuario WHERE id = ?");
        $stmt->bindParam(1, $_REQUEST['id']);

        $stmt->execute();
        return $stmt->fetchObject();
    }*/
    /*
    public function getAll() {
        $sql = "SELECT * FROM tb_usuario";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }*/

    public function insert($post) {

        $sql = "INSERT INTO tb_usuario (
            nome, email, nascimento, type, senha) 
            VALUES (:nome, :email, :nascimento, :type, :senha)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':nome', $user->nome);
        $stmt->bindValue(':email', $user->email);
        $stmt->bindValue(':nascimento', $user->nascimento);
        $stmt->bindValue(':type', $user->type);
        $stmt->bindValue(':senha', $user->senha);

        return $stmt->execute();
        /*$user = clone $user;

        $user->id = $this->pdo->lastInsertId();

        return $user;*/
    }
    /*
    public function update($id, $user) {

        $sql = "UPDATE tb_usuario SET
            nome = :nome,
            telefone = :telefone,
            email = :email
        WHERE id = :id";

        $stmt = $this->pdo->prepare($sql);

        $data = [
            'id' => $id,
            'nome' => $user->nome,
            'email' => $user->email,
        ];

        return $stmt->execute($data);
    }
    */
    /*
    public function delete($id) {
        $sql = "DELETE from tb_usuario WHERE id = ?";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->rowCount();
    }*/
}
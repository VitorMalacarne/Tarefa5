<?php

class AfazerDAO
{
    function __construct($pdo) { // *
        $this->pdo = $pdo;
    }

    /*public function getById($id) {// *
        //Prepare our select statement.
        $sql = "SELECT * FROM tb_afazer WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(1, $_REQUEST['id']);

        $stmt->execute();
        return $stmt->fetchObject();
    }

    public function getAllByUserId($id_usuario) { // ?
        $sql = "SELECT * FROM tb_afazer WHERE id_usuario = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(1, $_REQUEST['id']);
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS);
        return $stmt->fetchObject();
    }
    */
    public function insert($post) { // ????
        
        $id_usuario = 5;

        //date("YYYY-MM-DD HH:MI:SS", strtotime($post->data_horario));

        $data_horario = '20.06.2018 10:12:45';

        $sql = "INSERT INTO tb_afazer (
            id_usuario, titulo, descricao, data_horario, concluido) 
            VALUES (:id_usuario, :titulo, :descricao, :data_horario, :concluido)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id_usuario', $id_usuario);
        $stmt->bindValue(':titulo', $post->titulo);
        $stmt->bindValue(':descricao', $post->descricao);
        $stmt->bindValue(':data_horario', $data_horario);
        $stmt->bindValue(':concluido', $post->concluido);

        $stmt->execute();
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

    public function delete($id) {
        $sql = "DELETE from tb_usuario WHERE id = ?";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->rowCount();
    }*/
}
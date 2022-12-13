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
    }*/

    public function getAllByUserId($id_usuario) { // ?
        $sql = "SELECT * FROM tb_afazer WHERE id_usuario = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(1, $id_usuario);
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS);
        //return $stmt->fetchObject();
    }
    
    public function insert($post) { 

        $sql = "INSERT INTO tb_afazer (
            id_usuario, titulo, descricao, data, horario, concluido) 
            VALUES (:id_usuario, :titulo, :descricao, :data, :horario, :concluido)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id_usuario', $post->id_usuario);
        $stmt->bindValue(':titulo', $post->titulo);
        $stmt->bindValue(':descricao', $post->descricao);
        $stmt->bindValue(':data', $post->data);
        $stmt->bindValue(':horario', $post->horario);
        $stmt->bindValue(':concluido', $post->concluido);

        return $stmt->execute();
    }
    
    public function update($post) {

        $sql = "UPDATE tb_afazer SET
            titulo = :titulo,
            descricao = :descricao,
            data = :data,
            horario = :horario;
            concluido = :concluido
        WHERE id = :id";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':titulo', $post['titulo']);
        $stmt->bindValue(':descricao', $post['descricao']);
        $stmt->bindValue(':data', $post['data']);
        $stmt->bindValue(':horario', $post['horario']);
        $stmt->bindValue(':concluido', $post['concluido']);
        //$stmt->bindValue(':id', $post['id']);

        return $stmt->execute();
    }
    

    public function delete($id) {
        $sql = "DELETE from tb_afazer WHERE id = ?";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->rowCount();
    }*/
}
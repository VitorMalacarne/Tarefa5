CREATE DATABASE to_do;

use to_do;

CREATE TABLE `tb_usuario` (
`id` INT NOT NULL AUTO_INCREMENT, 
`nome` VARCHAR(70) NOT NULL, 
`email` VARCHAR(70) NOT NULL, 
`nascimento` DATE NOT NULL,
`type` VARCHAR(15) NOT NULL,
`senha` VARCHAR(100) NOT NULL, 
PRIMARY KEY (`id`),
UNIQUE(`email`)
) ENGINE = InnoDB;

CREATE TABLE `tb_afazer` (
`id` INT NOT NULL, 
`id_usuario` INT NOT NULL,
`titulo` VARCHAR(100) NOT NULL,
`descricao` VARCHAR(255) NOT NULL, 
`data_horario` DATETIME NOT NULL,
`concluido` BIT NOT NULL,
PRIMARY KEY (`id`)
) ENGINE = InnoDB;
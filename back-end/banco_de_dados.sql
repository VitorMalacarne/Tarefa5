CREATE DATABASE to_do;

use to_do;

CREATE TABLE `tb_usuario` (
`id` INT NOT NULL AUTO_INCREMENT, 
`nome` VARCHAR(70) NOT NULL, 
`email` VARCHAR(70) NOT NULL, 
`senha` VARCHAR(100) NOT NULL, 
PRIMARY KEY (`id`),
UNIQUE(`email`)
) ENGINE = InnoDB;



CREATE TABLE `tb_afazer` (
`id` INT NOT NULL, 
`tarefa` VARCHAR(100) NOT NULL, 
`horario` DATE NOT NULL,
`concluido` DECIMAL NOT NULL, /*BOOLEANO 0 OU 1*/
PRIMARY KEY (`id`)
) ENGINE = InnoDB;


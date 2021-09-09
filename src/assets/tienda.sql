CREATE TABLE IF NOT EXISTS usuario(
    id_usuario INTEGER not null PRIMARY KEY AUTOINCREMENT,
    nombrecom text not null, 
    correo text not null,
    contrasena text not null,
    tipo text not null
);
INSERT or IGNORE INTO usuario(id_usuario,nombrecom, correo, contrasena,tipo) VALUES (1, 'Administrador', 'admin@gmail.com','1234','A');
INSERT or IGNORE INTO usuario(id_usuario,nombrecom, correo, contrasena,tipo) VALUES (2, 'Cliente', 'cliente@gmail.com','1234','C');

CREATE TABLE IF NOT EXISTS productos(
    id_producto INTEGER not null PRIMARY KEY AUTOINCREMENT,
    nombre text not null, 
    descripcion text not null,
    precio text not null
);
INSERT or IGNORE INTO productos(id_producto,nombre, descripcion,precio) VALUES (1, 'Hamburgesas', 'Hamburgesas grandes,jumbos,varios ingredientes','40');
INSERT or IGNORE INTO productos(id_producto,nombre, descripcion,precio) VALUES (2, 'Pizza', 'Rebanadas de pizza de peperoni','15');
CREATE TABLE IF NOT EXISTS carrito(
    id_item INTEGER not null PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_producto INTEGER,
    foreign key(id_usuario) references usuario(id_usuario),
    foreign key(id_producto) references productos(id_producto)
);
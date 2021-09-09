import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { UsuarioModel } from '../model/usuario';
import { RegistroModel } from '../model/registro';
import { ProductoModel } from '../model/producto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private storage: SQLiteObject;
  Usuario = new BehaviorSubject([]);
  Producto = new BehaviorSubject([]);
  
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,) {
      this.CrearBD();
    }

  CrearBD(){
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'tienda.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getData();
      });
    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchUsuario(): Observable<UsuarioModel[]> {
    return this.Usuario.asObservable();
  }
  getData() {
    this.httpClient.get(
      'assets/tienda.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
      .then(_ => {
        this.isDbReady.next(true);
      })
      .catch(error => console.error(error));
    });
  }
  guardarUsuario(usuario: RegistroModel) {
    let data = [usuario.nombrecom, usuario.correo,usuario.contrasena,usuario.tipo];
    return this.storage.executeSql(`INSERT INTO usuario (nombrecom,correo,contrasena,tipo) VALUES (?,?,?,?)`, data)
    .then(res => {
      if (res.rowsAffected === 0) {
        return false;
      }else{
        return true;
      }
    });  
  }
  login(usuario: UsuarioModel) {
    let data = [usuario.correo, usuario.contrasena];
    let mensaje;
    return this.storage.executeSql(`SELECT * FROM usuario WHERE correo =? AND contrasena=?`, data)
    .then(res => {
      if ( res.rows.length === 0) {
        mensaje= {
          mensaje:'El usuario o contraseña es incorrecto o no existe'
        }
      } else {
        mensaje= {
          id_usuario: res.rows.item(0).id_usuario,
          nombrecom: res.rows.item(0).nombrecom,  
          tipo: res.rows.item(0).tipo
        }
      }
      return mensaje;
    });
  }
  isLogged() {
    const tipo =localStorage.getItem('Tipo');
    if ( tipo != null && tipo !='' && tipo != 'undefined' ) {
      return true;
    } else {
      return false;
    }
  }
  getProductos(){
    return this.storage.executeSql('SELECT * FROM productos', []).then(res => {
      let items: ProductoModel[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id_producto: res.rows.item(i).id_producto,
            nombre:res.rows.item(i).nombre, 
            descripcion:res.rows.item(i).descripcion,
            precio:res.rows.item(i).precio,
           });
        }
      }
      this.Producto.next(items);
      return this.Producto;
    });
  }
  EditarProducto(producto:ProductoModel){
    let data = [producto.nombre,producto.descripcion,producto.precio,producto.id_producto];
    return this.storage.executeSql(`UPDATE productos SET nombre = ?, descripcion = ?,precio=? WHERE id_producto=?`, data)
    .then(res => {
      if (res.rowsAffected === 0) {
        return false;
      }else{
        return true;
      }
    });
  }
  AgregarProducto(producto:ProductoModel){
    let data = [producto.nombre,producto.descripcion,producto.precio];
    return this.storage.executeSql(`INSERT INTO productos (nombre,descripcion,precio) VALUES (?,?,?)`, data)
    .then(res => {
      if (res.rowsAffected === 0) {
        return false;
      }else{
        return true;
      }
    });
  }
  EliminarProducto(id) {
    return this.storage.executeSql('DELETE FROM productos WHERE id_producto = ?', [id])
    .then(res => {
      if (res.rowsAffected === 0) {
        return false;
      }else{
        return true;
      }
    });
  }
  AgregarProductocarrito(id_producto,idusuario){
    let data = [id_producto,idusuario];
    return this.storage.executeSql(`INSERT INTO carrito (id_producto,id_usuario) VALUES (?,?)`, data)
    .then(res => {
      if (res.rowsAffected === 0) {
        return false;
      }else{
        return true;
      }
    });
  }
  ObtenitemsCarrito(idusuario){
    let total;
    return this.storage.executeSql(`SELECT count(*) as total FROM carrito WHERE id_usuario=?`,  [idusuario])
    .then(res => {
      if (res.rows.length > 0) {
        total= res.rows.item(0).total;
      }
      return total;
    });
  }
  obtenProductoscarrito(id_ususario){
    return this.storage.executeSql('SELECT carrito.id_item,productos.id_producto,productos.nombre,productos.precio '+
    'FROM productos '+
    'INNER JOIN carrito ON carrito.id_producto = productos.id_producto WHERE carrito.id_usuario=?', [id_ususario]).then(res => {
      let items: ProductoModel[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({
            id_item:res.rows.item(i).id_item,
            id_producto: res.rows.item(i).id_producto,
            nombre:res.rows.item(i).nombre, 
            precio:res.rows.item(i).precio,
           });
        }
      }
      this.Producto.next(items);
      return this.Producto;
    });
  }
  EliminaritemsCarrito(item,idusuario){
    return this.storage.executeSql('DELETE FROM carrito WHERE id_item =? AND id_usuario=?',  [item,idusuario])
    .then(res => {
      if (res.rowsAffected === 0) {
        return false;
      }else{
        return true;
      }
    });
  }
  SimulaCompra(idusuario){
    return this.storage.executeSql('DELETE FROM carrito WHERE id_usuario=?',  [idusuario])
    .then(res => {
      if (res.rowsAffected === 0) {
        return false;
      }else{
        return true;
      }
    });
  }
}

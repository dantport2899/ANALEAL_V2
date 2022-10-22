export interface User {
    user: UserClass;
    error:   boolean;
    message: string;
}

export interface UserClass {
    idusuario:   string;
    nom_usuario: string;
    correo:      string;
    username:    string;
    contrasena:  string;
    idrol:       string;
    direccion:   string;
    telefono:    string;
}

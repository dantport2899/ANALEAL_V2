export interface Reportes {
    reportes: Reporte[];
    error:   boolean;
    message: string;
}

export interface Reporte {
    idreporte: string;
    idprenda:  string;
    accion:    string;
    cantidad:  string;
    fecha:     string;
    idpedido:  string;
    prenda:    Prenda[];
    pedido?:   Pedido[];
}

export interface Prenda {
    idprenda:       string;
    nom_prenda:     string;
    idtalla:        string;
    precio:         string;
    iddepartamento: string;
    color:          string;
    idmaterial:     string;
    idestilo:       string;
    img_nombre:     string;
    img_archivo:    string;
    descripcion:    string;
    existencias:    string;
    iddescuento:    string;
}

export interface Pedido {
    idpedidos:        string;
    clavetransaccion: string;
    paypaldatos:      string;
    idusuario:        string;
    correo:           string;
    total:            string;
    fecha:            string;
    fechaentrega:     string;
    descripcion:      string;
    direccion:        string;
    status:           string;
}

export interface Totalreportes {
    Totalreportes: string;
}
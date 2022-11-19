export interface Carrito {
    carrito: CarritoElement[];
    error:   boolean;
    message: string;
}

export interface CarritoElement {
    idcarrito:      string;
    idpedido:       string;
    idprenda:       string;
    preciounitario: string;
    cantidad:       string;
    vendido:        string;
    prenda:         Prenda[];
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

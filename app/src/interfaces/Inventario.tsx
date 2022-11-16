export interface Prendas {
    prendas: Prenda[];
    error:   boolean;
    message: string;
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

export interface Totalprendas {
    Totalprendas: string;
    Consulta: string;
}

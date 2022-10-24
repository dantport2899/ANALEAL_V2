export interface Tallas {
    tallas: Talla[];
    error:   boolean;
    message: string;
}

export interface Talla {
    idtalla:     string;
    nom_talla:   string;
    descripcion: string;
}

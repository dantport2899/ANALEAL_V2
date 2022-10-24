export interface Descuentos {
    descuentos: Descuento[];
    error:   boolean;
    message: string;
}

export interface Descuento {
    iddescuento:   string;
    nom_descuento: string;
    descripcion:   string;
    descuento:     string;
}

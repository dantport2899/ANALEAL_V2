export interface Materiales {
    materiales: Materiale[];
    error:   boolean;
    message: string;
}

export interface Materiale {
    idmaterial:   string;
    nom_material: string;
    descripcion:  string;
}

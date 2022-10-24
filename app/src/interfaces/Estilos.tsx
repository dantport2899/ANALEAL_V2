export interface Estilos {
    estilos: Estilo[];
    error:   boolean;
    message: string;
}

export interface Estilo {
    idestilo:    string;
    nom_estilo:  string;
    descripcion: string;
}

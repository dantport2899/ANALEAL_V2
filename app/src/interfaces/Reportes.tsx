export interface Reportes {
    descuentos: Reporte[];
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
}

export interface Totalreportes {
    Totalreportes: string;
}
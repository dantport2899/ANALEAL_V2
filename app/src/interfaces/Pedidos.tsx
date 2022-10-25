export interface Pedidos {
    pedidos: Pedido[];
    error:   boolean;
    message: string;
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

export interface Totalpedidos {
    Totalpedidos: string;
}
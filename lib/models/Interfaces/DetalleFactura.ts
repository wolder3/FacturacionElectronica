export interface DetalleFactura {
    item: number,
    unidadMedida: string,
    cantidad: number,
    tipoMoneda: string,
    valorVenta: string,
    precioVentaUnitario: string,
    tipoPrecio?: string | '01',
    totalImpuesto: string,
    valorBase: string,
    IGV: string,
    porcentajeIGV?: number | 18,
    tipoAfectacion?: number | 10,
    tipoTributo?: number | 1000,
    codigoImpuesto?: string | 'IGV',
    codigoTipoImpuesto?: string | 'VAT',
    descripcionProducto: string,
    codigoProducto: string,
    codigoProductoSunat: string,
    valorVentaUnitario: string
}

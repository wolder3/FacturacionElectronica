import { DetalleFactura } from './DetalleFactura';
import { Firmante } from './Firmante';
import { Empresa } from './Empresa'
import { Cliente } from './Cliente'


export interface Factura {
    versionUBL: string,
    id: string,
    fecha: string,
    tipoOperacion: string,
    tipoDocumento: string,
    tipoMoneda: string,
    totalImporteLetras: string,
    firmante: Firmante,
    empresa: Empresa,
    cliente: Cliente,
    idFormaPago?: string | 'FormaPago',
    tipoFormaPago: string,
    totalVentaGravada: string,
    totalValorVenta: string,
    totalPrecioVenta: string,
    importeTotalVenta: string,
    totalImpuesto: string,
    totalIGV: string,
    tipoTributo?: number | 1000
    codigoImpuesto?: string | 'IGV'
    codigoTipoImpuesto?: string | 'VAT'
    detalle: DetalleFactura[],
    
};
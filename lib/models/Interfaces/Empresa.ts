export interface Empresa {
    tipoDocumento: string,
    documento: string,
    nombreComercial: string,
    razonSocial: string,
    ubigeo: string,
    sucursal?: string | '0000',
    urbanizacion: string | '',
    departamento: string,
    provincia: string,
    distrito: string,
    codigoPais?: string | 'PE',
    direccion: string
}
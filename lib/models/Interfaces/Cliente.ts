export interface Cliente{
    tipoDocumento: string,
    documento: string,
    razonSocial: string,
    ubigeo: string,
    codigoPais?: string | 'PE',
    direccion: string
}
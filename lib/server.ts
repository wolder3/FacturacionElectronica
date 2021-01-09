import app from "./config/app";
import env from "./environment";
import * as builder from "xmlbuilder"
 
const PORT = env.getPort();

import * as fs from "fs"

import { Invoice, InvoiceXML,SignXML } from './models'; 
import { Factura} from './models/Interfaces/Factura';
 
 
let data: Factura = {
    versionUBL: "2.1",
    id: 'F001-1',
    fecha: '2020-01-28',
    tipoOperacion: '0101',
    tipoDocumento: '01',
    tipoMoneda: 'PEN' ,
    totalImporteLetras: 'CIENTO DIECIOCHO CON 00 /100 SOLES',
    firmante: {
        documento: '20123456789',
        nombre: 'MI EMPRESA S.A.C',
        referencia: '#EMPRESA-SIGN'
    },
    empresa: {
        tipoDocumento: '6',
        documento: '20123456789',
        nombreComercial: 'MI EMPRESA',
        razonSocial: 'MI EMPRESA S.A.C',
        ubigeo: '150101',
        urbanizacion: 'CASUARINAS',
        provincia: 'LIMA',
        departamento: 'LIMA',
        distrito: 'LIMA',
        direccion: 'Av. Park 211'
    },
    cliente :{
        tipoDocumento: '6',
        documento: '20603343710',
        razonSocial: 'NEGOCIOS S.A.C.',
        ubigeo: '150101',
        direccion: 'AV. OLIVAR NRO. 425'
    },
    tipoFormaPago: 'Contado',
    totalImpuesto: '18.00',
    totalVentaGravada: '100.00',
    totalIGV:'18.00',
    totalValorVenta: '100.00',
    totalPrecioVenta: '118.00',
    importeTotalVenta: '118.00',
    detalle: [{
        item: 1,
        unidadMedida: 'NIU',
        cantidad: 2,
        tipoMoneda: 'PEN',
        valorVenta: '100.00',
        precioVentaUnitario: '59',
        totalImpuesto: '18.00',
        valorBase: '100.00',
        IGV: '18.00',
        descripcionProducto: 'TIJERAS - PRUEBA DE SISTEMAS',
        codigoProducto: 'P001',
        codigoProductoSunat: '44121618',
        valorVentaUnitario: '50'
    }],
     
}

const invoice = new Invoice(data);
// console.log(invoice.createJson()) 
// console.log(invoiceXML.createDetailJson()) 

const invoiceXML = new InvoiceXML(invoice.createXml(), {
    documento: data.empresa.documento,
    tipo: data.tipoDocumento,
    correlativo: data.id
})

console.log(invoiceXML.createFileXML())

const signedXml = new SignXML(invoice.createXml());

signedXml.signing();

app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
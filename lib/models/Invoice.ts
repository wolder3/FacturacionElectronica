import * as builder from 'xmlbuilder';
import { Factura } from './Interfaces/Factura';
import { DetalleFactura } from './Interfaces/DetalleFactura';
 
type XmlType = {
    Invoice: any;
};

export default class Invoice {
    private xmlType: XmlType;
    private data: Factura;
    private detailInvoice: any[]

    constructor(data:Factura) {
        this.data = data;
        this.xmlType = {
            Invoice: this.createXmlJson()
        };

        this.createDetailInvoice(data.detalle);
    }

    createJson(){
        return this.xmlType;
    }

    createDetailJson(){
        return this.detailInvoice;
    }

    createXmlJson(){
        const Invoice = 
        {
            '@xmlns': 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
            '@xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
            '@xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
            '@xmlns:ds':"http://www.w3.org/2000/09/xmldsig#",
            'ext:UBLExtensions' :{
                'ext:UBLExtension':{
                    'ext:ExtensionContent':{}
                }
            },
            'cbc:UBLVersionID': this.data.versionUBL,
            'cbc:CustomizationID': '2.0',
            'cbc:ID': this.data.id,
            'cbc:IssueDate': this.data.fecha,
            'cbc:InvoiceTypeCode':{
                '@listID': this.data.tipoOperacion,
                '@listAgencyName': 'PE:SUNAT',
                '@listName': 'Tipo de Documento',
                '@listURI': 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01',
                '#text': this.data.tipoDocumento,
            },
            'cbc:Note': {
                '@languageLocaleID': '1000',
                '#cdata':this.data.totalImporteLetras
            },
            'cbc:DocumentCurrencyCode': {
                '@listID1': "ISO 4217 Alpha",
                '@listName': "Currency",
                '@listAgencyName': "United Nations Economic Commission for Europe",
                '#text': this.data.tipoMoneda,
            },
            'cac:Signature':{
                'cbc:ID': this.data.firmante.documento,
                'cac:SignatoryParty':{
                    'cac:PartyIdentification':{
                        'cbc:ID': this.data.firmante.documento
                    },
                    'cac:PartyName':{
                        'cbc:Name': this.data.firmante.nombre
                    }
                },
                'cac:DigitalSignatureAttachment':{
                    'cac:ExternalReference':{
                        'cbc:URI': this.data.firmante.referencia
                    }
                }
            },
            'cac:AccountingSupplierParty':{
                'cac:Party':{
                    'cac:PartyIdentification': {
                        'cbc:ID':{
                            '@schemeID': this.data.empresa.tipoDocumento,
                            '@schemeName': 'Documento de Identidad',
                            '@schemeAgencyName':'PE:SUNAT',
                            '@schemeURI': 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06',
                            '#text': this.data.empresa.documento
                        }
                    },
                    'cac:PartyName':{
                        'cbc:Name': this.data.empresa.nombreComercial
                    },
                    'cac:PartyLegalEntity':{
                        'cbc:RegistrationName':{
                            '#cdata': this.data.empresa.razonSocial
                        }
                    },
                    'cac:RegistrationAddress':{
                        'cbc:ID':{
                            '@schemeName':'Ubigeos',
                            '@schemeAgencyName':'PE:INEI',
                            '#text': this.data.empresa.ubigeo //Ubigeo
                        },
                        'cbc:AddressTypeCode':{
                            '@listName':'Establecimientos anexos',
                            '@listAgencyName' : 'PE:SUNAT',
                            '#text': this.data.empresa.sucursal
                        },
                        'cbc:CitySubdivisionName': this.data.empresa.urbanizacion,
                        'cbc:CityName': this.data.empresa.provincia,
                        'cbc:CountrySubentity': this.data.empresa.departamento,
                        'cbc:District': this.data.empresa.distrito,
                        'cac:AddressLine':{
                            'cbc:Line':{
                                '#cdata': this.data.empresa.direccion
                            }
                        },
                        'cac:Country':{
                            'cbc:IdentificationCode':{
                                '@listID':'ISO 3166-1',
                                '@listName':'Country',
                                '@listAgencyName':'United Nations Economic Commission for Europe',
                                '#text': this.data.empresa.codigoPais
                            }
                        }
                    }
                }
            },
            'cac:AccountingCustomerParty':{
                'cac:Party':{
                    'cac:PartyIdentification': {
                        'cbc:ID':{
                            '@schemeID': this.data.cliente.tipoDocumento,
                            '@schemeName': 'Documento de Identidad',
                            '@schemeAgencyName':'PE:SUNAT',
                            '@schemeURI': 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06',
                            '#text': this.data.cliente.documento
                        }
                    },
                    'cac:PartyLegalEntity':{
                        'cbc:RegistrationName':{
                            '#cdata': this.data.cliente.razonSocial
                        }
                    },
                    'cac:RegistrationAddress':{
                        'cbc:ID':this.data.cliente.ubigeo, //Ubigeo
                        'cbc:CitySubdivisionName': this.data.empresa.urbanizacion,
                        'cac:AddressLine':{
                            'cbc:Line':{
                                '#cdata': this.data.cliente.direccion
                            }
                        },
                        'cac:Country':{
                            'cbc:IdentificationCode':{
                                '@listID':'ISO 3166-1',
                                '@listName':'Country',
                                '@listAgencyName':'United Nations Economic Commission for Europe',
                                '#text': this.data.cliente.codigoPais
                            }
                        }
                    }
                }
            },
            'cac:PaymentTerms':{
                'cbc:ID': this.data.idFormaPago,
                'cbc:PaymentMeansID': this.data.tipoFormaPago
            },
            'cac:TaxTotal' :{
                'cbc:TaxAmount': {
                    '@currencyID': this.data.tipoMoneda,
                    '#text': this.data.totalImpuesto
                },
                'cac:TaxSubtotal':{
                    'cbc:TaxableAmount':{
                        '@currencyID': this.data.tipoMoneda,
                        '#text': this.data.totalVentaGravada
                    },
                    'cbc:TaxAmount':{
                        '@currencyID': this.data.tipoMoneda,
                        '#text': this.data.totalIGV
                    },
                    'cac:TaxCategory':{
                        'cac:TaxScheme':{
                            'cbc:ID':{
                                '@schemeName':'Codigo de tributos',
                                '@schemeAgencyName':'PE:SUNAT',
                                '@schemeURI':'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05',
                                '#text': this.data.tipoTributo
                            },
                            'cbc:Name': this.data.codigoImpuesto,
                            'cbc:TaxTypeCode': this.data.codigoTipoImpuesto
                        }
                    }
                },

            },
            'cac:LegalMonetaryTotal':{
                'cbc:LineExtensionAmount':{
                    '@currencyID': this.data.tipoMoneda,
                    '#text': this.data.totalValorVenta
                },
                'cbc:TaxInclusiveAmount':{
                    '@currencyID': this.data.tipoMoneda,
                    '#text': this.data.totalPrecioVenta
                },
                'cbc:PayableAmount' :{
                    '@currencyID': this.data.tipoMoneda,
                    '#text': this.data.importeTotalVenta
                }
            },
            'cac:InvoiceLine': this.createDetailInvoice(this.data.detalle)

        }

        return Invoice;
    }
    createDetailInvoice(detalles: DetalleFactura[]){
        let arrayInvoice = new Array();

        detalles.forEach(detalle => {

            const InvoiceDetail = {
                // 'cac:InvoiceLine':{
                    'cbc:ID': detalle.item,
                    'cbc:InvoicedQuantity' :{
                        '@unitCode': detalle.unidadMedida,
                        '@unitCodeListID':'UN/ECE rec 20',
                        '@unitCodeListAgencyName':'United Nations Economic Commission for Europe',
                        '#text': detalle.cantidad
                    },
                    'cbc:LineExtensionAmount':{
                        '@currencyID': detalle.tipoMoneda,
                        '#text': detalle.valorVenta
                    },
                    'cac:PricingReference':{
                        'cac:AlternativeConditionPrice':{
                            'cbc:PriceAmount':{
                                '@currencyID': detalle.tipoMoneda,
                                '#text': detalle.precioVentaUnitario
                            },
                            'cbc:PriceTypeCode':{
                                '@listName':'Tipo de Precio',
                                '@listURI':'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16',
                                '@listAgencyName':'PE:SUNAT',
                                '#text': detalle.tipoPrecio
                            }
                        }
                    },
                    'cac:TaxTotal':{
                        'cbc:TaxAmount': {
                            '@currencyID': detalle.tipoMoneda,
                            '#text': detalle.totalImpuesto
                        },
                        'cac:TaxSubtotal':{
                            'cbc:TaxableAmount':{
                                '@currencyID': detalle.tipoMoneda,
                                '#text': detalle.valorBase
                            },
                            'cbc:TaxAmount':{
                                '@currencyID': detalle.tipoMoneda,
                                '#text': detalle.IGV
                            },
                            'cac:TaxCategory':{
                                'cbc:Percent': detalle.porcentajeIGV,
                                'cbc:TaxExemptionReasonCode': {
                                    '@listName':'Afectacion del IGV',
                                    '@listURI':'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07',
                                    '@listAgencyName':'PE:SUNAT',
                                    '#text': detalle.tipoAfectacion
                                },
                                'cac:TaxScheme':{
                                    'cbc:ID':{
                                        '@schemeName':'Codigo de tributos',
                                        '@schemeAgencyName':'PE:SUNAT',
                                        '@schemeURI':'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05',
                                        '#text': detalle.tipoTributo
                                    },
                                    'cbc:Name': detalle.codigoImpuesto,
                                    'cbc:TaxTypeCode': detalle.codigoTipoImpuesto
                                }
                            }
                        }
                    },
                    'cac:Item':{
                        'cbc:Description':{
                            '#cdata': detalle.descripcionProducto
                        },
                        'cac:SellersItemIdentification':{
                            'cbc:ID': detalle.codigoProducto
                        },
                        //El codigo de producto por SUNAT no es obligatorio
                        'cac:CommodityClassification':{
                            'cbc:ItemClassificationCode':{
                                'listID': 'UNSPSC',
                                'listAgencyName':'GS1 US',
                                'listName':'Item Classification',
                                '#text': detalle.codigoProductoSunat
                            }
                        }
                    },
                    'cac:Price':{
                        'cbc:PriceAmount':{
                            '@currencyID': detalle.tipoMoneda,
                            '#text': detalle.valorVentaUnitario
                        }
                    }
                }
                arrayInvoice.push(InvoiceDetail)
            }
        );

        return arrayInvoice;
    }

    createXml(): any {
        return builder.create(this.xmlType, { encoding: 'utf-8' }).end({pretty: true, allowEmpty: true})
    }
}

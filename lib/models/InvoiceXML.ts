import * as fs from "fs-extra"
import * as path from "path"

type dataInvoiceXML ={
    documento: string,
    tipo: string,
    correlativo: string
}

export default class InvoiceXML {
    xml: any;
    data: dataInvoiceXML

    constructor(xml:any, data: dataInvoiceXML  ) {
        this.xml = xml;
        this.data = data
    }

    createFileXML(){
        const nameFileXML = this.data.documento + '-'+ this.data.tipo + '-' + this.data.correlativo + '.xml'
        const pathXML = path.resolve(__dirname, '../public/FacturaXML/', nameFileXML)

        fs.outputFile(pathXML, this.xml)
    }
}
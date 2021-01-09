import {SignedXml} from 'xml-crypto'
import * as fs from 'fs'
import * as path from "path"


export default class SignXML {
    private xml : string

    constructor(xml: string) {
        this.xml = xml;
    }

    signing(){
        const option = {
            implicitTransforms: ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"],
            canonicalizationAlgorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
        }

        const sign = new SignedXml(null, option);
        sign.addReference('//*[local-name(.)="Invoice"]');
        sign.signingKey = fs.readFileSync('C:/Certificado/private.key')
        sign.computeSignature(this.xml);
        
        const pathXML = path.resolve(__dirname, '../public/FacturaXML/', 'signed.xml')

        fs.writeFileSync(pathXML, sign.getSignatureXml())

    }

} 
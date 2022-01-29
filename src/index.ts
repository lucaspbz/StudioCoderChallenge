import Axios from "axios";
import https from 'https'

import * as fs from "fs";

export async function handler() {
    const cert = fs.readFileSync("./files/teste_gft.pem");
    const key = fs.readFileSync("./files/teste_gft.key");

    const axios =  Axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false, // (NOTE: this will disable client verification)
            cert,
            key,
        })
    })

    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append("grant_type", "client_credentials")
    urlSearchParams.append("scope", "directory:software")
    urlSearchParams.append("client_id", "Cx-CluFpgHMDCIHBi2vl6")

    const url = "https://matls-auth.sandbox.directory.openbankingbrasil.org.br/token";

    const response = await axios.post(url, urlSearchParams)

    console.log("Primeira requisicao: ok");

    const {access_token} = response.data;


    const { data: jwt } = await axios.get("https://matls-api.sandbox.directory.openbankingbrasil.org.br/organisations/8292c33e-d95a-5fe7-8f27-dd7a95c68b55/softwarestatements/234c141e-d3a7-4ff2-b0cf-aae440061df1/assertion", {
        headers: {
            "Authorization" : `Bearer ${access_token}`
        }
    })

    console.log("Segunda requisicao: ok");

    const body = {
        "grant_types": [
        "authorization_code",
        "implicit",
        "refresh_token",
        "client_credentials"
        ],
        "tls_client_auth_subject_dn": "UID=234c141e-d3a7-4ff2-b0cf-aae440061df1,1.3.6.1.4.1.311.60.2.1.3=#13024252,2.5.4.15=#130f427573696e65737320456e74697479,2.5.4.5=#130e3435323436343130303030313535,CN=gobaas-itp.com,OU=8292c33e-d95a-5fe7-8f27-dd7a95c68b55,O=BANCO GENIAL S.A.,L=RIO DE JANEIRORJ,ST=RJ,C=BR",
        "jwks_uri": "https://keystore.sandbox.directory.openbankingbrasil.org.br/8292c33e-d95a-5fe7-8f27-dd7a95c68b55/234c141e-d3a7-4ff2-b0cf-aae440061df1/application.jwks",
        "token_endpoint_auth_method": "tls_client_auth",
        "response_types": [
        "code id_token"
        ],
        "redirect_uris": [
        "https://gobaas-itp.com:3003/gobaas-itp/payment/pix/callback"
        ],
        "software_statement": jwt
    }

    
    const {data: finalResult} = await axios.post("https://openbanking-br-api-h.mercadopago.com/open-banking/oidc/v1/reg", body);

    console.log("Terceira requisicao ok!")

    return finalResult;
}
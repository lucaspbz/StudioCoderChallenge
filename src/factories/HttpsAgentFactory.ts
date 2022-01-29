import https from 'https'
import * as fs from "fs";

export const makeHttpsAgent = ():https.Agent => {
    const cert = fs.readFileSync("./files/teste_gft.pem");
    const key = fs.readFileSync("./files/teste_gft.key");

    return new https.Agent({
        rejectUnauthorized: false,
        cert,
        key,
    });
}
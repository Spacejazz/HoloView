import express from 'express';
import { createServer } from 'http';
import { getData } from "./utils/getIPFSData";
import { getReceivedAssetsWithMetadataFrom } from './erc725/getReceivedAssetsData';

const port = 3088

const app = express();
const server = createServer(app);

app.route('/meta/data').get( async (req, res) => {
    if(typeof req.query.hash === 'string'){
        res.send(Buffer.from(await getData(req.query.hash)));
    }else {
        res.send({
            status: 400,
            message: "Bad Request"
        });
    }
})
app.route('/up').get( async (req, res) => {
    try {
    const upAddress = `${req.query.upaddress}`;
    if(upAddress){
        res.send(await getReceivedAssetsWithMetadataFrom(upAddress));
    }else {
        res.send({
            status: 400,
            message: "Bad Request"
        });
    }
    } catch (error) {
        console.log("error: ", error);
    }
    
})
 
server.listen({ port }, () => {
    console.log(`Example app listening on porty ${port}`)
});
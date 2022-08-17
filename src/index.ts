import express from 'express';
import { createServer } from 'http';
import { getData } from "./utils/getIPFSData";
import { getReceivedAssetsWithMetadataFrom } from './erc725/getReceivedAssetsData';
import { deployUniversalProfileFor } from './universalProfile/deployUniversalProfile';

const port = 3088

const app = express();
app.use(express.json());
const server = createServer(app);
const universalProfileRoute = app.route('/up');

app.route('/meta/data').get(async (req, res) => {
    if (typeof req.query.hash === 'string') {
        res.send(Buffer.from(await getData(req.query.hash)));
    } else {
        res.send({
            status: 400,
            message: "Bad Request"
        });
    }
})

universalProfileRoute.get(async (req, res) => {
    try {
        const upAddress = `${req.query.upaddress}`;
        if (upAddress) {
            res.send(await getReceivedAssetsWithMetadataFrom(upAddress));
        } else {
            res.send({
                status: 400,
                message: "Bad Request"
            });
        }
    } catch (error) {
        console.log("error: ", error);
    }
})

universalProfileRoute.post(async (req, res) => {
    try {
        res.json({
            status: 200,
            universalProfile: await deployUniversalProfileFor(req.body.walletAddress, req.body.name, req.body.description)
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            status: 400,
            error
        })
    }
})

server.listen({ port }, () => {
    console.log(`Example app listening on porty ${port}`)
});
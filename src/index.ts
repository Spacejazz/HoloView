import express from 'express';
import { createServer } from 'http';
import { getData } from "./utils/getIPFSData";
import { getAssetsWithMetadataFrom } from './erc725/getAssetsData';
import { deployUniversalProfileFor } from './universalProfile/deployUniversalProfile';
import { deployLSP8 } from './token/deployLSP8';
import { mint } from './token/mint';
import { transfer } from './token/transfer';
import { getUniversalProfile } from './universalProfile/getUniversalProfile';
import { assetType } from './utils/mapAssetType';

const port = 3088

const app = express();
app.use(express.json());
const server = createServer(app);
const universalProfileAssetsRoute = app.route('/up/assets');
const universalProfileRoute = app.route('/up');
const universalProfileDeployRoute = app.route('/up/deploy');
const tokenRoute = app.route('/token');
const tokenMintRoute = app.route('/token/mint');
const tokenTransferRoute = app.route('/token/transfer');

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

universalProfileAssetsRoute.get(async (req, res) => {
    try {
        const upAddress = `${req.query.upaddress}`;
        const assets_type = assetType(`${req.query.type}`.toUpperCase());
        
        if (upAddress) {
            res.json({
                status: 200,
                data : res.send(await getAssetsWithMetadataFrom(upAddress, assets_type))
            });
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


universalProfileRoute.get(async (req, res) => {
    try {

        const upAddress = `${req.query.upaddress}`;
        if (upAddress) {
            res.json({
                status: 200,
                data: await getUniversalProfile(upAddress)
            })
        } else {
            res.send({
                status: 400,
                message: "Bad Request"
            });
        }
    } catch (error) {
        console.log("error: ", error);
        res.json({
            status: 400,
            error
        })
    }
})

universalProfileDeployRoute.post(async (req, res) => {
    try {
        res.json({
            status: 200,
            universalProfile: await deployUniversalProfileFor({ walletAddress: req.body.walletAddress, name: req.body.name, description: req.body.description, profileImage: req.body.profileImage, backgroundImage: req.body.backgroundImage})
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            status: 400,
            error
        })
    }
})

tokenRoute.post(async (req, res) => {
    try {
        res.json({
            status: 200,
            LSP8: await deployLSP8(req.body)
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            status: 400,
            error
        })
    }
})


tokenMintRoute.post(async (req, res) => {
    console.log("req: ", req.body);
    try {
        res.json({
            status: 200,
            mint: await mint(req.body.walletAddress, req.body.universalProfileAddress, req.body.contractAddress)
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            status: 400,
            error
        })
    }
})

tokenTransferRoute.post(async (req, res) => {
    console.log("req: ", req.body);
    try {
        res.json({
            status: 200,
            mint: await transfer({ walletAddress: req.body.walletAddress, recepientUniversalProfileAddress: req.body.recepientUniversalProfileAddress, contractAddress: req.body.contractAddress, universalProfileAddress: req.body.universalProfileAddress })
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
    console.log(`Lukso app listening on port ${port}`)
});
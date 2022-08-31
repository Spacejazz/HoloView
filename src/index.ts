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

// routing support
const universalProfileAssetsRoute = app.route('/up/assets');
const universalProfileRoute = app.route('/up');
const universalProfileDeployRoute = app.route('/up/deploy');
const tokenRoute = app.route('/token');
const tokenMintRoute = app.route('/token/mint');
const tokenTransferRoute = app.route('/token/transfer');

/**
 * handler for getting the buffered byte array
 */
app.route('/meta/data').get(async (req, res) => {
    try {
        if (typeof req.query.hash === 'string') {
            const data = await getData(req.query.hash);
            if (typeof data === 'string' || typeof data === 'object' ){
                const bufferedData = Buffer.from(data);
                res.send(bufferedData);
            }else { 
                res.send({
                    status: 400,
                    message: "Bad Response"
                });
            }
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


/**
 * handler for getting the asset list
 */
universalProfileAssetsRoute.get(async (req, res) => {
    try {
        const upAddress = `${req.query.upaddress}`;
        const assets_type = assetType(`${req.query.type}`.toUpperCase());
        
        if (upAddress) {
            res.send(await getAssetsWithMetadataFrom(upAddress, assets_type));
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

/**
 * handler for getting the universal profile metadata
 */
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

/**
 * handler for deploying universal profile 
 * we support name, description, profile and background image
 */
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

/**
 * handler for deploying LSP8 contract
 */
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

/**
 * handler for the mint functionality
 */
tokenMintRoute.post(async (req, res) => {
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

/**
 * in development transfer functionality
 */
tokenTransferRoute.post(async (req, res) => {
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
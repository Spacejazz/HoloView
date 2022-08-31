# Lukso_NFT

## Start the server

### pre requisits

Make sure you have instaled [nodeJs](https://nodejs.org/en/download/)
Good to have is a [Postman](https://www.postman.com/downloads/)

### instalation

    - `npm i`

### import Postman collection

    - choose under the `workspace` tab `My workspace`
    - click the `import` button
    - import the `lukso_postman_collection.json` 

### add your private key

    - duplicate the `.env.example` file
    - paste your private key like `PRIVATE_KEY=0xfaes2....`

### fund your wallet 

    - visit the [faucet](https://faucet.l16.lukso.network/) and follow the instraction (tweet, copy the tweet url, choose the desired LYXt ammount)

### start the server

    - `npm run start`
    - `Lukso app listening on port` message will indicate that the server is running
    - please note after any change on the server you need to restart the local server to take effect 

## server API calls

    - POST `localhost:3088/up/` ----> call responsible for deloying a universal profile to your controller wallet address
    
#### request body

 ```
{
    "name": "my cool universal profile name",
    "description": "my cool description for it",
    "walletAddress":"YOUR WALLET ADDRESS"    
}
```

#### response

```
{
    "status": 200,
    "universalProfile": {
        "address": "YOUR UNIVERSAL PROFILE ADDRESS"
    }
}
```

    - POST `localhost:3088/token/` ----> call responsible for deploying an LSP8 digital asset
        - *request body*   the request example is included in the postman collection, in our repository under `scripts/examples/LSP4Metadata.json` or on the [Lukso documentation](https://docs.lukso.tech/tools/lsp-factoryjs/deployment/digital-asset#adding-images-and-assets) would be to lengthy to paste it here. NOTE: the field called `controllerAddress` should be your WALLET ADDRESS
        - useful links:
            - [Pinata](https://app.pinata.cloud/pinmanager) - you are able to store your images/videos/3D objects on IPFS sotrage and retrieve a `CID` needed for the `url` parameter
            - [Keccak-256 File Checksum](https://emn178.github.io/online-tools/keccak_256_checksum.html) - 

#### response

```
{
    "status": 200,
    "LSP8": {
        "LSP8Address": "LSP8 ADDRESS"
    }
}
```

    - POST `localhost:3088/token/mint/`  ----> call responsible for min ting the given contract address

#### request body   

```
{
    "universalProfileAddress": "UNIVERSAL PROFILE ADDRESS",
    "contractAddress": "CONTRACT ADDRESS",
    "walletAddress":"WALLET ADDRESS"    
}
```
    
#### response  the response would be too lengthy, it shows all the information received from the minitng function





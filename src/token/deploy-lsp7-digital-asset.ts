import "dotenv/config";
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from "web3";

const web3 = new Web3();
const myEOA = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");
// console.log("got myEOA", myEOA);
const upAddress = "0xE361C1137770Ed678883Ba3553A2dd5939bB94Ec";

const main = async () => {
const myToken = new web3.eth.Contract(LSP7Mintable.abi as any, myEOA.address, {
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
  
//   console.log("myToken", myToken);

  const result = await myToken
  .deploy({
    data: LSP7Mintable.bytecode,
    arguments: [
      'My LSP7 Token', // token name
      'LSP7', // token symbol
      myEOA.address, // new owner, who will mint later
      false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
    ]
  })
  .send({
    from: myEOA.address,
  });

  console.log("result", result);

  const mintRes = myToken.methods.mint(upAddress, 100, false, '0x').send({
    from: myEOA,
  });

  console.log("result", mintRes);
};

main();

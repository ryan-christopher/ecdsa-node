const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "a50532c3fde6278608d6": 100, // account 1
  "56836c70d40fdade7dbb": 50, // account 2
  "aabb4ee295b3b4f44ac4": 75, // account 3
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  /*
  TODO: get a signature from the client side application
  and recover the public address from the signature 
  */

  //keep recipient and amount,
  //dont get sender, instead get signature
  //then use sig.recoverPublicKey
  const { message, signature, recoveryBit, recipient, amount } = req.body;

  //console.log("message:", message, typeof message)
  //console.log("sig:", signature, typeof signature)
  //console.log("recoveryBit:", recoveryBit, typeof recoveryBit)



  const messageHash = keccak256(utf8ToBytes(message)); //to secure by transactionType
  const signatureBytes = hexToBytes(signature);
  const sender = toHex(keccak256((secp.recoverPublicKey(messageHash, signatureBytes, recoveryBit)))).slice(-20);

  //toHex(keccak256(publicKey)).slice(-20))

  //console.log(sender)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

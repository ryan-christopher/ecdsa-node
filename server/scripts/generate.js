const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require('ethereum-cryptography/keccak')


const privateKey = secp.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey))

const publicKey = secp.getPublicKey(privateKey)
console.log('public key:', toHex(publicKey))
console.log('keccak address:', toHex(keccak256(publicKey)).slice(-20))

// for ethereum way: 
// address is the last 20 characters of the 
// keccak256 hash of publicKey

/*
==========
For testing purposes only
3 "accounts" with public key, private key, and keccak address
from public key

Account 1:
private key: fb80a7bc97b77f7d5d1b2830af67975f27e747ec0b57876bad6a50ee313aef88
public key: 04bdb23862ed9292fee29b2a62be28cf5bb2230814c8940965f0b7f6dd14d20da46dcb08955505bae58af0bee82424fabe6051df09dc3d125717b894a1247c6e41
keccak address: a50532c3fde6278608d6

Account 2:
private key: dcadd1e6e612a4d9d0f65e94b3a001d5eb6ab16d16f9e564d5b9abb873cc5ac4
public key: 0493f0a596157244239706dfdef86d447670b604f8b54a5a0b5e624c4bad0ec35f4cf56c8cbcf7a6120e8fb9b280fa9f07b10379e1fdf7b67b889c9f6725e938b7
keccak address: 56836c70d40fdade7dbb

Account 3:
private key: c47f353fc6c24e7fa11fc43e3c29047c04348c6dca8a02c6898f42a8050afba8
public key: 0411c0801e31cc65fb3dd0d92efcb677c37f0d9357b6788e671c30b04812ee545124b70c339f17fba44f4c921ca32baeb889978948fffc451397f7c13cda9b8195
keccak address: aabb4ee295b3b4f44ac4


*/
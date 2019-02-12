import { crypto } from 'bitcoinjs-lib'
import * as bippath from 'bip32-path'
import * as BIP32 from 'bip32'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import AppBtc from '@ledgerhq/hw-app-btc'
export { getXpub }

async function getXpub (path) {
  const transport = await TransportNodeHid.create()
  const btc = new AppBtc(transport)
  let parentPath = await getParentPath(path)
  let child = await btc.getWalletPublicKey(path)
  let parent = await btc.getWalletPublicKey(parentPath)
  await transport.close()
  return createXPUB(path, child, parent)
}

const compressPublicKey = publicKey => {
  let prefix = (publicKey[64] & 1) !== 0 ? 0x03 : 0x02
  let prefixBuffer = Buffer.alloc(1)
  prefixBuffer[0] = prefix
  return Buffer.concat([prefixBuffer, publicKey.slice(1, 1 + 32)])
}
const fingerprint = publickey => {
  let pkh = crypto.sha256(publickey)
  pkh = crypto.ripemd160(pkh)
  return ((pkh[0] << 24) | (pkh[1] << 16) | (pkh[2] << 8) | pkh[3]) >>> 0
}

const createXPUB = (path, child, parent) => {
  let pathArray = bippath.fromString(path).toPathArray()
  let pkChild = compressPublicKey(Buffer.from(child.publicKey, 'hex'))
  let pkParent = compressPublicKey(Buffer.from(parent.publicKey, 'hex'))
  let hdnode = BIP32.fromPublicKey(pkChild, Buffer.from(child.chainCode, 'hex'))
  hdnode.parentFingerprint = fingerprint(pkParent)
  hdnode.depth = pathArray.length
  hdnode.index = pathArray[-1]
  return hdnode.toBase58()
}

async function getParentPath (path) {
  path = await bippath.fromString(path).toPathArray()
  path.pop()
  let array = bippath.fromPathArray(path).toString()
  return array
}

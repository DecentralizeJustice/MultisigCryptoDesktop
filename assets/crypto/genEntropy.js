const crypto = require('crypto')

function entropy (bits) {
  let buf = crypto.randomBytes(bits)
  let bufHex = buf.toString('hex')
  return bufHex
}
export { entropy }

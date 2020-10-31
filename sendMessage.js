const CryptoJs = require('crypto-js');
const Axios = require('axios');

const sendMessage = (phoneNumber, key) => {
  const ncp_timestamp = new Date().getTime().toString();

  const url = process.env.NCP_SENS_URL;
  const ncp_accessKey = process.env.NCP_SENS_ACCESS_KEY;
  const ncp_secretKey = process.env.NCP_SENS_SECRET_KEY;
  const ncp_signatureUrl = process.env.NCP_SENS_SIGNATURE_URL;

  const makeSignature = () => {
    var space = ' '; // one space
    var newLine = '\n'; // new line
    var method = 'POST'; // method
    var url = ncp_signatureUrl; // url (include query string)
    var timestamp = ncp_timestamp; // current timestamp (epoch)
    var accessKey = ncp_accessKey; // access key id (from portal or Sub Account)
    var secretKey = ncp_secretKey; // secret key (from portal or Sub Account)

    var hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    var hash = hmac.finalize();

    return hash.toString(CryptoJs.enc.Base64);
  };

  const header = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-ncp-apigw-timestamp': ncp_timestamp,
    'x-ncp-iam-access-key': ncp_accessKey,
    'x-ncp-apigw-signature-v2': makeSignature(),
  };

  const body = {
    type: 'SMS',
    from: '01082970157',
    content: `${key} sens에서 보낸 메시지`,
    messages: [
      {
        to: phoneNumber,
      },
    ],
  };

  Axios({ url, method: 'POST', headers: header, data: body })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

module.exports = { sendMessage };

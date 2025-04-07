// utils/base64.js
exports.decodeBase64 = (encodedString) => {
    return Buffer.from(encodedString, 'base64').toString('ascii');
};
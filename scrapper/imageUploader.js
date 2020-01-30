
const admin = require('firebase-admin');
const request = require('request');
const fs = require('fs')

const BUCKET_NAME = process.env.BUCKET_NAME
const bucket = admin.storage().bucket(BUCKET_NAME);

const download = function(url, filename){
  console.log('Downloading image... \n url:', url)
  return new Promise((resolve,reject) => {
    request.head(url, function(err, res, body){
    console.log('content-type:', res.headers['content-type'])
    console.log('content-length:', res.headers['content-length'])
    savePath = 'temp/' + filename
    request(url).pipe(fs.createWriteStream(savePath)).on('close', () => {
      resolve(savePath)});
    });
  })
}


async function uploadToBucket(url,id) {
  const filename = id + '.jpg'
  const file = await download(url,filename )
  try {
    console.log('Uploading image...')
    const response = await bucket.upload(file)
    return `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`

  } catch(err) {
    throw err
  }
}

module.exports = uploadToBucket

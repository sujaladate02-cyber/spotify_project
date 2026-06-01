const {ImageKit} = require("@imagekit/nodejs")


const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function uploadFile(file,title){
    const result = await ImageKitClient.files.upload({
        file,
        fileName:`${title}_${Date.now()}`,
        folder: "spotifyy/music"
    })

    return result;

    console.log(ImageKitClient);

}

module.exports = {uploadFile}
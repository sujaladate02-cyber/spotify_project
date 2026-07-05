const musicModel = require("../models/music.model")
const albumModel = require("../models/album.model");
const {uploadFile} = require("../services/storage.service")
const jwt = require("jsonwebtoken")

async function createMusic(req,res){
    
    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'),title);

    const music = await musicModel.create({
        uri:result.url,
        title,
        artist: req.user.id,
    })

    res.status(201).json({
        message:"Music created successfully",
        music:{
            id: music._id,
            uri:music.uri,
            title: music.title,
            artist:music.artist,
        }
    })

}

async function createAlbum(req, res) {

    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })

    res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })



}


async function addMusicToAlbum(req, res) {
    const { albumId, musicId } = req.params;

    const album = await albumModel.findByIdAndUpdate(
        albumId,
        {
            $push: {
                musics: musicId
            }
        },
        {
        // { new: true }
        returnDocument: 'after',
        }
    );

    res.json({
        message: "Music added to album",
        album
    });
}


async function getAllMusics(req, res) {
    const musics = await musicModel
        .find()
        .populate("artist", "username email")

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics,
    })

}

async function getAllAlbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums,
    })

}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album,
    })

}

async function searchSongs(req, res){

    try {

        const { q } = req.query;


        if (!q) {
            return res.status(400).json({
                message: "Search keyword required"
            });
        }


        const songs = await musicModel.find({

            $or: [
                {
                    title: {
                        $regex: q,
                        $options: "i"
                    }
                },
            ]

        });


        res.status(200).json({
            count:songs.length,
            songs
        });


    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById ,addMusicToAlbum ,searchSongs}


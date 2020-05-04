const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const lyrics = require("simple-get-lyrics")
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')
app.use(express.static('./public'));




app.all('*', async (req, res) => {

    if (req.body.artist && req.body.song) {
        let artist = req.body.artist
        let song = req.body.song
        try {
            let url = url = await lyrics.search(`${artist}`, `${song}`)
            url = url.lyrics
            res.render("lyric", {
                url: url
            })
        } catch (e) {
            res.render("not found", {
                url: "not found"
            })
        }
    } else {
        res.render("search", {
            url: false
        })
    }




});
app.listen(process.env.PORT || "2000")

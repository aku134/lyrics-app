const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const tiny = require('tiny-json-http')
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine','ejs')
app.use(express.static('./public'));




app.all('*', async (req, res) => {

    if (req.body.artist && req.body.song) {
    let artist = req.body.artist
    let song = req.body.song
    url = `https://orion.apiseeds.com/api/music/lyric/${artist}/${song}/?apikey=5PTn1ArO77QZVfLHoIjPNEg4RBX0WrmDTcjvYByKNcu9l5AcDYsBL2aLJBPldKqJ`
    url = await tiny.get({ url })
    url = url.body.result.track.text
    if (url) { res.render("lyric", {url: url}) } else { res.render("not found", {url: "not found"}) }} else {res.render("search", {url: false})}
    
  

    
   
});
app.listen(1500)

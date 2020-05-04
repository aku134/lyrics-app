const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    lyrics = require("lyrics-fetcher");
app.use(bodyParser.urlencoded({
    extended: !0
})), app.set("view engine", "ejs"), app.use(express.static("./public")), app.all("*", (e, r) => {
    if (e.body.artist && e.body.song) {
        let s = e.body.artist,
            o = e.body.song;
        lyrics.fetch(`${s}`, `${o}`, (e, s) => {
            "Sorry, We don't have lyrics for this song yet." == s ? r.render("not found", {
                url: "not found"
            }) : r.render("lyric", {
                url: s
            })
        })
    } else r.render("search", {
        url: !1
    })
}), app.listen(process.env.PORT || "2000");

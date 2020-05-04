const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    tiny = require("tiny-json-http");
app.use(bodyParser.urlencoded({
    extended: !0
})), app.set("view engine", "ejs"), app.use(express.static("./public")), app.all("*", async (e, r) => {
    if (e.body.artist && e.body.song) {
        let s = `https://rahil-song-api.herokuapp.com/?title=${e.body.song}&artist=${e.body.artist}`;
        (s = (s = await tiny.get({
            url: s
        })).body.lyrics) ? r.render("lyric", {
            url: s
        }): r.render("not found", {
            url: "not found"
        })
    } else r.render("search", {
        url: !1
    })
}), app.listen(process.env.PORT || "2000");

const express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    lyricsFinder = require("lyrics-finder");
app.use(bodyParser.urlencoded({
    extended: !0
})), app.set("view engine", "ejs"), app.use(express.static("./public")), app.all("*", async (e, r) => {
    if (e.body.artist && e.body.song) {
        let s = await lyricsFinder(e.body.artist, e.body.song);
    
     
           s ? r.render("lyric", {
            url: s
        }): r.render("not found", {
            url: "not found"
        })
    } else r.render("search", {
        url: !1
    })
}), app.listen(process.env.PORT || "2000");

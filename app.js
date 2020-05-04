const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    lyrics = require("simple-get-lyrics");
app.use(bodyParser.urlencoded({
    extended: !0
})), app.set("view engine", "ejs"), app.use(express.static("./public")), app.all("*", async (e, r) => {
    if (e.body.artist && e.body.song) {
        let p = e.body.artist,
            a = e.body.song;
        try {
            let s = (s = await lyrics.search(`${p}`, `${a}`)).lyrics
            r.render("lyric", {
            url: s
        })
        } catch (e) {
         r.render("not found", {
            url: "not found"
        })}
    } else r.render("search", {
        url: !1
    })
}), app.listen(process.env.PORT || "2000");

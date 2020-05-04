const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    solenolyrics = require("solenolyrics");
app.use(bodyParser.urlencoded({
    extended: !0
})), app.set("view engine", "ejs"), app.use(express.static("./public")), app.all("*", async (e, r) => {
    if (e.body.artist && e.body.song) {
        let s = e.body.artist,
            o = e.body.song,
            n = await solenolyrics.requestLyricsFor(`${s} ${o}`);
        n ? r.render("lyric", {
            url: n
        }) : r.render("not found", {
            url: "not found"
        })
    } else r.render("search", {
        url: !1
    })
}), app.listen(process.env.PORT || "2000");

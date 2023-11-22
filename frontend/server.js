const PORT = process.env.PORT || 3000
const express = require("express")
const app = express()
app.use(express.static("../frontend/dist/pokemon-team-manager/"))
app.get("*", (req, res) => res.sendFile("index.html", {root: "../frontend/dist/pokemon-team-manager/"}))
app.listen(PORT, () => console.log("Listening on port: "+PORT))
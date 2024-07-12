const express = require("express");
//nodeJs API
const app = express();
//on instancie l'app
const livresRoutes = require("./routes/livres.route.js")
app.use(express.json());
//permettre de gérer les objets JSO dans l'API
app.use("/api/livres", livresRoutes);
//nous séparons les routes ainsi chaque requête 
//par une route passant par l'API
const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`nous sommes sur le port : ${PORT}`);
})

const express = require('express')
const app = express()
const PORT = 5000

app.get('/',(req,res) =>{
    res.send("Mu mei lelo")
});

app.listen(PORT,()=>{
    console.log("Server running on ", PORT)
})

import express from "express";
import axios from "axios";
import {load} from "cheerio";
import bodyParser from "body-parser";
import path from "path"
import { fileURLToPath } from 'url';
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PORT = process.env.YOUR_PORT ||  process.env.PORT || 3001;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
let url = '';

app.post('/api',(req,res)=>{
    // console.log(req.body);
    url = req.body.URL;
    res.status(201).send(`URL received : ${req.body}`);
});


app.get("/api",(req,res)=>{
    axios({
        method: 'get',
        url: url,
        headers: {
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
    }).then(function(response){
        const $ = load(response.data);
        let title = $("title").text();
        let image = $("meta[property='og:image']").attr('content');
        let description = $("meta[name='description']").attr('content');
        res.send({
            title,
            image,
            description,
        });
        
    }).catch(function(error){
        console.error(error);
    });
});



app.listen(PORT,server_host, () => {
    console.log(`Server is running on port ${PORT}`)
  });
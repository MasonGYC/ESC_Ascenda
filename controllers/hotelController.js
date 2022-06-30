var https = require('https')
var async = require('async')
var { MongoClient } = require("mongodb");
const uri =  "mongodb+srv://ringdong2022:Abcdef2022@cluster0.8cytz.mongodb.net/?retryWrites=true&w=majority";
var client = new MongoClient(uri);
const baseUrl = 'https://hotelapi.loyalty.dev/api/'
const dbName = "ascenda-hotel-booking"

var query = require("../public/javascripts/dbops").query
var update = require("../public/javascripts/dbops").update

const coll_name = "hotels"
const mid_url = "hotels/"
// get static details for a given hotel
exports.getOneHotel = function(req, resPage, next) {
    
    // 1. check if it is in database
    let promise = query(client,dbName,coll_name,{id:req.params.id})
    promise.then((result)=>{
        // console.log("result: "+result)
    
        // 2. if so: display it
        if (result != null && result.length != 0){
            console.log("Found in database");
            resPage.write(JSON.stringify(result));
            resPage.end();
        
        }
        // 3. if not: request api, display & store in database
        else{
            console.log("Not found in database")
            const value = Array();
            const hotelId = req.params.id;
            const url = baseUrl+mid_url+hotelId
            
            https.get(url, res => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                    });
                res.on('end', () => {
                    data = JSON.parse(data);
                    
                    if (data == ''){
                        resPage.write("does not exist");
                        resPage.end();
                        return ;
                    }
                    
                    value.push(data);
                    // storing and displaying at the same time
                    console.log("value"+value)
                    update(client,dbName,coll_name,value[0],{id:hotelId},"set").catch(console.dir);
                    resPage.write(JSON.stringify(value));
                    resPage.end();
                })
            })

        }
    })
    
  };


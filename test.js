/**
 * Created by abdullah321 on 2/14/2017.
 */
/**
 * Created by abdullah321 on 12/10/2016.
 */
var express=require("express");
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient,
    test = require('assert');
var url = 'mongodb://abdullah321456:poiuytrewq0987654321@ds131878.mlab.com:31878/myfirstdb';


var result;
var app=express();
var registrationschema;
var registration ;

app.get("/",function(req,res)
{
    res.send("hello world")
})


app.get("/remotemongodb",function(req,res)
{
    MongoClient.connect(url, function(err, db) {
        if(!err)
            res.json({result:'we are connected and schema created successfully'});
        else
            res.json({result:''+err});


    });
    //res.send("hello world")
})


app.get("/usemongo",function(req,res)
{
    configureMongo(res);
})


app.get("/insertinmongo/:username",function(req,res)
{
    var name=req.params.username;
    if(result==='connected')
        insertName(name,res);
    else
        res.send('error occurs while sending');
})


app.get("/details",function(req,res)
{
    res.send("detals")
})

app.get("/showallrecords",function(req,res)
{
    showallregistrations(res);
})

app.get("/adding/:number1/:number2",function(req,res)
{
    var number1 = req.params.number1;
    var number2 = req.params.number2;
    res.send(number1 +"  +  "+number2+" = "+(parseInt(number1)+parseInt(number2)))
})
app.listen(3003)
console.log('Server running at http://localhost:3003/');







function configureMongo(res)
{

    mongoose.connect('mongodb://abdullah321456:poiuytrewq0987654321@ds131878.mlab.com:31878/myfirstdb',function(err,db)
    {
        if(!err) {

            console.log('we are connected');
            registrationschema = new mongoose.Schema({
                firstname:String,
            });
            registration= mongoose.model('testing', registrationschema);
            res.json({result:'we are connected and schema created successfully'});
            result='connected';
        }
        else
        {
            result='notconnected';
            console.log('we are not connected')
            res.json({result:'we are not connected'});
        }
    });
}

function insertName(username,res)
{
    var register=new registration({firstname:username});
    register.save(function(err)
        {
            if(err)
            {
                res.json({error:'error occurs'});
                console.log('error occurs');
            }else
            {
                res.json({success:'data inserted successfully'});
                console.log('data inserted successfully')
            }
        }
    )
}


function showallregistrations(res)
{
    registration.find(function(err,allrecords)
        {
            if(!err)
                res.json({records:allrecords});
            else
                console.log(err);
        }
    );
}

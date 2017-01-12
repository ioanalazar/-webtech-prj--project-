var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var nodeadmin = require('nodeadmin');
var Sequelize = require("sequelize");
var sequelize = new Sequelize('descopera','ioanalazar','',{ dialect: 'mysql', port: 15454});
app.use(bodyParser.json());
app.use(cors());
app.use(nodeadmin(app));

var Zone = sequelize.define('zone', {
    id: { type: Sequelize.INTEGER, field:'id', primaryKey:true, autoIncrement: true},
    nume: { type: Sequelize.STRING , field: 'nume' },
    adresa: { type: Sequelize.STRING, field: 'adresa'},
    url: {type: Sequelize.STRING, field: 'url'}},
    { freezeTableName:false, });

var Cazare = sequelize.define('cazare', {
    id: { type: Sequelize.INTEGER, field:'id'},
    nume: { type: Sequelize.STRING , field: 'nume' },
    capacitate: {type: Sequelize.INTEGER, field: 'capacitate'},
    adresa: { type: Sequelize.STRING, field: 'adresa'},
    url: {type: Sequelize.STRING, field: 'url'},
    id_c: { type: Sequelize.INTEGER, field:'id_c', primaryKey:true, autoIncrement: true}},
    { freezeTableName:false, });
    Cazare.belongsTo(Zone,{foreignKey: 'id'});
    Cazare.hasOne(Zone, {foreignKey: 'id'});
    
app.get('/descopera',function(req,res){
    res.status(200).send([]);
});

app.post('/zone',function(req,res){
    Zone.create(req.body)
    .then(function(zona){
         Zone.findById(zona.id)
    .then(function(zona)
    {
        res.status(201).send(zona);
    });
    });
   
});

app.get('/zone',function(req,res){
    Zone.findAll().then(function(zona)
    {
        res.status(200).send(zona);
    });
});

app.get('/zone/:id',function(req,res){
    Zone.findById(req.params.id).then(function(zona)
    {
        if(zona){
        res.status(200).send(zona);}
        else{
            res.status(404).send();
        }
        });
    });

app.put('/zone/:id',function(req,res){
    Zone.findById(req.params.id).then(function(zona)
    {
        if(zona){
            zona.updateAttributes(req.body)
            .then(function(){
                 res.status(200).send('actualizat');})
                 .catch(function(error){
                     console.warm(error);
                     res.status(500).send('error');});
                     
                 }
                 else {
                     res.status(404).send();
                 } 
        
    });
    
});
                 
                 
   
app.listen(process.env.PORT);

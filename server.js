
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql=require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port:'5700',
    database: 'BridgeSurvey'
});
 

// connect to database
mc.connect();
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

app.get('/sistem', function (req, res) {
    mc.query('SELECT * FROM sistem', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'sistem list.' });
    });
});
app.get('/komponen', function (req, res) {
    mc.query('SELECT * FROM komponen', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'komponen list.' });
    });
});

app.get('/subkomponen', function (req, res) {
    mc.query('SELECT * FROM subKomponen', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'komponen list.' });
    });
});
app.get('/siskom',function(req,res){
    let siskom=req.params.siskom;
    mc.query('select sistem.sistem_name, komponen.komponen_name from sistem inner join komponen on komponen.sistem_id=sistem.sistem_id;',siskom,function(error,results,fields){
        if(error)throw error;
        return res.send({error:false, data:results, message:'Sistem List.'});
    });
});

app.get('/siskomsub',function(req,res){
    let siskomsub=req.params.siskomsub;
    mc.query('select subKomponen.subKomponen_name, komponen.komponen_name,sistem.sistem_name from ((sistem inner join komponen on komponen.sistem_id=sistem.sistem_id) inner join subKomponen on subKomponen.komponen_id=komponen.komponen_id);',siskomsub,function(error,results,fields){
        if(error)throw error;
        return res.send({error:false, data:results, message:'Sistem List.'});
    });
});

/*Untuk Mendapatkan suatu nilai berdasar id 
*/
app.get('/sistem/:id', function(req, res){
    let sistem_id=req.params.id;

    if(!sistem_id){
        return res.status(400).send({error:true,message:'Please check your id'});
    }
    mc.query('SELECT * FROM sistem where sistem_id=?', sistem_id,function(error,results,fields){
        if(error) throw error;
        return res.send({error:false, data:results[0], message:'Sistem List.'});

    });
});
app.get('/komponen/:id', function(req, res){
    let komponen_id=req.params.id;

    if(!komponen_id){
        return res.status(400).send({error:true,message:'Please check your id'});
    }
    mc.query('SELECT * FROM komponen where komponen_id=?', komponen_id,function(error,results,fields){
        if(error) throw error;
        return res.send({error:false, data:results[0], message:'komponen_id List.'});

    });
});

app.get('/subkomponen/:id', function(req, res){
    let subKomponen_id=req.params.id;

    if(!subKomponen_id){
        return res.status(400).send({error:true,message:'Please check your id'});
    }
    mc.query('SELECT * FROM subKomponen where subKomponen_id=?', subKomponen_id,function(error,results,fields){
        if(error) throw error;
        return res.send({error:false, data:results[0], message:'subkomponen_id List.'});

    });
});
/*=====================================================*/

app.get('/sistem/search/:keyword', function(req, res){
    let keyword=req.params.keyword;

    mc.query('SELECT * FROM sistem where sistem_name LIKE ?', ['%' + keyword + '%'],function(error,results,fields){
        if(error) throw error;
        return res.send({error:false, data:results, message:'Sistem List.'});

    });
});

app.post('/todo', function (req, res) {
 
    let sistem = req.body.sistem;
 
    if (!sistem) {
        return res.status(400).send({ error:true, message: 'Please provide task' });
    }
 
    mc.query("INSERT INTO sistem SET ? ", { sistem: sistem }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});
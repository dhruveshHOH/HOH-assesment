const sql = require('mysql')
const mongoClient = require('mongodb').MongoClient;
const moongoose = require('mongoose')
const mongoDbUrl = 'mongodb://127.0.0.1:27017/users';



let mongodb;

const PORT = 3000

function connect(app){
    moongoose.connect(mongoDbUrl,{useNewUrlParser: true}, (err, db) => {
        if(err){
            throw err
        }
        mongodb = db.db('users');
        
        console.log("Connected To DataBase Sucessfully")
        app.listen(PORT, function (){
            console.log(`Listening To Port`,PORT);
        });
    });
}
function get(){
    return mongodb;
}


module.exports = {
    connect,
    get
};
// const sqldb=sql.createConnection({
//     host:"localhost",
//     user:'root',
//     password:'',
//     database:"edf",

// })

// module.exports= {
//     sqls : sqldb,
//     connect : ()=>{
//         sqldb.connect((err)=>{
//             if(err) throw err
//             console.log("connection secured")
//         })
//     }
// }
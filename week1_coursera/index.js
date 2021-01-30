const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter')

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter)

//=======================================================

// app.get("/dishes/:dishId", (req,
//                             res,
//                             next) => {
//     res.end('Will send details of the dish: ' + req.params.dishId);
// });
//
// app.post('/dishes/:dishId', (req,
//                              res,
//                              next)=>{
//     res.statusCode = 403; //not supported
//     res.end("Post operation not supported on dish");
// });
//
// app.put('/dishes/:dishId', (req,
//                             res,
//                             next)=>{
//     res.write('Updating the dish: ' + req.params.dishId + "\n")
//     res.end("will update the dish" + req.body.name +
//         " with details: " + req.body.description);
// });
//
// app.delete('/dishes/:dishId', (req,
//                                res,
//                                next) => {
//     res.end('Deleting dish: ' + req.params.dishId);
// });

//====================================================================

app.use(express.static(__dirname+ '/public'))

app.use((req,
         res,
         next) => {

   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/html');
   res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}`);
});




//PART2

// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const hostname = 'localhost';
// const port = 3000;
//
// const server = http.createServer((req,res) => {
//     console.log("Request for "+ req.url + " by method "+ req.method);
//     console.log("==============================");
//
//     if (req.method === 'GET'){
//         let fileUrl;
//         if(req.url === '/') fileUrl='/index.html';
//         else fileUrl = req.url;
//
//         let filePath = path.resolve('./public'+fileUrl);
//         const fileExt = path.extname(filePath);
//         if (fileExt ===".html"){
//             fs.exists(filePath, (exists => {
//                 if (!exists){
//                     res.statusCode = 404;
//                     res.setHeader('Content-Type','text/html');
//                     res.end('<html><body><h1>Error 404:'+fileUrl +' not found</h1></body></html>')
//                     return;
//                 }
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type','text/html');
//                 fs.createReadStream(filePath).pipe(res);
//             }))
//         }
//         else{
//             res.statusCode = 404;
//             res.setHeader('Content-Type','text/html');
//             res.end('<html><body><h1>Error 404:'+fileUrl +' not html file</h1></body></html>')
//             return;
//         }
//     }
//     else{
//         res.statusCode = 404;
//         res.setHeader('Content-Type','text/html');
//         res.end('<html><body><h1>Error 404:'+req.method +' not supported</h1></body></html>')
//         return;
//     }
// });
//
// server.listen(port, hostname, ()=>{
//     console.log(`Server running at http://${hostname}:${port}`);
// });









//PART1

// let rect = {
//     perimeter: (x,y) => (2*(x+y)),
//     area: (x,y) => (x*y)
// };
//
// function solveRect(l,b){
//     console.log("solving for rectangle with l= "+l+" and b = "+b);
//     if (l<=0 || b<=0){
//         console.log("dimensions should be grater than 0");
//     }
//     else{
//         console.log("Area: " + rect.area(l,b));
//         console.log("Perimeter: " + rect.perimeter(l,b));
//     }
// }
//
// solveRect(2,4);
// solveRect(3 ,5);
// solveRect(0,5);
// solveRect(-3,5);
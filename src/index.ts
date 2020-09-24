import app from "./app";

const port = Number(process.env.PORT);
const host = 'creatiview.be'

let server;
if(process.env.NODE_ENV !== 'production'){
    server = app.listen(port, host,()=>{
        console.log(`Server is up and running at http://${host}:${port}/!`);
    });
}else{
    server = app.listen(process.env.PORT,()=>{
        console.log(`Server is up and running at http://${host}:${port}/!`);
    });
}


export default server;
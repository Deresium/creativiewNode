import app from "./app";

const server = app.listen(process.env.PORT, ()=>{
    console.log('Server is up and running!');
});

export default server;
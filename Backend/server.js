require('dotenv').config();
// Node.js ka HTTP server create karne ke liye
const {createServer} = require('http');

// Socket.IO server ke liye
const {Server} =require('socket.io');


// Express app import kar rahe hain
const app= require('./src/app');

// AI service se function import kar rahe hain
const {getAIResponse} = require('./src/services/ai.service');



// Express app ko HTTP server ke saath attach kar rahe hain
const httpServer = createServer(app);



// HTTP server ke upar Socket.IO server create kar rahe hain
const io = new Server(httpServer,{
    cors:{
        // React/Vite frontend ko connection allow kar rahe hain
        origin:"http:localhost:5173",
        methods:["GET","POST"]
    }
});

//connection event tab chalega jab frontend backend ke Socket.IO server se connect hoga.
// Jab koi user Socket.IO se connect karega
io.on("connection",(socket)=>{
    try{


    console.log(`✅User Connected: ,${socket.id}`);

    //when user is disconnect ===> // Jab user disconnect karega
    socket.on('disconnect',()=>{
        console.log(`❌ User disconnected:${socket.id}`);
    });


 // Frontend se AI message receive karna
    socket.io("ai-message",async (data) => {
       console.log(`Message Received: ${socket.id} ,data.prompt`);
       
       // AI service ko user ka prompt bhejna
       const response = await getAIResponse(data.prompt);


        // AI ka response frontend ko bhej rahe hain
        socket.emit("ai-response",{
            response
        });
    });
    } catch(error){
        console.error("❌ Error processing message:",error);
     // Error hone par frontend ko message bhejna
    socket.emit("ai-response", {
        response:
            "Sorry, I couldn't process your message right now."
    });
    }
   

});


// Server ka port
const PORT=process.env.PORT || 4000;;


// Server start karna
httpServer.listen(PORT,()=>{
    console.log("Server Running at PORT:",PORT);
    console.log(`🌐 Socket.IO server is ready`);
})
import {receivingQueue} from "../zone/zone"

const inputHandler = (socket: any) => {
  socket.on("newuserInput", (userInput: userInput)=>{
    receivingQueue.push(userInput)
  })
}
module.exports = inputHandler;
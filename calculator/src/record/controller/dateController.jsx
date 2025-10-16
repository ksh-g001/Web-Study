export default function getDate(){
    const now = new Date()
    const formatted 
        = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}\n${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    
    return formatted
}
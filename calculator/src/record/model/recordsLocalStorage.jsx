const RECORDS_KEY = "records"

export function clear(){
    localStorage.removeItem(RECORDS_KEY)
}

export function getData(){
    const saved = localStorage.getItem(RECORDS_KEY)
    try{
        return (saved) ? (JSON.parse(saved)) : []
    } catch (e){
        console.error("RecordlocalStorage.jsx Error: ", e)
        clear()
        return []
    }
}

export function setData(newdata){
    localStorage.setItem(RECORDS_KEY, JSON.stringify(newdata))
}
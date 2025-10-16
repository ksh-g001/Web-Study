import { setData, getData } from "../model/recordsLocalStorage";

export function getRecords(){
    return getData()
}

export function saveRecords(newdata){
    setData(newdata)
}
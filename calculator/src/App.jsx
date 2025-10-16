import ResultBox from "./result/view/resultBox"
import InputContainer from "./calculator/view/inputContainer"
import RecordContainer from "./record/view/recordContainer/recordContainer.jsx"
import './App.css'
import { createContext, useState } from "react"
import { useMemo } from "react"

export const ResultContext = createContext({
  result: "",
  setResult: () => { }
})

export const RecordedContext = createContext({
  recorded: "",
  setRecorded: () => { }
})

function App() {
  console.log("App 렌더링")
  const [result, setResult] = useState("")
  const [recorded, setRecorded] = useState("")
  const [count, setCount] = useState(0)
  //const resultContext = { result, setResult }
  //const recordedContext = { recorded, setRecorded }
  const resultContext = useMemo(()=> ({result, setResult}), [result, setResult])
  const recordedContext = useMemo(()=> ({recorded, setRecorded}), [recorded, setRecorded])

  return (
    <div className="whole-screen">
      <ResultContext.Provider value={resultContext}>
        <RecordedContext.Provider value={recordedContext}>
          {/* <button onClick={()=>setCount(prev=>prev+1)}>count:{count}</button> */} {/* 테스트용 */}
          <div className="calculator">
            <ResultBox />
            <InputContainer />
          </div>
          <div className="record">
            <RecordContainer />
          </div>
        </RecordedContext.Provider>
      </ResultContext.Provider>
    </div>
  )

}

export default App

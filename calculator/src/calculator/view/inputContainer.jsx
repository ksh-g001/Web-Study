import './inputContainer.css'
import InputController from '../controller/inputController'
import { useContext, useState, memo } from 'react'
import { ResultContext, RecordedContext} from '../../App'

const ERROR_MESSAGE = "Error: please press C to reset error message for correct calculate"
    

function InputContainer() {
    console.log("InputContainer 렌더링!")
    const {result, setResult} = useContext(ResultContext)
    const {setRecorded} = useContext(RecordedContext)
    const [isError, setIsError] = useState(false)

    function calculate(){
        setResult(prev=> {
            const r = InputController(prev)
            if(r ==="Error" || r===undefined) {
                setIsError(true)
                return ERROR_MESSAGE
            }
            setRecorded(r)
            return r})
    }
    function handleClick(input){
        setResult(prev => prev+input)
    }
    function reset(){
        setResult("")
        setIsError(false)
    }

    return (
        <div className="input-container">
            <button className="input-operator-button" onClick={()=>reset()}>C</button>
            <button className="input-operator-button" disabled={isError} onClick={()=>handleClick("+")}>+</button>
            <button className="input-operator-button" disabled={isError} onClick={()=>handleClick("-")}>-</button>
            <button className="input-operator-button" disabled={isError} onClick={()=>handleClick("*")}>x</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("1")}>1</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("2")}>2</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("3")}>3</button>
            <button className="input-operator-button" disabled={isError} onClick={()=>handleClick("/")}>/</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("4")}>4</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("5")}>5</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("6")}>6</button>
            <button className="input-operator-button" disabled={isError} onClick={()=>calculate()}>=</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("7")}>7</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("8")}>8</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("9")}>9</button>
            <button className="input-num-button" disabled={isError} onClick={()=>handleClick("0")}>0</button>
        </div>
    )
}
export default memo(InputContainer)  //해당 컴포넌트 내부에서 구현한 state나 context가 변할 때만 재렌더링하고 이 외에는 가장 마지막 내용을 재활용
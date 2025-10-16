import './resultBox.css'
import { ResultContext } from '../../App'
import { useContext, memo } from 'react'

function ResultBox(){
    console.log("ResultBox 렌더링!")
    const {result} = useContext(ResultContext)
    
    return(
        <div className="result-box">
            <h2 className="result-text">{result}</h2>
        </div>
    )
}
export default memo(ResultBox)
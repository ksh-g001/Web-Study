import './recordContainer.css'
import { RecordedContext } from '../../../App.jsx'
import { useContext, useEffect, useState, memo } from 'react'
import getDate from '../../controller/dateController.jsx'
import { getRecords, saveRecords } from '../../controller/recordController.jsx'

function RecordContainer() {
    console.log("RecordContainer 렌더링!")
    const { recorded } = useContext(RecordedContext)
    const [records, setRecords] = useState(() => { return getRecords() })

    useEffect(() => {
        if (recorded !== null && recorded !== undefined && recorded !== '') {
            console.log("기록시작 : ", recorded)
            const now = getDate()
            setRecords((prev) => {
                const newRecords = [...prev, { result: recorded, date: now }]
                saveRecords(newRecords)
                return newRecords
            })
        }

    }, [recorded])

    function onHandleDelte(index) {
    setRecords(prev=>{
        const updatedRecords = prev.filter((_, idx) => index !== idx)
        saveRecords(updatedRecords)
        return updatedRecords
    })
}

    return (
        <div className='record-container'>
            <Record records={records} onHandleDelte={onHandleDelte}></Record>
        </div>
    )
}



function Record({ records, onHandleDelte }) {
    console.log("Record 렌더링!")
    
    return (<>
        {
            (records.length > 0) ?
                (records.map((r, i) => (
                    <div key={i} className='record-card'>
                        <div className='record-small-container'>
                            <button className='record-delete-btn' onClick={()=>onHandleDelte(i) }>삭제</button>
                            <p className='record-text'><strong>{r.result}</strong></p>
                        </div>

                        <p className='record-date'>{r.date}</p>
                    </div>

                ))) : (<p className='record-text'>아직 기록이 없습니다.</p>)
        }
    </>

    )
}

export default memo(RecordContainer)
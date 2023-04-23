import React from 'react'

const Message = ({msg,handleMsgClick,win=""}) => {
    return (
        <>
        <div className={`Win ${win}`}></div>
            <div className='letter msg'>
            <p>Dear Player,</p>
            <p className='p'>''{msg}''</p>
            <p>The Guide</p>
            <button onClick={handleMsgClick}>Skip</button>
            </div>
        </>
    )
}

export default Message
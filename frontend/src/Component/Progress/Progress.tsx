// import React from 'react'
import Arrow from '/Icons/arrow.svg'
import './Progress.css'
import MyProgressBar from './MyProgressBar'

type Props = {}

const Progress = ({ }: Props) => {
    return (
        <div className='d-flex flex-column align-items-start ultra-card'>
            <div className='d-flex align-items-start flex-column progress-wrapper'>
                <h2 className='desktop-heading-level-1 desktop-heading-level-1-medium'>Your monthly goal</h2>
                <MyProgressBar />
            </div>
            <a href="" className='link desktop-medium-button d-flex align-items-center'>
                Go to progress tracking
                <img src={Arrow} alt="icon" />
            </a>

        </div>
    )
}

export default Progress
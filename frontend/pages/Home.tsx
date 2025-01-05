// import React from 'react'
import MyCalendar from '../src/Component/MyCalendar/MyCalendar'
import Library from '../src/Component/Library/Library'
import Progress from '../src/Component/Progress/Progress'
import Session from '../src/Component/Session/Session'

type Props = {}

const Home = ({ }: Props) => {
    return (
        <>
            <div className='overflow-y-auto'>
                <div className='d-flex gap-3 main-content flex-column flex-lg-row'>
                    <div className='d-flex flex-column gap-3'>
                        <Progress />
                        <Session />
                    </div>
                    <div className='d-flex flex-column gap-3'>
                        <MyCalendar />
                        <Library />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
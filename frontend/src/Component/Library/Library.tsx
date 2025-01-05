// import React from 'react'
import './Library.css'
import { Link } from 'react-router-dom';


type Props = {}

const Library = ({ }: Props) => {
    return (
        <div className='d-flex flex-column align-items-start ultra-card library'>
            <div className="d-flex flex-column align-items-start library-header">
                <h2 className='desktop-heading-level-2 medium color-typography-primary'>Workout Library</h2>
                <div className="library-tabs-container d-flex align-items-start">
                    <button className="library-tab tag-plan-active tag-m desktop-small regular border-0">
                        Phase II
                    </button>
                    <button className="library-tab tag-routine-active tag-m  desktop-small regular border-0">
                        Shoulders & Arms
                    </button>
                    <button className="library-tab tag-workout-active tag-m desktop-small regular border-0">
                        Dumbell shoulder press
                    </button>
                </div>
            </div>
            <div>
                <Link to="/library">
                    <p className='text-start d-flex align-items-center gap-2 desktop-medium-button semi-bold color-typography-primary'>
                        Check your plans, routines and workouts
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3636 11.4205L11.1932 10.2557L14.6989 6.75568H0V5.0625H14.6989L11.1932 1.55682L12.3636 0.397727L17.875 5.90909L12.3636 11.4205Z" fill="black" />
                        </svg>

                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Library
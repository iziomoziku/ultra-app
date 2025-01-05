import { useState } from 'react'
import { routines } from '../../../data'
// import UpcomingSession from '../../Session/UpcomingSession'
// import Edit from '/Icons/edit.svg'
import Plus from '/Icons/plus.svg'
import { CSSTransition } from 'react-transition-group';

type Props = {
    step: number
    nextStep: () => void
    previousStep: () => void
}


const RoutineFlow = ({ step }: Props) => {

    const [isAddingRoutine, setIsAddingRoutine] = useState(false)


    return (
        <div className='Routine-Flow'>

            {
                step === 2 && (
                    <div className='Plan-Container'>
                        <div className='Routine-Container'>
                            {
                                // <UpcomingSession routine={currentRoutines[0]} list={1} editMode={true} />
                            }
                        </div>
                    </div>
                )
            }
            {
                step === 3 && (
                    <div className='Plan-Container step-overview'>

                        <div className='Routine-Container'>
                            {/* {
                                currentPlans[0].Routines.map((routine, index) => {
                                    return (
                                        <div key={index} className='Routine-Wrapper'>
                                            <div>
                                                <UpcomingSession routine={routine} list={++index} editMode={true} />
                                            </div>
                                        </div>
                                    )
                                })
                            } */}
                        </div>

                        <div className='d-flex flex-column Add-Routine-container'>
                            <button className='border-0 bg-transparent p-0 d-flex align-items-center Add-Routine text-start w-fit' onClick={() => setIsAddingRoutine(!isAddingRoutine)}>
                                <img src={Plus} alt="icon" className={isAddingRoutine ? 'icon-rotated' : 'icon-default'} />
                                Add routine
                            </button>

                            <CSSTransition
                                in={isAddingRoutine}
                                timeout={300}
                                classNames="routine"
                                unmountOnExit
                            >
                                <div className='d-flex flex-wrap Add-Routine-List'>
                                    {routines.map((routine, index) => (
                                        <button key={index} className='border-0 tag-routine-passive desktop-xtra-small regular'>
                                            {routine}
                                        </button>
                                    ))}
                                </div>
                            </CSSTransition>
                        </div>

                        <div className=''>
                            <textarea className='w-100 bg-grey-3 border-0' rows={2} placeholder="Leave notes here |" name="note" id="note"></textarea>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default RoutineFlow
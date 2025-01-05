import { useState } from 'react'
import { currentPlans, routines } from '../../../data'
import UpcomingSession from '../../Session/UpcomingSession'
import Edit from '/Icons/edit.svg'
import Plus from '/Icons/plus.svg'
import { CSSTransition } from 'react-transition-group';
import { Plan, Schedule } from '../../../Interface'
import { v4 as uuidv4 } from 'uuid';




type Props = {
    step: number
    nextStep: () => void
    previousStep: () => void
    plan: Plan
}

const PlanFlow = ({ step, previousStep, plan }: Props) => {

    const [isAddingRoutine, setIsAddingRoutine] = useState(false)

    return (
        <>

            {
                step === 2 && (
                    <div className='Plan-Container'>
                        <div className='d-flex jusfify-content-between'>
                            <h3 className='flex-1 desktop-medium medium typography-secondary'>{plan.name}</h3>
                            <div className='d-flex flex-1 justify-content-end gap-2'>
                                {
                                    plan.Routines.map((routine, index) => <button key={index} className='border-0 justify-content-center d-flex desktop-xtra-small regular tag-plan-passive'>{routine.name}</button>)
                                }
                            </div>
                        </div>
                        <div className='Routine-Container Choose-Routine'>
                            {
                                plan.Routines.map((routine, index) => {

                                    const schedule: Schedule = {
                                        id: uuidv4(),
                                        complete: false,
                                        routine: routine
                                    }

                                    return (
                                        <div key={index} className='Routine-Wrapper'>
                                            <div>
                                                <UpcomingSession schedule={schedule} list={1} editMode={true} type={{ noPlus: true, noEdit: true }} />
                                            </div>
                                            <button className='border-0 d-flex align-items-center text-white w-fit bg-grey-1 add-routine-active'>
                                                <img src={Plus} alt="" />
                                                Add to session
                                            </button>
                                            {/* <button className='border-0 d-flex align-items-center text-white w-fit bg-grey-1 add-routine'>Added</button> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
            {
                step === 3 && (
                    <div className='Plan-Container step-overview'>
                        <div className='d-flex jusfify-content-between'>
                            <div className='d-flex justify-content-start gap-2'>
                                <button className='border-0 justify-content-center d-flex desktop-xtra-small regular tag-plan-active align-items-center'>Phase II</button>
                                <button className='border-0 justify-content-center d-flex desktop-xtra-small regular tag-plan-passive'>Shoulders</button>
                                <button className='border-0 justify-content-center d-flex desktop-xtra-small regular tag-plan-passive'>Chest</button>
                            </div>
                            <button className='d-flex align-items-center  justify-content-end gap-1 border-0 bg-transparent' onClick={previousStep}>
                                <img src={Edit} alt="icon" />
                            </button>
                        </div>
                        <div className='Routine-Container'>
                            {
                                currentPlans[0].Routines.map((routine, index) => {

                                    const schedule: Schedule = {
                                        id: uuidv4(),
                                        complete: false,
                                        routine: routine
                                    }

                                    return (
                                        <div key={index} className='Routine-Wrapper'>
                                            <div>
                                                <UpcomingSession schedule={schedule} list={++index} editMode={true} type={{ noPlus: true, noEdit: true }} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='d-flex flex-column Add-Routine-container'>
                            <button className='border-0 bg-transparent p-0 d-flex align-items-center Add-Routine text-start w-fit' onClick={() => setIsAddingRoutine(!isAddingRoutine)}>
                                <img src={Plus} alt="icon" className={isAddingRoutine ? 'icon-rotated' : 'icon-default'} />
                                Add seperate routine
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

                        {/* <div className=''>
                            <textarea className='w-100 bg-grey-3 border-0' rows={2} placeholder="Leave notes here |" name="note" id="note"></textarea>
                        </div> */}
                    </div>
                )
            }

        </>
    )
}

export default PlanFlow
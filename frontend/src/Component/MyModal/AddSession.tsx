// import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MyModal.css'
import { useState } from 'react';
import PlanFlow from './AddSessionFlow/PlanFlow';
import RoutineFlow from './AddSessionFlow/RoutineFlow';
import { Plan, Routine } from '../../Interface';
import { useMainContext } from '../../Context/mainContext';


interface MyEvent {
    title: string;
    start: Date;
    end: Date;
}


type Props = {
    show: boolean
    onHide: () => void
    // modalType: 'editSession' | 'viewSession'
    // event?: Event
    event?: MyEvent
}


const AddSession = ({ show, onHide, event }: Props) => {

    const { Plans, Routine } = useMainContext()
    const [step, setStep] = useState(1);
    const [entity, setEntity] = useState<Plan | Routine>(Plans[0])

    // Navigate to the next step
    const goToNextStep = () => setStep((prevStep) => prevStep + 1);

    // Navigate to the previous step
    const goToPreviousStep = () => setStep((prevStep) => prevStep - 1);

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='addSession'
        >
            <Modal.Header closeButton className='p-0 border-0'>
                <Modal.Title id="contained-modal-title-vcenter" className='p-0'>
                    {
                        new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(event?.start)
                    }
                </Modal.Title>
            </Modal.Header>



            <Modal.Body className='p-0 border-0 d-flex flex-column justify-content-start'>
                {
                    step === 1 && (
                        <div className='step-choose-preset d-flex flex-column'>
                            <div className='d-flex flex-column plans-to-add'>
                                <h3 className='desktop-medium medium color-typography-secondary'>Choose plans to find routine presets</h3>
                                <div className='d-flex gap-2 flex-wrap'>
                                    {
                                        Plans.map((plan, index) => {
                                            return <button
                                                key={index}
                                                className={`border-0 d-flex align-items-center justify-content-center d-flex desktop-xtra-small regular ${entity.type === 'Plan' && entity.id === plan.id
                                                    ? 'tag-plan-active'
                                                    : 'tag-plan-passive'
                                                    }`}
                                                onClick={() => setEntity(plan)}
                                            >
                                                {plan.name}
                                            </button>
                                        })
                                    }
                                </div>
                            </div>

                            <div className='routines-to-add d-flex flex-column'>
                                <h3 className='desktop-medium medium color-typography-secondary'>Or add routines</h3>
                                <div className='d-flex gap-8 flex-wrap'>
                                    {
                                        Routine.map((routine, index) => {
                                            return <button key={index}
                                                className={`border-0 d-flex align-items-center justify-content-center d-flex desktop-xtra-small regular 
                                                    ${entity.type === 'Routine' && entity.id === routine.id
                                                        ? 'tag-routine-active'
                                                        : 'tag-routine-passive'
                                                    }`}
                                                onClick={() => setEntity(routine)}>{routine.name}</button>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    entity.type === 'Plan'
                        ? (<PlanFlow plan={entity} step={step} nextStep={goToNextStep} previousStep={goToPreviousStep} />)
                        : (<RoutineFlow step={step} nextStep={goToNextStep} previousStep={goToPreviousStep} />)
                }

            </Modal.Body>


            <Modal.Footer className='border-0 d-flex m-0 p-0'>
                {step === 1 &&

                    (<>
                        <Button className='flex-1 button-default  desktop-medium medium m-0'>Discard</Button>
                        <Button className='flex-1 button-varriant-2 desktop-medium medium ' onClick={goToNextStep}>
                            Next
                            <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3956 12.7365L13.245 11.5923L17.2401 7.60369H0.25V5.94176H17.2401L13.245 1.94673L14.3956 0.808948L20.3594 6.77273L14.3956 12.7365Z" fill="#383838" />
                            </svg>
                        </Button>
                    </>)

                }

                {step === 2 &&

                    (<>
                        <Button className='flex-1 button-default  desktop-medium medium' onClick={goToPreviousStep}>Go Back</Button>
                        <Button className='flex-1 button-varriant-2 desktop-medium medium' onClick={goToNextStep}>
                            Next
                            <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3956 12.7365L13.245 11.5923L17.2401 7.60369H0.25V5.94176H17.2401L13.245 1.94673L14.3956 0.808948L20.3594 6.77273L14.3956 12.7365Z" fill="#383838" />
                            </svg>
                        </Button>
                    </>)
                }

                {step === 3 &&

                    (<>
                        <Button className='flex-1 button-default  desktop-medium medium' onClick={goToPreviousStep}>Go Back</Button>
                        <Button className='flex-1 button-varriant-2 desktop-medium medium'>
                            Save
                        </Button>
                    </>)
                }
            </Modal.Footer>


        </Modal >
    )
}

export default AddSession
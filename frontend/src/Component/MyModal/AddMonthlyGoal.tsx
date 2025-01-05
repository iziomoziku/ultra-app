import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MyModal.css'
import Plus from '/Icons/plus.svg'
import Chevron from '../SVG/Chevron';
// import { routines, currentRoutines, currentPlans } from '../../data';
import { useState } from 'react';
// import { CSSTransition } from 'react-transition-group';
// import UpcomingSession from '../Session/UpcomingSession';
// import Edit from '/Icons/edit.svg'
// import PlanFlow from './AddSessionFlow/PlanFlow';
// import RoutineFlow from './AddSessionFlow/RoutineFlow';
// import { months } from 'moment';
// import { spread } from 'axios';


interface DropDown {
    data: string[],
    defaultValue: string
}

const DropDown = ({ data, defaultValue }: DropDown) => {

    const [dropDown, setDropDown] = useState(true)


    return (
        <div className={`position-relative w-fit ${dropDown && 'drop-down-active'} border-0`} onClick={() => setDropDown(!dropDown)}>
            <div className='d-flex flex-column position-absolute drop-down-month-select w-fit '>
                <div className='d-flex align-items-center gap-2'>
                    <p className='desktop-small medium color-grey-1'>
                        {defaultValue}
                    </p>
                    <Chevron />
                </div>
                <div className='flex-column w-fit drop-down-month'>
                    {
                        data.map((m, i) => <span key={i} onClick={() => setDropDown(true)}>{m}</span>)
                    }
                </div>
            </div>

        </div>
    )
}

type Props = {
    show: boolean
    onHide: () => void
}


const AddMonthlyGoal = ({ show, onHide }: Props) => {

    // const [dropDown, setDropDown] = useState(true)
    // const [goal, setGoal] = useState({
    //     month: 'December',
    //     goal_number: '',
    //     goal_desc: '',
    // })


    const months = [
        'January',
        'Feburary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'Decmber',
    ]

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='addSession'
        >
            <Modal.Header closeButton className='p-0 border-0'>
                <Modal.Title id="contained-modal-title-vcenter" className='p-0'>
                    <h4 className='m-0 p-0'>New monthly goal</h4>
                </Modal.Title>
            </Modal.Header>


            <Modal.Body className='p-0 border-0 d-flex flex-column justify-content-start'>
                <fieldset className='d-flex justify-content-between'>
                    <label htmlFor="">Month</label>
                    <DropDown data={months} defaultValue={'December'} />
                </fieldset>
                <fieldset className='d-flex justify-content-between fieldset-goal' >
                    <label htmlFor="">Goal</label>
                    <div className='w-fit d-flex gap-8'>
                        <input type="number" placeholder='15' className='target-number' />
                        <input type="text" placeholder='puhs-ups' className='target-desc' />
                    </div>
                </fieldset>
                <div>

                    <button className="border-0 bg-transparent align-items-center gap-2 d-flex m-0 p-0 text-start desktop-small medium add-monthly-goal-button">
                        <img src={Plus} alt="icon" />
                        Add frequency
                    </button>
                    <fieldset className='d-flex position-relative'>
                        <label htmlFor="">Frequency</label>
                        <div className='d-flex align-items-center'>
                            <div className='d-flex w-fit'>
                                <input type="text" name="" id="" placeholder='3' />
                                <span>times per</span>
                                <div className='position-relative'>
                                    <select name="" id="">
                                        <option value="">Week</option>
                                        <option value="">Month</option>
                                    </select>
                                    {/* <DropDown data={['Week', 'Month']} defaultValue={'Week'} /> */}
                                </div>
                            </div>
                            <div className='d-flex'>
                                <span>or</span>
                                <button className='border-0 bg-transparent'>everyday</button>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className=''>
                    <textarea className='w-100 bg-grey-3 border-0' rows={2} placeholder="Leave notes here |" name="note" id="note"></textarea>
                </div>
            </Modal.Body>


            <Modal.Footer className='border-0 d-flex m-0 p-0'>
                <Button className='flex-1 button-default  desktop-medium medium'>Discard</Button>
                <Button className='flex-1 button-varriant-2 desktop-medium medium'>
                    Add Goal
                </Button>
            </Modal.Footer>


        </Modal >
    )
}

export default AddMonthlyGoal
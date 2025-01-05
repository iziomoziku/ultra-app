// import React from 'react'
import Edit from '/Icons/edit.svg'
import "./Session.css"
import Check from '/Icons/check.svg'
import Close from '/Icons/close.svg'
import EditSessionModal from '../MyModal/EditSessionModal'
import UpcomingSession from '../Session/UpcomingSession';
import { useMainContext } from '../../Context/mainContext'




type Props = {}

const Session = ({ }: Props) => {
    // const [modalShow, setModalShow] = useState(false);
    const { schedule, UpcomingSessionModal, setUpcomingSessionModal, completeRoutine } = useMainContext()

    return (
        <div className='d-flex flex-column align-items-start ultra-card session'>
            <div className='d-flex align-items-start flex-column w-100'>
                <div className='w-100 schedule-top d-flex flex-column'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className='desktop-heading-level-1 desktop-heading-level-1-medium flex-1 text-start'>Upcoming Session</h2>
                        <button className='d-flex align-items-center w-fit justify-content-end gap-1 border-0 bg-transparent' onClick={() => setUpcomingSessionModal(true)}>
                            <img src={Edit} alt="icon" />
                            <span>Edit</span>
                        </button>
                    </div>

                    <div className='d-flex align-items-center gap-1 color-typography-additional'>
                        <span className='desktop-xtra-small medium'>Nov 22</span>
                        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2.5" r="2" fill="#696969" />
                        </svg>
                        <span className='desktop-xtra-small regular'>3 routines,</span>
                        <span className='desktop-xtra-small regular'>10 workouts in total</span>
                    </div>
                </div>
            </div>

            <div className='bg-white session-content'>
                <div className='session-list d-flex flex-column'>
                    {
                        schedule.map((item, index) => {
                            return (
                                <UpcomingSession key={index} schedule={item} list={++index} editMode={false} type={{}} />
                            )
                        })
                    }
                </div>
            </div>

            <div className=''>
                <textarea className='w-100 bg-grey-3 border-0' rows={4} placeholder="Leave notes here |" name="note" id="note"></textarea>
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <p className='text-start flex-1 color-typography-secondary desktop-small medium'>Did you contribute to your monthly goal?</p>
                <div className='w-fit text-end d-flex justify-content-end monthly-goal-buttons'>
                    <button className="button-small d-flex bg-white border-0 color-typography-on-light-bg-body-primary mr-2" type="button" onClick={() => completeRoutine(schedule[0])}>
                        <img src={Check} alt="icon" />
                        Yes</button>
                    <button className="button-small d-flex bg-white border-0 color-typography-on-light-bg-body-primary" type="button">
                        <img src={Close} alt="icon" />
                        No
                    </button>
                </div>
            </div>



            <EditSessionModal
                show={UpcomingSessionModal}
                onHide={() => setUpcomingSessionModal(false)}
                modalType="editSession" />

        </div>
    )
}

export default Session
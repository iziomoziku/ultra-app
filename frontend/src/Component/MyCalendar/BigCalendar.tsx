import { FC, useState } from 'react';
import './MyCalendar.css'
// import { MyEvents } from '../../data';
import { Calendar, DateHeaderProps, momentLocalizer, } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import CalendarToolbar from './CalendarToolbar';
import EditSessionModal from '../MyModal/EditSessionModal';
import AddSession from '../MyModal/AddSession';
import { useMainContext } from '../../Context/mainContext';
import { Event } from '../../Interface';
// import { v4 as uuidv4 } from 'uuid';

const localizer = momentLocalizer(moment);


// type Props = {}

// interface MyEvent {
//     title: string;
//     start: Date;
//     end: Date;
// }

interface CustomEventProps {
    event: Event;
}


const BigCalendar = () => {

    // const [events] = useState(MyEvents)

    const { Events, calendarEventModal, setCalendarEventModal } = useMainContext()
    const [currentSession, setCurrentSession] = useState<Event>()
    const [sessionModal, addSessionModal] = useState(false);


    const DateHeader: FC<DateHeaderProps> = ({ label }) => {

        return (
            <div>
                {label}
            </div>
        );
    };


    /**
     * Custom event
     * @param param0 
     * @returns 
     */

    const CustomEvent = ({ event }: CustomEventProps) => {

        return (
            <div className="custom-event d-flex align-items-center justify-content-between" onClick={() => viewPastSession(event)}>
                <p>
                    {event.title}
                </p>
                <span>
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0383 9.58397L10.1434 8.69406L13.2506 5.59179H0.0361328V4.29917H13.2506L10.1434 1.19193L11.0383 0.306984L15.6768 4.94548L11.0383 9.58397Z" fill="#696969" />
                    </svg>
                </span>
            </div>
        );
    };


    const viewPastSession = (event: Event) => {
        setCurrentSession(event)
        setCalendarEventModal(true)
        console.log(event)
    }


    return (
        <div className='bigcalendar'>
            <Calendar
                localizer={localizer}
                events={Events}
                selectable={true}
                defaultView="month"
                views={['month']}
                components={{
                    toolbar: CalendarToolbar,  // your custom toolbar
                    month: {
                        dateHeader: DateHeader   // use your custom date header here
                    },
                    event: CustomEvent,
                    // dateCellWrapper: CustomDateCell
                    // dateCellWrapper: CustomDateCellWrapper
                }}
                formats={{
                    weekdayFormat: 'dd', // "Mo"
                    dateFormat: 'D'      // "1" instead of "01"
                }}
                onSelectSlot={() => {
                    // addSessionModal(true)
                }}

            />

            <EditSessionModal
                show={calendarEventModal}
                onHide={() => setCalendarEventModal(false)}
                modalType="viewSession"
                event={currentSession} />

            <AddSession
                show={sessionModal}
                onHide={() => addSessionModal(false)}
                event={currentSession}
            />
        </div>
    )
}

export default BigCalendar
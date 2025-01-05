// import React from 'react'
import { FC } from 'react';
import Arrow from '/Icons/arrow.svg'
import './MyCalendar.css'
// import { MyEvents } from '../../data';

import { Calendar, DateHeaderProps, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import CalendarToolbar from './CalendarToolbar';
import { useMainContext } from '../../Context/mainContext';
import { Link } from 'react-router-dom';
const localizer = momentLocalizer(moment);


interface Props { }



const MyCalendar = ({ }: Props) => {
    const { Events } = useMainContext()


    const DateHeader: FC<DateHeaderProps> = ({ label, date }) => {
        // Check if this date has an event using Moment
        const hasEvent = Events.some(e =>
            moment(e.start).isSame(moment(date), 'day')
        );

        return (
            <div style={{ color: hasEvent ? 'rgba(224, 108, 20, 1)' : 'inherit' }}>
                {label}
            </div>
        );
    };
    return (
        <div className='d-flex flex-column align-items-start ultra-card calendar mycalendar'>
            <h2 className='desktop-heading-level-1 desktop-heading-level-1-medium flex-1 text-start'>Session Planner</h2>
            <div className='d-flex flex-column react-calendar'>
                <div className='d-flex react-calendar-container'>
                    <div className='flex-1 react-calendar-wrapper'>
                        {/* <Calendar onChange={onChange} value={value} /> */}
                        <Calendar
                            localizer={localizer}
                            events={Events}
                            defaultView="month"
                            views={['month']}
                            components={{
                                toolbar: CalendarToolbar,  // your custom toolbar
                                month: {
                                    dateHeader: DateHeader   // use your custom date header here
                                }
                            }}
                            formats={{
                                weekdayFormat: 'dd', // "Mo"
                                dateFormat: 'D'      // "1" instead of "01"
                            }}

                        />
                    </div>
                    <div className='d-flex flex-column calendar-previous-sesssion-container'>
                        <div className='d-flex flex-column bg-white  align-items-start calendar-container flex-1'>
                            <h3 className='text-start desktop-large medium color-typography-on-light-bg-subheading'>12</h3>
                            <p className='text-start desktop-xtra-small color-typography-secondary'>
                                sessions completed this month
                            </p>
                        </div>

                        <div className='d-flex flex-column bg-white align-items-start calendar-container flex-1'>
                            <div className='calendar-container-top'>
                                <h3 className='text-start desktop-heading-level-2 medium color-typography-on-light-bg-subheading'>Nov 21</h3>
                                <p className='text-start desktop-xtra-small color-typography-secondary'>
                                    previous session overview
                                </p>
                            </div>
                            <div className='d-flex flex-column  align-items-start calendar-container-bottom'>
                                <img src={Arrow} alt="icon" />
                            </div>
                        </div>

                        <div className='d-flex flex-column bg-white   align-items-start calendar-container flex-1'>
                            <div className='calendar-container-top'>
                                <h3 className='text-start desktop-heading-level-2 medium color-typography-on-light-bg-subheading'>Nov 24</h3>
                                <p className='text-start desktop-xtra-small color-typography-secondary'>
                                    upcoming session details
                                </p>
                            </div>
                            <div className='d-flex flex-column  align-items-start calendar-container-bottom'>
                                <img src={Arrow} alt="icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/planner">
                    <p className='link desktop-medium-button d-flex align-items-center'>
                        Expand calendar
                        <img src={Arrow} alt="icon" />
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default MyCalendar


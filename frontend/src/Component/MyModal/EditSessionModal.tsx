// import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MyModal.css'
import Plus from '/Icons/plus.svg'
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import UpcomingSession from '../Session/UpcomingSession';
import { useMainContext } from '../../Context/mainContext';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Event } from '../../Interface';

const SortableSession = ({ id, schedule, list, editMode }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className='d-flex gap-2'>
            {
                editMode &&
                (
                    <div {...attributes} {...listeners} className="drag-handle w-fit">
                        <span>⠿</span>
                    </div>
                )
            }

            <UpcomingSession schedule={schedule} list={list} editMode={editMode} type={{}} />
        </div>
    );
};

// interface MyEvent {
//     title: string;
//     start: Date;
//     end: Date;
// }


type Props = {
    show: boolean
    onHide: () => void
    modalType: 'editSession' | 'viewSession'
    // event?: MyEvent
    event?: Event
}




const EditSession = ({ show, onHide, modalType, event }: Props) => {
    const { schedule, Routine, addRoutineToSchedule, setSchedule } = useMainContext()
    const [isAddingRoutine, setIsAddingRoutine] = useState(false)

    // Sensors for drag-and-drop interactions
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    // Handle reordering logic
    const handleDragEnd = ({ active, over }: any) => {
        if (active.id !== over.id) {
            const oldIndex = schedule.findIndex((item) => item.id === active.id);
            const newIndex = schedule.findIndex((item) => item.id === over.id);
            const reorderedSchedule = arrayMove(schedule, oldIndex, newIndex);
            setSchedule(reorderedSchedule);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='p-0 border-0'>
                <Modal.Title id="contained-modal-title-vcenter" className='p-0'>
                    {
                        modalType === 'editSession'
                            ? 'Upcoming Session'
                            : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(event?.start)
                    }

                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='p-0 border-0 d-flex flex-column justify-content-start'>

                <div className="bg-white session-content p-0">
                    <div className='session-list d-flex flex-column'>


                        {
                            event
                                ? event.schedule && <UpcomingSession schedule={event.schedule} list={1} editMode={true} type={{ noTrash: true, noPlus: true }} />
                                : (
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <SortableContext
                                            items={schedule.map((item) => item.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {schedule.map((item, index) => (
                                                <SortableSession
                                                    key={item.id}
                                                    id={item.id}
                                                    schedule={item}
                                                    list={index + 1}
                                                    editMode={!event}
                                                />
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                )
                        }

                    </div>
                </div>

                {
                    !event &&
                    (
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
                                <div className='d-flex flex-wrap gap-1 Add-Routine-List'>
                                    {Routine.map((routine, index) => {

                                        // const isInSession = schedule.find(r => r.id === routine.id)
                                        return (<button key={index} className={`border-0 tag-routine-passive d-flex align-items-center desktop-xtra-small regular`} onClick={() => addRoutineToSchedule(routine)} >
                                            {routine.name}
                                        </button>)
                                    })}
                                </div>
                            </CSSTransition>
                        </div>
                    )
                }


            </Modal.Body >

            {/* <div className=''>
                <textarea className='w-100 bg-grey-3 border-0' rows={2} placeholder="Leave notes here |" name="note" id="note"></textarea>
            </div> */}
            {
                !event &&
                (
                    <Modal.Footer className='border-0 d-flex m-0 p-0'>
                        <Button className='flex-1 button-default  desktop-medium medium'>Discard</Button>
                        <Button className='flex-1 button-varriant-2 desktop-medium medium' onClick={onHide}>Save</Button>
                    </Modal.Footer>
                )
            }

        </Modal >
    )
}

export default EditSession
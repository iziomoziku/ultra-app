import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Plus from "/Icons/plus.svg";
import Trash from "/Icons/trash.svg";
// import { currentExercises } from "../../data";
import { Exercise, Schedule } from "../../Interface";
import EditWorkoutModal from "../MyModal/EditWorkoutModal";
import { useMainContext } from "../../Context/mainContext";

interface Props {
  schedule: Schedule;
  editMode: boolean;
  list: number;
  type: {
    noPlus?: boolean; // Toggles the Plus button
    noTrash?: boolean; // Toggles the Trash button
    noEdit?: boolean; // Toggles the Edit button
    noExerciseStat?: boolean; // Toggles the Exercise-stat-container div
  };
}

const UpcomingSession = ({ schedule, editMode, list, type }: Props) => {
  const {
    Exercises,
    getExercise,
    deleteSchedule,
    addExerciseToSchedule,
    UpcomingSessionModal,
    calendarEventModal,
  } = useMainContext();

  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise>(
    schedule.exercises[0]
  );

  // console.log("schedule", schedule);

  const handleEditWorkout = async (id: string) => {
    const exercise = await getExercise(id);

    if (!exercise) return;
    console.log("called me", exercise);

    setModalShow(true);
    setExerciseToEdit(exercise);
  };

  if (schedule.exercises.length === 0) return;
  if (schedule.exercises.length === null) return;

  return (
    <>
      <div className="Routine text-start d-flex flex-column">
        <div className="d-flex flex-column Routine-wrapper-top">
          <div className="d-flex justify-content-between">
            <div className="flex-1 d-flex gap-1">
              <span className="Routine-title Routine-title-number text-black semi-bold desktop-medium">
                {list}.
              </span>
              <span className="Routine-title Routine-title-name text-black semi-bold desktop-medium">
                {schedule.routine.name}
              </span>
            </div>
            {editMode && (
              <>
                {/* <div className='flex-1 d-flex justify-content-end Routine-add-delete-container'>
                                        <button className='border-0 bg-transparent Routine-add' onClick={() => setIsAddingWorkout(!isAddingWorkout)}>
                                            <img src={Plus} alt="icon" className={isAddingWorkout ? 'icon-rotated' : 'icon-default'} />
                                        </button>
                                        <button className='border-0 bg-transparent Routine-delete' onClick={() => removeRoutineFromSchedule(schedule.id)}>
                                            <img src={Trash} alt="icon" />
                                        </button>
                                    </div> */}

                <div className="flex-1 d-flex justify-content-end Routine-add-delete-container">
                  {!type.noPlus && (
                    <button
                      className="border-0 bg-transparent Routine-add"
                      onClick={() => setIsAddingWorkout(!isAddingWorkout)}
                    >
                      <img
                        src={Plus}
                        alt="icon"
                        className={
                          isAddingWorkout ? "icon-rotated" : "icon-default"
                        }
                      />
                    </button>
                  )}
                  {!type.noTrash && (
                    <button
                      className="border-0 bg-transparent Routine-delete"
                      //   onClick={() => removeRoutineFromSchedule(schedule.id)}
                      onClick={() => deleteSchedule(schedule.id)}
                    >
                      <img src={Trash} alt="icon" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {editMode && (
            <CSSTransition
              in={isAddingWorkout}
              timeout={300}
              classNames="routine"
              unmountOnExit
            >
              <div className="d-flex flex-wrap gap-1 Add-Routine-List">
                {Exercises.map((workout, index) => {
                  const exists = schedule.exercises.find(
                    (r) => r.id === workout.id
                  );
                  return (
                    <button
                      key={index}
                      className={`border-0 d-flex align-items-center ${
                        exists ? "tag-routine-active" : "tag-routine-passive"
                      } desktop-xtra-small regular`}
                      onClick={() =>
                        addExerciseToSchedule(schedule.id, workout.id)
                      }
                    >
                      {workout.name}
                    </button>
                  );
                })}
              </div>
            </CSSTransition>
          )}
        </div>

        {schedule.exercises.length >= 1 && (
          <div className="Exercise-List position-relative d-flex flex-column">
            {schedule.exercises.map((exercise, index) => {
              // const [latestLog, setLatestLog] = useState<ExerciseLog | null>(null);

              // useEffect(() => {
              //     const fetchExercise = async () => {
              //         try {
              //             const ex: Exercise | null = await getExercise(exercise.id);
              //             if (ex && ex.log && ex.log.length > 0) {
              //                 setLatestLog(ex.log[ex.log.length - 1]); // Set the latest log
              //             }
              //         } catch (error) {
              //             console.error("Error fetching exercise log:", error);
              //         }
              //     };

              //     fetchExercise();
              // }, [exercise.id]);

              return (
                <div key={index} className="d-flex align-items-start gap-2">
                  <button
                    className={`Exercise ${
                      schedule.completedExercises.includes(exercise.id)
                        ? "completed"
                        : ""
                    } border-0 bg-transparent pe-0 position-relative color-typography-secondary desktop-small regular`}
                    onClick={() => {
                      if (!UpcomingSessionModal && !calendarEventModal) {
                        handleEditWorkout(exercise.id);
                      }
                    }}
                  >
                    {exercise.name}
                  </button>

                  {editMode && (
                    <div className="Exercise-stat-container flex-1 d-flex justify-content-start align-items-start">
                      <span>
                        <svg
                          width="4"
                          height="4"
                          viewBox="0 0 4 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2" cy="2" r="2" fill="#696969" />
                        </svg>
                      </span>

                      <span className="Exercise-set desktop-small regular color-typography-additional">
                        {exercise.set}x
                      </span>

                      {/* <span>
                                                <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="2" cy="2" r="2" fill="#696969" />
                                                </svg>
                                            </span>
                                            {latestLog && latestLog.set && latestLog.set.length > 0 && (
                                                <div className="Exercise-stat-wrapper d-flex gap-1">
                                                    {latestLog.set.map((s, i) => (
                                                        <span
                                                            key={i}
                                                            className="Exercise-stat desktop-small regular color-grey-2"
                                                        >
                                                            {s};
                                                        </span>
                                                    ))}
                                                </div>
                                            )} */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <EditWorkoutModal
        scheduleItem={schedule}
        show={modalShow}
        onHide={() => setModalShow(false)}
        exercise={exerciseToEdit}
      />
    </>
  );
};

export default UpcomingSession;

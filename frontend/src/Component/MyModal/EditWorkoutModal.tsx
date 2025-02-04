import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Exercise, ExerciseLog, Schedule } from "../../Interface";
import Plus from "/Icons/plus.svg";
import Trash from "/Icons/trash.svg";
import IncreaseArrow from "/Icons/increaseArrow.svg";
import { useMainContext } from "../../Context/mainContext";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  show: boolean;
  onHide: () => void;
  exercise: Exercise;
  scheduleItem: Schedule;
};

const EditWorkout = ({ show, onHide, exercise, scheduleItem }: Props) => {
  // const {
  //   schedule,
  //   addExerciseSet,
  //   deleteExerciseSet,
  //   markExerciseAsComplete,
  // } = useMainContext();

  console.log("exercise");
  console.log(exercise);

  // // State to store the updated exercise
  // const [updatedExercise, setUpdatedExercise] = useState<Exercise>(exercise);

  // console.log(`exercise log in edit workout modal`);
  // console.log(exercise.log);

  // const [exerciseSets, updateExerciseSets] = useState(() => {
  //   return exercise.rep.map((r) => {
  //     const [rep, weight] = r.rep.split("x");
  //     return {
  //       id: r.id,
  //       rep: rep,
  //       weight,
  //     };
  //   });
  // });

  // useEffect(() => {
  //   // Find the routine and exercise from the schedule
  //   const foundScheduleItem = schedule.find((s) => s.id === scheduleItem.id);
  //   const foundExercise = foundScheduleItem?.routine.exercises.find(
  //     (e) => e.id === exercise.id
  //   );

  //   if (foundExercise) {
  //     // Map the updated exercise's rep array to maintain the correct format
  //     const updatedSets = foundExercise.rep.map((r) => {
  //       const [rep, weight] = r.rep.split("x");
  //       return {
  //         id: r.id,
  //         rep: rep || "0", // Default to "0" if rep is missing
  //         weight: weight || "0", // Default to "0" if weight is missing
  //       };
  //     });

  //     // Update the exerciseSets state
  //     updateExerciseSets(updatedSets);

  //     // Update the updatedExercise state
  //     setUpdatedExercise(foundExercise);
  //   }
  // }, [schedule, scheduleItem.routine.id, exercise.id]); // Dependencies for re-execution

  // const handleSetChange = (
  //   id: string,
  //   field: "rep" | "weight",
  //   value: string
  // ) => {
  //   updateExerciseSets((prevSets) =>
  //     prevSets.map((set) => (set.id === id ? { ...set, [field]: value } : set))
  //   );
  // };

  // const updateExercise = () => {
  //   const exerciseLog: ExerciseLog = {
  //     id: uuidv4(),
  //     set: exerciseSets.map((set) => `${set.rep}x${set.weight}`),
  //     note: "",
  //   };

  //   markExerciseAsComplete(scheduleItem.id, exercise.id, exerciseLog);

  //   // setIsCompleted(true)

  //   onHide();
  // };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className="p-0 border-0 d-flex align-items-start"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="p-0">
          <div>
            <h3 className="desktop-heading-level-3 medium color-typography-primary">
              {exercise.name}
            </h3>
            <div className="d-flex align-items-center gap-1">
              <p className="desktop-medium-button medium color-typography-secondary">
                {scheduleItem.routine.name}
              </p>
              <svg
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2" cy="2" r="2" fill="#696969" />
              </svg>
              <p className="desktop-medium-button medium color-typography-secondary">
                {/* {updatedExercise.set} sets */}
              </p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 border-0 d-flex flex-column justify-content-start">
        <div className="d-flex flex-column gap-18">
          <div>
            <div className="d-flex justify-content-between edit-workout-header-row">
              <span className="desktop-medium medium color-typography-additional">
                #
              </span>
              <div className="d-flex justify-content-end align-items-center quantity-weight-header">
                <div className="d-flex justify-content-end">
                  <span className="desktop-small medium color-typography-additional edit-workout-quantity">
                    Qty
                  </span>
                  <span className="desktop-small medium color-typography-additional edit-workout-weight">
                    Lb
                  </span>
                </div>
                <button
                  className="border-0 bg-transparent p-0"
                  // onClick={() =>
                  //   addExerciseSet(scheduleItem.id, updatedExercise.id)
                  // }
                >
                  <img src={Plus} alt="icon" className="" />
                </button>
              </div>
            </div>

            {exercise.log.length >= 1 && (
              <div className="data-cell">
                {exercise.log[exercise.log.length - 1].set.map((s, index) => {
                  const [rep, weight] = s.split("x");

                  return (
                    <div
                      className="d-flex justify-content-between edit-workout-data-cell"
                      key={index}
                    >
                      <span className="desktop-medium medium color-typography-secondary">
                        {index + 1}
                      </span>
                      <div className="d-flex justify-content-end align-items-center quantity-weight-data-cell">
                        <div className="d-flex justify-content-end quantity-weight-data-cell-wrapper">
                          <input
                            className="desktop-xtra-small medium color-typography-additional edit-workout-quantity border-0 bg-grey-2 text-center"
                            type="number"
                            value={rep}
                            // onChange={(e) =>
                            //   handleSetChange(id, "rep", e.target.value)
                            // }
                          />
                          <input
                            className="desktop-xtra-small medium color-typography-additional edit-workout-quantity border-0 bg-grey-2 text-center"
                            type="number"
                            value={weight}
                            // onChange={(e) =>
                            //   handleSetChange(id, "weight", e.target.value)
                            // }
                          />
                        </div>
                        <button
                          className="bg-transparent border-0"
                          //   onClick={() =>
                          //     deleteExerciseSet(updatedExercise.id, id)
                          //   }
                        >
                          <img src={Trash} alt="icon" className="" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* <div className="data-cell">
              {updatedExercise.log[updatedExercise.log.length - 1].set.map(
                (s, index) => {
                  const [rep, weight] = s.split("x");

                  return (
                    <div
                      className="d-flex justify-content-between edit-workout-data-cell"
                      key={index}
                    >
                      <span className="desktop-medium medium color-typography-secondary">
                        {index + 1}
                      </span>
                      <div className="d-flex justify-content-end align-items-center quantity-weight-data-cell">
                        <div className="d-flex justify-content-end quantity-weight-data-cell-wrapper">
                          <input
                            className="desktop-xtra-small medium color-typography-additional edit-workout-quantity border-0 bg-grey-2 text-center"
                            type="number"
                            value={rep}
                            // onChange={(e) =>
                            //   handleSetChange(id, "rep", e.target.value)
                            // }
                          />
                          <input
                            className="desktop-xtra-small medium color-typography-additional edit-workout-quantity border-0 bg-grey-2 text-center"
                            type="number"
                            value={weight}
                            // onChange={(e) =>
                            //   handleSetChange(id, "weight", e.target.value)
                            // }
                          />
                        </div>
                        <button
                          className="bg-transparent border-0"
                          //   onClick={() =>
                          //     deleteExerciseSet(updatedExercise.id, id)
                          //   }
                        >
                          <img src={Trash} alt="icon" className="" />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div> */}
          </div>
          <div className="d-flex gap-2 desktop-regular color-typography-secondary">
            <img src={IncreaseArrow} alt="" />
            <p>10lb from last workout</p>
          </div>
        </div>
      </Modal.Body>
      <div className="">
        <textarea
          className="w-100 bg-grey-3 border-0"
          rows={2}
          placeholder="Leave notes here |"
          name="note"
          id="note"
        ></textarea>
      </div>
      {!exercise.complete && (
        <Modal.Footer className="border-0 d-flex m-0 p-0">
          <Button
            className="flex-1 button-varriant-2 desktop-medium medium"
            // onClick={updateExercise}
          >
            Complete
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default EditWorkout;

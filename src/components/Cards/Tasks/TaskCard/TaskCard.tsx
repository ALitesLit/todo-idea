import { useDispatch } from "react-redux";
import React from "react";

import { TaskType } from "../../../../shared/types";
import { DispatchType } from "../../../../store/store";
import { editMessage } from "../../../../store/slices/EditSlice";

import "./style.scss";


const TaskCard = ({ task }: { task: TaskType }) => {
    const dispatch = useDispatch<DispatchType>();


    return (
        <div className="task__card" id={task.id.toString()} draggable={true} onDragStart={
            (event: React.DragEvent) => {
                event.dataTransfer.setData("task", JSON.stringify(task));
            }
        }>
            <div className="task__card-elem">
                Начало: <span>{new Date(task.startDay).toLocaleDateString()}</span>
            </div>

            <div className="task__card-elem">
                Окончание: <span style={{
                    color: `${((new Date(Date.now()).toLocaleDateString() > new Date(task.endDay).toLocaleDateString()) && (task.type !== "done")) ? "rgba(252, 54, 57, 0.6)" : "white"}`
                }}>{new Date(task.endDay).toLocaleDateString()}</span>
            </div>

            <div className="task__card-elem">
                Описание: <span>{task.text}</span>
            </div>

            {
                task.type == "todo" && (
                    <div className="task__card-buttons">
                        <button className="task__card-edit" onClick={
                            () => dispatch(editMessage(task))
                        } />
                    </div>
                )
            }
        </div>
    )
}


export default TaskCard;
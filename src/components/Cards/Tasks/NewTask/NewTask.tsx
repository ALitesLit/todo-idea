import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import cancel from "../../../../assets/svg/cancel.svg";
import submit from "../../../../assets/svg/check.svg";

import { TaskType } from "../../../../shared/types";
import { DispatchType, RootState } from "../../../../store/store";
import { messageEdited } from "../../../../store/slices/EditSlice";

import "./style.scss";


const NewTask = ({ show, setShow, createTask, editTask }: { show: boolean, setShow: Function, createTask?: Function, editTask?: Function }) => {
    const { task } = useSelector((state: RootState) => state.edit);
    const dispatch = useDispatch<DispatchType>();
    
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();


    const onSubmit = (data: any, event: React.FormEvent) => {
        event.preventDefault();

        if (createTask != null && !task) {
            createTask(data.start, data.end, data.description);
        }

        if (editTask != null && task) {
            editTask(data.start, data.end, data.description, task?.id);
            dispatch(messageEdited());
        }

        reset();
        setShow(false);
    }

    
    useEffect(
        () => {
            if (task) {
                setValue("start", task.startDay);
                setValue("end", task.endDay);
                setValue("description", task.text);

                setShow(true);
            }
        }, [task]
    )

    
    return (
        <div className="new__task" style={{
            display: show ? "flex" : "none"
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="new__task-elem">
                    <label htmlFor="start-day">Начало:</label>

                    <input type="date" maxLength={8} id="start-day" {...register("start", { required: true })} />
                </div>

                <div className="new__task-elem">
                    <label htmlFor="end-day">Окончание:</label>

                    <input type="date" maxLength={8} id="end-day" {...register("end", { required: true })} />
                </div>

                <div className="new__task-elem">
                    <label htmlFor="description">Описание:</label>

                    <input type="text" maxLength={22} id="description" {...register("description", { required: true })} />
                </div>


                <div className="new__task-buttons">
                    <button onClick={(event: React.FormEvent) => {
                        event.preventDefault();

                        setShow(false);
                    }}>
                        <img src={cancel} />
                    </button>
                    
                    <button type="submit">
                        <img src={submit} />
                    </button>
                </div>
            </form>
        </div>
    )
}


export default NewTask;
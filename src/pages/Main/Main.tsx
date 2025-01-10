import $ from "jquery";
import { useEffect, useState } from "react";

import SectionCard from "../../components/Cards/SectionCard/SectionCard";
import Header from "../../components/Header/Header";
import NewTask from "../../components/Cards/Tasks/NewTask/NewTask";
import { TaskType } from "../../shared/types";
import TaskCard from "../../components/Cards/Tasks/TaskCard/TaskCard";
import getTaskList from "../../service/getTaskList";

import todo from "../../assets/svg/todo.svg";
import in_progress from "../../assets/svg/in_progress.svg";
import preview from "../../assets/svg/preview.svg";
import done from "../../assets/svg/done.svg";

import "./style.scss";


const Main = () => {
    const [showNewCard, setShowNewCard]: [showNewCard: boolean, setShowNewCard: Function] = useState(false);
    
    const [taskList, setTaskList]: [taskList: TaskType[], setTaskList: Function] = useState([]);
    const [searchResult, setSearchResult]: [searchResult: TaskType[], setSearchResult: Function] = useState([]);
    const [searchValue, setSearchValue]: [searchValue: string, setSearchValue: Function] = useState("");


    const createTask = (start: number, end: number, description: string) => {
        const newTask: TaskType = {
            id: taskList.length + 1,
            type: "todo",
            text: description,
            endDay: end,
            startDay: start
        };

        setTaskList([...taskList, newTask]);
    }


    const editTask = (start: number, end: number, description: string, id: number) => {
        setTaskList([
            ...taskList.filter(i => i.id !== id),
            {
                id: id,
                type: "todo",
                startDay: start,
                endDay: end,
                text: description,
            }
        ]);
    }


    const setType = (task: TaskType, type: 'todo' | 'in_progress' | 'review' | 'done') => {
        setTaskList([...taskList.filter(i => i.id !== task.id), {
            id: task.id,
            type: type,
            startDay: task.startDay,
            endDay: task.endDay,
            text: task.text,
        }]);
    }


    useEffect(
        () => {
            if (searchValue) {
                setSearchResult(taskList.filter(i => i.text.includes(searchValue)));
            }
        }, [searchValue, taskList]
    )


    return (
        <>
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />

            <main className="main__page">
                <SectionCard>
                    <div
                        onDrop={
                            (event: React.DragEvent) => {
                                event.preventDefault();

                                const task: TaskType = JSON.parse(event.dataTransfer.getData("task"));

                                setType(task, "todo");
                            }
                        }


                        onDragOver={
                            (event) => event.preventDefault()
                        }
                    >
                        <div className="card_header todo">
                            <div className="card_header-name">
                                <img src={todo} />
                                <p>To Do</p>
                            </div>

                            <button className="todo-btn-add" onClick={() => setShowNewCard(true)}>
                                + Добавить
                            </button>
                        </div>

                        <div className="tasks-todo todo-tasks">
                            {
                                getTaskList(taskList, searchResult, "todo", searchValue)?.map(
                                    i => <TaskCard task={i} key={i.id} />
                                )
                            }
                            
                            <NewTask show={showNewCard} setShow={setShowNewCard} createTask={createTask} editTask={editTask} />
                        </div>
                    </div>
                </SectionCard>

                <SectionCard>
                    <div
                        onDrop={
                            (event: React.DragEvent) => {
                                event.preventDefault();

                                const task: TaskType = JSON.parse(event.dataTransfer.getData("task"));

                                setType(task, "in_progress");
                            }
                        }

                        onDragOver={
                            (event) => event.preventDefault()
                        }
                    >
                        <div className="card_header">
                            <div className="card_header-name">
                                <img src={in_progress} />
                                <p>In Progress</p>
                            </div>
                        </div>

                        <div className="tasks-todo tasks-progress">
                            {
                                getTaskList(taskList, searchResult, "in_progress", searchValue)?.map(
                                    i => <TaskCard task={i} key={i.id} />
                                )
                            }
                        </div>
                    </div>
                </SectionCard>

                <SectionCard>
                    <div
                        onDrop={
                            (event: React.DragEvent) => {
                                event.preventDefault();

                                const task: TaskType = JSON.parse(event.dataTransfer.getData("task"));

                                setType(task, "review");
                            }
                        }

                        onDragOver={
                            (event) => event.preventDefault()
                        }
                    >
                        <div className="card_header">
                            <div className="card_header-name">
                                <img src={preview} />
                                <p>Review</p>
                            </div>
                        </div>

                        <div className="tasks-todo tasks-review">
                            {
                                getTaskList(taskList, searchResult, "review", searchValue)?.map(
                                    i => <TaskCard task={i} key={i.id} />
                                )
                            }
                        </div>
                    </div>
                </SectionCard>

                <SectionCard>
                    <div
                        onDrop={
                            (event: React.DragEvent) => {
                                event.preventDefault();

                                const task: TaskType = JSON.parse(event.dataTransfer.getData("task"));

                                setType(task, "done");
                            }
                        }


                        onDragOver={
                            (event) => event.preventDefault()
                        }
                    >
                        <div className="card_header">
                            <div className="card_header-name">
                                <img src={done} />
                                <p>Done</p>
                            </div>

                            <button className="btn_delete" onClick={() => setTaskList(taskList.filter(i => i.type !== "done"))} />
                        </div>

                        <div className="tasks-todo tasks-done">
                            {
                                getTaskList(taskList, searchResult, "done", searchValue)?.map(
                                    i => <TaskCard task={i} key={i.id} />
                                )
                            }
                        </div>
                    </div>
                </SectionCard>
            </main>
        </>
    )
}


export default Main;
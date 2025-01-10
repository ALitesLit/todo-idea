import { batch } from "react-redux";
import { TaskType } from "../shared/types";

const getTaskList = (taskList: TaskType[], searchResult: TaskType[], type: 'todo' | 'in_progress' | 'review' | 'done', searchValue: string) => {
    if (searchResult.length || searchValue.replace(/ /g,'') !== "") {
        return searchResult.filter(i => i.type == type).sort((a, b) => {
            return new Date(a.startDay) - new Date(b.startDay);
        });
    } else if (taskList.length) {
        return taskList.filter(i => i.type == type).sort((a, b) => {
            return new Date(a.startDay) - new Date(b.startDay);
        });
    }
}


export default getTaskList;
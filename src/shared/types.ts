export type TaskType = {
    /** id задачи */
    id: number,
    /** статус задачи */
    type: 'todo' | 'in_progress' | 'review' | 'done',
    /** timestamp начала задачи */
    startDay: number,
    /** timestamp дедлайна */
    endDay: number,
    /** описание задачи */
    text: string,
};
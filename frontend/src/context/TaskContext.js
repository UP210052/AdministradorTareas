import React, { createContext, useState, useContext, useEffect } from 'react';
import { taskApiService } from '../api'; // Asegúrate de importar tu servicio API

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasksToDo, setTasksToDo] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const dataToDo = await taskApiService.getTasksToDo();
                const formattedDataToDo = dataToDo.map(task => ({
                    id: task[0], 
                    taskName: task[1],
                    description: task[2],
                    startDate: task[3],
                    endDate: task[4],
                    status: task[5],
                    project: task[6],
                    assign: task[7],
                }));
                setTasksToDo(formattedDataToDo);

                const dataDone = await taskApiService.getTasksDone();
                const formattedDataDone = dataDone.map(task => ({
                    id: task[0],
                    taskName: task[1],
                    description: task[2],
                    startDate: task[3],
                    endDate: task[4],
                    status: task[5],
                    project: task[6],
                    assign: task[7],
                }));
                setTasksDone(formattedDataDone);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const markTaskAsCompleted = async (taskId) => {
        try {
            await taskApiService.completeTask(taskId);
            const updatedToDoTasks = tasksToDo.map(task =>
                task.id === taskId ? { ...task, status: 'Finished' } : task
            );

            setTasksToDo(updatedToDoTasks.filter(task => task.id !== taskId));

            const completedTask = tasksToDo.find(task => task.id === taskId);
            setTasksDone([...tasksDone, { ...completedTask, status: 'Finished' }]);
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const updateTask = async()=>{
        try {
            const dataToDo = await taskApiService.getTasksToDo();
            const formattedDataToDo = dataToDo.map(task => ({
                id: task[0], 
                taskName: task[1],
                description: task[2],
                startDate: task[3],
                endDate: task[4],
                status: task[5],
                project: task[6],
                assign: task[7],
            }));
            setTasksToDo(formattedDataToDo);

            const dataDone = await taskApiService.getTasksDone();
            const formattedDataDone = dataDone.map(task => ({
                id: task[0],
                taskName: task[1],
                description: task[2],
                startDate: task[3],
                endDate: task[4],
                status: task[5],
                project: task[6],
                assign: task[7],
            }));
            setTasksDone(formattedDataDone);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasksToDo, tasksDone, markTaskAsCompleted, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);

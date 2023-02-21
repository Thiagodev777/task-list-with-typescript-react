import React from "react";
import styles from "./App.module.css";
import Task from "./Components/Task/Task";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [task, setTask] = React.useState("");

  React.useEffect(() => {
    const taskLocalStorage = window.localStorage.getItem("newTask");
    if (taskLocalStorage) {
      setTask(taskLocalStorage);
    }
  }, []);

  function handleNewTask() {
    if (!task) {
      return window.alert("Insira uma Tarefa...");
    }
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      task: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  }

  function handleCheck(id: number) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      const newList = [...tasks];
      newList[index].completed = !newList[index].completed;
      setTasks(newList);
    }
  }

  function handleDelete(id: number) {
    const newList = tasks.filter((task) => task.id !== id);
    const confirm = window.confirm("Deseja mesmo excluir esta tarefa ?");
    if (confirm) {
      setTasks(newList);
    }
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <h1>Lista de Tarefas com TS</h1>
      </div>
      <div className={styles.container_tasks}>
        <div className={styles.container_tasks_header}>
          <input
            type="text"
            value={task}
            onChange={({ target }) => {
              window.localStorage.setItem("newTask", target.value);
              return setTask(target.value);
            }}
          />
          <button onClick={handleNewTask}>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
        {tasks.length <= 0 && (
          <h2 className={styles.task_null}>Quais as tarefas para hoje ?</h2>
        )}
        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              task={task.task}
              completed={task.completed}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </React.Fragment>
  );
};

export default App;

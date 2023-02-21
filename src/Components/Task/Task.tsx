import styles from "./style.module.css";

interface PropsType {
  id: number;
  task: string;
  completed: boolean;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
}

const Task = ({
  id,
  task,
  completed,
  handleCheck,
  handleDelete,
}: PropsType) => {
  return (
    <div
      className={
        completed ? styles.container_task_completed : styles.container_task
      }
    >
      <h2>{task}</h2>
      <div
        className={
          completed
            ? styles.container_task_actions_completed
            : styles.container_task_actions
        }
      >
        <button onClick={() => handleCheck(id)}>
          <i className="bi bi-check2-circle"></i>
        </button>
        <button onClick={() => handleDelete(id)}>
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  );
};

export default Task;

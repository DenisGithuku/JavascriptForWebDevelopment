import "../App.css";

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  const todo_status = todo.completed ? "completed" : "not-completed";
  const time = new Date(`${todo.time}`.replace("T", " ").substring(0, 16));
  let due;
  if (time.getDate() - new Date().getDate() === 0) {
    due = `Today at ${time.toLocaleTimeString()}`;
  } else if (time.getDate() - new Date().getDate() === 1) {
    due = `Tomorrow at ${time.toLocaleTimeString()}`;
  } else {
    due = time.toLocaleDateString();
  }

  return (
    <div className={`todo-card ${todo_status}`}>
      <div className="left">
        <span className="delete-btn" onClick={onDeleteTodo}>
          x
        </span>
        <div className="todo-content">
          <h3>{todo.title}</h3>
          <span>{todo.description}</span>
          <span>Due: {due}</span>
        </div>
      </div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggleComplete}
      />
    </div>
  );
}

export default TodoItem;

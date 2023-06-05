import "../App.css";

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  const todo_status = todo.completed ? "completed" : "not-completed";

  return (
    <div className={`todo-card ${todo_status}`}>
      <div className="left">
        <span className="delete-btn" onClick={onDeleteTodo}>x</span>
        <div className="todo-content">
          <h3>{todo.title}</h3>
          <span>{todo.description}</span>
          <span>{todo.time}</span>
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

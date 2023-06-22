import { Component } from "react";
import TodoItem from "./TodoItem";
import db from "../util/firebase";
import { collection, getDocs } from "firebase/firestore";

class TodoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      dialog_visible: false,
      new_task: {
        id: "",
        title: "",
        description: "",
        completed: false,
        time: new Date().toLocaleTimeString(),
      },
      message_card: {
        visible: false,
        message: "",
      },
    };

    this.getTodos()
    this.onToggleDialog = this.onToggleDialog.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onAddNewTodo = this.onAddNewTodo.bind(this);
    this.onToggleComplete = this.onToggleComplete.bind(this);
    this.onShowMessageCard = this.onShowMessageCard.bind(this);
    this.onHideMessageCard = this.onHideMessageCard.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }

 

  async getTodos() {
    try {
      const todosSnapshot = await getDocs(collection(db, "todos"));
      const newTodos = [ ...this.state.todos ]
      todosSnapshot.docs.forEach((doc) => {
        newTodos.push(doc.data())
      });
      this.setState({
        todos: newTodos
      })
      
    } catch (err) {
      this.onShowMessageCard(err.message);

      setTimeout(() => {
        this.onHideMessageCard();
      }, 5000);
    }
  }

  onShowMessageCard(message) {
    this.setState({
      message_card: {
        visible: true,
        message: message,
      },
    });
  }

  onHideMessageCard() {
    this.setState({
      message_card: {
        visible: false,
        message: "",
      },
    });
  }

  onToggleDialog() {
    this.setState({
      dialog_visible: !this.state.dialog_visible,
    });
  }

  onToggleComplete(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) todo.completed = !todo.completed;
        return todo;
      }),
    });
  }

  onDeleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => {
        return todo.id !== id;
      }),
    });
    this.onShowMessageCard("Task deleted successfully");

    setTimeout(() => {
      this.onHideMessageCard();
    }, 5000);
  }

  onAddNewTodo(event) {
    if (
      this.state.new_task.title.length === 0 ||
      this.state.new_task.description.length === 0
    ) {
      this.onShowMessageCard("Invalid task details");

      setTimeout(() => {
        this.onHideMessageCard();
      }, 5000);
      return;
    }

    const newTodo = this.state.new_task;
    newTodo.id = this.state.todos.length + 1;
    const updatedList = this.state.todos.concat({ ...newTodo });
    this.setState({
      todos: updatedList,
      new_task: {
        id: "",
        title: "",
        description: "",
        completed: false,
        time: new Date().toLocaleTimeString(),
      },
      dialog_visible: !this.state.dialog_visible,
    });

    this.onShowMessageCard("Task added successfully");

    setTimeout(() => {
      this.onHideMessageCard();
    }, 5000);
  }

  onTitleChange(event) {
    let new_task = this.state.new_task;
    new_task.title = event.target.value;
    this.setState({
      new_task: new_task,
    });
  }
  onDescriptionChange(event) {
    let new_task = this.state.new_task;
    new_task.description = event.target.value;
    console.log(new_task.description);
    this.setState({
      new_task: new_task,
    });
  }

  render() {
    // map method - transform todo objects into todo jsx elements
    const TodoList = this.state.todos.map((todo) => {
      return (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onDeleteTodo={() => this.onDeleteTodo(todo.id)}
            onToggleComplete={() => this.onToggleComplete(todo.id)}
          />
        </li>
      );
    });

    const Content =
      this.state.todos.length === 0 ? (
        <h1 className="no-todo-status">
          No todos available. Hurray you're done for today. 🥳
        </h1>
      ) : (
        <ul className="todo-list">{TodoList}</ul>
      );

    const dialog_status = this.state.dialog_visible ? "visible" : "hidden";
    const message_card_status = this.state.message_card.visible
      ? "visible"
      : "hidden";
    const scroll_status = this.state.dialog_visible ? "no-scroll" : "";
    return (
      <div className={`${scroll_status} todo-screen`}>
        <div className={`message-card ${message_card_status}`}>
          <span>{this.state.message_card.message}</span>
        </div>
        <button className="add-todo-btn btn" onClick={this.onToggleDialog}>
          Add new todo
        </button>
        {Content}
        <div className={`dialog ${dialog_status}`}>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={this.state.new_task.title}
              onChange={this.onTitleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={this.state.new_task.description}
              onChange={this.onDescriptionChange}
            />
          </div>
          <button className="submit-btn btn" onClick={this.onAddNewTodo}>
            Create
          </button>
        </div>
      </div>
    );
  }
}

export default TodoScreen;

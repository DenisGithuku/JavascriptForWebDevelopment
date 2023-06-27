import { Component } from "react";
import TodoItem from "./TodoItem";
import db from "../util/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

class TodoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: false,
      dialog_visible: false,
      new_task: {
        title: "",
        description: "",
        completed: false,
        time: "",
      },
      message_card: {
        visible: false,
        message: "",
      },
    };

    this.onToggleDialog = this.onToggleDialog.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onAddNewTodo = this.onAddNewTodo.bind(this);
    this.onToggleComplete = this.onToggleComplete.bind(this);
    this.onShowMessageCard = this.onShowMessageCard.bind(this);
    this.onHideMessageCard = this.onHideMessageCard.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this)
  }

  async componentDidMount() {
    await this.getTodos();
  }

  async getTodos() {
    try {
      this.setState({
        loading: true,
      });
      const todosSnapshot = await getDocs(collection(db, "todos"));
      const newTodos = [];
      todosSnapshot.docs.forEach((doc) => {
        const todo = { ...doc.data(), id: doc.id };
        newTodos.push(todo);
      });
      this.setState({
        todos: newTodos,
        loading: false,
      });
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

  async onToggleComplete(id) {
    try {
      const todo = this.state.todos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
      await updateDoc(doc(db, "todos", id), {
        completed: todo.completed,
        description: todo.description,
        time: todo.time,
        title: todo.title,
      });
      await this.getTodos();
    } catch (err) {
      this.onShowMessageCard(err.message);

      setTimeout(() => {
        this.onHideMessageCard();
      }, 5000);
    }
  }

  async onDeleteTodo(id) {
    try {
      await deleteDoc(doc(db, "todos", id));
      this.onShowMessageCard("Task deleted successfully");

      setTimeout(() => {
        this.onHideMessageCard();
      }, 5000);

      await this.getTodos();
    } catch (err) {
      this.onShowMessageCard(err.message);

      setTimeout(() => {
        this.onHideMessageCard();
      }, 5000);
    }
  }

  async onAddNewTodo(event) {
    try {
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
      // add new todo to the firestore db
      await addDoc(collection(db, "todos"), this.state.new_task);
      // const newTodo = this.state.new_task;
      // newTodo.id = this.state.todos.length + 1;
      // const updatedList = this.state.todos.concat({ ...newTodo });
      this.setState({
        new_task: {
          id: "",
          title: "",
          description: "",
          completed: false,
          time: "",
        },
        dialog_visible: !this.state.dialog_visible,
      });

      this.onShowMessageCard("Task added successfully");

      setTimeout(() => {
        this.onHideMessageCard();
      }, 5000);
      await this.getTodos();
    } catch (err) {
      this.onShowMessageCard(err.message);

      setTimeout(() => {
        this.onHideMessageCard();
      }, 5000);
    }
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

  onTimeChange(event) {
    let new_task = this.state.new_task
    new_task.time = event.target.value
    this.setState({
      new_task: new_task
    })
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
    const loading_status = !this.state.loading ? "hidden" : "";
    return (
      <>
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
            <div className="input-field">
              <label htmlFor="time">Time</label>
              <input
                type="datetime-local"
                id="time"
                value={this.state.new_task.time}
                onChange={this.onTimeChange}
              />
            </div>
            <div className="dialog-btns">
              <button className="submit-btn btn" onClick={this.onAddNewTodo}>
                Create
              </button>
              <button className="cancel-btn btn" onClick={this.onToggleDialog}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className={`loading-overlay ${loading_status}`}>
          <div className="loader"></div>
          <span>Fetching todos ...</span>
        </div>
      </>
    );
  }
}

export default TodoScreen;

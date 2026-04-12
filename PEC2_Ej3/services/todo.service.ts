import { Todo } from '../models/todo.model';


export class TodoService {
  todos: Todo[];
  private onTodoListChanged: (todos: Todo[]) => void;

  constructor() {
    const stored = localStorage.getItem('todos');
    this.todos = (JSON.parse(stored || '[]') as Todo[]).map(
      (todo: Todo) => new Todo(todo)
    );
    this.onTodoListChanged = (_todos: Todo[]): void => {};
  }

  bindTodoListChanged(callback: (todos: Todo[]) => void): void {
    this.onTodoListChanged = callback;
  }

  private _commit(todos: Todo[]): void {
    this.onTodoListChanged(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodo(text: string): void {
    this.todos.push(new Todo({ text }));
    this._commit(this.todos);
  }

  editTodo(id: string, updatedText: string): void {
    this.todos = this.todos.map((todo: Todo) =>
      todo.id === id ? new Todo({ ...todo, text: updatedText }) : todo
    );
    this._commit(this.todos);
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    this._commit(this.todos);
  }

  toggleTodo(id: string): void {
    this.todos = this.todos.map((todo: Todo) =>
      todo.id === id ? new Todo({ ...todo, complete: !todo.complete }) : todo
    );
    this._commit(this.todos);
  }
}

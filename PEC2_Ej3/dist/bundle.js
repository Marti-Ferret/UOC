/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./controllers/todo.controller.ts"
/*!****************************************!*\
  !*** ./controllers/todo.controller.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoController: () => (/* binding */ TodoController)
/* harmony export */ });
class TodoController {
    constructor(service, view) {
        this.onTodoListChanged = (todos) => {
            this.view.displayTodos(todos);
        };
        this.handleAddTodo = (todoText) => {
            this.service.addTodo(todoText);
        };
        this.handleEditTodo = (id, todoText) => {
            this.service.editTodo(id, todoText);
        };
        this.handleDeleteTodo = (id) => {
            this.service.deleteTodo(id);
        };
        this.handleToggleTodo = (id) => {
            this.service.toggleTodo(id);
        };
        this.service = service;
        this.view = view;
        this.service.bindTodoListChanged(this.onTodoListChanged);
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
        this.onTodoListChanged(this.service.todos);
    }
}


/***/ },

/***/ "./models/todo.model.ts"
/*!******************************!*\
  !*** ./models/todo.model.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Todo: () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
    constructor({ text, complete = false }) {
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete;
    }
    //Aplicat amb string ja que crec que no es pot aplicar el [1e7] + numero.
    uuidv4() {
        return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => {
            const random = crypto.getRandomValues(new Uint8Array(1))[0];
            return (parseInt(c) ^ (random & (15 >> (parseInt(c) / 4)))).toString(16);
        });
    }
}


/***/ },

/***/ "./services/todo.service.ts"
/*!**********************************!*\
  !*** ./services/todo.service.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoService: () => (/* binding */ TodoService)
/* harmony export */ });
/* harmony import */ var _models_todo_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo.model */ "./models/todo.model.ts");

class TodoService {
    constructor() {
        const stored = localStorage.getItem('todos');
        this.todos = JSON.parse(stored || '[]').map((todo) => new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(todo));
        this.onTodoListChanged = (_todos) => { };
    }
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
    _commit(todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    addTodo(text) {
        this.todos.push(new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo({ text }));
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => todo.id === id ? new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(Object.assign(Object.assign({}, todo), { text: updatedText })) : todo);
        this._commit(this.todos);
    }
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this._commit(this.todos);
    }
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(Object.assign(Object.assign({}, todo), { complete: !todo.complete })) : todo);
        this._commit(this.todos);
    }
}


/***/ },

/***/ "./views/todo.views.ts"
/*!*****************************!*\
  !*** ./views/todo.views.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoView: () => (/* binding */ TodoView)
/* harmony export */ });
class TodoView {
    constructor() {
        this.app = this.getElement('#root');
        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Add todo';
        this.input.name = 'todo';
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';
        this.form.append(this.input, this.submitButton);
        this.title = this.createElement('h1');
        this.title.textContent = 'Todos';
        this.todoList = this.createElement('ul', 'todo-list');
        this.app.append(this.title, this.form, this.todoList);
        this._temporaryTodoText = '';
        this._initLocalListeners();
    }
    get _todoText() {
        return this.input.value;
    }
    _resetInput() {
        this.input.value = '';
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        if (!element)
            throw new Error(`Element not found: ${selector}`);
        return element;
    }
    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.todoList.append(p);
        }
        else {
            todos.forEach((todo) => {
                const li = this.createElement('li');
                li.id = todo.id;
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;
                const span = this.createElement('span');
                span.contentEditable = 'true';
                span.classList.add('editable');
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                }
                else {
                    span.textContent = todo.text;
                }
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);
                this.todoList.append(li);
            });
        }
        console.log(todos);
    }
    _initLocalListeners() {
        this.todoList.addEventListener('input', (event) => {
            const target = event.target;
            if (target.className === 'editable') {
                this._temporaryTodoText = target.innerText;
            }
        });
    }
    bindAddTodo(handler) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }
    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.className === 'delete') {
                const id = target.parentElement.id;
                handler(id);
            }
        });
    }
    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', (event) => {
            if (this._temporaryTodoText) {
                const target = event.target;
                const id = target.parentElement.id;
                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = '';
            }
        });
    }
    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', (event) => {
            const target = event.target;
            if (target.type === 'checkbox') {
                const id = target.parentElement.id;
                handler(id);
            }
        });
    }
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_todo_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/todo.controller */ "./controllers/todo.controller.ts");
/* harmony import */ var _services_todo_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/todo.service */ "./services/todo.service.ts");
/* harmony import */ var _views_todo_views__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/todo.views */ "./views/todo.views.ts");



new _controllers_todo_controller__WEBPACK_IMPORTED_MODULE_0__.TodoController(new _services_todo_service__WEBPACK_IMPORTED_MODULE_1__.TodoService(), new _views_todo_views__WEBPACK_IMPORTED_MODULE_2__.TodoView());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDeEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQTBCLENBQUM7WUFDaEQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUMvQixNQUFNLEVBQUUsR0FBSSxNQUFNLENBQUMsYUFBNkIsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjs7Ozs7OztVQzVJRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTitEO0FBQ1Q7QUFDUjtBQUU5QyxJQUFJLHdFQUFjLENBQUMsSUFBSSwrREFBVyxFQUFFLEVBQUUsSUFBSSx1REFBUSxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BlYzJfZWozLy4vY29udHJvbGxlcnMvdG9kby5jb250cm9sbGVyLnRzIiwid2VicGFjazovL3BlYzJfZWozLy4vbW9kZWxzL3RvZG8ubW9kZWwudHMiLCJ3ZWJwYWNrOi8vcGVjMl9lajMvLi9zZXJ2aWNlcy90b2RvLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcGVjMl9lajMvLi92aWV3cy90b2RvLnZpZXdzLnRzIiwid2VicGFjazovL3BlYzJfZWozL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BlYzJfZWozL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wZWMyX2VqMy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BlYzJfZWozL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGVjMl9lajMvLi9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9kb1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90b2RvLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9kb1ZpZXcgfSBmcm9tICcuLi92aWV3cy90b2RvLnZpZXdzJztcbmltcG9ydCB7IFRvZG8gfSBmcm9tICcuLi9tb2RlbHMvdG9kby5tb2RlbCc7XG5cblxuZXhwb3J0IGNsYXNzIFRvZG9Db250cm9sbGVyIHtcbiAgcHJpdmF0ZSBzZXJ2aWNlOiBUb2RvU2VydmljZTtcbiAgcHJpdmF0ZSB2aWV3OiBUb2RvVmlldztcblxuICBjb25zdHJ1Y3RvcihzZXJ2aWNlOiBUb2RvU2VydmljZSwgdmlldzogVG9kb1ZpZXcpIHtcbiAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG5cbiAgICB0aGlzLnNlcnZpY2UuYmluZFRvZG9MaXN0Q2hhbmdlZCh0aGlzLm9uVG9kb0xpc3RDaGFuZ2VkKTtcbiAgICB0aGlzLnZpZXcuYmluZEFkZFRvZG8odGhpcy5oYW5kbGVBZGRUb2RvKTtcbiAgICB0aGlzLnZpZXcuYmluZEVkaXRUb2RvKHRoaXMuaGFuZGxlRWRpdFRvZG8pO1xuICAgIHRoaXMudmlldy5iaW5kRGVsZXRlVG9kbyh0aGlzLmhhbmRsZURlbGV0ZVRvZG8pO1xuICAgIHRoaXMudmlldy5iaW5kVG9nZ2xlVG9kbyh0aGlzLmhhbmRsZVRvZ2dsZVRvZG8pO1xuXG4gICAgdGhpcy5vblRvZG9MaXN0Q2hhbmdlZCh0aGlzLnNlcnZpY2UudG9kb3MpO1xuICB9XG5cbiAgb25Ub2RvTGlzdENoYW5nZWQgPSAodG9kb3M6IFRvZG9bXSk6IHZvaWQgPT4ge1xuICAgIHRoaXMudmlldy5kaXNwbGF5VG9kb3ModG9kb3MpO1xuICB9O1xuXG4gIGhhbmRsZUFkZFRvZG8gPSAodG9kb1RleHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuc2VydmljZS5hZGRUb2RvKHRvZG9UZXh0KTtcbiAgfTtcblxuICBoYW5kbGVFZGl0VG9kbyA9IChpZDogc3RyaW5nLCB0b2RvVGV4dDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5zZXJ2aWNlLmVkaXRUb2RvKGlkLCB0b2RvVGV4dCk7XG4gIH07XG5cbiAgaGFuZGxlRGVsZXRlVG9kbyA9IChpZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5zZXJ2aWNlLmRlbGV0ZVRvZG8oaWQpO1xuICB9O1xuXG4gIGhhbmRsZVRvZ2dsZVRvZG8gPSAoaWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuc2VydmljZS50b2dnbGVUb2RvKGlkKTtcbiAgfTtcbn1cbiIsIlxuZXhwb3J0IGludGVyZmFjZSBJVG9kbyB7XG4gIGlkOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgY29tcGxldGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBUb2RvIGltcGxlbWVudHMgSVRvZG8ge1xuICBpZDogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGNvbXBsZXRlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHsgdGV4dCwgY29tcGxldGUgPSBmYWxzZSB9OiB7IHRleHQ6IHN0cmluZzsgY29tcGxldGU/OiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmlkID0gdGhpcy51dWlkdjQoKTtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgfVxuXG4gIC8vQXBsaWNhdCBhbWIgc3RyaW5nIGphIHF1ZSBjcmVjIHF1ZSBubyBlcyBwb3QgYXBsaWNhciBlbCBbMWU3XSArIG51bWVyby5cbiAgcHJpdmF0ZSB1dWlkdjQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJzEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMCcucmVwbGFjZSgvWzAxOF0vZywgKGM6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmFuZG9tID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0hO1xuICAgICAgcmV0dXJuIChwYXJzZUludChjKSBeIChyYW5kb20gJiAoMTUgPj4gKHBhcnNlSW50KGMpIC8gNCkpKSkudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi4vbW9kZWxzL3RvZG8ubW9kZWwnO1xuXG5cbmV4cG9ydCBjbGFzcyBUb2RvU2VydmljZSB7XG4gIHRvZG9zOiBUb2RvW107XG4gIHByaXZhdGUgb25Ub2RvTGlzdENoYW5nZWQ6ICh0b2RvczogVG9kb1tdKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHN0b3JlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpO1xuICAgIHRoaXMudG9kb3MgPSAoSlNPTi5wYXJzZShzdG9yZWQgfHwgJ1tdJykgYXMgVG9kb1tdKS5tYXAoXG4gICAgICAodG9kbzogVG9kbykgPT4gbmV3IFRvZG8odG9kbylcbiAgICApO1xuICAgIHRoaXMub25Ub2RvTGlzdENoYW5nZWQgPSAoX3RvZG9zOiBUb2RvW10pOiB2b2lkID0+IHt9O1xuICB9XG5cbiAgYmluZFRvZG9MaXN0Q2hhbmdlZChjYWxsYmFjazogKHRvZG9zOiBUb2RvW10pID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG9kb0xpc3RDaGFuZ2VkID0gY2FsbGJhY2s7XG4gIH1cblxuICBwcml2YXRlIF9jb21taXQodG9kb3M6IFRvZG9bXSk6IHZvaWQge1xuICAgIHRoaXMub25Ub2RvTGlzdENoYW5nZWQodG9kb3MpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gIH1cblxuICBhZGRUb2RvKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudG9kb3MucHVzaChuZXcgVG9kbyh7IHRleHQgfSkpO1xuICAgIHRoaXMuX2NvbW1pdCh0aGlzLnRvZG9zKTtcbiAgfVxuXG4gIGVkaXRUb2RvKGlkOiBzdHJpbmcsIHVwZGF0ZWRUZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAoKHRvZG86IFRvZG8pID0+XG4gICAgICB0b2RvLmlkID09PSBpZCA/IG5ldyBUb2RvKHsgLi4udG9kbywgdGV4dDogdXBkYXRlZFRleHQgfSkgOiB0b2RvXG4gICAgKTtcbiAgICB0aGlzLl9jb21taXQodGhpcy50b2Rvcyk7XG4gIH1cblxuICBkZWxldGVUb2RvKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5maWx0ZXIoKHRvZG86IFRvZG8pID0+IHRvZG8uaWQgIT09IGlkKTtcbiAgICB0aGlzLl9jb21taXQodGhpcy50b2Rvcyk7XG4gIH1cblxuICB0b2dnbGVUb2RvKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAoKHRvZG86IFRvZG8pID0+XG4gICAgICB0b2RvLmlkID09PSBpZCA/IG5ldyBUb2RvKHsgLi4udG9kbywgY29tcGxldGU6ICF0b2RvLmNvbXBsZXRlIH0pIDogdG9kb1xuICAgICk7XG4gICAgdGhpcy5fY29tbWl0KHRoaXMudG9kb3MpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi4vbW9kZWxzL3RvZG8ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgVG9kb1ZpZXcge1xuICBwcml2YXRlIGFwcDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgZm9ybTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHByaXZhdGUgc3VibWl0QnV0dG9uOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB0aXRsZTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgdG9kb0xpc3Q6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF90ZW1wb3JhcnlUb2RvVGV4dDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXBwID0gdGhpcy5nZXRFbGVtZW50KCcjcm9vdCcpO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLmlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGhpcy5pbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG9kbyc7XG4gICAgdGhpcy5pbnB1dC5uYW1lID0gJ3RvZG8nO1xuICAgIHRoaXMuc3VibWl0QnV0dG9uID0gdGhpcy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdWJtaXQnO1xuICAgIHRoaXMuZm9ybS5hcHBlbmQodGhpcy5pbnB1dCwgdGhpcy5zdWJtaXRCdXR0b24pO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9ICdUb2Rvcyc7XG4gICAgdGhpcy50b2RvTGlzdCA9IHRoaXMuY3JlYXRlRWxlbWVudCgndWwnLCAndG9kby1saXN0Jyk7XG4gICAgdGhpcy5hcHAuYXBwZW5kKHRoaXMudGl0bGUsIHRoaXMuZm9ybSwgdGhpcy50b2RvTGlzdCk7XG5cbiAgICB0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCA9ICcnO1xuICAgIHRoaXMuX2luaXRMb2NhbExpc3RlbmVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgX3RvZG9UZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQudmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldElucHV0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQodGFnOiBzdHJpbmcsIGNsYXNzTmFtZT86IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmIChjbGFzc05hbWUpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZ2V0RWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihzZWxlY3Rvcik7XG4gICAgaWYgKCFlbGVtZW50KSB0aHJvdyBuZXcgRXJyb3IoYEVsZW1lbnQgbm90IGZvdW5kOiAke3NlbGVjdG9yfWApO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZGlzcGxheVRvZG9zKHRvZG9zOiBUb2RvW10pOiB2b2lkIHtcbiAgICB3aGlsZSAodGhpcy50b2RvTGlzdC5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZUNoaWxkKHRoaXMudG9kb0xpc3QuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKHRvZG9zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgcCA9IHRoaXMuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcC50ZXh0Q29udGVudCA9ICdOb3RoaW5nIHRvIGRvISBBZGQgYSB0YXNrPyc7XG4gICAgICB0aGlzLnRvZG9MaXN0LmFwcGVuZChwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9kb3MuZm9yRWFjaCgodG9kbzogVG9kbykgPT4ge1xuICAgICAgICBjb25zdCBsaSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuaWQgPSB0b2RvLmlkO1xuXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdG9kby5jb21wbGV0ZTtcblxuICAgICAgICBjb25zdCBzcGFuID0gdGhpcy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW4uY29udGVudEVkaXRhYmxlID0gJ3RydWUnO1xuICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG5cbiAgICAgICAgaWYgKHRvZG8uY29tcGxldGUpIHtcbiAgICAgICAgICBjb25zdCBzdHJpa2UgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ3MnKTtcbiAgICAgICAgICBzdHJpa2UudGV4dENvbnRlbnQgPSB0b2RvLnRleHQ7XG4gICAgICAgICAgc3Bhbi5hcHBlbmQoc3RyaWtlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gdG9kby50ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gdGhpcy5jcmVhdGVFbGVtZW50KCdidXR0b24nLCAnZGVsZXRlJyk7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgICAgICBsaS5hcHBlbmQoY2hlY2tib3gsIHNwYW4sIGRlbGV0ZUJ1dHRvbik7XG5cbiAgICAgICAgdGhpcy50b2RvTGlzdC5hcHBlbmQobGkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2codG9kb3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdExvY2FsTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIHRoaXMudG9kb0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXRhYmxlJykge1xuICAgICAgICB0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCA9ICh0YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlubmVyVGV4dDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRBZGRUb2RvKGhhbmRsZXI6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLl90b2RvVGV4dCkge1xuICAgICAgICBoYW5kbGVyKHRoaXMuX3RvZG9UZXh0KTtcbiAgICAgICAgdGhpcy5fcmVzZXRJbnB1dCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZERlbGV0ZVRvZG8oaGFuZGxlcjogKGlkOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdkZWxldGUnKSB7XG4gICAgICAgIGNvbnN0IGlkID0gKHRhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5pZDtcbiAgICAgICAgaGFuZGxlcihpZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBiaW5kRWRpdFRvZG8oaGFuZGxlcjogKGlkOiBzdHJpbmcsIHRleHQ6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMudG9kb0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5fdGVtcG9yYXJ5VG9kb1RleHQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBpZCA9ICh0YXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCkuaWQ7XG4gICAgICAgIGhhbmRsZXIoaWQsIHRoaXMuX3RlbXBvcmFyeVRvZG9UZXh0KTtcbiAgICAgICAgdGhpcy5fdGVtcG9yYXJ5VG9kb1RleHQgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRUb2dnbGVUb2RvKGhhbmRsZXI6IChpZDogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlmICh0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICBjb25zdCBpZCA9ICh0YXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCkuaWQ7XG4gICAgICAgIGhhbmRsZXIoaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb0NvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL3RvZG8uY29udHJvbGxlcic7XG5pbXBvcnQgeyBUb2RvU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdG9kby5zZXJ2aWNlJztcbmltcG9ydCB7IFRvZG9WaWV3IH0gZnJvbSAnLi92aWV3cy90b2RvLnZpZXdzJztcblxubmV3IFRvZG9Db250cm9sbGVyKG5ldyBUb2RvU2VydmljZSgpLCBuZXcgVG9kb1ZpZXcoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
import React, { useEffect, useReducer, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todoLayout.css';
import Login from '../components/Login';
import InputBox from '../components/InputBox';
import AllChecked from '../components/AllChecked';
import TodoList from '../components/TodoList';
import Todo from '../data/Index';

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'input':
            return [...state, action.payload]
        case 'check':
            return state.map(todo => (
                todo.id === action.payload.id ?
                    { ...todo, checked: !todo.checked } : todo
            ))
        case 'completed':
            return state.map(todo => (
                todo.id === action.payload.id ?
                    { ...todo, completed: true } : todo
            ))
        case 'delete':
            return state.filter(todo => todo.id !== action.payload.id)
        case 'allComplete':
            return state.map(todo => (
                todo.checked && todo.user === action.payload.user ?
                    { ...todo, completed: true } : todo
            ))
        case 'allDelete':
            return state.filter(todo => (
                !(todo.checked && todo.user === action.payload.user)
            ))
        default:
            return state;
    }
}

function TodoLayout(props) {

    const todoId = useRef(1);
    const [logUser, setLogUser] = useState('');
    const [inputTodo, setInputTodo] = useState('');
    const [todoList, dispatch] = useReducer(todoReducer, []);
    const [doneCount, setDoneCount] = useState(0);
    const [todoCount, setTodoCount] = useState(0);
    const [rate, setRate] = useState(0);


    const addTodo = () => {
        const todo = new Todo(todoId.current++, logUser, inputTodo, false, false);
        dispatch({ type: 'input', payload: todo });
        setInputTodo('');
    };


    const updateCheckbox = (id) => {
        dispatch({ type: 'check', payload: { id } });
    }


    const completeTodo = (id) => {
        dispatch({ type: 'completed', payload: { id } });
    }


    const deleteTodo = (id) => {
        const confirmCheck = confirm('정말 삭제하시겠습니까?');
        if (confirmCheck) {
            dispatch({ type: 'delete', payload: { id } });
        }

    }

    const allComplete = () => {
        const userTodo = todoList.filter(todo => todo.user === logUser);
        const todoAll = userTodo?.filter(todo => !todo.completed && todo.checked);

        if (todoAll.length === 0) {
            alert('일괄 완료할 일정을 선택해주세요.');
            return false;
        }

        dispatch({ type: 'allComplete', payload: { user: logUser } })
    }


    const allDelete = () => {
        const userTodo = todoList.filter(todo => todo.user === logUser);
        const todoAll = userTodo?.filter(todo => todo.checked);

        if (todoAll.length === 0) {
            alert('일괄 삭제할 일정을 선택해주세요.');
            return false;
        }

        const confirmCheck = confirm('정말 삭제하시겠습니까?');

        if (confirmCheck) {
            dispatch({ type: 'allDelete', payload: { user: logUser } });
        }
    }

    useEffect(() => {

        const userTodo = todoList.filter(todo => todo.user === logUser);
        const doneCount = userTodo.filter(todo => todo.completed).length;
        const todoCount = userTodo.length - doneCount;
        const rate = userTodo.length > 0 ? parseFloat(((doneCount / userTodo.length) * 100).toFixed(2)) : 0;

        setDoneCount(doneCount);
        setTodoCount(todoCount);
        setRate(rate);

    }, [todoList, logUser])

    return (
        <div className='container'>
            <main className='contents'>
                <header className='text-center'>
                    <h1>Todo List</h1>
                </header>
                <Login logUser={logUser}
                    setLogUser={setLogUser}
                />
                <div className='text-end'>
                    <p>한 일 : {doneCount} 건</p>
                    <p>할 일 : {todoCount} 건</p>
                    <p>달성률 : {rate} %</p>
                </div>
                <InputBox inputTodo={inputTodo}
                    setInputTodo={setInputTodo}
                    logUser={logUser}
                    addTodo={addTodo}
                />
                <AllChecked logUser={logUser}
                    allComplete={allComplete}
                    allDelete={allDelete}
                />
                <TodoList todoList={todoList}
                    logUser={logUser}
                    updateCheckbox={updateCheckbox}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                />
            </main>
        </div>
    );
}

export default TodoLayout;
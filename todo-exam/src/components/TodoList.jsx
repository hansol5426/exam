import { styled } from 'styled-components';
import '../assets/css/todoList.css';

const TodoDiv = styled.div`
    width: 100%;
    height: 90px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    border: 1px solid lightgray;
    background-color: ${(props) => props.$completed ? 'lightgray' : 'white'};
`

function TodoList({ todoList, logUser, updateCheckbox, completeTodo, deleteTodo }) {
    const userTodo = todoList.filter(todo => todo.user === logUser);

    return (
        <>
            <div className='todo-box'>
                {
                    userTodo?.map(todo => (
                        <TodoDiv className='mt-3'
                            key={todo.id}
                            $completed={todo.completed}>
                            <div className='todo-list'>
                                <input type='checkbox'
                                    checked={todo.checked}
                                    onChange={() => updateCheckbox(todo.id)} />
                            </div>
                            <div className='todo-text'
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : '',
                                    color: todo.completed ? 'gray' : 'balck'
                                }}
                            >{todo.text}</div>
                            <div className='todo-button'>
                                <button type='button'
                                    className='btn btn-primary me-2'
                                    checked={todo.checked}
                                    disabled={todo.completed ? true : false}
                                    onClick={() => completeTodo(todo.id)}
                                >완료</button>
                                <button type='button'
                                    className='btn btn-danger'
                                    onClick={() => deleteTodo(todo.id)}
                                >삭제</button>
                            </div>
                        </TodoDiv>
                    ))
                }
            </div >
        </>
    );
}

export default TodoList;
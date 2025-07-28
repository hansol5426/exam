import React from 'react';
import '../assets/css/inputBox.css';

function InputBox({ inputTodo, setInputTodo, logUser, addTodo }) {

    const newAddTodo = () => {

        if (!inputTodo.trim()) {
            alert('할 일을 입력해주세요.');
            return false;
        }

        addTodo();
    };

    const enterKey = (e) => {

        if (e.keyCode === 13) {
            newAddTodo();
        }

    }

    return (
        <>
            <div className='input-box'>
                <input type='text'
                    className='form-control'
                    placeholder='할 일을 입력해주세요'
                    onChange={(e) => setInputTodo(e.target.value)}
                    value={inputTodo}
                    onKeyDown={enterKey}
                    disabled={!logUser}
                />
                <button type='button'
                    className='btn btn-success'
                    onClick={newAddTodo}
                    disabled={!logUser}>등록</button>
            </div>
        </>
    );
}

export default InputBox;
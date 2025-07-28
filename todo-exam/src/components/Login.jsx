import React, { useEffect, useState } from 'react';
import '../assets/css/login.css';

function Login({ logUser, setLogUser }) {

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        const users = ['신동열', '김철수', '이민호'];
        setUsers(users);
    }, []);

    const loginUser = () => {
        if (!selected) {
            alert('사용자를 선택해주세요.')
            return false;
        }

        const user = users.find(name => name === selected);
        setLogUser(user);
    }

    const logoutUser = () => {
        setLogUser('');
    }

    return (
        <>
            <div className='login-box'>
                <select className='form-control'
                    onChange={(e) => setSelected(e.target.value)}
                    disabled={logUser}>
                    <option value='' hidden>로그인 할 사용자를 선택해주세요.</option>
                    {
                        users?.map((userName, i) => (
                            <option key={i} value={userName}>{userName}</option>
                        ))
                    }
                </select>
                {

                    logUser ? (
                        <button type='button'
                            className=' btn btn-warning'
                            onClick={logoutUser}>로그아웃</button>
                    ) :
                        <button type='button'
                            className=' btn btn-warning'
                            onClick={loginUser}>로그인</button>
                }

                <div>{logUser ? logUser : ''}</div>

            </div>
        </>
    );
}

export default Login;
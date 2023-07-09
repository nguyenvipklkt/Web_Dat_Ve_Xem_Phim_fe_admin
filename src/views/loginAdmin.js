import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoLogin from '../assets/imgs/images (1).jpg'


const LoginAdmin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        navigate('/userAdmin');
        try {
            const response = await axios.post('https://localhost:44358/api/admin/AdminAuthenticate/AdminLogin', {
                username: email,
                password: password,
            });

            // Xử lý phản hồi từ API ở đây
            console.log(response.data.data.user);

            if (response.data.code == 'Oke') {
                alert('Login successful!');

                // lưu trữ thông tin người dùng
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                localStorage.setItem('token', JSON.stringify(response.data.data.token));
                navigate('/userAdmin');
            }
            else {
                alert('Login fail!');
            }
        } catch (error) {
            // Xử lý lỗi và hiển thị thông báo lỗi
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        }
    };


    return (
        <div>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="imgcontainer-login">
                    <img src={logoLogin} alt="Avatar" className="avatar-login" />
                </div>

                <div className="container-login">
                    <label><b>Username</b></label>
                    <input type="email" placeholder="Enter Username" value={email} onChange={handleEmailChange} className="in-email" />

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" value={password} className="in-psw" onChange={handlePasswordChange} />

                    <button type="submit" className="btn-login">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginAdmin;
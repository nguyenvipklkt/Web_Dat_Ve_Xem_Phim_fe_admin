import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserAdmin = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    var token = {};
    var tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
        token = JSON.parse(tokenInLocalStorage);
    }

    const callApiWithToken = async () => {
        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };
            // Gửi yêu cầu API với tiêu đề chứa token
            const response = await axios.get('https://localhost:44358/api/admin/UserManagement/Get?limit=10&page=1', { headers });
            setUsers(response.data.data.data);
        } catch (error) {
            console.error(error);
            alert('Dang nhap het hieu luc')
            navigate('/');
        }
    }
    useEffect(() => {
        callApiWithToken();

    }, [])

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getNumberPhone = (nubPhone) => {
        if (!nubPhone) {
            return "NULL";
        }
        return nubPhone
    }

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a class="active" href="userAdmin">Người dùng</a>
                    <a href="movieAdmin">Phim</a>
                    <a href="cinemaAdmin">Rạp</a>
                    <a href="scheduleAdmin">Lịch chiếu</a>
                    <a href="ticketAdmin">Vé</a>
                    {/* <input class="search-user" type="text" placeholder="          search user ..." /> */}

                </div>
            </div>
            <div class="container">
                <h1>Quản lý người dùng</h1>
                <table class="table-users">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Tên sử dụng</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            {/* <th>Lựa chọn</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{getNumberPhone(user.numberPhone)}</td>
                                    <td>{getNumberPhone(user.email)}</td>
                                    <td>{getNumberPhone(user.address)}</td>
                                    <td>{user.username}</td>
                                    <td>{getFormattedDate(user.createdDate)}</td>
                                    <td>{getFormattedDate(user.updatedDate)}</td>
                                    {/* <td class="option-user">
                                        <a class="edit-user"><FontAwesomeIcon icon={faPenToSquare} className="faPenToSquare-user" /></a>
                                        <a class="remove-user"><FontAwesomeIcon icon={faXmark} className="faXmark-user" /></a>
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserAdmin;
import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TicketAdmin = () => {

    const [tickets, setTickets] = useState([]);

    const navigate = useNavigate();

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
            const response = await axios.get('https://localhost:44358/api/admin/OrderTicketManagement/Get?limit=10&page=1', { headers });
            setTickets(response.data.data.data);
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

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a href="userAdmin">Người dùng</a>
                    <a href="movieAdmin">Phim</a>
                    <a href="cinemaAdmin">Rạp</a>
                    <a href="scheduleAdmin">Lịch chiếu</a>
                    <a class="active" href="ticketAdmin">Vé</a>
                    {/* <input class="search-user" type="text" placeholder="          search user ..." /> */}
                </div>
                <div className="container">
                    <h1>Quản lý vé</h1>
                    <table class="table-users">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Người đặt</th>
                                <th>Số điện thoại</th>
                                <th>email</th>
                                <th>Ghế đã đặt</th>
                                <th>Thành tiền</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map((ticket) => (
                                    <tr>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.numberPhone}</td>
                                        <td>{ticket.email}</td>
                                        <td>{ticket.seatList}</td>
                                        <td>{ticket.totalPrice}</td>
                                        <td>{getFormattedDate(ticket.createdDate)}</td>
                                        <td>{getFormattedDate(ticket.updatedDate)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TicketAdmin;
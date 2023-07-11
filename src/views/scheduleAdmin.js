import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScheduleAdmin = () => {

    const navigate = useNavigate();

    const [schedules, setSchedules] = useState([]);

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
            const response = await axios.get('https://localhost:44358/api/admin/ScheduleManagement/Get?limit=10&page=1', { headers });
            setSchedules(response.data.data.data);
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

    const deleteSchedule = async (id) => {
        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };
            // Gửi yêu cầu API với tiêu đề chứa token
            await axios.delete(`https://localhost:44358/api/admin/ScheduleManagement/Delete?id=${id}`, { headers });

            alert(`xóa Rạp số ${id} thành công!`)

            navigate('/scheduleAdmin');

        } catch (error) {
            console.error(error);
            alert(`xóa phim số ${id} thất bại`)
            navigate('/scheduleAdmin');
        }
    }

    function formatDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const timeStr = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        const dateStr = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

        return `${timeStr} ${dateStr}`;

    }

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a href="userAdmin">Người dùng</a>
                    <a href="movieAdmin">Phim</a>
                    <a href="cinemaAdmin">Rạp</a>
                    <a class="active" href="scheduleAdmin">Lịch chiếu</a>
                    <a href="ticketAdmin">Vé</a>
                    {/* <input class="search-user" type="text" placeholder="          search user ..." /> */}
                </div>
                <div className="container">
                    <h1>Quản lý lịch chiếu</h1>
                    <h2>Thêm lịch chiếu : <a href="addSchedule"><FontAwesomeIcon icon={faPlus} /></a></h2>
                    <table class="table-users">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Phim</th>
                                <th>Rạp</th>
                                <th>Chi tiết Lịch chiếu</th>
                                <th>Lượt đặt</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Lựa chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                schedules.map((schedule) => (
                                    <tr>
                                        <td>{schedule.id}</td>
                                        <td>{schedule.movieName}</td>
                                        <td>{schedule.cinemaName}</td>
                                        <td>{formatDateTime(schedule.playSchedule)}</td>
                                        <td>{schedule.seatHaveBeenBookedList}</td>
                                        <td>{getFormattedDate(schedule.createdDate)}</td>
                                        <td>{getFormattedDate(schedule.updatedDate)}</td>
                                        <td class="option-user">
                                            <a class="edit-user" href={"/updateSchedule/" + schedule.id}><FontAwesomeIcon icon={faPenToSquare} className="faPenToSquare-user" /></a>
                                            <a class="remove-user"><FontAwesomeIcon icon={faXmark} className="faXmark-user" onClick={() => deleteSchedule(schedule.id)} /></a>
                                        </td>
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

export default ScheduleAdmin;
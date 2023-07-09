import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CinemaAdmin = () => {

    const [cinemas, setCinemas] = useState([]);

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
            const response = await axios.get('https://localhost:44358/api/admin/CinemaManagement/Get?limit=10&page=1', { headers });
            setCinemas(response.data.data.data);
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


    const deleteCinema = async (id) => {
        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };
            // Gửi yêu cầu API với tiêu đề chứa token
            await axios.delete(`https://localhost:44358/api/admin/CinemaManagement/Delete?id=${id}`, { headers });

            alert(`xóa Rạp số ${id} thành công!`)

            navigate('/cinemaAdmin');

        } catch (error) {
            console.error(error);
            alert(`xóa phim số ${id} thất bại`)
            navigate('/cinemaAdmin');
        }
    }

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a href="userAdmin">Người dùng</a>
                    <a href="movieAdmin">Phim</a>
                    <a class="active" href="cinemaAdmin">Rạp</a>
                    <a href="scheduleAdmin">Lịch chiếu</a>
                    <a href="ticketAdmin">Vé</a>
                    {/* <input class="search-user" type="text" placeholder="          search user ..." /> */}
                </div>
            </div>

            <div class="container">
                <h1>Quản lý rạp</h1>
                <h2>Thêm rạp : <a href="addCinema"><FontAwesomeIcon icon={faPlus} /></a></h2>
                <table class="table-users">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên rạp</th>
                            <th>Địa chỉ</th>
                            <th>Chi tiết</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Lựa chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cinemas.map((cinema) => (
                                <tr>
                                    <td>{cinema.id}</td>
                                    <td>{cinema.name}</td>
                                    <td>{cinema.address}</td>
                                    <td>{cinema.description}</td>
                                    <td>{getFormattedDate(cinema.createdDate)}</td>
                                    <td>{getFormattedDate(cinema.updatedDate)}</td>
                                    <td class="option-user">
                                        <a class="edit-user" href={"/updateCinema/" + cinema.id}><FontAwesomeIcon icon={faPenToSquare} className="faPenToSquare-user" /></a>
                                        <a class="remove-user"><FontAwesomeIcon icon={faXmark} className="faXmark-user" onClick={() => deleteCinema(cinema.id)} /></a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CinemaAdmin;
import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateSchedule = () => {

    let { id } = useParams();

    const [schedule, setSchedule] = useState({
        movieId: '',
        cinemaId: '',
        playSchedule: ''
    })

    var handleChange = (event) => {
        const { name, value } = event.target;
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: value
        }));
        console.log(name);
    }

    const navigate = useNavigate();

    var token = {};
    var tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
        token = JSON.parse(tokenInLocalStorage);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
        axios.put(`https://localhost:44358/api/admin/ScheduleManagement/Update?id=${id}`, schedule, { headers })
            .then(response => {
                console.log('Cập nhật thành công:', response.data);
                // Cập nhật thông tin người dùng hiển thị
                setSchedule(response.data);
                alert(`Update schedule ${id} success !`)
                navigate('/scheduleAdmin');
            })
            .catch(error => {
                console.error('Lỗi cập nhật:', error);
            });
    };

    return (
        <div>
            <h1 className="edituser-text">Cập nhật lịch chiếu số {id}</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label htmlFor="movieId">Id phim : </label>
                    <input type="number" name="movieId" value={schedule.movieId || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="cinemaId">Id rạp : </label>
                    <input type="number" name="cinemaId" value={schedule.cinemaId || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="playSchedule">Lịch chiếu : </label>
                    <input type="datetime-local" name="playSchedule" value={schedule.playSchedule || ''} onChange={handleChange} />
                </div>
                <button type="submit" class="btn-submit">Lưu thay đổi</button>

            </form>
        </div>
    )
}

export default UpdateSchedule;
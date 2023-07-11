import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSchedule = () => {

    const [movieId, setMovieId] = useState('');
    const [cinemaId, setCinemaId] = useState('');
    const [playSchedule, setPlaySchedule] = useState('');

    const navigate = useNavigate();

    var token = {};
    var tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
        token = JSON.parse(tokenInLocalStorage);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        const scheduleData = {
            movieId: movieId,
            cinemaId: cinemaId,
            playSchedule: playSchedule
        };

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post('https://localhost:44358/api/admin/ScheduleManagement/Store', scheduleData, { headers });

            console.log(response.data);
            if (response.data.code == 'Oke') {
                alert('add schedule successful!');
                navigate('/scheduleAdmin');
            }
            else {
                alert('add schedule fail!');
            }
            // Reset các trường sau khi đăng ký thành công

        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1 className="edituser-text">Thêm lịch chiếu</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div>
                    <div class="input-name">
                        <label for="movieId">Id film : </label>
                        <input
                            type="number"
                            value={movieId}
                            onChange={(event) => setMovieId(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="cinemaId">Id rạp : </label>
                        <input
                            type="number"
                            value={cinemaId}
                            onChange={(event) => setCinemaId(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="playSchedule">Lịch chiếu : </label>
                        <input
                            type="datetime-local"
                            value={playSchedule}
                            onChange={(event) => setPlaySchedule(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" class="btn-submit">Thêm lịch chiếu</button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default AddSchedule;
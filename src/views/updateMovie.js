import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {

    let { id } = useParams();

    const [movie, setMovie] = useState({
        name: '',
        author: '',
        cast: '',
        movieType: '',
        time: '',
        releaseDate: '',
        description: '',
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setMovie(prevMovie => ({
            ...prevMovie,
            [name]: value,
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
        axios.put(`https://localhost:44358/api/admin/MovieManagement/Update?id=${id}`, movie, { headers })
            .then(response => {
                console.log('Cập nhật thành công:', response.data);
                // Cập nhật thông tin người dùng hiển thị
                setMovie(response.data);
                alert(`Update movie ${id} success !`)
                navigate('/movieAdmin');
            })
            .catch(error => {
                console.error('Lỗi cập nhật:', error);
            });
    };

    return (
        <div>
            <h1 className="edituser-text">Cập nhật movie số {id}</h1>

            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label htmlFor="name">Tên Film : </label>
                    <input type="text" name="name" value={movie.name || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="author">Tác giả : </label>
                    <input type="text" name="author" value={movie.author || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="cast">Diễn viên : </label>
                    <input type="text" name="cast" value={movie.cast || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="movieType">Thể loại : </label>
                    <input type="number" name="movieType" value={movie.movieType || ''} onChange={handleChange} />
                    {/* <select value={movie.movieType || ''} onChange={handleChange} required>
                        <option value=''>Chọn thể loại</option>
                        <option value='1'>Hành động</option>
                        <option value="2">Tình cảm</option>
                        <option value="3">Hoạt hình</option>
                        <option value="4">Kinh dị</option>
                    </select> */}
                </div>
                <div class="input-name">
                    <label htmlFor="time">Thời gian : </label>
                    <input type="number" name="time" value={movie.time || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="releaseDate">Ngày khởi chiếu : </label>
                    <input type="date" name="releaseDate" value={movie.releaseDate || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="description">Mô tả : </label>
                    <input type="text" name="description" value={movie.description || ''} onChange={handleChange} />
                </div>
                <button type="submit" class="btn-submit">Lưu thay đổi</button>
            </form>
        </div>
    )

}

export default UpdateMovie;
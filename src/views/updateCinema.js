import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCinema = () => {

    let { id } = useParams();
    const [cinema, setCinema] = useState({
        name: '',
        address: '',
        description: ''
    })

    var handleChange = (event) => {
        const { name, value } = event.target;
        setCinema(prevCinema => ({
            ...prevCinema,
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
        axios.put(`https://localhost:44358/api/admin/CinemaManagement/Update?id=${id}`, cinema, { headers })
            .then(response => {
                console.log('Cập nhật thành công:', response.data);
                // Cập nhật thông tin người dùng hiển thị
                setCinema(response.data);
                alert(`Update cinema ${id} success !`)
                navigate('/cinemaAdmin');
            })
            .catch(error => {
                console.error('Lỗi cập nhật:', error);
            });
    };

    return (
        <div>
            <h1 className="edituser-text">Cập nhật rạp số {id}</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label htmlFor="name">Tên rạp : </label>
                    <input type="text" name="name" value={cinema.name || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="address">Địa chỉ : </label>
                    <input type="text" name="address" value={cinema.address || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="description">Mô tả : </label>
                    <input type="text" name="description" value={cinema.description || ''} onChange={handleChange} />
                </div>
                <button type="submit" class="btn-submit">Lưu thay đổi</button>

            </form>
        </div>
    )
}

export default UpdateCinema;
import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCinema = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    var token = {};
    var tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
        token = JSON.parse(tokenInLocalStorage);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        const theaterData = {
            name: name,
            address: address,
            description: description
        };

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post('https://localhost:44358/api/admin/CinemaManagement/Store', theaterData, { headers });

            console.log(response.data);
            if (response.data.code == 'Oke') {
                alert('add cinema successful!');
                navigate('/cinemaAdmin');
            }
            else {
                alert('add cinema fail!');
            }
            // Reset các trường sau khi đăng ký thành công

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="edituser-text">Thêm rạp</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div>
                    <div class="input-name">
                        <label for="name">Tên rạp : </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="address">Địa chỉ : </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="description">Mô tả : </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" class="btn-submit">Thêm Rạp</button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default AddCinema;
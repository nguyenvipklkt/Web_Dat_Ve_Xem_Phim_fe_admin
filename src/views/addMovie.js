import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovie = () => {

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [cast, setCast] = useState('');
    const [movieType, setMovieType] = useState('');
    const [time, setTime] = useState('');
    const [imageFile, setImage] = useState(null);
    const [releaseDate, setReleaseDate] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    var token = {};
    var tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
        token = JSON.parse(tokenInLocalStorage);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('author', author);
        formData.append('cast', cast);
        formData.append('movieType', movieType);
        formData.append('time', time);
        formData.append('releaseDate', releaseDate);
        formData.append('description', description);
        formData.append('imageFile', imageFile, imageFile.name);

        console.log(formData.get("imageFile"))

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            };

            console.log(formData)

            const response = await axios.post('https://localhost:44358/api/admin/MovieManagement/Store', formData, { headers });

            console.log(response.data);
            if (response.data.code == 'Oke') {
                alert('add film successful!');
                navigate('/movieAdmin');
            }
            else {
                alert('add film fail!');
            }
            // Reset các trường sau khi đăng ký thành công

        }
        catch (error) {
            console.log(error);
        }
    }

    const handleGenreChange = (event) => {
        setMovieType(event.target.value);
    };

    return (
        <div>
            <h1 className="edituser-text">Add movie</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div>
                    <div class="input-name">
                        <label for="name">Tên film : </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="author">Tác giả : </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}

                        />
                    </div>
                    <div class="input-name">
                        <label for="cast">Diễn viên : </label>
                        <input
                            type="text"
                            value={cast}
                            onChange={(event) => setCast(event.target.value)}

                        />
                    </div>
                    <div class="input-name">
                        <label for="movieType">Thể loại : </label>
                        <select value={movieType} onChange={handleGenreChange} required>
                            <option value="">Chọn thể loại</option>
                            <option value="1">Hành động</option>
                            <option value="2">Tình cảm</option>
                            <option value="3">Hoạt hình</option>
                            <option value="4">Kinh dị</option>
                        </select>
                    </div>
                    <div class="input-name">
                        <label for="time">Thời gian : </label>
                        <input
                            type="number"
                            value={time}
                            onChange={(event) => setTime(event.target.value)}

                        />
                    </div>
                    <div class="input-name">
                        <label for="releaseDate">Ngày khởi chiếu : </label>
                        <input
                            type="datetime-local"
                            value={releaseDate}
                            onChange={(event) => setReleaseDate(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="image">Ảnh : </label>
                        <input
                            type="file"
                            name="imageFile"
                            onChange={(event) => setImage(event.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                    <div class="input-name">
                        <label for="description">Chi tiết : </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}

                        />
                    </div>
                    <div>
                        <button type="submit" class="btn-submit">Thêm film</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddMovie;
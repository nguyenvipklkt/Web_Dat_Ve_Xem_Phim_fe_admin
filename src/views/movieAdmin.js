import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MovieAdmin = () => {

    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

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
            const response = await axios.get('https://localhost:44358/api/admin/MovieManagement/Get?limit=10&page=1', { headers });
            setMovies(response.data.data.data);
        } catch (error) {
            console.error(error);
            alert('Dang nhap het hieu luc')
            navigate('/');
        }
    }

    const deleteMovie = async (id) => {
        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };
            // Gửi yêu cầu API với tiêu đề chứa token
            await axios.delete(`https://localhost:44358/api/admin/MovieManagement/Delete?id=${id}`, { headers });

            alert(`xóa phim số ${id} thành công!`)

            navigate('/movieAdmin');

        } catch (error) {
            console.error(error);
            alert(`xóa phim số ${id} thất bại`)
            navigate('/movieAdmin');
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

    const getImage = (img) => {
        return `https://localhost:44358/${img}`
    }

    const getFormatMovieType = (mvt) => {
        if (mvt == 1) {
            return 'Hành động'
        }
        else if (mvt == 2) {
            return "Tình cảm"
        }
        else if (mvt == 3) {
            return "Hoạt hình"
        }
        else if (mvt == 4) {
            return "Kinh dị"
        }
    }

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a href="userAdmin">Người dùng</a>
                    <a class="active" href="movieAdmin">Phim</a>
                    <a href="cinemaAdmin">Rạp</a>
                    <a href="scheduleAdmin">Lịch chiếu</a>
                    <a href="ticketAdmin">Vé</a>
                    {/* <input class="search-user" type="text" placeholder="          search user ..." /> */}
                </div>
            </div>
            <div class="container">
                <h1>Quản lý phim</h1>
                <h2>Thêm film : <a href="addMovie"><FontAwesomeIcon icon={faPlus} /></a></h2>
                <table class="table-users">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên phim</th>
                            <th>Tác giả</th>
                            <th>Đạo diễn</th>
                            <th>Thể loại</th>
                            <th>Thời gian</th>
                            <th>Ngày khởi chiếu</th>
                            <th>Ảnh</th>
                            <th>Chi tiết</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Lựa chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map((movie) => (
                                <tr>
                                    <td>{movie.id}</td>
                                    <td>{movie.name}</td>
                                    <td>{movie.author}</td>
                                    <td>{movie.cast}</td>
                                    <td>{getFormatMovieType(movie.movieType)}</td>
                                    <td>{movie.time}</td>
                                    <td>{getFormattedDate(movie.releaseDate)}</td>
                                    <td><img src={getImage(movie.image)} style={{ width: "100px" }} /></td>
                                    <td>{movie.description}</td>
                                    <td>{getFormattedDate(movie.createdDate)}</td>
                                    <td>{getFormattedDate(movie.updatedDate)}</td>
                                    <td class="option-user">
                                        <a class="edit-user" href={"/updateMovie/" + movie.id}><FontAwesomeIcon icon={faPenToSquare} className="faPenToSquare-user" /></a>
                                        <a class="remove-user"><FontAwesomeIcon icon={faXmark} className="faXmark-user" onClick={() => deleteMovie(movie.id)} /></a>
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

export default MovieAdmin;
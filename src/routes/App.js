import '../assets/css/App.css';
import { Route, Routes } from 'react-router-dom';
import LoginAdmin from '../views/loginAdmin';
import UserAdmin from '../views/userAdmin';
import MovieAdmin from '../views/movieAdmin';
import AddMovie from '../views/addMovie';
import CinemaAdmin from '../views/cinemaAdmin';
import AddCinema from '../views/addCinema';
import UpdateMovie from '../views/updateMovie';
import UpdateCinema from '../views/updateCinema';
import ScheduleAdmin from '../views/scheduleAdmin';
import TicketAdmin from '../views/ticketAdmin';
import AddSchedule from '../views/addSchedule';
import UpdateSchedule from '../views/updateSchedule';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<LoginAdmin />} />
        <Route path='userAdmin' element={<UserAdmin />} />
        <Route path='movieAdmin' element={<MovieAdmin />} />
        <Route path='addMovie' element={<AddMovie />} />
        <Route path='updateMovie/:id' element={<UpdateMovie />} />
        <Route path='cinemaAdmin' element={<CinemaAdmin />} />
        <Route path='addCinema' element={<AddCinema />} />
        <Route path='updateCinema/:id' element={<UpdateCinema />} />
        <Route path='scheduleAdmin' element={<ScheduleAdmin />} />
        <Route path='ticketAdmin' element={<TicketAdmin />} />
        <Route path='addSchedule' element={<AddSchedule />} />
        <Route path='updateSchedule/:id' element={<UpdateSchedule />} />


      </Routes>
    </div>
  );
}

export default App;

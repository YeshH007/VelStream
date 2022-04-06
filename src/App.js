import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  User,
  History,
  Liked,
  PlaylistPage,
  VideoListing,
  WatchLater,
  Login,
  Signup,
  SinglePlaylistPage,
  SingleVideoPage,
} from "./pages";
import { Navbar } from "./components";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App dark">
      <Navbar />

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        theme={"colored"}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/explore" element={<VideoListing />} />
        <Route path="/explore/:videoID" element={<SingleVideoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/history" element={<History />} />
        <Route path="/user" element={<User />} />
        <Route path="/playlist/:playlistID" element={<SinglePlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;

import "./PlaylistModal.css";
import { useState } from "react";
import {
  createNewPlaylistService,
  addToPlaylistService,
  removeFromPlaylistService,
} from "../../services";
import { usePlaylist, useAuth } from "../../context";
import { checkIfVideoInPlaylist } from "../../helpers";

export function PlaylistModal({
  setIsPlaylistModalVisible,
  playlistModalVideo,
}) {
  const [isCreatePlaylistInpVisible, setIsCreatePlaylistInpVisible] =
    useState(false);

  const [newPlaylistData, setNewPlaylistData] = useState({
    title: "",
    descripton: "Some Dummy desc",
  });

  const {
    playlistDispatch,
    playlistState: { playlists },
  } = usePlaylist();

  const {
    authState: { token },
  } = useAuth();

  const handleClosePlaylistModalClick = () => {
    setIsPlaylistModalVisible(false);
    setIsCreatePlaylistInpVisible(false);
  };

  const handleCreatePlaylistClick = () => {
    if (!isCreatePlaylistInpVisible) {
      setIsCreatePlaylistInpVisible(true);
    }

    if (
      newPlaylistData.title.trim() !== "" &&
      playlists.findIndex((item) => item.title === newPlaylistData.title) === -1
    ) {
      const requestBody = { playlist: newPlaylistData };
      createNewPlaylistService({
        requestBody,
        token,
        playlistDispatch,
      });
      setNewPlaylistData({ title: "", descripton: "Some Dummy desc" });
    }
  };

  const handleNewPlaylistDataChange = (e) => {
    setNewPlaylistData((data) => ({ ...data, title: e.target.value }));
  };

  const handlePlaylistCheckboxClick = (e) => {
    if (e.target.checked) {
      addToPlaylistService({
        token,
        video: playlistModalVideo,
        playlistId: e.target.id,
        playlistDispatch,
      });
    } else {
      removeFromPlaylistService({
        token,
        video: playlistModalVideo,
        playlistId: e.target.id,
        playlistDispatch,
      });
    }
  };

  return (
    <div className="playlist-modal flex flex-center">
      <div className="modal m-md1 p-xs">
        <header className="p-xs">
          <div className="modal-title fs-4"> Save to... </div>
          <button
            onClick={handleClosePlaylistModalClick}
            className="fs-4 transparent-bg close-btn"
          >
            <i className="fas fa-times"></i>
          </button>
        </header>
        <section className="modal-body">
          <div className="input-wrapper checkbox disabled">
            <input disabled type="checkbox" id="checkbox-1" />
            <label htmlFor="checkbox-1" className="m-xxs m-tb0">
              Watch Later
            </label>
          </div>

          {playlists.length > 0
            ? playlists.map((item) => (
                <div key={item._id} className="input-wrapper checkbox">
                  <input
                    type="checkbox"
                    id={item._id}
                    onChange={handlePlaylistCheckboxClick}
                    checked={checkIfVideoInPlaylist(
                      playlists,
                      playlistModalVideo._id,
                      item._id
                    )}
                  />
                  <label htmlFor={item._id} className="m-xxs m-tb0">
                    {item.title}
                  </label>
                </div>
              ))
            : null}
        </section>

        <footer className="p-xs">
          {isCreatePlaylistInpVisible ? (
            <input
              className="p-xxs m-xxs m-rl0 transparent-bg create-playlist-input"
              type="text"
              id="name"
              placeholder="My Playlist"
              onChange={handleNewPlaylistDataChange}
              value={newPlaylistData.title}
            />
          ) : null}

          <button onClick={handleCreatePlaylistClick}>
            <i className="fa-solid fa-plus"></i>
            <span className="m-xxs m-tb0"> Create New Playlist</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
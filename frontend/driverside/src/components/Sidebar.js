import React, { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import axios from "axios";

function Sidebar() {
  const [user, setuser] = useState("Username");
  useEffect(() => {
    const ft = async () => {
      const response = await axios.get("/users/current_user");
      setuser(response.data["username"]);
    };
    ft();
  }, [user]);
  function logout() {
    window.location.href = "http://127.0.0.1:8000/users/logout";
  }
  return (
    <div id="sidebar">
      <div>
        <button
          id="cancel"
          onClick={() => {
            document.getElementById("sidebar").style.width = "0%";
          }}
        >
          <GiCancel size={23} />
        </button>
      </div>
      <div className="usericon">
        <img
          src="https://cdn.discordapp.com/attachments/758938874466009101/1026863658325778482/unknown.png"
          alt="Avatar"
          className="avataricon"
        />
      </div>
      <div className="username">{user}</div>
      <div className="busno">
        <div className="text">Bus No</div>
        <select id="bus" name="busno">
          <option value="7">30</option>
          <option value="5">39</option>
          <option value="2">46</option>
          <option value="3">9</option>
        </select>
      </div>
      <div className="text">BusStop Name</div>
      <div className="Stopno">
        <select id="stop" name="stopno">
          <option value="7">Chromphet bus stand</option>
          <option value="5">Kundrathur</option>
          <option value="2">Palavanthangal</option>
          <option value="3">kfc</option>
        </select>
      </div>
      <button
        className="logout"
        onClick={() => logout()}
        type="submit"
        value="logout"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;

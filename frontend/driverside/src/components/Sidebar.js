import React, { useContext, useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Appcontext from "./Appcontext";

function Numberlist(props) {
  const numbers = props.numbers;
  return numbers.map((ele) => (
    <option value={ele[1]} key={ele[0]}>
      {ele[1].substring(1, ele[1].length - 1)}
    </option>
  ));
}

function Sidebar() {
  const [busno, setbusno] = useState([]);
  const { selbus, setselbus } = useContext(Appcontext);

  useEffect(() => {
    if (!localStorage.getItem("busroutes")) {
      const fr = async () => {
        const rep = await axios.get("/coord/busno");
        let t = Object.keys(rep.data).length;
        var ar = [];
        for (let index = 2; index < t; index++) {
          ar.push([rep.data[index]["id"], rep.data[index]["routeno"]]);
        }
        localStorage.setItem("busroutes", JSON.stringify(ar));
        setbusno(ar);
      };
      fr();
    } else {
      var x = localStorage.getItem("busroutes");
      setbusno(JSON.parse(x));
    }
    //eslint-disable-next-line;
  }, []);
  const [user, setuser] = useState("Username");
  useEffect(() => {
    const ft = async () => {
      const response = await axios.get("/users/current_user");
      setuser(response.data["username"]);
    };
    ft();
  }, [user]);

  function logout() {
    console.log(selbus);
    window.location.href = "http://127.0.0.1:8000/users/logout";
  }

  return (
    <div id="sidebar">
      <div>
        <button
          id="cancel"
          title="CancelButton"
          onClick={() => {
            document.getElementById("sidebar").style.width = "0%";
          }}
        >
          <GiCancel size={33} />
        </button>
      </div>
      <div className="usericon">
        <img
          id="avataricon"
          width={150}
          alt="Profile Avatar"
          src={`https://avatars.dicebear.com/api/bottts/${user}.png`}
        />
      </div>
      <div className="username">{user}</div>
      <div className="busno">
        <div className="text">Bus No</div>

        <select
          id="bus"
          title="SelectTag"
          onChange={(event) => {
            setselbus(event.target.value);
          }}
        >
          <Numberlist numbers={busno} />
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

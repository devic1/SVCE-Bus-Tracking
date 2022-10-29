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
function BusstopnameList(props) {
  const stops = props.stops;
  return stops.map((ele, index) => (
    <option value={ele} key={index}>
      {ele}
    </option>
  ));
}

function Sidebar() {
  const [busno, setbusno] = useState([]);
  const { selbus, setselbus } = useContext(Appcontext);
  const [bustopname, setbustopname] = useState();
  const [stopname, setstopname] = useState([1, 2, 3]);

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
  }, []);

  const [user, setuser] = useState("Username");
  useEffect(() => {
    const ft = async () => {
      const response = await axios.get("/users/current_user");
      setuser(response.data["username"]);
    };
    ft();
  }, [user]);

  useEffect(() => {
    const st = async () => {
      const response = await axios.get("/users/busno");
      setselbus(response.data[0]["busno"]);
    };
    st();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const ft = async () => {
      const response = await axios.get("/coord/busno/" + selbus);
      setstopname(response.data);
      setbustopname(response.data[0]);
    };

    ft();
    //eslint-disable-next-line
  }, [selbus]);
  useEffect(() => {
    const k = {
      ad: user,
      busno: selbus,
      stopname: bustopname,
    };
    const st = async () => {
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.xsrfHeaderName = "X-CSRFToken";
      await axios.put("/users/busno", k);
    };
    st().catch((e) => {
      setselbus(selbus);
    });
    //eslint-disable-next-line
  }, [selbus]);

  function logout() {
    window.location.href = "/users/logout";
  }

  return (
    <div id="sidebar">
      <div>
        <button
          id="cancel"
          title="Cancel"
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
          title="Busno"
          value={selbus}
          onChange={(event) => {
            setselbus(event.target.value);
          }}
        >
          <Numberlist numbers={busno} />
        </select>
      </div>
      <div className="text">BusStop Name</div>
      <div className="Stopno">
        <select
          id="stop"
          title="Bustop"
          name="stopno"
          value={bustopname}
          onChange={(event) => {
            setbustopname(event.target.value);
          }}
        >
          <BusstopnameList stops={stopname} />
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

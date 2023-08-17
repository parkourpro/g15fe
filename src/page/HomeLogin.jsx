import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const navigate = useNavigate()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      username,
      password
    }

    try {
      const res = await axios.post("/auth/login", payload)
      const data = res.data
      if (res.status === 200) {
        if (data.isAdmin) {
          setUser(data);
          setModalMessage("Login successful.");
          setShowModal(true);
          setRedirectToHome(true);
        } else {
          setModalMessage("Login invalid.");
          setShowModal(true);
        }
      } else {
        setModalMessage("Login invalid.");
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
      setModalMessage("Username or Password is incorect");
      setShowModal(true);
    }

  }


  return (
    <div className="flex flex-col min-h-screen bg-orange-950">
      <div className="mb-auto lg:w-1/3 mx-auto mt-auto rounded-3xl bg-stone-900 p-10 ">
        <h1 className="text-2xl uppercase font-semibold text-orange-400 pb-2 text-center">
          Welcome back
        </h1>
        <h1 className="font-semibold text-4xl text-blue-50 m-4">Login to Administration.</h1>

        <form className="mt-10" onSubmit={handleLoginSubmit}>
          <div className="pt-2 pb-3 px-5 rounded-2xl bg-stone-800 mb-4">
            <h1 className="text-stone-500 text-sm">Username</h1>
            <input
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              className="bg-stone-800 w-full outline-none"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="pt-2 pb-3 px-5 rounded-2xl bg-stone-800 ">
            <h1 className="text-stone-500 text-sm">Password</h1>
            <input
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="bg-stone-800 w-full outline-none"
              type="password"
              placeholder="•••••••"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-2 mt-10 block mx-auto text-lg font-semibold rounded-full text-white bg-gradient-to-r from-orange-400 to-orange-500"
          >
            Log in
          </button>
        </form>
      </div>
      <Footer />
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-center">{modalMessage}</p>
            <button
              onClick={() => {
                setShowModal(false);
                if (redirectToHome) {
                  setRedirectToHome(false);
                  navigate('/home')
                }
              }}
              className="block mx-auto mt-4 px-4 py-2 rounded bg-blue-500 text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

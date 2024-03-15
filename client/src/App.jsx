import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import "./style.css";

const App = () => {
  axios.defaults.withCredentials = true;

  // const handleSubmit = (e) => {
  //   e.preventDefaul();
  //   axios
  //     .post("https://epics-mern-rose.vercel.app/")
  //     .then((result) => console.log(result))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="w-full p-6 text-[rgb(67,128,47)]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;

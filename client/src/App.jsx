import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-full p-6 text-[rgb(67,128,47)]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;

import {PlusIcon} from "lucide-react";
import {Link, NavLink} from "react-router"
import { Timer } from "lucide-react";
const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            TaskBoard
          </h1>
          <div className="flex items-center gap-4">
            <NavLink
              to="/timer"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md"
                    : "hover:bg-primary hover:text-primary-content"
                }`
              }
            >
              <Timer className="size-5" />
              <span className="font-medium">Stopwatch</span>
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar
  //  <nav className="bg-gradient-to-r from-slate-800/90 via-slate-900/90 to-slate-800/90 shadow-lg backdrop-blur-sm border-b border-purple-900/30 px-6 py-4">
  //     <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
  //       <h2 className="text-2xl font-bold mb-4 sm:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
  //         To-Do List
  //       </h2>
  //       <div className="flex space-x-6 ">
  //         <Link
  //           className="text-gray-300 p-2  text-1xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-colors duration-300 font-medium"
  //           to="/"
  //         >
  //           All Tasks
  //         </Link>
  //         <Link
  //           className="text-gray-300 p-2 text-1xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-colors duration-300 font-medium"
  //           to="/create-task"
  //         >
  //           Create Task
  //         </Link>
  //       </div>
  //     </div>
  //   </nav>
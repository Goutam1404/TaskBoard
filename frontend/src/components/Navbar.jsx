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
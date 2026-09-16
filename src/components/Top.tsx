import { ThemeButton } from "./ThemeController";
import { Link } from "react-router-dom";

interface TopProps {
    title: string;
}

export const Top = ({ title }: TopProps) => {

    return (
        <nav className="navbar bg-base-100 h-20 shadow-sm">
            <div className="flex justify-between w-full items-center mx-10">
                <Link to='/'><a className="btn btn-ghost text-xl font-bold title">{title}</a></Link>
                <ThemeButton />
            </div>
        </nav>
    );
};
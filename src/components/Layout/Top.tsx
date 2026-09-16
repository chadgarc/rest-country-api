import { ThemeButton } from "./ThemeController";
import { Link } from "react-router-dom";

/**
 * Props for the `Top` navigation component.
 *
 * @interface TopProps
 * @property {string} title - The title text displayed in the navbar.
 */
interface TopProps {
    title: string;
}

/**
 * Navigation bar component that renders the app title and theme toggle.
 *
 * @param {TopProps} props - Component props.
 * @param {string} props.title - The title text displayed in the navbar.
 * @returns {JSX.Element} The navigation bar element.
 */
export const Top = ({ title }: TopProps) => {

    return (
        <nav className="navbar bg-base-100 h-20 shadow-sm">
            <div className="flex justify-between w-full items-center mx-10">
                <Link to='/' className="btn btn-ghost text-xl font-bold title">{title}</Link>
                <ThemeButton />
            </div>
        </nav>
    );
};
import { ThemeButton } from "./ThemeController";

interface TopProps {
    title: string;
}

export const Top = ({ title }: TopProps) => {

    return (
        <nav className="navbar bg-base-100 h-20 shadow-sm">
            <div className="flex justify-between w-full items-center mx-10">
                <a className="btn btn-ghost text-xl font-bold title">{title}</a>
                <ThemeButton />
            </div>
        </nav>
    );
};
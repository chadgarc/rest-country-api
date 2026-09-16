import { ThemeProvider } from "../Contexts/ThemeContext";
import { DataProvider } from "../Contexts/CountryData";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </ThemeProvider>
    )
}
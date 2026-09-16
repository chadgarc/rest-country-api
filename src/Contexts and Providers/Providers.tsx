import { ThemeProvider } from "./ThemeContext";
import { DataProvider } from "./CountryData";

/**
 * Provider composition component for the application.
 * Wraps the application with both `ThemeProvider` and `DataProvider`.
 * The nesting order is important: `ThemeProvider` wraps `DataProvider`
 * so that theme context is available to all data consumers.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components that will have access to both providers.
 * @returns {JSX.Element} The composed provider tree.
 *
 * @example
 * <ThemeProvider>
 *     <DataProvider>
 *         <App />
 *     </DataProvider>
 * </ThemeProvider>
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </ThemeProvider>
    )
}
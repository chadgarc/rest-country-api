import { useState, useEffect, useRef } from "react";
import { useDataContext } from "../../ContextsAndProviders/CountryData";

/**
 * Props for the `SearchBar` component.
 *
 * @interface SearchBarProps
 * @property {string} searchMessage - Placeholder text for the search input.
 */
interface SearchBarProps {
    searchMessage: string;
}

/**
 * Search bar component with debounced filtering.
 * Uses `useDataContext()` to access `filterData`.
 * Implements a 300ms debounce via `useRef` and `useEffect`.
 *
 * @param {SearchBarProps} props - Component props.
 * @param {string} props.searchMessage - Placeholder text for the search input.
 * @returns {JSX.Element} The search input element wrapped in a DaisyUI label.
 */
export const SearchBar = ({ searchMessage }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const {filterData} = useDataContext();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            filterData(searchTerm);
        }, 300);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    },[searchTerm]);

    return (
        <label className="input">
            <svg className="h-[1.3em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>

            <input id="searchEntries" onChange={e => setSearchTerm(e.target.value)} className="ps-4" type="search" required placeholder={searchMessage} />
        </label>
    );
};

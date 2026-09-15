interface DropDownListProps {
    title: string;
    targetID: number;
    list: string[];
}

const NewAnchor = ({ name }: { name: string }) => (
    <a data-region={name}>{name}</a>
);

export const DropDownList = ({ title, targetID, list }: DropDownListProps) => {
    return (
        <>
            <button
                className="btn dropdownBtn"
                popoverTarget={`popover-${targetID}`}
                style={{ anchorName: `--anchor-${targetID}` }}
            >
                <span>{title}</span>
                <svg className="rotate-90 h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                </svg>
            </button>

            <ul
                className="dropdownItems dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                popover=""
                id={`popover-${targetID}`}
                style={{ positionAnchor: `--anchor-${targetID}` }}
            >
                {list.map((item) => (
                    <li key={item}>
                        <NewAnchor name={item} />
                    </li>
                ))}
            </ul>
        </>
    );
};

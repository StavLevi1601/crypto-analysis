import React from 'react';
import style from "./style.module.scss";
import { AiOutlineSearch } from 'react-icons/ai'; // Import the search icon

type SearchProps = {
    onSearchValue: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearchValue }) => {

    const handleSearch = (value: string) => {
        onSearchValue(value);
    };

    return (
        <div className={style.searchLine}>
            <div className={style.inputWrapper}>
                <AiOutlineSearch className={style.searchIcon} />
                <input
                    placeholder='Search by: Token name, Tweet Date, Tweet, Username'
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;

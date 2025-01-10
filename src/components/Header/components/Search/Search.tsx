import $ from "jquery";

import search from "../../../../assets/svg/search.svg";

import "./style.scss";
import { useEffect } from "react";


const Search = ({ setSearchValue, searchValue }: { setSearchValue: Function, searchValue: string }) => {
    useEffect(
        () => {
            $(".search__field").focus(
                () => {
                    $(".search").addClass("focus");
                }
            ).blur(
                () => {
                    $(".search").removeClass("focus");
                }
            );
        }, []
    )


    return (
        <div className="search">
            <img src={search} />

            <input className="search__field" type="text" placeholder="поиск..." value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
        </div>
    )
}


export default Search;
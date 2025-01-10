import Search from "./components/Search/Search";
import "./style.scss";


const Header = ({ setSearchValue, searchValue }: { setSearchValue: Function, searchValue: string }) => {
    return (
        <header className="main__header">
            <h1>Your tasks</h1>
            
            <Search setSearchValue={setSearchValue} searchValue={searchValue} />
        </header>
    )
}


export default Header;
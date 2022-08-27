import "./Navbar.css"
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className={"main-nav"}>
            <Link to={'/'} className={"link"}>
                <h1 className={"nav-text"}>Swift Flashcards</h1>
            </Link>
        </nav>
    )
}
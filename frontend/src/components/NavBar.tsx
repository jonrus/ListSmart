import {useState} from "react";
import cartLogo from "./logo-cart.svg";

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <>
            <header>
                <nav className="flex flex-wrap px-2 py-3 bg-blue-600 mb-3">
                    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                        <div className="w-full">
                            <img src={cartLogo} className="inline-block" height="25" width="25" />
                            <a href="#" className="mx-4 leading-relaxed">ListSmart</a>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import "./NavStyle.css";

function NavBar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<a href="/#" className="logo"></a>
			<nav ref={navRef}>

				<a href="/">Usuarios</a>
				<a href="/about">Filmes</a>
				<a href="/#">Usuarios Filmes</a>
               
                <button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default NavBar;
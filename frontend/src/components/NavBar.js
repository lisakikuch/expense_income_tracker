import { Link } from "react-router-dom";
import React from "react";


const NavBar = () => {
    return (
<nav>
    <Link to="/transactions">Transactions</Link> | {" "}
    <Link to="/transactions/summaries">Summaries</Link>
</nav>
    )
};

export default NavBar;
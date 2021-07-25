import {Link} from "react-router-dom";

interface INavBack {
    to: string,
}

export default function NavBack({to}: INavBack) {
    return (
        <>
        <Link to={to}>&lt;--</Link>
        </>
    );
}

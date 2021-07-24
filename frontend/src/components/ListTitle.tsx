import {Link, useLocation} from "react-router-dom";

export interface IListTitle {
    id: string,
    title: string,
}

export default function ListTitle({id, title}: IListTitle) {
    const loc = useLocation();

    return (
        <li>
            <Link to={`${loc.pathname}/${id}`}>{title}</Link>
        </li>
    );
}

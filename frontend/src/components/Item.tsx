export interface IItem {
    id: string,
    title: string,
    quanity: number,
    complete: boolean,
    optional: boolean,
    notes?: string,
    fnClick(): void,
}

export default function Item({id, title, quanity, complete, optional, notes, fnClick}: IItem) {
    return (
        <li>
            <div onClick={fnClick} className="cursor-pointer">
                {title} <sub>x</sub>{quanity}<sub> {optional ? "optional" : ""}</sub>
            </div>
        </li>
    );
}

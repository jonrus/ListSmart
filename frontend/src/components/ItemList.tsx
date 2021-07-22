import {useState} from "react";
import Item, {IItem} from "./Item";
import ItemModal from "./ItemModal";

export interface IItemList {
    id: string,
    title: string,
    items: IItem[]
}

export default function ItemList({id, title, items}: IItemList) {
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState<IItem>();
    return (
        <>
            {showModal && <ItemModal item={modalItem as IItem} fnClose={() => setShowModal(false)}/>}
            {title}
            <ul>
                {items.map((item) => {
                    return <Item
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            quanity={item.quanity}
                            complete={item.complete}
                            optional={item.optional}
                            notes={item.notes}
                            fnClick={() => {setShowModal(true);setModalItem(item)}}
                            />
                })}
            </ul>
        </>
    );
}

ItemList.defaultProps = {
    id: "SubListId",
    title: "My First List",
    items: [
    {
        id: "ThisIsID",
        title: "Default Item Title 01",
        quanity: 1,
        complete: false,
        optional: false,
        notes: "This item has notes"
    },
    {
        id: "ThisIsID2",
        title: "Default Item Title 02",
        quanity: 2,
        complete: false,
        optional: true,
        notes: "This item has notes"
    },
    ]
};

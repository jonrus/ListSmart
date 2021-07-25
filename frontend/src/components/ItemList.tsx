import {useState} from "react";
import Spinner from "./Spinner";
import Item, {IItem} from "./Item";
import ItemModal from "./ItemModal";
import {useParams} from "react-router-dom";
import {IAllLists} from "./Routes";
import NavBack from "./NavBack";
import AddBtn from "./AddBtn";

export interface IItemList {
    id: string,
    title: string,
    items: IItem[]
}

interface iItemList {
    listsData: IAllLists | undefined,
    loading: boolean,
}
export default function ItemList({listsData, loading}: iItemList) {
    const {listID} = useParams<{listID: string}>();
    const {mainListID} = useParams<{mainListID: string}>();
    const [showItemModal, setShowItemModal] = useState(false); //To Show item details modal
    const [modalItem, setModalItem] = useState<IItem>();
    const [showNewItemModal, setShowNewItemModal] = useState(false);
    const thisList = listsData?.data.lists.filter(list => list.id === listID)[0]; //If valid index should only be one match


    //Loading spinner
    if (loading) return <Spinner />
    //TODO check for error - thisList === undefined;
    if (thisList === undefined) return <>ERROR</>;

    return (
        <>
            <NavBack to={`/l/${mainListID}`} />
            {showItemModal && <ItemModal item={modalItem as IItem} fnClose={() => setShowItemModal(false)}/>}
            {showNewItemModal && <div onClick={() => setShowNewItemModal(false)}>NEW ITEM</div>}
            {thisList?.title}
            <ul>
                {thisList?.items.map((item) => {
                    return <Item
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            quanity={item.quanity}
                            complete={item.complete}
                            optional={item.optional}
                            notes={item.notes}
                            fnClick={() => {setShowItemModal(true);setModalItem(item)}}
                            />
                })}
            </ul>
            <AddBtn fnOnClick={() => setShowNewItemModal(true)}/>
        </>
    );
}

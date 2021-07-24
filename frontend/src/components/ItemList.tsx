import {useState} from "react";
import Spinner from "./Spinner";
import Item, {IItem} from "./Item";
import ItemModal from "./ItemModal";
import {useParams} from "react-router-dom";
import {IAllLists} from "./Routes";

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
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState<IItem>();
    const thisList = listsData?.data.lists.filter(list => list.id === listID)[0]; //If valid index should only be one match

    //TODO check for error - thisList === undefined;

    //Loading spinner
    if (loading) return <Spinner />
    if (thisList === undefined) return <>ERROR</>;

    return (
        <>
            {showModal && <ItemModal item={modalItem as IItem} fnClose={() => setShowModal(false)}/>}
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
                            fnClick={() => {setShowModal(true);setModalItem(item)}}
                            />
                })}
            </ul>
        </>
    );
}

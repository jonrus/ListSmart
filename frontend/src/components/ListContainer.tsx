import {useState} from "react";
import Spinner from "./Spinner";
import ListTitle from "./ListTitle";
import AddBtn from "./AddBtn";
import {IAllLists} from "./Routes";

export interface IListContainer {
    listsData: IAllLists | undefined,
    loading: boolean
}

export default function ListContainer({listsData, loading}: IListContainer) {
    const [showNewListModal, setShowNewListModal] = useState(false);
    //Loading spinner
    if (loading) return <Spinner />

    //Data loaded
    return (
        <>
            {showNewListModal && <div onClick={() => setShowNewListModal(false)}>NEW LIST MODAL</div>}
            <h1>Lists</h1>
            <ul>
                {listsData?.data.lists.map(list => {return <ListTitle id={list.id} title={list.title} key={list.id} />})}
            </ul>
            <AddBtn fnOnClick={() => setShowNewListModal(true)}/>
        </>
    );
}

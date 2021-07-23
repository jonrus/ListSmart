import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Spinner from "./Spinner";
import ListTitle from "./ListTitle";
import {IAllLists} from "./Routes";

export interface IListContainer {
    listsData: IAllLists | undefined,
    fnGetData(listID: string, stop: Function): Promise<void>,
}

export default function ListContainer({listsData, fnGetData}: IListContainer) {
    const {mainListID} = useParams<{mainListID: string}>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fnGetData(mainListID, () => {setLoading(false)});
    }, []);
    
    //Loading spinner
    if (loading) return <Spinner />

    //Data loaded
    return (
        <>
            <h1>Lists</h1>
            <ul>
                {listsData?.data.lists.map(list => {return <ListTitle id={list.id} title={list.title} />})}
            </ul>
        </>
    );
}

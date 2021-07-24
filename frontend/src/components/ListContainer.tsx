import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Spinner from "./Spinner";
import ListTitle from "./ListTitle";
import {IAllLists} from "./Routes";

export interface IListContainer {
    listsData: IAllLists | undefined,
    fnGetData(listID: string): Promise<void>,
    loading: boolean
}

export default function ListContainer({listsData, fnGetData, loading}: IListContainer) {
    const {mainListID} = useParams<{mainListID: string}>();

    useEffect(() => {
        fnGetData(mainListID);
    }, []);
    
    //Loading spinner
    if (loading) return <Spinner />

    //Data loaded
    return (
        <>
            <h1>Lists</h1>
            <ul>
                {listsData?.data.lists.map(list => {return <ListTitle id={list.id} title={list.title} key={list.id} />})}
            </ul>
        </>
    );
}

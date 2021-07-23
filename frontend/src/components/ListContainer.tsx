import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ApiHelper from "../api/ApiHelper";
import Spinner from "./Spinner";
import {IItemList} from "./ItemList";

interface IAllLists {
    id: string,
    error: boolean,
    data: {
        _id: string,
        lists: IItemList[]
    }
}

export default function ListContainer() {
    const {mainListID} = useParams<{mainListID: string}>();
    const [loading, setLoading] = useState<boolean>(true);
    const [allListData, setAllListData] = useState<IAllLists>();
    
    //fetch data from the backend
    useEffect(() => {
        const fetchAllData = async () => {
            const res = await ApiHelper.getAllListData(mainListID);
            if (res.error) {
                //TODO - Error handle
                console.log("ERROR", res);
            }

            setAllListData(res);
            console.log(allListData);
            setLoading(false);
        }

        fetchAllData();
    }, []);
    
    //Loading spinner
    if (loading) return <Spinner />

    //Data loaded
    return (
        <>
            <ul>
                {allListData?.data.lists.map((list) => {return <li key={list.id}>{list.title}</li>})}
            </ul>
        </>
    );
}

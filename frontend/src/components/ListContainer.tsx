import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ApiHelper from "../api/ApiHelper";
import Spinner from "./Spinner";

export default function ListContainer() {
    const {mainListID} = useParams<{mainListID: string}>();
    const [loading, setLoading] = useState<boolean>(true);
    const [allListData, setAllListData] = useState({}); //TODO Set type
    
    //fetch data from the backend
    useEffect(() => {
        const fetchAllData = async () => {
            const res = await ApiHelper.getAllListData(mainListID);
            if (res.error) {
                //TODO - Error handle
                console.log("ERROR", res);
            }

            setAllListData(res);
            setLoading(false);
        }

        fetchAllData();
    }, []);
    
    //Loading spinner
    if (loading) return <Spinner />

    //Data loaded
    return (
        <>
        </>
    );
}

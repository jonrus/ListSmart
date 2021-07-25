import {useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import ApiHelper from "../api/ApiHelper";
import {IItemList} from "./ItemList";
import DataLoader from "./DataLoader";
import Landing from "./Landing";
import ListContainer from "./ListContainer";
import ItemList from "./ItemList";


//Routes will serve as the storage location of all list data
export interface IAllLists {
    _id: string,
    error: boolean,
    data: {
        id: string,
        lists: IItemList[]
    }
}

export default function Routes() {
    const [allListData, setAllListData] = useState<IAllLists>();
    const [dataLoading, setDataLoading] = useState(true);
    const fetchAllData = async (listID: string) => {
        const res = await ApiHelper.getAllListData(listID);
        setAllListData(res);
        setDataLoading(false);
    }

    return (
        <>
            <Switch>
                <Route path="/l/:mainListID/:listID">
                    <DataLoader fnGetData={fetchAllData} loading={dataLoading} />
                    <ItemList listsData={allListData} loading={dataLoading} />
                </Route>
                <Route path="/l/:mainListID">
                    <DataLoader fnGetData={fetchAllData} loading={dataLoading} />
                    <ListContainer listsData={allListData} loading={dataLoading} />
                </Route>
                <Route exact path="">
                    <Landing />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
}

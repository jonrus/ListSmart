import {useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import ApiHelper from "../api/ApiHelper";
import {IItemList} from "./ItemList";
import Landing from "./Landing";
import ListContainer from "./ListContainer";


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
    const fetchAllData = async (listID: string, fnStopLoading: Function) => {
        const res = await ApiHelper.getAllListData(listID);
        setAllListData(res);
        fnStopLoading();
    }

    return (
        <>
            <Switch>
                <Route path="/l/:mainListID/:listID">
                    HI THERE AT THE LIST
                </Route>
                <Route path="/l/:mainListID">
                    <ListContainer fnGetData={fetchAllData} listsData={allListData}/>
                </Route>
                <Route exact path="">
                    <Landing />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
}

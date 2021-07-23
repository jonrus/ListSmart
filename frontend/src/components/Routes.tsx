import {Switch, Route, Redirect} from "react-router-dom";
import Landing from "./Landing";
import ListContainer from "./ListContainer";

export default function Routes() {
    return (
        <>
            <Switch>
                <Route path="/l/:mainListID">
                    <ListContainer />
                </Route>
                <Route exact path="">
                    <Landing />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
}

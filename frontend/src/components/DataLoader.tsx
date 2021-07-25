import {useParams} from "react-router-dom";

interface IDataLoader {
    loading: boolean,
    fnGetData(mainID: string): Promise<void>,
}

export default function DataLoader({loading, fnGetData}: IDataLoader) {
    const {mainListID} = useParams<{mainListID: string}>();

    if (loading) {
        fnGetData(mainListID);
    }

    return (<></>);
}

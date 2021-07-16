import {app} from "./app";
import {PORT} from "./config";

app.listen(PORT, () => {
    console.log(`List Smart Backend started: http://localhost:${PORT}`);
});

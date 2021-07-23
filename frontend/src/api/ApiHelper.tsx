const BASE_URL = "http://127.0.0.1:3001/api/";

export default class ApiHelper {
    static async getAllListData(listID: string) {
        try {
            const url = `${BASE_URL}all/${listID}`;
            const res = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json'
                },
                });

            return res.json();
        }
        catch {
            return {error: true}
        }
    }
}

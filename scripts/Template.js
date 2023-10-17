//#region Library Imports
    import http from 'k6/http'
    import {getRandomArrayElement} from "../lib/utils.js"
//#endregion

//#region Variable Setup
    var search_data = JSON.parse(open("/../data/search.json"))
    var search_string = getRandomArrayElement(search_data)

    var store_data = JSON.parse(open("/../data/stores.json"))
    var store_uid = getRandomArrayElement(store_data)
//#endregion

export default function () {
    //#region Pre-request scripts 
        //Request body/payload
        let requestBody = JSON.stringify({
            searchString: search_string,
            storeId: store_uid
        })

        //Request Headers
        let requestHeaders = {
            headers: {
                "Content-Type": "application/json",
                "authorization": "auth_token"
            },
        }
    //#endregion

    //#region Request Execution
        http.post("Insert request URL here",
            requestBody,
            requestHeaders)
    //#endregion

    //#region Post-request scripts
        check(postResponse, {
            "status was 200": (r) => r.status === 200,
            "transaction time OK": (r) => r.timings.duration < 900,
        })
    //#endregion
}
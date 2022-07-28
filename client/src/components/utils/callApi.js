import Error from "../error/Error";

export default async function callApi(type, state) {
    let response;
    
    console.log(state)
    if (type == "hotel") {
        response = await fetch(`/api/${type}/${state.hotelId}`);
    } 
    else if (type == "hotel/price") {
        response = await fetch(`/api/${type}/${state.hotelId}/${state.destId}/${state.checkin}/${state.checkout}/${state.lang}/${state.currency}/${state.code}/${state.adultsQty}`);
    } 
    else if (type == "destination/prices") {
        response = await fetch(`/api/${type}/${state.destId}/${state.checkin}/${state.checkout}/${state.lang}/${state.currency}/${state.code}/${state.adultsQty}/${state.page}`);
        }

    console.log(response)

    if (response.status === 429) {
        console.log("429 Error")
        return [0, "429"]
    }
    
    if (response.status === 404) {
        console.log("404 Error")
        return [0, "404"]
    }
    const data = await response.json()
    console.log("data: " + data)
    return data
}
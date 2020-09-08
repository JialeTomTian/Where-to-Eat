import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

Geocode.setLanguage("en");

export async function returnLatLng(address) {
    try {
        const response = await Geocode.fromAddress(address);
        const {lat, lng} = response.results[0].geometry.location;
        console.log(lat, lng);
        return [lat, lng];
    } catch (error) {
        console.log(error.message);
    }
}

export async function returnAddress(lat, lng){
    try{
        const response = await Geocode.fromLatLng(lat, lng);
        const address = response.results[0].formatted_address;
        console.log(address)
    } catch(error){
        console.log(error.message)
    }
}


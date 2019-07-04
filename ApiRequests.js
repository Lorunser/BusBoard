const axios = require('axios');
const stopPointURL = "https://api.tfl.gov.uk/StopPoint/";
const postcodeURL  = "https://api.postcodes.io/postcodes/";

exports.ApiRequests = class ApiRequests {

    static async busStopFromId(busStopId){
        const requestUrl = stopPointURL + String(busStopId);
        return this.request(requestUrl);
    }

    static async arrivalPredictions(busStopId){
        const requestUrl = stopPointURL + String(busStopId) + "/Arrivals";
        return this.request(requestUrl)
    }

    static async request(requestUrl){
        const jsonResponse = await axios.get(requestUrl);
        return jsonResponse.data;
    }

    static async longLatFromPostcode(postcode){
        const requestUrl   = postcodeURL + String(postcode);
        const postcodeData = await this.request(requestUrl);
        const postcodeLocation = {
            longitude : postcodeData.result.longitude,
            latitude  : postcodeData.result.latitude,
        }
        return postcodeLocation;
    }
    static async busStopsNearPostcode(postcode, withinRadius = 1000, numberOfStops = 2){
        const postcodeLocation = await this.longLatFromPostcode(postcode);
        
        const argStopType = "?stopTypes=NaptanOnstreetBusCoachStopPair";
        const argRadius   = "&radius=" + String(withinRadius);
        const argLongLat  = "&lon=" + String(postcodeLocation.longitude) + "&lat=" + String(postcodeLocation.latitude);
        
        const requestUrl  = stopPointURL + argStopType + argRadius + argLongLat;
        const busStopData = await this.request(requestUrl);

        const busStopIDs = [];
        //console.log(busStopData);
        busStopData.stopPoints.slice(0,numberOfStops).forEach(function(busStop) {
            busStopIDs.push(busStop.children[0].id);
        });
        return busStopIDs;
    }

}

const axios = require('axios');
const stopPointURL = "https://api.tfl.gov.uk/StopPoint/";
const postcodeURL  = "https://api.postcodes.io/postcodes/";

exports.ApiRequests = class ApiRequests {

    static async request(requestUrl){
        const jsonResponse = await axios.get(requestUrl);
        return jsonResponse.data;
    }

    //buses
    static async busStopFromId(busStopId){
        const requestUrl = stopPointURL + String(busStopId);
        return this.request(requestUrl);
    }

    static async arrivalPredictions(busStopId){
        const requestUrl = stopPointURL + String(busStopId) + "/Arrivals";
        return this.request(requestUrl)
    }

    //postCodes
    static async longLatFromPostcode(postcode){
        const requestUrl   = postcodeURL + String(postcode);
        const postcodeData = await this.request(requestUrl);

        const postcodeLocation = {
            longitude : postcodeData.result.longitude,
            latitude  : postcodeData.result.latitude
        };

        return postcodeLocation;
    }
    static async busStopsNearPostcode(postcode, numberOfStops = 2, maxRadius = 10000, radiusIncrement = 200){
        const postcodeLocation = await this.longLatFromPostcode(postcode);
        
        const argStopType = "?stopTypes=NaptanOnstreetBusCoachStopPair";
        const argLongLat  = "&lon=" + String(postcodeLocation.longitude) + "&lat=" + String(postcodeLocation.latitude);

        let busStopCount = 0;
        let withinRadius = 0;
        let busStopData  = '';

        while (busStopCount < numberOfStops) {
            withinRadius += radiusIncrement;

            if (withinRadius > maxRadius) {
                console.log("===Max radius exceeded before " + String(numberOfStops) + " found===");
                break;
            }
            const argRadius   = "&radius=" + String(withinRadius);
            const requestUrl  = stopPointURL + argStopType + argRadius + argLongLat;
            
            busStopData = await this.request(requestUrl);
            busStopCount = busStopData.stopPoints.length;
        }

        const busStopIDs = [];
        busStopData.stopPoints.slice(0,numberOfStops).forEach(function(busStop) {
            busStopIDs.push(busStop.children[0].id);
        });
        
        return busStopIDs;
    }

}

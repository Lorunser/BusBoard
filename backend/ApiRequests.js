const axios = require('axios');
const stopPointURL = "https://api.tfl.gov.uk/StopPoint/";
const postcodeURL  = "https://api.postcodes.io/postcodes/";
const identifiers = "&app_id=8752cd75&app_key=5ae5a974ae2a4a314ae997c63d6b9945";

exports.ApiRequests = class ApiRequests {

    static async request(requestUrl){
        if (requestUrl.includes("api.tfl.gov.uk")){
            if (requestUrl.includes("?") === false){
                requestUrl = requestUrl + "?";
            }
            requestUrl = requestUrl + identifiers;
        }


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
        
        const argStopType = "?stopTypes=NaptanPublicBusCoachTram";
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
            busStopIDs.push(busStop.id);
        });
        
        //return busStopData.stopPoints.slice(0,numberOfStops);
        return busStopIDs;
    }

}

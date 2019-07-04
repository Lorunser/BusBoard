const axios = require('axios');
const baseUrl = "https://api.tfl.gov.uk/StopPoint/";

exports.ApiRequests = class ApiRequests{

    static async busStopFromId(busStopId){
        const requestUrl = baseUrl + String(busStopId);
        return this.request(requestUrl);
    }

    static async arrivalPredictions(busStopId){
        const requestUrl = baseUrl + String(busStopId) + "/Arrivals";
        return this.request(requestUrl)
    }

    static async request(requestUrl){
        const jsonResponse = await axios.get(requestUrl);
        return jsonResponse.data;
    }
}
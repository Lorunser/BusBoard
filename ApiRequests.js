const axios = require('axios');

exports.ApiRequests = class ApiRequests{

    static async busStopFromId(busStopId){
        const baseUrl = "http://api.tfl.gov.uk/StopPoint/";
        const requestUrl = baseUrl + String(busStopId);
        const jsonResponse = await axios.get(requestUrl);
        return jsonResponse.data;
    }
}
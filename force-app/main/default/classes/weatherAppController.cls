public with sharing class weatherAppController {
    @AuraEnabled
    public static String getWeatherDetails(String input) {
        String url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=metric' + getKey();
        String response = getResponse(url);
        return response;
    }
    public static String getResponse(String strUrl) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();
        request.setMethod('GET');
        request.setEndpoint(strUrl);
        request.setTimeout(120000);
        response = http.send(request);
        String responseBody = response.getBody();
        return responseBody;
    }
    public static String getKey() {
        String key = '82a38d8ae9d310f88aa46de9f636748b';
        String output = '&appid=' + key;
        return output;
    }
}
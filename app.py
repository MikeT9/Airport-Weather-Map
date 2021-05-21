from flask import Flask, jsonify
import requests
import json

app = Flask(__name__)

api_key = "2ebe5c322a838055b074c4ed70d7693b"


@app.route("/")
def home():
    return "Hi"


@app.route("/currentweather/<lat>/<lon>")
def currentweather(lat,lon):
    
    # Save config information
    url = "https://api.openweathermap.org/data/2.5/weather?"
    units = "imperial"


    # Build query URL
    query_url = f"{url}lat={lat}&lon={lon}&units={units}&appid={api_key}"

    # Get weather data
    weather_response = requests.get(query_url)
    weather_json = weather_response.json()

    # Get the temperature from the response
    # print(json.dumps(weather_json, indent=4, sort_keys=True))
    return jsonify(weather_json)

if __name__ == "__main__":
    app.run(debug=True)

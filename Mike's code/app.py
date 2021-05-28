from flask import Flask, jsonify, request, render_template
import flask
import requests
import json
import time
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

app = Flask(__name__)

wx_key = "2ebe5c322a838055b074c4ed70d7693b"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/currentweather/<lat>/<lon>")
def currentweather(lat,lon):
    
    # Save config information
    url = "https://api.openweathermap.org/data/2.5/weather?"
    units = "imperial"


    # Build query URL
    query_url = f"{url}lat={lat}&lon={lon}&units={units}&appid={wx_key}"

    # Get weather data
    curwx_response = requests.get(query_url)
    curwx_json = curwx_response.json()

    # Get the temperature from the response
    # print(json.dumps(weather_json, indent=4, sort_keys=True))
    print(curwx_json)
    return jsonify(curwx_json)

@app.route("/forecastweather/<lat>/<lon>")
def forecastweather(lat,lon):
    
    # Save config information
    url = "https://api.openweathermap.org/data/2.5/forecast?"
    units = "imperial"


    # Build query URL
    query_url = f"{url}lat={lat}&lon={lon}&units={units}&appid={wx_key}"

    # Get weather data
    forwx_response = requests.get(query_url)
    forwx_json = forwx_response.json()

    # Get the temperature from the response
    # print(json.dumps(weather_json, indent=4, sort_keys=True))
    return jsonify(forwx_json)

if __name__ == "__main__":
    app.run(debug=True)

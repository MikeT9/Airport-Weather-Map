from flask import Flask, jsonify, request, render_template
import flask
import requests
import json
import time
import numpy as np
import sqlalchemy
import os.path
import pandas as pd
from config import wx_key


if not os.path.exists("data.db"):
    engine=sqlalchemy.create_engine('sqlite:///data.db')
    df=pd.read_csv("static/airports.csv")
    df.to_sql("airports",index=False,con=engine)

else:
    engine=sqlalchemy.create_engine('sqlite:///data.db')




app = Flask(__name__)


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

@app.route("/data")
def jsonified():
    rows=engine.execute("SELECT IATA,AIRPORT,CITY,STATE,COUNTRY,LATITUDE,LONGITUDE FROM airports")

    res=[]
    for row in rows:
        print(row)
        x={"IATA":row[0],
            "AIRPORT":row[1],
            "CITY":row[2],
            "STATE":row[3],
            "COUNTRY":row[4],
            "LATITUDE":row[5],
            "LONGITUDE":row[6]
        } 
        res.append(x)

    
    return jsonify(res)

if __name__ == "__main__":
    app.run(debug=True)

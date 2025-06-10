# -*- coding: utf-8 -*-
"""
Created on Sat Sep 19 12:52:39 2020

@author: Chaitanya
"""
import requests
from flask import Flask,jsonify,request,render_template
from flask_cors import CORS
import pandas as pd
import json
import test


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Inventory table for Mecury Wireless"

@app.route('/create',methods = ['POST', 'GET'])

def create_data():
    
    if request.method == 'POST':
        try:
           
                
            
            return appendToFile(request.get_json(force=True))
            
        
        except:
            
            msg = "FAILURE"
            return msg


@app.route('/read',methods = ['POST','GET'])

def read_data():
    
    if request.method == 'POST':
        try:
            ss = (read_json())
            return ss

            
        except:
                msg = "FAILURE"
                return msg

@app.route('/update',methods = ['POST', 'GET'])

def update_data():
    
    if  request.method == 'POST':
        
        try:
            print("here")
            ss = updateInventory(request.get_json(force=True))
            return ss
        #return df.to_json()
            
        except:
                msg = "FAILURE"
                return msg
        
@app.route('/delete',methods = ['POST', 'GET'])

def delete_data():
    
    if  request.method == 'POST':
        try:
            print("here")
            ss = deleteFromFile(request.get_json(force=True))
            return ss
        
        except:
                msg = "FAILURE"
                return msg
    
def checkID(d,ID):
    
    for k in d["inventory"]:
    
        if(k["id"]==id):
            return True
        else:
            return False

def appendToFile(b):
    
    b = (b['data']['data'])
    with open('inventory.json') as f: 
        d = json.load(f)
    f.close()
    d["inventory"].append(b)
    jss = json.dumps(d)
    f = open("inventory.json","w")
    f.write(jss)
    f.close()
    return "SUCCESS"
    
        


def deleteFromFile(b):
    print("in delete")
    with open('inventory.json') as f: 
        d = json.load(f)
    f.close()
    b = b['data']['data']
    count = 0
    

    for k in d["inventory"]:
        count +=1
        if(k["id"]==b['id']):
            
            del d["inventory"][count-1]
    
            jss = json.dumps(d)
            f = open("inventory.json","w")
            f.write(jss)
            f.close()
            return "SUCCESS"
    
    return "FAILURE"
 
def updateInventory(b):
    
    with open('inventory.json') as f: 
        d = json.load(f)
    f.close()
    b = b['data']['data']
    count = 0
    for k in d["inventory"]:
        count +=1
        if(int(b['id'])==int(k['id'])):
            d["inventory"][count-1] = b
            jss = json.dumps(d)
            f = open("inventory.json","w")
            f.write(jss)
            f.close()
            return "SUCCESS"
    return "FAILURE"
            
    
def read_json():
     
    with open('inventory.json') as f: 
        d = json.load(f)
    f.close()
    return d
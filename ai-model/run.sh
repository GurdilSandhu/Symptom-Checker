#!/bin/bash

# Install necessary packages
pip install -r requirements.txt

# Start the app using Gunicorn on port 5000
exec gunicorn api.app1:app --bind 0.0.0.0:5000

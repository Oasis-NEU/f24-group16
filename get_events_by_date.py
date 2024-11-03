from flask import Flask, render_template, jsonify
import requests
from datetime import datetime

app = Flask(__name__)

"""
Data Definitions: 

An Event is a Dict[str, str] representing a single ticketed event, where:
    - 'name': str, non-empty
        Represents the title of the event (i.e., "Taylor Swift | The Eras Tour")
    - 'time': str in format 'HH:MM:SS' or empty string
        Represents the local start time (i.e., "19:00:00")
    - 'venue': str or empty string
        Represents the location name (i.e., "Gillette Stadium")
    - 'url': str
        Represents the ticketmaster URL (or '#' if none exists)

Examples: 
    event_ex_1 = {
        "name": "Taylor Swift | The Eras Tour",
        "time": "19:00:00",
        "venue": "Gillette Stadium",
        "url": "https://www.ticketmaster.com/event/..."
    }
    event_ex-2 = 


EventDate is a Dict[str, ListOfEvents], where: 
    - 'date' : str, non-empty
        Represents the date of the event (i.e., "11-6")
    - 'events' : ListOfEvents | empty | Event
        Represents the event information of the events occuring on 'date'. 
"""

# Gets events organized by specific dates for the calendar grid
# Returns data in JSON format so that the the client can process the data
def get_events_by_date():
    key = '7VzerKN0HQtsXy9GGvWPGpG2N5TrLcGd'
    
    # Format dates properly for the API
    start_date = datetime(2024, 10, 6).strftime('%Y-%m-%dT00:00:00Z')
    end_date = datetime(2024, 12, 31).strftime('%Y-%m-%dT23:59:59Z')


    # Match the date range we are working with
    params = {
        'dmaId': 235,  # Boston area
        'startDateTime': start_date,
        'endDateTime': end_date,
        'apikey': key
    }
    
    try:
        # Store json data
        response = requests.get(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            params=params
        )
        data = response.json()
        events = data.get('_embedded', {}).get('events', [])
        
        # Organize events by date for easy calendar placement
        events_by_date = {}
        
        for event in events:
            date_str = event.get('dates', {}).get('start', {}).get('localDate')
            if date_str:
                # Extract just the date part (i.e., "2024-10-26" -> "26")
                day = int(date_str.split('-')[2])
                month = int(date_str.split('-')[1])
                
                date_key = f"{month}-{day}"  # i.e., "10-26"
                
                if date_key not in events_by_date:
                    events_by_date[date_key] = []
                
                # Add event to dictionary
                events_by_date[date_key].append({
                    'name': event.get('name'),
                    'time': event.get('dates', {}).get('start', {}).get('localTime', ''),
                    'venue': event.get('_embedded', {}).get('venues', [{}])[0].get('name', ''),
                    'url': event.get('url', '#')
                })
                
        return events_by_date
    except Exception as e:
        print(f"Could not fetch events: {str(e)}")
        return {} 


# API endpoint that returns events organized by date.
# jsonify() converts the Event into a JSON string so that
# the client can process the data as JSON data

@app.route('/api/events-by-date')
def events_api():
    events = get_events_by_date()
    return jsonify(events)
        

@app.route('/')
def home():
    return render_template('mainpage.html')

if __name__ == '__main__':
    app.run(debug=True)
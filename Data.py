#!/usr/bin/env python
# coding: utf-8

# In[ ]:

import requests
from datetime import datetime

def get_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        events = data.get('_embedded',{}).get('events',[])
    return events

def organize_events(events):
    start_date = datetime(2024,10,6)
    end_date = datetime(2024,12,31)
    events_by_month = {}

    if events:
        for event in events:
            name = event.get('name','N/A')
            date_str = event.get('dates',{}).get('start',{}).get('localDate','N/A')
            venue = event.get('_embedded',{}).get('venues',[{}])[0].get('name','N/A')

            event_date=datetime.strptime(date_str, '%Y-%m-%d')

            if start_date <= event_date <= end_date:
                month = event_date.strftime('%B %Y')
                if month not in events_by_month:
                    events_by_month[month] = []
                    events_by_month[month].append({
                    'name': name,
                    'date': date_str,
                    'venue': venue})
                
            for month, month_events in events_by_month.items():
                print(f"events in {month}: \n")
                for event in month_events:
                    print(f"event name: {event['name']}")
                    print(f"event nate: {event['date']}")
                    print(f"venue: {event['venue']}")
                    print("\n")
    return events_by_month
    

key = '7VzerKN0HQtsXy9GGvWPGpG2N5TrLcGd'

music_url = f'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=235&apikey={key}'
other_url = f'https://app.ticketmaster.com/discovery/v2/events.json?dmaId=235&apikey={key}'



def getData():
    music_events = get_data(music_url)
    other_events=get_data(other_url)
    organized_music=organize_events(music_events)
    organized_other=organize_events(other_events)
    all_events=organized_music+organized_other
    return all_events






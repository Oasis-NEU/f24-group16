from flask import Flask, render_template, request, redirect, url_for, jsonify
from datetime import datetime
from flask import Flask, jsonify, request

import requests

app= Flask(__name__)

key = '7VzerKN0HQtsXy9GGvWPGpG2N5TrLcGd'

music_url = f'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=235&apikey={key}'
other_url = f'https://app.ticketmaster.com/discovery/v2/events.json?dmaId=235&apikey={key}'

base_url='https://app.ticketmaster.com/discovery/v2/events.json'

start_date= datetime(2024,10,6)
end_date= datetime(2024,12,31)

def get_events(url):
    response= requests.get(url)
    if response.status_code == 200:
        data = response.json()
        events = data.get('_embedded',{}).get('events',[])
    return []

def organize_events(events):
    events_by_month = {}


    for event in events:
        name = event.get('name','N/A')
        date_str = event.get('dates',{}).get('start',{}).get('localDate','N/A')
        venue = event.get('_embedded',{}).get('venues',[{}])[0].get('name','N/A')
        try:
            event_date=datetime.strptime(date_str, '%Y-%m-%d')
        except:
            continue

        if start_date<= event_date <= end_date:
            month = event_date.strftime('%B %Y')
            if month not in events_by_month:
                events_by_month[month] = []
                events_by_month[month].append({
                    'name': name,
                    'date':date_str,
                    'venue':venue})
    return events_by_month

@app.route('/')
def home():
    return render_template('mainpage.html')

@app.route('/get-events', methods=['GET'])
def get_all_events():
    music_url=f'{base_url}?classificationName=music&dmaId=235&apikey={key}'
    other_url=f'{base_url}?dmaId=235&apikey={key}'
    music_events=get_events(music_url)
    other_events=get_events(other_url)
    organized_music=organize_events(music_events)
    organized_other=organize_events(other_events)
    all_events={**organized_music, **organized_other}
    return jsonify(all_events if all_events else {})

if __name__ == '__main__':
    app.run(debug=True)
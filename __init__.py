import json
import requests
from urllib.request import urlopen

key= '7VzerKN0HQtsXy9GGvWPGpG2N5TrLcGd'

months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

url= 'https://app.ticketmaster.com/discovery/v2/events.json?City=Boston&StartDate=2025-01-01&EndDate=2025-01-30&apikey=7VzerKN0HQtsXy9GGvWPGpG2N5TrLcGd'
response=requests.get(url)
data=response.json()
print(data)

keys= data.keys()
values= data.values()




#alue= data.pop('width')
#print(value)


# for response in data:
    # response.split(',')
    # del response['width']
    # del response['height']
    # print("updated***********" ,response)
    # print('\n')

# remove image, image size (height, width),
print(data)
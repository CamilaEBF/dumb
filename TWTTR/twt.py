import os
import time
import datetime
import urllib2
import json

from twython import Twython
import soundcloud
import musixmatch

APP_KEY = "46d4c4zuPzRvMelgPDM9Q" 
APP_SECRET = "EzS5pteZn3MMxlM2yR5csU9zSyDCme7c7DcVgDEiBI"
OAUTH_TOKEN = "1939330664-MaTmrB98H9dIcxpX9ARic4zYVlWPzvsmbGBSxRi"
OAUTH_TOKEN_SECRET = "nh2DS7iiTSqMG03IG7wsbEUCsfQqQiaiufCmlvWsfFXLY"

twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

soundcloud = soundcloud.Client(client_id="8563fd9ede4e72508a0b5dbf6c7cbc09",client_secret="3274ba3f5453b816c89aa05b448f7a7a",username="free-refills",password="goodday")


mmatch_key = "5faaad93844d097c919d27bdbd831c91"
#print musixmatch
#mmatch = musixmatch.ws(country='us', apikey=mmatch_key)
#print musixmatch.track.search(q_track='alejandro',q_artist='lady gaga',apikey=mmatch_key)

def getRecent():
  hypem_r = urllib2.urlopen("http://hypem.com/playlist/history/jazzcar/json/1/data.js")
  hm_recents = json.loads(hypem_r.read())
  mostRecent = hm_recents["0"]
  return (mostRecent['title'],mostRecent['artist'])

def hashtagg(astring):
  return "#"+''.join([word.capitalize() for word in astring.split()])


def getFave(platform):
  if platform == 'sc':
    sc = soundcloud.get('/me/favorites')[0]
    print sc['title'], sc['permalink_url']
    return (sc['title'], sc['permalink_url'])
  elif platform == 'hm':
    hypem_f = urllib2.urlopen("http://hypem.com/playlist/loved/jazzcar/json/1/data.js")
    hm_faves = json.loads(hypem_f.read())
    hm = hm_faves["0"]
    print hm['title'], hm['artist']
    return (hm['title'],hm['artist'])
  else:
    print 'error'
    return 'error'

def tweet():
  #if hourly:
  song_title, song_artist = getRecent()
  status = "Recently listened: "+song_title+" - "+song_artist
  #if daily:
  sc_fave = getFave('sc')
  hm_fave = getFave('hm')
  status = "Today's faves: "+sc_fave[0]+" ("+sc_fave[1]+") and "+hm_fave[0]+" - "+hm_fave[1]

#status = "The time is now "+ datetime.datetime.now().__str__() 
def go():
  song_title, song_artist = getRecent()
  try:
    status = "Recently listened: "+song_title+" by "+song_artist+" @hypem"
    print "tweeting..."
    twitter.update_status(status=status)
  except:
    print "nope"

while True:
  go()
  print "sleeping"
  time.sleep(3600)

#print "sleeping..."
# sleep 1 minute 
#time.sleep(60)

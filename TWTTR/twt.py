import os
import time
import datetime

from twython import Twython

APP_KEY = "46d4c4zuPzRvMelgPDM9Q" 
APP_SECRET = "EzS5pteZn3MMxlM2yR5csU9zSyDCme7c7DcVgDEiBI"
OAUTH_TOKEN = "1939330664-MaTmrB98H9dIcxpX9ARic4zYVlWPzvsmbGBSxRi"
OAUTH_TOKEN_SECRET = "nh2DS7iiTSqMG03IG7wsbEUCsfQqQiaiufCmlvWsfFXLY"

twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

soundcloud = soundcloud.Client(client_id="8563fd9ede4e72508a0b5dbf6c7cbc09",client_secret="3274ba3f5453b816c89aa05b448f7a7a",username="free-refills",password="goodday")

status = "The time is now "+ datetime.datetime.now().__str__() 
print "tweeting..."
twitter.update_status(status=status)

print "sleeping..."
# sleep 1 minute 
time.sleep(60)

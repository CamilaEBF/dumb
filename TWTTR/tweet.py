import sys
from twython import Twython

APP_KEY = "46d4c4zuPzRvMelgPDM9Q"
APP_SECRET = "EzS5pteZn3MMxlM2yR5csU9zSyDCme7c7DcVgDEiBI"
OAUTH_TOKEN = "1939330664-MaTmrB98H9dIcxpX9ARic4zYVlWPzvsmbGBSxRi"
OAUTH_TOKEN_SECRET = "nh2DS7iiTSqMG03IG7wsbEUCsfQqQiaiufCmlvWsfFXLY"

twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

if sys.argv:
  status = ' '.join([sys.argv[i] for i in range(len(sys.argv)) if i !=0])
  twitter.update_status(status=status)

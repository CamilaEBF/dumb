import simplejson, urllib, datetime
import sendgrid, flickr

from django.shortcuts import render, redirect

from cards.models import *

# Create your views here.
def index(request):
  return render(request, 'index.html')

def send(request):
  if request.method =='POST':
    form = request.POST
    s_addr = form['sEmail'] == '' and form['sZip'] == ''
    r_addr = form['rName'] == '' or form['rStrAddr'] == '' or form['rCity'] == '' or form['rCountry'] == '' or form['rZip'] == ''
    if s_addr or r_addr:
      # error, please fill in all fields
      context = {'errormsg': 'Please fill in all fields'}
      return render(request, 'send.html', context)
    else:
      #populate the database, create new User
      recip = Recipient(name=form['rName'], strAdd=form['rStrAddr'], city=form['rCity'], state=form['rState'], country=form['rCountry'], zip=form['rZip'])
      recip.save()

      # determine how to get the lat/lng coors
      searchUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address='+form['sZip']+'&sensor=false'
      result = simplejson.load(urllib.urlopen(searchUrl))
      location = result['results'][0]['geometry']['location']
      latitude = location['lat']
      longitude = location['lng']
      searchDate = datetime.datetime.now()-datetime.timedelta(days=30)
      searchDStr = str(searchDate.year)+'-'+str(searchDate.month)+'-'+str(searchDate.day)
      photoGo = flickr.photos_search(per_page=1,min_taken_date=searchDStr,has_geo=1,lat=latitude,lon=longitude)
      item = photoGo[0]
      photoUrl = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_z.jpg'
      photoTitle = item.title
      photoOwner = item.owner.id
      sName = 'Anonymous' if form['sName'] == '' else form['sName']
      correspondence = Card(sender=sName, sender_lat=latitude, sender_lng=longitude, recip=recip)
      correspondence.save()

      # send them confirmation email with all the deetz
      from django.template.loader import get_template
      from django.template import Context 

      POSTCARDSe = 'app18129914@heroku.com'
      POSTCARDSn = 'DEMONSLAYER'
      rAddr = form['rStrAddr']+'\n'+form['rCity']+', '+form['rState']+' '+form['rZip']
      plaintext = get_template('email.txt')
      htmly = get_template('email.html')
      
      context = Context({'rName': form['rName'], 'rAddr': rAddr, 'photoUrl': photoUrl, 'photoTitle': photoTitle, 'photoOwner': photoOwner})

      text_content = plaintext.render(context)
      html_content = htmly.render(context)
      # make a secure connection to SendGrid
      s = sendgrid.Sendgrid(POSTCARDSe, 'i0ylwboj', secure=True)

      message = sendgrid.Message((POSTCARDSe,POSTCARDSn), 'Postcard Receipt', text_content, html_content)
      # add a recipient
      message.add_to(form['sEmail'], sName)

      # use the Web API to send your message
      s.web.send(message)

      return redirect('thanks')
  else:
    return render(request, 'send.html');

def thanks(request):
  return render(request, 'thanks.html')
  

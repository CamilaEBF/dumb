from django.db import models

# Create your models here.
class Recipient(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=50, blank=False)
  strAdd = models.CharField(max_length=100, blank=False)
  city = models.CharField(max_length=50, blank=False)
  state = models.CharField(max_length=50, blank=False)
  country = models.CharField(max_length=100, blank=False)
  zip = models.CharField(max_length=6, blank=False)
  
  def __unicode__(self):
    return name

class Card(models.Model):
  id = models.AutoField(primary_key=True)
  sender = models.CharField(max_length=50) #default=Anonymous
  sender_lat = models.FloatField(blank=False)
  sender_lng = models.FloatField(blank=False)
  recip = models.ForeignKey(Recipient)
  created = models.DateTimeField(auto_now=True)
  
  def __unicode__(self):
    return id

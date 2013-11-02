class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  fname = db.Column(db.String(80))
  lname = db.Column(db.String(80))
  phone = db.Column(db.String(80))
  toastSelf = db.Column(db.String(80))
  toastOther = db.Column(db.String(80))
  userNo = db.Column(db.Text)
  def __init__(self,fname,lname,phone,toastS,toastO):
    self.fname = fname
    self.lname = lname
    self.phone = phone
    self.toastSelf = toastS
    self.toastOther = toastO
  def sayNo(self,otherUser):
    self.userNo += otherUser.id+" "
    #otherUser.userNo += self.id+" "
  def isMatch(self,otherUser):
    mNo = self.userNo.split()
    oNo = otherUser.userNo.split()
    if self.id in oNo and self.toastSelf == otherUser.toastOther:
      print "this person has rejected you.  don't feel bad."
    elif otherUser.id in mNo:
      print "you have rejected this person.  you are very shallow."
    elif self.toastSelf == other.toastOther and self.toastOther == other.toastSelf:
      print "MATCH MADE IN TOASTY HELL!  Y'ALL R TOASTMATES"
    else:
      print ":( you disagree on a thing as simple as toast.  you will never find love." 
  def sayYes(self,otherUser):
    #display the telephone number n shit.  datz it.  or activate text messages to immediately sms the person.  hell yea get the show on the road, baby

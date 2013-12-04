#pyramids

import math
import random
import ordinaryCards as cardz

class Pyramid:
  def __init__(self, pyramidCards):
    self.pyramidCards = pyramidCards
    self.uncovered = []
    self.covered = []
    # now map them in the shape of a pyramid
    for rows in range(7):
      for c in range(rows):
        pcard = self.pyramidCards[sum(range(rows))+c]
        pcard.coveredBy.append(sum(range(rows+1))+c)
        pcard.coveredBy.append(sum(range(rows+1))+(c+1))
    self.updateStatus()
  def updateStatus(self):
    #this might just be run upon initializing the game
    for i in range(len(self.pyramidCards)):
      j = self.pyramidCards[i]
      j.updateStatus()
      #stores the indices of the card within pyramidCards
      if j.hidden:
        self.covered.append(i) 
      else:
        self.uncovered.append(i)
  def updateCStatus(self):
    #updates status in self.covered
    i = len(self.covered)-1
    while i >= 0:
      j = self.pyramidCards[self.covered[i]]
      hold = len(j.coveredBy)-1
      while hold >= 0:
        k = j.coveredBy[hold]
        if self.pyramidCards[k] == None:
          j.coveredBy.pop(hold)
        hold -= 1 
      j.updateStatus()
      if not j.hidden:
        self.covered.pop(i)
      i -= 1
  def remove(self, card):
    self.uncovered.remove(card)
    self.pyramidCards[card] = None
    self.updateCStatus()
  def __str__(self):
    for rows in range(8):
      offset = "   "*(8-rows)
      print offset,
      for c in range(rows):
        idx = sum(range(rows))+c
        i = self.pyramidCards[idx]
        if i == None:
          print "   ",
        else:
          print i,
        print " ",
      print "\n"
    return " "

class PyramidCard(cardz.Card):
  def __init__(self, suit, value, hidden=True):
    #inherit constructor? is that allowed in python
    cardz.Card.__init__(self, suit, value)
    #additional attributes:
    self.coveredBy = []
    self.hidden = hidden
  def updateStatus(self):
    if len(self.coveredBy) == 0:
      self.hidden = False
  def __str__(self):
    if self.hidden:
      return "XoX"
    else:
      return cardz.Card.__str__(self)

class PyramidGame:
  def __init__(self):
    self.pyramidCards = {} 
    # create a deck
    newdeck = cardz.Deck(PyramidCard)
    # randomly put 28 pcards into pyramidCards
    for i in range(28):
      r = random.randint(0,(len(newdeck)-1))
      pcard = newdeck.cards.pop(r)
      self.pyramidCards[i] = pcard
    self.flipdeck = newdeck
    #in which case it should take in an array of 28 cards as an argument
    self.pyramid = Pyramid(self.pyramidCards)
    self.flipdeck.shuffle()
    self.getNewCard()
    #not really crucial to gameplay
    self.points = 0
    self.WEIGHT = 1.075 #idk bro i just made up some shit
    self.streak = 0
  def isWon(self):
    #check if all the cards inthe pyramid are gone
    if len(self.pyramidCards) == 0:
      return True
  def isLost(self):
    #check if all the cards in the flipdeck are gone but there are still cards in the pyramid
    if len(self.flipdeck) == 0 and len(self.pyramidCards) > 0:
      return True
  def play(self):
    #initialize thing
    print "hello, player.  here is ur current pyramid"
    while not self.isWon() and not self.isLost(): 
      print self.pyramid
      print "there are",str(len(self.flipdeck)),"cards left in your deck"
      print "your current card is",self.currentCard
      self.getNextMove()
    if self.isWon():
      print "yay"
    else:
      print "fail"
  def getNextMove(self):
    move = input("what is your next move? ")
    if move == 'N': #i have to change this to something less stupid
      self.getNewCard()
    else:
      card = self.pyramid.uncovered[move]
      self.useCard(card)
  def getNewCard(self):
    #pop the top card of flipdeck
    #set current card to it
    self.currentCard = self.flipdeck.cards.pop(0)
    self.currentCard.hidden = False
  def useCard(self, idx):
    card = self.pyramidCards[idx]
    if (self.currentCard == None) or (card.value == (self.currentCard.value+1)%13) or (card.value == (self.currentCard.value-1)%13):
      self.currentCard = card
      self.pyramid.remove(idx)
      #noncrucial elements
      self.streak += 1
      self.points += self.streak * self.WEIGHT
    else:
      print "invalid move"


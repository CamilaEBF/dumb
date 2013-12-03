#pyramids

import math
import random

class Deck:
  def __init__(self, CardType):
    self.cards = []
    self.suits = ['S','H','C','D']
    for s in self.suits:
      for i in range(1,14):
        card = CardType(s,i)
        self.cards.append(card)
  def printDeck(self):
    for i in self.cards:
      print i
  def __len__(self):
    return len(self.cards)

class Card:
  def __init__(self, suit, value):
    self.suit = suit
    self.value = value
    if self.value == 1:
      self.face = 'A'
    elif self.value == 13:
      self.face = 'K'
    elif self.value == 12:
      self.face = 'Q'
    elif self.value == 11:
      self.face = 'J'
    else:
      self.face = self.value
  def __str__(self):
    return self.suit+str(self.face)

class Pyramid:
  def __init__(self):
    self.pyramidCards = []
    self.uncovered = []
    self.covered = []
    # create a deck
    newdeck = Deck(PyramidCard)
    # randomly put 28 pcards into pyramidCards
    for i in range(28):
      r = random.randint(0,(len(newdeck)-1))
      pcard = newdeck.cards.pop(r)
      self.pyramidCards.append(pcard)
    self.flipdeck = newdeck
    # now stack them in the shape of a pyramid
    for rows in range(7):
      for c in range(rows):
        pcard = self.pyramidCards[sum(range(rows))+c]
        pcard.coveredBy.append(self.pyramidCards[sum(range(rows+1))+c])
        pcard.coveredBy.append(self.pyramidCards[sum(range(rows+1))+(c+1)])
  def updateStatus(self):
    #this might just be run on initializing the game
    for i in self.pyramidCards:
      if len(i.coveredBy) == 0:
        self.uncovered.append(i)
      else:
        self.covered.append(i)
    #should i also have a pile for the stack / used?  wait that would be in PyramidGame
  def remove(self, card):
    #find the card and then remove it
    #probably using PyramidCard's rownum property?
    #idk, do i want to update status?!?
    pass
  def __str__(self):
    # allot 3 spaces for each card
    print len(self.pyramidCards)
    for rows in range(8):
      for c in range(rows):
        idx = sum(range(rows))+c
        i = self.pyramidCards[idx]
        print i,":",
        if len(i.coveredBy) >0:
          for x in i.coveredBy:
            print x,
        print " ",
      print "\n"
    return " "

class PyramidCard(Card):
  def __init__(self, suit, value, hidden=True):
    #inherit constructor? is that allowed in python
    Card.__init__(self, suit, value)
    #additional attributes:
    self.coveredBy = []
    self.rownum = 0 #hmmm where should i set this? 
    self.hidden = hidden
  #def updateStatus(self): #hmmm
    #if len(self.coveredBY) == 0:
      #self.hidden = False
      #self.display() #yea idk how to structure this rn
  def __str__(self):
    return Card.__str__(self)

class PyramidGame:
  def __init__(self):
    self.pyramid = Pyramid()
    self.currentCard = None
    self.isWon = False
    #not really crucial to gameplay
    self.points = 0
    self.WEIGHT = 1.075 #idk bro i just made up some shit
    self.streak = 0
  def isWon(self):
    #check if all the cards inthe pyramid are gone
    #update self.isWon
    #end game if necessary
    pass
  def isLost(self):
    #check if all the cards in the flipdeck are gone but there are still cards in the pyramid
    #update self.isWon
    #end game if necessary
    pass
  def play(self):
    #initialize thing
    print "hello, player.  here is ur current pyramid"
    #self.pyramid.prettyPrint()
    while not self.isWon() and not self.isLost(): #actually should i be using the accessor methods or the properties?
    #are the properties even useful?
      m = self.getNextMove()
      card = self.pyramid.uncovered[m]
      self.useCard(card)
    if self.isWon():
      print "yay"
    else:
      print "fail"
  def useCard(self, card):
    if (self.currentCard == None) or (card.value == self.currentCard.value+1) or (card.value == self.currentCard.value-1):
      self.currentCard = card
      card.getPredecessors() #yea idk what this is or who should even have control over this
      #wait actually i think it would be like self.pyramid.find(card.covering)
      #except card.covering could be an array of one or two elements keep this in mind
      self.pyramid.remove(card)
      #noncrucial elements
      self.streak += 1
      self.points += self.streak * self.WEIGHT
    else:
      return "invalid move"

py = Pyramid()
print py

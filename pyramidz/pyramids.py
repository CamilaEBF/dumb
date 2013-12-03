#pyramids

import math
import random
import ordinaryCards as cardz

class Pyramid:
  def __init__(self):
    self.pyramidCards = []
    self.uncovered = []
    self.covered = []
    # create a deck
    newdeck = cardz.Deck(PyramidCard)
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
    self.updateStatus()
  def updateStatus(self):
    #this might just be run on initializing the game
    for i in self.pyramidCards:
      i.updateStatus()
      if i.hidden:
        self.covered.append(i)
      else:
        self.uncovered.append(i)
    #should i also have a pile for the stack / used?  wait that would be in PyramidGame
  def remove(self, card):
    #find the card and then remove it
    #probably using PyramidCard's rownum property?
    #idk, do i want to update status?!?
    pass
  def __str__(self):
    for rows in range(8):
      offset = "   "*(8-rows)
      print offset,
      for c in range(rows):
        idx = sum(range(rows))+c
        i = self.pyramidCards[idx]
        print i,":",
        #if len(i.coveredBy) >0:
          #for x in i.coveredBy:
            #print x,
        print " ",
      print "\n"
    return " "

class PyramidCard(cardz.Card):
  def __init__(self, suit, value, hidden=True):
    #inherit constructor? is that allowed in python
    cardz.Card.__init__(self, suit, value)
    #additional attributes:
    self.coveredBy = []
    self.rownum = 0 #hmmm where should i set this? 
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
    #wait, should the pyramid creation be part of this game initialization?
    #i think the Pyramid class should just be taking a random set of cards and forming a pyramid with it (mapping coveredcards and whatnot)
    #in which case it should take in an array of 28 cards as an argument
    self.pyramid = Pyramid()
    self.pyramid.flipdeck.shuffle()
    self.currentCard = self.pyramid.flipdeck.cards[0]
    self.isWon = False
    self.isLost = False
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
    self.currentCard = self.pyramid.flipdeck.cards[0]
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
for i in py.uncovered:
  print i 

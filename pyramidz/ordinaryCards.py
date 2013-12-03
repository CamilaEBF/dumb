import random

class Deck:
  def __init__(self, CardType):
    self.cards = []
    self.suits = ['S','H','C','D']
    for s in self.suits:
      for i in range(1,14):
        card = CardType(s,i)
        self.cards.append(card)
  def shuffle(self):
    for i in range(random.randint(len(self.cards),130)):
      self.cards.append(self.cards.pop(random.randint(0,51)))
  def __str__(self):
    for i in self.cards:
      print i,
    return " "
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
    return str(self.face)+"o"+self.suit

#newDeck = Deck(Card)
#print newDeck
#newDeck.shuffle()
#print newDeck

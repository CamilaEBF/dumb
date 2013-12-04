import unittest
import random
import pyramids as pyr

class myTest(unittest.TestCase):
  def setUp(self):
    self.suits = ['S','H','C','D']
    self.deck = None
  def testCards(self):
    value = random.randint(1,13)
    suit = self.suits[random.randint(0,3)]
    assert pyr.cardz.Card(value, suit)
  def testDeck(self):
    # u either follow or you lead!
    assert pyr.cardz.Deck(pyr.cardz.Card)
    self.deck = pyr.cardz.Deck(pyr.cardz.Card)
    #print self.deck
    #self.deck.shuffle()
    #print self.deck
  #def testPyramid(self):
    #assert pyr.Pyramid()
  def testPyGame(self):
    game = pyr.PyramidGame()
    print game.pyramid
    game.play()
    #test for losing
    #test for winning
    #i think i have to build a thing that plays.  ugh

if __name__ == "__main__":
  unittest.main()
    

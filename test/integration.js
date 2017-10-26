function isVisible(selector) {
  var el = document.querySelector(selector);

  var computedStyle = window.getComputedStyle(el);
  if (computedStyle.opacity === '0') return false;

  var d = el.getBoundingClientRect();
  return d.width > 0 || d.height > 0 ;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

casper.test.begin('give overall rating', 7, function suite(test) {
  casper.start('http://localhost:3001/', function() {
    test.assertTitle('smiley', 'title is the one expected');
    test.assertExists('#giveFeedback', 'feedback button is found');
    test.assertFalsy(this.evaluate(isVisible, '#emojiList'), 'emoji list is hidden initially');
    test.assertFalsy(this.evaluate(isVisible, '#detailForm'), 'detail feedback form is hidden initially');
    this.click('#giveFeedback');    
  });

  casper.then(function() {
    test.assertTruthy(this.evaluate(isVisible, '#emojiList'), 'show emoji list');
    this.click('#emojiList li:nth-child('+getRandomInt(1, 5)+') img');
  });

  casper.then(function() {
    test.assertFalsy(this.evaluate(isVisible, '#emojiList'), 'hide emoji list');
    test.assertTruthy(this.evaluate(isVisible, '#detailForm'), 'show detail feedback form');
  });



  casper.run(function() {
    test.done();
  });
});



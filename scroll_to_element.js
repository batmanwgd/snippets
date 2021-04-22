/**
 * Scroll to an element
 */
(function() {
  var element = document.getElementById("myAwesomeDiv");
  var elementTop = element.getBoundingClientRect().top;
  if (elementTop < 0) {
    // check if the top of the element is outside the top of the viewport.
    var y = elementTop  + window.scrollY - 5;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
  }

  // same thing without much complexity
  element.scrollIntoView({behavior: 'smooth'});
})();

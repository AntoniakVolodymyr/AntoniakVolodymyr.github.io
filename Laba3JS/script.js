(function () {
  let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  console.log("Залежність від першої літери в імені");
  for (let i = 0; i < names.length; i++) {
      let firstLetter = names[i].charAt(0).toLowerCase();
      if (firstLetter === 'j') {
          byeSpeaker.speak(names[i]);
      } else {
          helloSpeaker.speak(names[i]);
      }
  }

  console.log("Залежить чи є дві літери підряд");
  function hasDoubleLetters(name) {
      for (let j = 0; j < name.length - 1; j++) {
          if (name.charAt(j).toLowerCase() === name.charAt(j + 1).toLowerCase()) {
              return true;
          }
      }
      return false;
  }

  for (let i = 0; i < names.length; i++) {
      if (hasDoubleLetters(names[i])) {
          helloSpeaker.speak(names[i]);
      } else {
          byeSpeaker.speak(names[i]);
      }
  }
})();
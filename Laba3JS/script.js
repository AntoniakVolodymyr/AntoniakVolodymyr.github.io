(function () {
  let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  console.log("Основний функціонал: залежність від першої літери");
  for (let i = 0; i < names.length; i++) {
      let firstLetter = names[i].charAt(0).toLowerCase();
      if (firstLetter === 'j') {
          byeSpeaker.speak(names[i]);
      } else {
          helloSpeaker.speak(names[i]);
      }
  }

  console.log("Додаткове сортування імен: залежність від останньої літери");
  function endsWithVowel(name) {
      let lastLetter = name.charAt(name.length - 1).toLowerCase();
      return ['a', 'e', 'i', 'o', 'u', 'y'].includes(lastLetter);
  }

  for (let i = 0; i < names.length; i++) {
      if (endsWithVowel(names[i])) {
          helloSpeaker.speak(names[i]);
      } else {
          byeSpeaker.speak(names[i]);
      }
  }
})();
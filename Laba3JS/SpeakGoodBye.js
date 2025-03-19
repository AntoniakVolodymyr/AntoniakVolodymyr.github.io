(function () {
  let speakWord = "Good Bye";

  function speak(name) {
      console.log(speakWord + " " + name);
  }

  window.byeSpeaker = { speak: speak };
})();
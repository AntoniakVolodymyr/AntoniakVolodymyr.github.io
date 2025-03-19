(function () {
  let speakWord = "Hello";

  function speak(name) {
      console.log(speakWord + " " + name);
  }

  window.helloSpeaker = { speak: speak };
})();
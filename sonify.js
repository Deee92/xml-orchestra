function start() {
  var text_1 = document.getElementById("xml-1").innerHTML
  var text_2 = document.getElementById("xml-2").innerHTML
  var text_3 = document.getElementById("xml-3").innerHTML
  var sound_1 = new Howl({
    src: ["/sounds/ambient.wav"],
    loop: true
  });
  var sound_2 = new Howl({
    src: ["/sounds/chime.wav"],
    loop:true
  });
  var sound_3 = new Howl({
    src: ["/sounds/stars.wav"],
    loop:true
  });
  sonify(text_1, sound_1, 1)
  sonify(text_2, sound_2, 2)
  sonify(text_3, sound_3, 3)
}

function sonify(text, sound, id) {
  var split_text = text.split("\n")
  console.log("Number of lines in " + id + ": " + split_text.length)
  var lines = []
  var min  = split_text[0].length
  var max  = split_text[0].length
  for (var i = 0; i < split_text.length - 1; i++) {
    if (split_text[i].length < min) min = split_text[i].length
    if (split_text[i].length > max) max = split_text[i].length
    lines[i] = split_text[i].length
  }

  console.log("Min length in " + id + ": " + min)
  console.log("Max length in " + id + ": " + max)
    
  play(sound, lines, min, max, id)
}

function play(sound, lines, min, max, id) {
  var counter = 0
  sound.on('end', function(){
    console.log(counter)
    console.log("incrementing counter for " + id)
    counter += 1;
    sound.rate(scale(lines[counter], min, max, id))
    if (counter == lines.length - 1) {
      sound.loop(false)
      sound.stop()
      console.log("stopped playing sound for " + id)
    }
  });
  if (counter < lines.length) {
    sound.play()
  }
}

function scale(old_val, old_min, old_max, id) {
  new_val = (((old_val - old_min) * (4 - 0.5)) / (old_max - old_min)) + 0.5
  console.log("rate for " + id + ": " + new_val)
  return new_val
}

function generateVoices() {
    const voices = [];
  
    // Crear una voz masculina
    voices.push({
      name: "Masculino",
      voice: {
        lang: "es-ES",
        speaker: "Google",
      },
    });
  
    // Crear una voz femenina
    voices.push({
      name: "Femenina",
      voice: {
        lang: "es-ES",
        speaker: "Google",
      },
    });
  
    // Crear una voz neutral
    voices.push({
      name: "Neutral",
      voice: {
        lang: "es-ES",
        speaker: "Google",
      },
    });
  
    return voices;
  }

  const voices = generateVoices();
    const voice = voices[0]; // Objeto de voz masculina

const textToSpeech = new SpeechSynthesisUtterance({
  text: "Hola mundo",
  voice: voice,
});

speechSynthesis.speak(textToSpeech);













// var synth=windows.speechSynthesis;

// function speak(text){
//     // objeto de sintesis de voz
//     var utterace=new SpeechSynthesisUtterance(text);
//     // creo la instancia de voz con el valor 10 que es la voz
//     utterace.voice=synth.getVoices()[10];
//     utterace.volume=1;
//     // velocidad de voz
//     utterace.rate=1;
//     synth.speak(utterace);
// }

// speak("Hola mundo");


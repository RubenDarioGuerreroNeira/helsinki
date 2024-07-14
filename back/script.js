// Obtener la API de Web Speech Synthesis
var synth = window.speechSynthesis;
// Función para generar la voz
function speak(text) {
  // Crear un objeto de sintesis de voz
  var utterance = new SpeechSynthesisUtterance(text);

  // Establecer la voz y el ritmo
  utterance.voice = synth.getVoices().find(voice => voice.name === "Google");
  // utterance.voice = synth.getVoices()[3]; // Seleccionar la primera voz disponible
  utterance.rate = 1.5; // Velocidad de la voz (1 es normal)

  // Iniciar la síntesis de voz
  synth.speak(utterance);
}

// Ejemplo de uso
var texto="Hola, ¿cómo estás?. mi nombre es Sandra.Soy un bot que te va ayudar en la automatización de tareas. tanto en el uso y mantenimiento del Modelo Nl8547 de Lg fabricado en colombia.espero que stes bien.Estoy siendo creada por Rubén Guerrero.el esta usando javascrypt para la creación de este modulo. Gracias por usar esta herramienta"

var frases=texto.split(".");
frases.forEach(function(frase){
  speak(frase);
});


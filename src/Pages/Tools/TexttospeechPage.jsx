import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";

const TexttospeechPage = () => {
  const [text, setUrl] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleUrlChange = (text) => {
    setUrl(text);
  };

  // Fonction pour commencer la lecture du texte
  const speakText = () => {
    if (text.trim() === '') return;

    const speech = new SpeechSynthesisUtterance(text); // Créer un objet de lecture
    speech.lang = 'fr-FR'; // Langue (vous pouvez ajuster selon la langue souhaitée)
    speech.rate = 1; // Vitesse du discours (1 = normal)
    speech.pitch = 1; // Tonalité de la voix (1 = normal)

    // Démarrer la lecture du texte
    speechSynthesis.speak(speech);
    setIsSpeaking(true);

    // Quand la lecture est terminée, mettre à jour l'état
    speech.onend = () => {
      setIsSpeaking(false);
    };
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel(); // Annuler la lecture en cours
    setIsSpeaking(false);
  };

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Text To Speech"
                    isCenter={true}
                />

                <InputTextareaComponent
                    value={text}
                    onValueChanged={handleUrlChange}
                    placeholder="Enter text"
                    borderColor="var(--primary-color)"
                />

                <SpacerComponent />

<div style={{display:"flex", gap:"10px"}}>

<ButtonComponent
                    text="Speak"
                    clickEvent={speakText}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                    active={isSpeaking}
                />
                
<ButtonComponent
                    text="Stop"
                    clickEvent={stopSpeaking}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                    active={!isSpeaking}
                />
</div>
            </div>
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default TexttospeechPage;
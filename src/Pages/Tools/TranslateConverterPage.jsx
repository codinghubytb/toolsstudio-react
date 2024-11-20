import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import SelectInputComponent from "../../Library/SelectInputComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";
import useFetch from "../../hooks/useFetch";

const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

const TranslateConverterPage = () => {
  const [input, setInput] = useState('');
  const [to, setTo] = useState('en-GB');
  const [from, setFrom] = useState('fr-FR');
  const [data, setData] = useState({});

  const handleTextChange = (text) => {
    setInput(text);
};

  const handleToChange = (totext) => {
    setTo(totext);
  };

  const handleFromChange = (fromtext) => {
    setFrom(fromtext);
  };

  const translate = () => {
    fetch(`https://apimodule.codinghub.cloud/tools/translate?textTo=${input}&toLang=${to}&fromLang=${from}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des modules:', error);
      });

  };

  const switchlanguage = () => {
    const o = to;
    setTo(from);
    setFrom(o);
  }

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Translate Language"
                    isCenter={true}
                />

                <InputTextareaComponent
                    value={input}
                    onValueChanged={handleTextChange}
                    placeholder="Enter text"
                    row={4}
                    borderColor="var(--primary-color)"
                />
                <SpacerComponent />
                <div style={{ display:"flex", justifyContent:"space-between", gap: "10px"}}>
                  <SelectInputComponent value={to} 
                               onValueChanged={handleToChange}
                               textColor="#000" width={100}>
                    {Object.entries(countries).map(([code, name]) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                  </SelectInputComponent>
                  <SelectInputComponent value={from}
                               onValueChanged={handleFromChange}
                               textColor="#000" width={100}>
                    {Object.entries(countries).map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </SelectInputComponent>
                </div>

                <SpacerComponent />

                <div style={{display:"flex", gap:"10px"}}>

                  <ButtonComponent
                    text="Translate"
                    clickEvent={translate}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                                />
                  <ButtonComponent
                    text="Switch"
                    clickEvent={switchlanguage}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                                />
                                
                </div>
                <SpacerComponent />
                <InputTextareaComponent
                    value={data?.message ||''}
                    placeholder="Result"
                    row={4}
                    disabled
                    borderColor="var(--primary-color)"
                />
            </div>
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default TranslateConverterPage;
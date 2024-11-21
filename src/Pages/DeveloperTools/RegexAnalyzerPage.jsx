import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import LabelComponent from "../../Library/LabelComponent";

const RegexAnalyzerPage = () => {
    const [input, setInput] = useState('');
    const [regexExplanation, setRegexExplanation] = useState([]);

    const analyzeRegex = () => {
        setRegexExplanation([]);

        if (!input.trim()) {
            setRegexExplanation(['Please provide a valid regex pattern.']);
            return;
        }

        try {
            // Tokenize and explain the regex components
            const tokens = tokenizeRegex(input);
            const explanations = tokens.map((token) => explainToken(token));
            setRegexExplanation(explanations);
        } catch (error) {
            setRegexExplanation([`Error parsing regex: ${error.message}`]);
        }
    };

    const tokenizeRegex = (regex) => {
        // Tokenize the regex into recognizable parts
        const regexPattern = /\\.|[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/\s]+/g;
        return [...regex.matchAll(regexPattern)].map((match) => match[0]);
    };

    const explainToken = (token) => {
        // Explain each token in plain English
        switch (token) {
            case '^': return 'Start of the line';
            case '$': return 'End of the line';
            case '.': return 'Any character except a newline';
            case '\\d': return 'Any digit (0-9)';
            case '\\D': return 'Any non-digit character';
            case '\\w': return 'Any word character (letter, digit, or underscore)';
            case '\\W': return 'Any non-word character';
            case '\\s': return 'Any whitespace character';
            case '\\S': return 'Any non-whitespace character';
            case '*': return 'Zero or more occurrences of the previous character';
            case '+': return 'One or more occurrences of the previous character';
            case '?': return 'Zero or one occurrence of the previous character';
            case '|': return 'Alternation (OR)';
            case '(': return 'Start of a capturing group';
            case ')': return 'End of a capturing group';
            case '[': return 'Start of a character class';
            case ']': return 'End of a character class';
            case '-': return 'Range within a character class';
            default:
                if (token.startsWith('\\')) return `Escaped character: ${token}`;
                return `Literal character: ${token}`;
        }
    };

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
                <TitleComponent
                    text="Regex Analyzer"
                    isCenter={true}
                />
                <SpacerComponent />
                <InputTextComponent 
                  value={input}
                  onValueChanged={value => setInput(value)}
                  placeholder="Enter Regex"
                  borderColor="var(--primary-color)"
                  />

                <SpacerComponent />

                <ButtonComponent
                    text="Analyzer"
                    clickEvent={analyzeRegex}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                />
                
                <SpacerComponent />
                <div>
                    {regexExplanation.map((e, index) => (
                        <React.Fragment key={index}>
                            <LabelComponent text={`. ${e}`} />
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default RegexAnalyzerPage;
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Pages/HomePage";
import BuyMeACoffee from './Components/BuyMeACoffee';

// Lazy imports for individual tools (optimizes performance)
const StopwatchPage = React.lazy(() => import('./Pages/Tools/StopwatchPage'));
const NumberGeneratorPage = React.lazy(() => import('./Pages/Tools/NumberGeneratorPage'));
const QrcodeGeneratorPage = React.lazy(() => import('./Pages/Tools/QrcodeGeneratorPage'));
const TexttospeechPage = React.lazy(() => import('./Pages/Tools/TexttospeechPage'));
const ColorGeneratorPage = React.lazy(() => import('./Pages/Tools/ColorGeneratorPage'));
const GradientcolorGeneratorPage = React.lazy(() => import('./Pages/Tools/GradientcolorGeneratorPage'));
const UuidGeneratorPage = React.lazy(() => import('./Pages/DeveloperTools/UuidGeneratorPage'));
const JsonValidatorPage = React.lazy(() => import('./Pages/DeveloperTools/JsonValidatorPage'));
const Base64ConverterPage = React.lazy(() => import('./Pages/DeveloperTools/Base64ConverterPage'));
const UrlConverterPage = React.lazy(() => import('./Pages/DeveloperTools/UrlConverterPage'));
const TranslateConverterPage = React.lazy(() => import('./Pages/Tools/TranslateConverterPage'));
const MorseConverterPage = React.lazy(() => import('./Pages/Tools/MorseConverterPage'));
const UnitConverterPage = React.lazy(() => import('./Pages/Tools/UnitConverterPage'));
const HashGeneratorPage = React.lazy(() => import('./Pages/DeveloperTools/HashGeneratorPage'));
const RegexGeneratorPage = React.lazy(() => import('./Pages/DeveloperTools/RegexGeneratorPage'));
const RegexAnalyzerPage = React.lazy(() => import('./Pages/DeveloperTools/RegexAnalyzerPage'));
const JsonmockGeneratorPage = React.lazy(() => import('./Pages/DeveloperTools/JsonmockGeneratorPage'));
const XmlToJsonPage = React.lazy(() => import('./Pages/DeveloperTools/XmlToJsonPage'));
const JsonToCsvPage = React.lazy(() => import('./Pages/DeveloperTools/JsonToCsvPage'));
const CsvToJsonPage = React.lazy(() => import('./Pages/DeveloperTools/CsvToJsonPage'));
const JsonToXmlPage = React.lazy(() => import('./Pages/DeveloperTools/JsonToXmlPage'));
const MinifierPage = React.lazy(() => import('./Pages/DeveloperTools/MinifierPage'));
const JsonToCSharpPage = React.lazy(() => import('./Pages/DeveloperTools/JsonToCSharpPage'));
const CodeBeautifierPage = React.lazy(() => import('./Pages/DeveloperTools/CodeBeautifierPage'));
const PasswordGeneratorPage = React.lazy(() => import('./Pages/Tools/PasswordGeneratorPage'));
const RotateImagePage = React.lazy(() => import('./Pages/ImageTools/RotateImagePage'));
const CompressorImagePage = React.lazy(() => import('./Pages/ImageTools/CompressorImagePage'));
const FilterImagePage = React.lazy(() => import('./Pages/ImageTools/FilterImagePage'));
const ConvertFromJpgPage = React.lazy(() => import('./Pages/ImageTools/ConvertFromJpgPage'));
const ConvertToJpgPage = React.lazy(() => import('./Pages/ImageTools/ConvertToJpgPage'));
const ResizeImagePage = React.lazy(() => import('./Pages/ImageTools/ResizeImagePage'));
const CropperImagePage = React.lazy(() => import('./Pages/ImageTools/CropperImagePage'));

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/tools/chronometer", element: <StopwatchPage /> },
  { path: "/tools/numbergenerator", element: <NumberGeneratorPage /> },
  { path: "/tools/qrcodegenerator", element: <QrcodeGeneratorPage /> },
  { path: "/tools/texttospeech", element: <TexttospeechPage /> },
  { path: "/tools/colorgenerator", element: <ColorGeneratorPage /> },
  { path: "/tools/morseconverter", element: <MorseConverterPage /> },
  { path: "/tools/translatelanguage", element: <TranslateConverterPage /> },
  { path: "/tools/gradientcolorgenerator", element: <GradientcolorGeneratorPage /> },
  { path: "/tools/passwordgenerator", element: <PasswordGeneratorPage /> },
  { path: "/tools/unitconverter", element: <UnitConverterPage /> },
  { path: "/tools-for-developer/base64converter", element: <Base64ConverterPage /> },
  { path: "/tools-for-developer/hashgenerator", element: <HashGeneratorPage /> },
  { path: "/tools-for-developer/url-encoder-decoder", element: <UrlConverterPage /> },
  { path: "/tools-for-developer/uuidgenerator", element: <UuidGeneratorPage /> },
  { path: "/tools-for-developer/jsonvalidator", element: <JsonValidatorPage /> },
  { path: "/tools-for-developer/regexgenerator", element: <RegexGeneratorPage /> },
  { path: "/tools-for-developer/regexanalyzer", element: <RegexAnalyzerPage /> },
  { path: "/tools-for-developer/jsonmockgenerator", element: <JsonmockGeneratorPage /> },
  { path: "/tools-for-developer/minifier", element: <MinifierPage /> },
  { path: "/tools-for-developer/xmltojson", element: <XmlToJsonPage /> },
  { path: "/tools-for-developer/jsontoxml", element: <JsonToXmlPage /> },
  { path: "/tools-for-developer/csvtojson", element: <CsvToJsonPage /> },
  { path: "/tools-for-developer/jsontocsharp", element: <JsonToCSharpPage /> },
  { path: "/tools-for-developer/jsontocsv", element: <JsonToCsvPage /> },
  { path: "/tools-for-developer/codebeautifier", element: <CodeBeautifierPage /> },
  { path: "/image-transform/compressorimage", element: <CompressorImagePage /> },
  { path: "/image-transform/rotateimage", element: <RotateImagePage /> },
  { path: "/image-transform/filterimage", element: <FilterImagePage /> },
  { path: "/image-transform/converttojpg", element: <ConvertToJpgPage /> },
  { path: "/image-transform/convertfromjpg", element: <ConvertFromJpgPage /> },
  { path: "/image-transform/resizeimage", element: <ResizeImagePage /> },
  { path: "/image-transform/cropperimage", element: <CropperImagePage /> }
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="app-container">
        <Navbar toggleSidebar={toggleSidebar} />
        {/*<div className="main-layout">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />*/}
          <section className="app-content">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element} />
                ))}
              </Routes>
            </React.Suspense>
          </section>
        {/*</div> */}
      </div>
      <BuyMeACoffee />
    </Router>
  );
}

export default App;

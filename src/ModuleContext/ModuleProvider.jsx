import React, { createContext, useContext, useState, useEffect } from 'react';

// Créer un contexte
const ModuleContext = createContext();

// Fournisseur pour les modules
export const ModuleProvider = ({ children }) => {
  const [modules, setModules] = useState([]);
  const apiUrl = import.meta.env.VITE_APIDATA;
  useEffect(() => {
    fetch(`${apiUrl}/collection?database=toolsstudio&collection=module&Enabled=true`) // Remplace par ton URL d'API
      .then(response => response.json())
      .then(data => {
        setModules(data);  // On stocke les données dans le state
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des modules:', error);
      });
  }, []);
  
  return (
    <ModuleContext.Provider value={{ modules }}>
      {children}
    </ModuleContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useModules = () => useContext(ModuleContext);

import { useState } from 'react';
import IngredientsInput from './components/IngredientsInput';
import Results from './components/Results';
import { analyzeIngredients } from './nutritionData';

function App() {
  const [currentView, setCurrentView] = useState('input'); // 'input' or 'results'
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyze = (ingredientsText) => {
    const data = analyzeIngredients(ingredientsText);
    setAnalysisData(data);
    setCurrentView('results');
  };

  const handleBack = () => {
    setCurrentView('input');
  };

  return (
    <>
      {currentView === 'input' && (
        <IngredientsInput onAnalyze={handleAnalyze} />
      )}
      {currentView === 'results' && analysisData && (
        <Results analysisData={analysisData} onBack={handleBack} />
      )}
    </>
  );
}

export default App;

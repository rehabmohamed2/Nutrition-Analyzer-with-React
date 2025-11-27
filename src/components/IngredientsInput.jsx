import { useState } from 'react';
import { parseIngredient, nutritionDatabase } from '../nutritionData';

const IngredientsInput = ({ onAnalyze }) => {
  const [ingredients, setIngredients] = useState('');
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const validateIngredients = (ingredientText) => {
    const lines = ingredientText.split('\n').filter(line => line.trim());
    const validationErrors = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      const parsed = parseIngredient(trimmedLine);

      if (!parsed) {
        // Check if it's just an ingredient name without quantity
        const lowerLine = trimmedLine.toLowerCase();
        const isJustIngredientName = Object.keys(nutritionDatabase).some(
          ingredient => lowerLine === ingredient || lowerLine.includes(ingredient)
        );

        if (isJustIngredientName) {
          validationErrors.push({
            line: index + 1,
            text: trimmedLine,
            errorType: 'missing_quantity'
          });
        } else {
          validationErrors.push({
            line: index + 1,
            text: trimmedLine,
            errorType: 'invalid_format'
          });
        }
      } else {
        const ingredient = parsed.ingredient;
        if (!nutritionDatabase[ingredient]) {
          validationErrors.push({
            line: index + 1,
            text: trimmedLine,
            errorType: 'not_found'
          });
        }
      }
    });

    return validationErrors;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIngredients(value);

    // Validate in real-time but only show errors if user has tried to submit
    if (showErrors) {
      const validationErrors = validateIngredients(value);
      setErrors(validationErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);

    const validationErrors = validateIngredients(ingredients);
    setErrors(validationErrors);

    if (validationErrors.length === 0 && ingredients.trim()) {
      onAnalyze(ingredients);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-4 shadow-lg">
            <svg
              className="w-14 h-14 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Nutrition Analyzer
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Enter your ingredients to calculate calories and macros
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-gray-100 hover:shadow-emerald-100 transition-all duration-300">
          <form onSubmit={handleSubmit}>
            {/* Instructions */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">📝</span>
                Enter Your Ingredients
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Type one ingredient per line. Examples: "100g chicken", "1 cup rice", "1 tbsp olive oil"
              </p>

              {/* Textarea */}
              <textarea
                value={ingredients}
                onChange={handleInputChange}
                placeholder={`100g chicken breast\n1 cup rice\n1 tbsp olive oil\n100g broccoli\n1 banana`}
                className={`w-full h-72 p-5 border-2 rounded-2xl focus:ring-4 transition-all duration-200 resize-none font-mono text-sm bg-gray-50 hover:bg-white shadow-inner ${
                  showErrors && errors.length > 0
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-100'
                }`}
                required
              />

              {/* Error Messages */}
              {showErrors && errors.length > 0 && (
                <div className="mt-4 p-5 bg-red-50 border-2 border-red-300 rounded-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-base font-bold text-red-800 mb-3">
                        Please fix the following errors:
                      </p>
                      <div className="space-y-2">
                        {errors.map((err, idx) => {
                          let errorMessage = '';

                          if (err.errorType === 'missing_quantity') {
                            errorMessage = `Missing quantity! Please add amount like: "100g ${err.text}", "1 cup ${err.text}", or "1 tbsp ${err.text}"`;
                          } else if (err.errorType === 'not_found') {
                            errorMessage = `Ingredient not found in database. Please check spelling or use a different ingredient.`;
                          } else {
                            errorMessage = `Invalid format! Use examples: "100g chicken", "1 cup rice", "1 tbsp olive oil"`;
                          }

                          return (
                            <div key={idx} className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                              <p className="text-sm font-semibold text-gray-800 mb-1">
                                Line {err.line}: "{err.text}"
                              </p>
                              <p className="text-sm text-red-700">{errorMessage}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Analyze Nutrition
            </button>
          </form>

          {/* Tips Section */}
          <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-100 shadow-sm">
            <h3 className="text-base font-bold text-emerald-800 mb-3 flex items-center">
              <span className="mr-2">💡</span>
              Supported Formats
            </h3>
            <div className="grid gap-2">
              <div className="flex items-start text-sm text-emerald-700">
                <span className="mr-2 text-lg">⚖️</span>
                <span><span className="font-semibold">Weight in grams:</span> "100g chicken", "50g almonds"</span>
              </div>
              <div className="flex items-start text-sm text-emerald-700">
                <span className="mr-2 text-lg">🥤</span>
                <span><span className="font-semibold">Volume in cups:</span> "1 cup rice", "2 cups milk"</span>
              </div>
              <div className="flex items-start text-sm text-emerald-700">
                <span className="mr-2 text-lg">🥄</span>
                <span><span className="font-semibold">Tablespoons:</span> "1 tbsp olive oil", "2 tbsp peanut butter"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6 font-medium">
          ⚕️ Nutritional data is approximate and for reference only
        </p>
      </div>
    </div>
  );
};

export default IngredientsInput;

// Nutrition database - calories per 100g or per unit
export const nutritionDatabase = {
  // Proteins
  'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
  'beef': { calories: 250, protein: 26, carbs: 0, fat: 15, unit: '100g' },
  'salmon': { calories: 208, protein: 20, carbs: 0, fat: 13, unit: '100g' },
  'tuna': { calories: 132, protein: 28, carbs: 0, fat: 1.3, unit: '100g' },
  'egg': { calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: '100g' },
  'eggs': { calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: '100g' },
  'tofu': { calories: 76, protein: 8, carbs: 1.9, fat: 4.8, unit: '100g' },
  'turkey': { calories: 135, protein: 30, carbs: 0, fat: 0.7, unit: '100g' },
  'pork': { calories: 242, protein: 27, carbs: 0, fat: 14, unit: '100g' },
  'shrimp': { calories: 99, protein: 24, carbs: 0.2, fat: 0.3, unit: '100g' },

  // Carbs
  'rice': { calories: 200, protein: 4, carbs: 45, fat: 0.4, unit: 'cup' },
  'white rice': { calories: 200, protein: 4, carbs: 45, fat: 0.4, unit: 'cup' },
  'brown rice': { calories: 112, protein: 2.6, carbs: 24, fat: 0.9, unit: 'cup' },
  'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1.1, unit: 'cup' },
  'bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2, unit: '100g' },
  'oats': { calories: 68, protein: 2.4, carbs: 12, fat: 1.4, unit: '1/2 cup' },
  'oatmeal': { calories: 68, protein: 2.4, carbs: 12, fat: 1.4, unit: '1/2 cup' },
  'quinoa': { calories: 120, protein: 4.4, carbs: 21, fat: 1.9, unit: 'cup' },
  'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1, unit: '100g' },
  'sweet potato': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, unit: '100g' },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: '100g' },
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, unit: '100g' },

  // Fats
  'olive oil': { calories: 119, protein: 0, carbs: 0, fat: 14, unit: 'tbsp' },
  'butter': { calories: 102, protein: 0.1, carbs: 0, fat: 11.5, unit: 'tbsp' },
  'avocado': { calories: 160, protein: 2, carbs: 8.5, fat: 14.7, unit: '100g' },
  'almonds': { calories: 579, protein: 21, carbs: 22, fat: 50, unit: '100g' },
  'peanut butter': { calories: 94, protein: 4, carbs: 3.5, fat: 8, unit: 'tbsp' },
  'coconut oil': { calories: 121, protein: 0, carbs: 0, fat: 13.5, unit: 'tbsp' },
  'cheese': { calories: 402, protein: 25, carbs: 1.3, fat: 33, unit: '100g' },
  'nuts': { calories: 607, protein: 20, carbs: 21, fat: 54, unit: '100g' },

  // Vegetables
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, unit: '100g' },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, unit: '100g' },
  'carrot': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, unit: '100g' },
  'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, unit: '100g' },
  'lettuce': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, unit: '100g' },
  'cucumber': { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, unit: '100g' },

  // Dairy
  'milk': { calories: 103, protein: 8, carbs: 12, fat: 2.4, unit: 'cup' },
  'yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, unit: '100g' },
  'greek yogurt': { calories: 97, protein: 9, carbs: 3.6, fat: 5, unit: '100g' },
};

// Parse ingredient input and calculate nutrition
export const parseIngredient = (ingredientLine) => {
  const line = ingredientLine.toLowerCase().trim();

  // Match patterns like "100g chicken", "1 cup rice", "2 tbsp olive oil"
  const patterns = [
    /(\d+\.?\d*)\s*g\s+(.+)/,           // 100g chicken
    /(\d+\.?\d*)\s+cup[s]?\s+(.+)/,     // 1 cup rice
    /(\d+\.?\d*)\s+tbsp[s]?\s+(.+)/,    // 1 tbsp oil
    /(\d+\.?\d*)\s+tablespoon[s]?\s+(.+)/, // 1 tablespoon oil
    /(\d+\.?\d*)\s+(.+)/,               // Generic: 1 banana
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      const amount = parseFloat(match[1]);
      const ingredient = match[2].trim();

      return { amount, ingredient, originalLine: ingredientLine };
    }
  }

  return null;
};

// Calculate nutrition for a single ingredient
export const calculateNutrition = (parsedIngredient) => {
  if (!parsedIngredient) return null;

  const { amount, ingredient } = parsedIngredient;
  const nutritionInfo = nutritionDatabase[ingredient];

  if (!nutritionInfo) return null;

  // Calculate based on unit type
  let multiplier = 1;

  if (nutritionInfo.unit === '100g') {
    // Amount is in grams
    multiplier = amount / 100;
  } else if (nutritionInfo.unit === 'cup' || nutritionInfo.unit === 'tbsp') {
    // Amount is in cups or tablespoons
    multiplier = amount;
  }

  return {
    ingredient: ingredient,
    calories: nutritionInfo.calories * multiplier,
    protein: nutritionInfo.protein * multiplier,
    carbs: nutritionInfo.carbs * multiplier,
    fat: nutritionInfo.fat * multiplier,
  };
};

// Process all ingredients and return totals
export const analyzeIngredients = (ingredientsList) => {
  const lines = ingredientsList.split('\n').filter(line => line.trim());
  const results = [];
  let totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  lines.forEach(line => {
    const parsed = parseIngredient(line);
    if (parsed) {
      const nutrition = calculateNutrition(parsed);
      if (nutrition) {
        results.push({
          original: line,
          ...nutrition
        });
        totals.calories += nutrition.calories;
        totals.protein += nutrition.protein;
        totals.carbs += nutrition.carbs;
        totals.fat += nutrition.fat;
      } else {
        results.push({
          original: line,
          error: 'Ingredient not found in database'
        });
      }
    } else {
      results.push({
        original: line,
        error: 'Could not parse ingredient format'
      });
    }
  });

  return {
    results,
    totals: {
      calories: Math.round(totals.calories),
      protein: Math.round(totals.protein * 10) / 10,
      carbs: Math.round(totals.carbs * 10) / 10,
      fat: Math.round(totals.fat * 10) / 10,
    }
  };
};

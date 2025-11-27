# Nutrition Analyzer

A beautiful React application for analyzing the nutritional content of meals. Simply enter your ingredients and get instant calculations for calories, protein, carbs, and fat.

## Features

- Modern, responsive UI built with React and Tailwind CSS
- Comprehensive nutrition database with common ingredients
- Support for multiple input formats (grams, cups, tablespoons)
- Visual progress bars for macronutrient tracking
- Detailed ingredient breakdown
- Beautiful gradient design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd nutrition-analyzer
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Usage

1. Enter your ingredients in the input form, one per line
2. Use supported formats:
   - Weight in grams: `100g chicken`, `50g almonds`
   - Volume in cups: `1 cup rice`, `2 cups milk`
   - Tablespoons: `1 tbsp olive oil`, `2 tbsp peanut butter`
3. Click "Analyze Nutrition" to see results
4. View total calories and macronutrient breakdown
5. Check individual ingredient contributions
6. Click "Analyze Another Meal" to start over

## Supported Ingredients

The app includes a comprehensive database of common ingredients including:
- Proteins: chicken, beef, salmon, eggs, tofu, etc.
- Carbs: rice, pasta, bread, oats, fruits, etc.
- Fats: oils, nuts, avocado, cheese, etc.
- Vegetables: broccoli, spinach, carrots, etc.

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- JavaScript (ES6+)

## Customizing Background

The app uses a custom SVG background image located at `public/images/healthy-food-bg.svg`.

### To use your own background image:

1. Place your image in the `public/images/` directory
2. Supported formats: JPG, PNG, SVG, WebP
3. Recommended size: 1920x1080 or larger for best quality
4. Update the background in both components:
   - `src/components/IngredientsInput.jsx` (line ~67)
   - `src/components/Results.jsx` (line ~55)

```javascript
// Change this line:
backgroundImage: 'url(/images/healthy-food-bg.svg)',
// To:
backgroundImage: 'url(/images/your-image.jpg)',
```

Current background files:
- `healthy-food-bg.svg` - Main background with illustrated food items
- `food-pattern.svg` - Alternative pattern background

## License

MIT

## Note

Nutritional data is approximate and for reference only. Consult with a healthcare professional for personalized nutrition advice.

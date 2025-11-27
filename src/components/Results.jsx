const Results = ({ analysisData, onBack }) => {
  const { results, totals } = analysisData;

  // Calculate percentages for visual bars (based on typical daily values)
  const getPercentage = (value, max) => {
    return Math.min((value / max) * 100, 100);
  };

  const macroData = [
    {
      name: 'Protein',
      value: totals.protein,
      unit: 'g',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      percentage: getPercentage(totals.protein, 150),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: 'Carbs',
      value: totals.carbs,
      unit: 'g',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-100',
      percentage: getPercentage(totals.carbs, 300),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      name: 'Fat',
      value: totals.fat,
      unit: 'g',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-100',
      percentage: getPercentage(totals.fat, 70),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen py-8 px-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      <div className="max-w-4xl mx-auto relative z-10">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Analysis Complete
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Here's the nutritional breakdown of your meal
          </p>
        </div>

        {/* Calories Card */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-10 mb-6 text-white border-4 border-white/20 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-base font-semibold mb-2 flex items-center">
                <span className="mr-2">🔥</span>
                Total Calories
              </p>
              <p className="text-7xl font-extrabold tracking-tight">{totals.calories}</p>
              <p className="text-emerald-100 text-lg mt-2 font-medium">kcal</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-lg">
              <svg
                className="w-20 h-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {macroData.map((macro, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-7 border-2 border-gray-100 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center p-4 ${macro.bgColor} rounded-2xl mb-4 text-gray-700 shadow-md`}>
                {macro.icon}
              </div>
              <h3 className="text-gray-600 text-base font-bold mb-3">
                {macro.name}
              </h3>
              <p className="text-4xl font-extrabold text-gray-800 mb-4">
                {macro.value}
                <span className="text-xl text-gray-500 ml-1 font-semibold">{macro.unit}</span>
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${macro.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                  style={{ width: `${macro.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2 font-medium">
                {Math.round(macro.percentage)}% of typical daily intake
              </p>
            </div>
          ))}
        </div>

        {/* Ingredients Breakdown */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-gray-100 mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
            <span className="mr-3 text-2xl">📋</span>
            Ingredient Breakdown
          </h2>

          <div className="space-y-3">
            {results.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl border-2 shadow-sm ${
                  item.error
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all duration-200'
                }`}
              >
                {item.error ? (
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
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
                    <div>
                      <p className="font-medium text-gray-800">{item.original}</p>
                      <p className="text-sm text-red-600 mt-1">{item.error}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 capitalize">
                        {item.original}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">
                          <span className="font-medium">{Math.round(item.calories)}</span> cal
                        </span>
                        <span className="text-blue-600">
                          <span className="font-medium">{item.protein.toFixed(1)}g</span> protein
                        </span>
                        <span className="text-amber-600">
                          <span className="font-medium">{item.carbs.toFixed(1)}g</span> carbs
                        </span>
                        <span className="text-pink-600">
                          <span className="font-medium">{item.fat.toFixed(1)}g</span> fat
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-white to-gray-50 border-3 border-emerald-300 text-gray-800 py-5 px-6 rounded-2xl font-bold text-lg hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-500 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
};

export default Results;

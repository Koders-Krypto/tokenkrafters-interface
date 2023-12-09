const tailwindColors = [
  "bg-red-500",
  "bg-blue-400",
  "bg-green-600",
  "bg-yellow-300",
  "bg-indigo-700",
  "bg-pink-400",
  "bg-purple-500",
  "bg-teal-400",
  "bg-gray-600",
  "bg-orange-500",
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  return tailwindColors[randomIndex];
}

export { getRandomColor };

import type { Food } from "../types";

/**
 * Built-in food list. Values are realistic estimates (cooked weight where relevant)
 * and are meant to be edited from Settings → Manage foods once real packaging data
 * is available. Every unit's macros are pre-computed totals for that exact quantity —
 * no per-100g math happens at log time, so logging stays instant.
 */
export const BUILT_IN_FOODS: Food[] = [
  {
    id: "egg",
    name: "Egg",
    emoji: "🥚",
    builtIn: true,
    units: [
      { id: "egg-1", label: "1 egg", macros: { calories: 78, protein: 6.5, carbs: 0.6, fat: 5.5 } },
      { id: "egg-2", label: "2 eggs", macros: { calories: 156, protein: 13, carbs: 1.1, fat: 11 } },
      { id: "egg-3", label: "3 eggs", macros: { calories: 234, protein: 19.5, carbs: 1.7, fat: 16.5 } },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    emoji: "🍚",
    builtIn: true,
    units: [
      { id: "rice-111", label: "111 g bowl", macros: { calories: 144, protein: 3, carbs: 31, fat: 0.3 } },
      { id: "rice-150", label: "150 g", macros: { calories: 195, protein: 4.1, carbs: 42, fat: 0.5 } },
      { id: "rice-200", label: "200 g", macros: { calories: 260, protein: 5.4, carbs: 56, fat: 0.6 } },
      { id: "rice-250", label: "250 g", macros: { calories: 325, protein: 6.8, carbs: 70, fat: 0.8 } },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    emoji: "🍗",
    builtIn: true,
    units: [
      { id: "chicken-50", label: "50 g", macros: { calories: 83, protein: 15.5, carbs: 0, fat: 1.8 } },
      { id: "chicken-100", label: "100 g", macros: { calories: 165, protein: 31, carbs: 0, fat: 3.6 } },
      { id: "chicken-150", label: "150 g", macros: { calories: 248, protein: 46.5, carbs: 0, fat: 5.4 } },
    ],
  },
  {
    id: "potato",
    name: "Potato",
    emoji: "🥔",
    builtIn: true,
    units: [
      { id: "potato-small", label: "Small (100 g)", macros: { calories: 93, protein: 2.5, carbs: 21, fat: 0.1 } },
      { id: "potato-medium", label: "Medium (150 g)", macros: { calories: 140, protein: 3.8, carbs: 31.5, fat: 0.2 } },
      { id: "potato-large", label: "Large (200 g)", macros: { calories: 186, protein: 5, carbs: 42, fat: 0.2 } },
    ],
  },
  {
    id: "bread",
    name: "Bread",
    emoji: "🍞",
    builtIn: true,
    units: [
      { id: "bread-half", label: "Half palm", macros: { calories: 80, protein: 2.7, carbs: 15, fat: 1 } },
      { id: "bread-one", label: "One palm", macros: { calories: 159, protein: 5.4, carbs: 29, fat: 1.9 } },
      { id: "bread-two", label: "Two palms", macros: { calories: 318, protein: 10.8, carbs: 58.8, fat: 3.8 } },
    ],
  },
  {
    id: "cheese",
    name: "Cheese",
    emoji: "🧀",
    builtIn: true,
    units: [
      { id: "cheese-1", label: "One cube", macros: { calories: 60, protein: 3.8, carbs: 0.2, fat: 5 } },
      { id: "cheese-2", label: "Two cubes", macros: { calories: 120, protein: 7.6, carbs: 0.4, fat: 10 } },
      { id: "cheese-4", label: "Four cubes", macros: { calories: 240, protein: 15.2, carbs: 0.8, fat: 20 } },
    ],
  },
  {
    id: "yogurt",
    name: "Yogurt",
    emoji: "🥛",
    builtIn: true,
    units: [
      { id: "yogurt-half", label: "Half glass", macros: { calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3 } },
      { id: "yogurt-one", label: "One glass", macros: { calories: 122, protein: 7, carbs: 9.4, fat: 6.6 } },
      { id: "yogurt-two", label: "Two glasses", macros: { calories: 244, protein: 14, carbs: 18.8, fat: 13.2 } },
    ],
  },
  {
    id: "beans",
    name: "Beans",
    emoji: "🫘",
    builtIn: true,
    units: [
      { id: "beans-q", label: "Quarter cup dry", macros: { calories: 162, protein: 10.3, carbs: 29.9, fat: 0.6 } },
      { id: "beans-h", label: "Half cup dry", macros: { calories: 324, protein: 20.5, carbs: 59.9, fat: 1.1 } },
      { id: "beans-tq", label: "Three-quarter cup dry", macros: { calories: 486, protein: 30.8, carbs: 89.8, fat: 1.7 } },
      { id: "beans-1", label: "One cup dry", macros: { calories: 648, protein: 41, carbs: 119.7, fat: 2.3 } },
    ],
  },
  {
    id: "lentils",
    name: "Lentils",
    emoji: "🌱",
    builtIn: true,
    units: [
      { id: "lentils-q", label: "Quarter cup dry", macros: { calories: 170, protein: 12.4, carbs: 28.8, fat: 0.5 } },
      { id: "lentils-h", label: "Half cup dry", macros: { calories: 339, protein: 24.8, carbs: 57.6, fat: 1.1 } },
      { id: "lentils-tq", label: "Three-quarter cup dry", macros: { calories: 509, protein: 37.2, carbs: 86.4, fat: 1.6 } },
      { id: "lentils-1", label: "One cup dry", macros: { calories: 678, protein: 49.5, carbs: 115.2, fat: 2.1 } },
    ],
  },
  {
    id: "soy",
    name: "Soy",
    emoji: "🫛",
    builtIn: true,
    units: [
      { id: "soy-30", label: "30 g", macros: { calories: 52, protein: 5, carbs: 3, fat: 2.7 } },
      { id: "soy-60", label: "60 g", macros: { calories: 104, protein: 10, carbs: 5.9, fat: 5.4 } },
      { id: "soy-90", label: "90 g", macros: { calories: 156, protein: 15, carbs: 8.9, fat: 8.1 } },
    ],
  },
  {
    id: "grapes",
    name: "Grapes",
    emoji: "🍇",
    builtIn: true,
    units: [
      { id: "grapes-small", label: "Small bunch (80 g)", macros: { calories: 55, protein: 0.6, carbs: 14.4, fat: 0.2 } },
      { id: "grapes-cup", label: "One cup (150 g)", macros: { calories: 104, protein: 1.1, carbs: 27, fat: 0.3 } },
      { id: "grapes-large", label: "Large bunch (250 g)", macros: { calories: 173, protein: 1.8, carbs: 45, fat: 0.5 } },
    ],
  },
  {
    id: "watermelon",
    name: "Watermelon",
    emoji: "🍉",
    builtIn: true,
    units: [
      { id: "watermelon-slice", label: "One slice (150 g)", macros: { calories: 45, protein: 0.9, carbs: 11.4, fat: 0.2 } },
      { id: "watermelon-cup", label: "One cup (300 g)", macros: { calories: 90, protein: 1.8, carbs: 22.8, fat: 0.5 } },
    ],
  },
  {
    id: "melon",
    name: "Melon",
    emoji: "🍈",
    builtIn: true,
    units: [
      { id: "melon-slice", label: "One slice (150 g)", macros: { calories: 51, protein: 1.2, carbs: 12.3, fat: 0.3 } },
      { id: "melon-cup", label: "One cup (300 g)", macros: { calories: 102, protein: 2.4, carbs: 24.6, fat: 0.6 } },
    ],
  },
  {
    id: "banana",
    name: "Banana",
    emoji: "🍌",
    builtIn: true,
    units: [
      { id: "banana-small", label: "Small (90 g)", macros: { calories: 80, protein: 1, carbs: 20.5, fat: 0.3 } },
      { id: "banana-medium", label: "Medium (120 g)", macros: { calories: 107, protein: 1.3, carbs: 27.4, fat: 0.4 } },
      { id: "banana-large", label: "Large (150 g)", macros: { calories: 134, protein: 1.7, carbs: 34.2, fat: 0.5 } },
    ],
  },
  {
    id: "apple",
    name: "Apple",
    emoji: "🍎",
    builtIn: true,
    units: [
      { id: "apple-small", label: "Small (150 g)", macros: { calories: 78, protein: 0.5, carbs: 20.7, fat: 0.3 } },
      { id: "apple-medium", label: "Medium (180 g)", macros: { calories: 94, protein: 0.5, carbs: 24.8, fat: 0.4 } },
      { id: "apple-large", label: "Large (220 g)", macros: { calories: 114, protein: 0.7, carbs: 30.4, fat: 0.4 } },
    ],
  },
];

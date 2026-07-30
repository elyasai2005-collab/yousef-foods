import type { Food } from "../types";

interface FoodCardProps {
  food: Food;
  onTap: (food: Food) => void;
}

export function FoodCard({ food, onTap }: FoodCardProps) {
  return (
    <button
      onClick={() => onTap(food)}
      className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-3xl bg-surface shadow-card active:scale-95 active:bg-surface-alt transition-transform"
    >
      <span className="text-4xl leading-none">{food.emoji}</span>
      <span className="text-sm font-semibold text-ink">{food.name}</span>
    </button>
  );
}

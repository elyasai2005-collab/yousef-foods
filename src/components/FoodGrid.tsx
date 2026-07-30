import type { Food } from "../types";
import { FoodCard } from "./FoodCard";

interface FoodGridProps {
  foods: Food[];
  onSelect: (food: Food) => void;
}

export function FoodGrid({ foods, onSelect }: FoodGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onTap={onSelect} />
      ))}
    </div>
  );
}

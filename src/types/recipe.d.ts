export interface recipeDataProps {
    id: number,
    name: string,
    image: string,
    rating: number,
    cuisine: string,
    difficulty: string,
    servings: number,
    cookTimeMinutes: number,
    prepTimeMinutes: number,
    instructions: string[];
    ingredients: string[];
    tags: string[];
    mealType: string[];
}
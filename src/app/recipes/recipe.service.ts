import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Mumbai Sea-link commercial project',
      'Director : Mr. Darshan, Project Manager : Debasish Manna, Commercial building construction is procured privately or publicly utilizing various delivery methodologies, including cost estimating, hard bid, negotiated price, traditional, management contracting, construction management-at-risk, design & build and design-build bridging',
      'https://upload.wikimedia.org/wikipedia/commons/4/40/Penny_Lane_Towers_construction.JPG'
      ,
      [
        // new Ingredient('Meat', 1),
        // new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe('Thane Smart-city project',
    'Director : Mr. Darshan, Project Manager : Debasish Manna, Residential construction practices, technologies, and resources must conform to local building authority regulations and codes of practice. Materials readily available in the area generally dictate the construction materials used (e.g. brick versus stone, versus timber). Cost of construction on a per square meter (or per square foot) basis for houses can vary dramatically based on site conditions, local regulations, economies of scale.',
      'https://upload.wikimedia.org/wikipedia/commons/9/90/JamPlaceUnderconst.JPG',
      [
        // new Ingredient('Buns', 2),
        // new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

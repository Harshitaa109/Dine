import React, { useState } from "react";
import axios from "axios";

const mealSuggestionsData = {
  Breakfast: [
   {
  label: "Poha",
  calories: 280,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 8 }
  },
  ingredientLines: [
    "1 cup flattened rice",
    "1/2 onion, chopped",
    "Peanuts, mustard seeds",
    "Curry leaves, green chili"
  ],
  recipe: "Sauté spices, onions, then add rinsed poha. Mix and cook for 5 mins."
},
{
  label: "Upma",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 7 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1/2 cup semolina (suji)",
    "1/2 onion",
    "Mustard seeds, curry leaves",
    "Vegetables, water"
  ],
  recipe: "Roast suji, sauté spices and veggies, then add water and suji. Cook till thick."
},
{
  label: "Masala Omelette",
  calories: 220,
  totalNutrients: {
    PROCNT: { quantity: 14 },
    CHOCDF: { quantity: 5 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "2 eggs",
    "Chopped onions, tomatoes, green chili",
    "Salt and pepper"
  ],
  recipe: "Beat eggs with veggies and spices. Cook in a pan until set."
},
{
  label: "Idli with Chutney",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "4 idlis",
    "Coconut chutney",
    "Sambar (optional)"
  ],
  recipe: "Serve steamed idlis with fresh chutney and hot sambar."
},
{
  label: "Dhokla",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 9 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "1 cup besan",
    "Eno fruit salt",
    "Spices and tempering"
  ],
  recipe: "Mix batter, steam, and temper with mustard seeds and curry leaves."
},
{
  label: "Vegetable Paratha",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "1 cup whole wheat flour",
    "Mixed vegetables, grated",
    "Spices",
    "Oil or ghee"
  ],
  recipe: "Stuff spiced veggies in dough, roll out and cook on tawa with ghee."
},
{
  label: "Aloo Puri",
  calories: 500,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 55 },
    FAT: { quantity: 25 }
  },
  ingredientLines: [
    "2 puris",
    "Aloo sabzi",
    "Spices, oil"
  ],
  recipe: "Fry puris and serve with spicy potato curry."
},
{
  label: "Moong Dal Chilla",
  calories: 270,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 8 }
  },
  ingredientLines: [
    "1/2 cup soaked moong dal",
    "Onion, chili, spices",
    "Oil for frying"
  ],
  recipe: "Blend dal, mix with veggies. Cook on tawa like a pancake."
},
{
  label: "Sprouts Salad",
  calories: 180,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 3 }
  },
  ingredientLines: [
    "1 cup mixed sprouts",
    "Chopped cucumber, onion, tomato",
    "Lemon juice, chaat masala"
  ],
  recipe: "Mix everything together. Serve fresh."
},
{
  label: "Besan Toast",
  calories: 240,
  totalNutrients: {
    PROCNT: { quantity: 9 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "2 bread slices",
    "Besan, onion, chili, spices",
    "Oil for shallow frying"
  ],
  recipe: "Dip bread in besan mix and cook on tawa till crisp."
},
{
  label: "Rava Dosa",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 7 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "1/2 cup rava",
    "Rice flour, all-purpose flour",
    "Spices and herbs"
  ],
  recipe: "Make thin batter and pour over hot tawa. Roast until crisp."
},
{
  label: "Sabudana Khichdi",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 55 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "1 cup soaked sabudana",
    "Peanuts, potato, green chili",
    "Spices, ghee"
  ],
  recipe: "Cook soaked sabudana with spices and peanuts until soft."
},
{
  label: "Vegetable Dalia",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1/2 cup broken wheat (dalia)",
    "Mixed vegetables",
    "Spices, water"
  ],
  recipe: "Pressure cook dalia and veggies with spices until soft."
},
{
  label: "Cheela Sandwich",
  calories: 280,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Besan batter",
    "2 bread slices",
    "Onion, capsicum, chutney"
  ],
  recipe: "Cook besan cheela with veggies, sandwich between bread and toast."
}

  ],
  Lunch: [
   {
  label: "Rajma Chawal",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 15 },
    CHOCDF: { quantity: 60 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "1 cup rajma (kidney beans)",
    "1 cup cooked rice",
    "Spices and onions"
  ],
  recipe: "Cook soaked rajma with spices. Serve with steamed rice."
},
{
  label: "Paneer Butter Masala with Naan",
  calories: 600,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 35 }
  },
  ingredientLines: [
    "150g paneer",
    "1/2 cup cream",
    "Tomato gravy",
    "1 naan"
  ],
  recipe: "Cook paneer in butter and tomato gravy. Serve with naan."
},
{
  label: "Veg Biryani",
  calories: 520,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 70 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "1 cup basmati rice",
    "Mixed vegetables",
    "Biryani masala"
  ],
  recipe: "Cook rice with veggies and spices in layers."
},
{
  label: "Aloo Paratha with Curd",
  calories: 480,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 55 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "2 wheat parathas",
    "Boiled potato filling",
    "Curd"
  ],
  recipe: "Stuff parathas with aloo mix, cook and serve with curd."
},
{
  label: "Sambar with Rice",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 55 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1 cup toor dal",
    "Vegetables",
    "Sambar masala",
    "Cooked rice"
  ],
  recipe: "Cook dal with vegetables and tamarind. Serve with rice."
},
{
  label: "Methi Thepla with Pickle",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Wheat flour",
    "Methi leaves",
    "Spices"
  ],
  recipe: "Make dough, roll out theplas and cook. Serve with pickle."
},
{
  label: "Kadhi Chawal",
  calories: 430,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 55 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "1 cup yogurt",
    "Besan (gram flour)",
    "Cooked rice"
  ],
  recipe: "Cook yogurt with besan and spices. Serve with rice."
},
{
  label: "Egg Curry with Rice",
  calories: 500,
  totalNutrients: {
    PROCNT: { quantity: 22 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 25 }
  },
  ingredientLines: [
    "2 boiled eggs",
    "Tomato-onion gravy",
    "Cooked rice"
  ],
  recipe: "Cook eggs in masala curry and serve with rice."
},
{
  label: "Chole with Rice",
  calories: 480,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 60 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "1 cup chickpeas",
    "Tomato gravy",
    "Cooked rice"
  ],
  recipe: "Cook chickpeas with spices. Serve with rice."
},
{
  label: "Litti Chokha",
  calories: 550,
  totalNutrients: {
    PROCNT: { quantity: 14 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 28 }
  },
  ingredientLines: [
    "Wheat dough balls",
    "Sattu filling",
    "Mashed brinjal and tomato"
  ],
  recipe: "Bake littis and serve with chokha."
},
{
  label: "Baingan Bharta with Roti",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "1 roasted brinjal",
    "Onion-tomato masala",
    "2 rotis"
  ],
  recipe: "Mash brinjal and mix with masala. Serve with roti."
},
{
  label: "Daal Tadka with Rice",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "1 cup toor/moong dal",
    "Garlic and tomato tadka",
    "Cooked rice"
  ],
  recipe: "Cook dal, add tadka, and serve with rice."
},
{
  label: "Pav Bhaji",
  calories: 550,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 60 },
    FAT: { quantity: 25 }
  },
  ingredientLines: [
    "Mixed vegetables",
    "Pav buns",
    "Butter and masala"
  ],
  recipe: "Cook veggies into bhaji, serve with buttered pav."
},
{
  label: "Palak Paneer with Roti",
  calories: 480,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 28 }
  },
  ingredientLines: [
    "1 cup spinach puree",
    "100g paneer",
    "2 rotis"
  ],
  recipe: "Cook paneer in spinach gravy. Serve with roti."
}

  ],
  Dinner: [
    {
  label: "Mixed Veg Curry with Rice",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "1 cup mixed vegetables",
    "1/2 cup tomato puree",
    "1 tsp oil",
    "Spices and herbs"
  ],
  recipe: "Cook vegetables in tomato puree and spices. Serve with rice."
},
{
  label: "Tofu Stir-Fry with Noodles",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "100g tofu",
    "1 cup noodles",
    "1 cup bell peppers",
    "Soy sauce, oil"
  ],
  recipe: "Stir-fry tofu and vegetables. Add noodles and sauce."
},
{
  label: "Chickpea Salad with Pita",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 14 }
  },
  ingredientLines: [
    "1/2 cup chickpeas",
    "Chopped cucumber, tomato",
    "Lemon juice",
    "1 whole wheat pita"
  ],
  recipe: "Mix chickpeas with veggies. Serve with pita."
},
{
  label: "Egg Bhurji with Roti",
  calories: 330,
  totalNutrients: {
    PROCNT: { quantity: 16 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 14 }
  },
  ingredientLines: [
    "2 eggs",
    "1/4 cup onion, tomato",
    "Spices",
    "2 rotis"
  ],
  recipe: "Scramble eggs with veggies and spices. Serve with roti."
},
{
  label: "Masoor Dal with Brown Rice",
  calories: 360,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1/2 cup masoor dal",
    "1 cup brown rice",
    "1 tsp ghee",
    "Spices"
  ],
  recipe: "Cook dal with spices. Serve with rice and ghee."
},
{
  label: "Stuffed Bell Peppers",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "2 bell peppers",
    "1/2 cup cooked quinoa",
    "Corn, onion, cheese"
  ],
  recipe: "Stuff peppers with filling and bake until soft."
},
{
  label: "Paneer Tikka Wrap",
  calories: 420,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "50g paneer",
    "1 whole wheat wrap",
    "Yogurt & spices",
    "Onions and mint chutney"
  ],
  recipe: "Grill paneer, wrap with veggies and sauce."
},
{
  label: "Lentil Soup with Toast",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 15 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 8 }
  },
  ingredientLines: [
    "1/2 cup mixed lentils",
    "2 cups water",
    "Garlic, cumin",
    "1 slice toast"
  ],
  recipe: "Boil lentils with spices. Serve with toast."
},
{
  label: "Sprouts Chaat",
  calories: 250,
  totalNutrients: {
    PROCNT: { quantity: 14 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1/2 cup mixed sprouts",
    "Chopped onion, tomato",
    "Lemon juice",
    "Chaat masala"
  ],
  recipe: "Mix all ingredients. Serve chilled."
},
{
  label: "Vegetable Khichdi",
  calories: 390,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "1/4 cup rice",
    "1/4 cup moong dal",
    "Mixed vegetables",
    "Spices, ghee"
  ],
  recipe: "Cook all together until soft. Serve hot."
},
{
  label: "Rajma with Jeera Rice",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "1/2 cup kidney beans",
    "1 cup cooked rice",
    "Tomato, spices"
  ],
  recipe: "Cook rajma with tomato gravy. Serve with rice."
},
{
  label: "Mushroom Masala with Paratha",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "1 cup sliced mushrooms",
    "Onion, tomato puree",
    "Spices",
    "1 paratha"
  ],
  recipe: "Cook mushrooms in gravy. Serve with paratha."
},
{
  label: "Cabbage Sabzi with Dal",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1 cup shredded cabbage",
    "1/2 cup toor dal",
    "Mustard seeds, spices"
  ],
  recipe: "Cook cabbage and dal separately. Serve together."
},
{
  label: "Spinach Corn Sandwich",
  calories: 340,
  totalNutrients: {
    PROCNT: { quantity: 14 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 16 }
  },
  ingredientLines: [
    "2 bread slices",
    "1/2 cup spinach and corn",
    "White sauce or cheese"
  ],
  recipe: "Stuff mixture between bread. Grill until golden."
}

  ],
  Snacks: [
   {
  label: "Samosa",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Potatoes, peas",
    "Flour dough",
    "Spices",
    "Oil for frying"
  ],
  recipe: "Stuff dough with spicy potato mix, shape into triangles, and deep fry."
},
{
  label: "Aloo Tikki",
  calories: 250,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 28 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Boiled potatoes",
    "Spices",
    "Breadcrumbs",
    "Oil"
  ],
  recipe: "Mash potatoes with spices, shape into patties and shallow fry."
},
{
  label: "Paneer Pakora",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Paneer cubes",
    "Gram flour",
    "Spices",
    "Oil for frying"
  ],
  recipe: "Dip paneer in spiced batter and deep fry till golden."
},
{
  label: "Bhel Puri",
  calories: 180,
  totalNutrients: {
    PROCNT: { quantity: 3 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 4 }
  },
  ingredientLines: [
    "Puffed rice",
    "Sev, chutneys",
    "Onion, tomato",
    "Spices"
  ],
  recipe: "Mix all ingredients and serve immediately for crunch."
},
{
  label: "Moong Dal Chilla",
  calories: 200,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 6 }
  },
  ingredientLines: [
    "Soaked moong dal",
    "Ginger, garlic, spices",
    "Onion, coriander"
  ],
  recipe: "Grind dal to paste, spread on pan and cook like a pancake."
},
{
  label: "Vegetable Cutlet",
  calories: 220,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "Mixed boiled vegetables",
    "Potato, spices, breadcrumbs",
    "Oil"
  ],
  recipe: "Shape veggie mix into cutlets and shallow fry till crispy."
},
{
  label: "Poha",
  calories: 230,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 8 }
  },
  ingredientLines: [
    "Flattened rice",
    "Onion, mustard seeds",
    "Peanuts, turmeric"
  ],
  recipe: "Soften poha, stir-fry with spices and vegetables."
},
{
  label: "Dhokla",
  calories: 150,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 22 },
    FAT: { quantity: 4 }
  },
  ingredientLines: [
    "Gram flour",
    "Curd",
    "Eno/soda",
    "Spices"
  ],
  recipe: "Ferment batter, steam in a dish, and temper with mustard seeds."
},
{
  label: "Sabudana Vada",
  calories: 280,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Soaked sabudana",
    "Potatoes, peanuts",
    "Spices",
    "Oil"
  ],
  recipe: "Mix ingredients, shape into balls and deep fry till golden."
},
{
  label: "Masala Corn",
  calories: 160,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 6 }
  },
  ingredientLines: [
    "Boiled sweet corn",
    "Butter",
    "Chaat masala, lemon juice"
  ],
  recipe: "Mix corn with butter, spices, and lemon juice."
},
{
  label: "Onion Pakora",
  calories: 270,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "Sliced onions",
    "Gram flour",
    "Spices",
    "Oil"
  ],
  recipe: "Mix onions with batter and deep fry in small batches."
},
{
  label: "Khaman",
  calories: 160,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 5 }
  },
  ingredientLines: [
    "Besan",
    "Yogurt",
    "Tempering (mustard, curry leaves)"
  ],
  recipe: "Steam the batter and temper before serving."
},
{
  label: "Bread Roll",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 7 },
    CHOCDF: { quantity: 28 },
    FAT: { quantity: 16 }
  },
  ingredientLines: [
    "Bread slices",
    "Mashed potato stuffing",
    "Oil"
  ],
  recipe: "Fill bread with stuffing, roll and deep fry."
},
{
  label: "Sprout Salad",
  calories: 140,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 3 }
  },
  ingredientLines: [
    "Boiled sprouts",
    "Tomato, onion",
    "Lemon juice, salt"
  ],
  recipe: "Mix all ingredients and serve chilled or room temp."
}

  ],
  Desserts: [
    {
  label: "Rasgulla",
  calories: 180,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 4 }
  },
  ingredientLines: [
    "1 liter milk",
    "Lemon juice",
    "Sugar syrup"
  ],
  recipe: "Curdle milk, form balls, and cook in sugar syrup."
},
{
  label: "Kheer",
  calories: 220,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1/4 cup rice",
    "1 liter milk",
    "Sugar, cardamom, dry fruits"
  ],
  recipe: "Cook rice in milk, sweeten, and garnish with dry fruits."
},
{
  label: "Chocolate Brownie",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Flour, cocoa powder",
    "Sugar, eggs",
    "Butter"
  ],
  recipe: "Mix ingredients and bake until set."
},
{
  label: "Mango Mousse",
  calories: 210,
  totalNutrients: {
    PROCNT: { quantity: 3 },
    CHOCDF: { quantity: 28 },
    FAT: { quantity: 9 }
  },
  ingredientLines: [
    "1 cup mango pulp",
    "1/2 cup whipped cream",
    "Gelatin or agar"
  ],
  recipe: "Blend ingredients and refrigerate until set."
},
{
  label: "Pineapple Halwa",
  calories: 260,
  totalNutrients: {
    PROCNT: { quantity: 2 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Semolina, ghee",
    "Pineapple puree, sugar"
  ],
  recipe: "Roast semolina, cook with puree and sugar."
},
{
  label: "Apple Pie",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 3 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 16 }
  },
  ingredientLines: [
    "Apples, sugar, cinnamon",
    "Flour, butter"
  ],
  recipe: "Prepare filling, place in crust, and bake."
},
{
  label: "Banana Split",
  calories: 330,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "Banana, ice cream",
    "Chocolate syrup, nuts"
  ],
  recipe: "Split banana, top with ice cream and syrup."
},
{
  label: "Shahi Tukda",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 38 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Bread slices, milk",
    "Sugar syrup, dry fruits"
  ],
  recipe: "Fry bread, soak in syrup, top with thickened milk."
},
{
  label: "Malpua",
  calories: 290,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 42 },
    FAT: { quantity: 13 }
  },
  ingredientLines: [
    "Flour, milk",
    "Sugar syrup, ghee"
  ],
  recipe: "Make batter, fry and soak in syrup."
},
{
  label: "Ice Cream Sundae",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 55 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "2 scoops ice cream",
    "Chocolate syrup",
    "Nuts and cherry"
  ],
  recipe: "Assemble in a bowl and serve chilled."
},
{
  label: "Ladoo",
  calories: 230,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "Besan, ghee",
    "Sugar, cardamom"
  ],
  recipe: "Roast besan, mix with sugar and ghee, shape into balls."
},
{
  label: "Tiramisu",
  calories: 340,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 38 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Ladyfingers, coffee",
    "Mascarpone, cocoa powder"
  ],
  recipe: "Layer soaked ladyfingers with cream, refrigerate."
},
{
  label: "Cheesecake",
  calories: 380,
  totalNutrients: {
    PROCNT: { quantity: 7 },
    CHOCDF: { quantity: 42 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Cream cheese, sugar",
    "Biscuits, butter"
  ],
  recipe: "Prepare base, layer with cheese mix, bake/chill."
},
{
  label: "Moong Dal Halwa",
  calories: 310,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 32 },
    FAT: { quantity: 16 }
  },
  ingredientLines: [
    "Moong dal, ghee",
    "Milk, sugar"
  ],
  recipe: "Cook dal in ghee and milk, sweeten and serve."
}

  ],
  Beverages: [
   {
  label: "Mango Lassi",
  calories: 180,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 28 },
    FAT: { quantity: 5 }
  },
  ingredientLines: [
    "1/2 cup mango pulp",
    "1/2 cup yogurt",
    "1/4 cup milk",
    "Sugar to taste"
  ],
  recipe: "Blend all ingredients until smooth and serve chilled."
},
{
  label: "Cold Coffee",
  calories: 150,
  totalNutrients: {
    PROCNT: { quantity: 3 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 5 }
  },
  ingredientLines: [
    "1 cup milk",
    "1 tbsp instant coffee",
    "Sugar and ice"
  ],
  recipe: "Blend milk, coffee, sugar, and ice. Serve cold."
},
{
  label: "Coconut Water",
  calories: 45,
  totalNutrients: {
    PROCNT: { quantity: 1 },
    CHOCDF: { quantity: 11 },
    FAT: { quantity: 0 }
  },
  ingredientLines: [
    "1 glass fresh coconut water"
  ],
  recipe: "Serve chilled with a slice of lime if desired."
},
{
  label: "Iced Green Tea",
  calories: 30,
  totalNutrients: {
    PROCNT: { quantity: 0 },
    CHOCDF: { quantity: 8 },
    FAT: { quantity: 0 }
  },
  ingredientLines: [
    "1 green tea bag",
    "1 cup water",
    "Honey and lemon"
  ],
  recipe: "Brew tea, cool, and add honey and lemon."
},
{
  label: "Chocolate Milkshake",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "1 cup milk",
    "2 scoops chocolate ice cream",
    "Chocolate syrup"
  ],
  recipe: "Blend everything until frothy and serve cold."
},
{
  label: "Orange Juice",
  calories: 110,
  totalNutrients: {
    PROCNT: { quantity: 2 },
    CHOCDF: { quantity: 26 },
    FAT: { quantity: 0 }
  },
  ingredientLines: [
    "2 oranges, juiced"
  ],
  recipe: "Squeeze juice and strain. Serve fresh."
},
{
  label: "Watermelon Juice",
  calories: 90,
  totalNutrients: {
    PROCNT: { quantity: 2 },
    CHOCDF: { quantity: 22 },
    FAT: { quantity: 0 }
  },
  ingredientLines: [
    "2 cups watermelon cubes",
    "Mint leaves"
  ],
  recipe: "Blend and strain watermelon. Garnish with mint."
},
{
  label: "Strawberry Smoothie",
  calories: 160,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 2 }
  },
  ingredientLines: [
    "1 cup strawberries",
    "1/2 cup yogurt",
    "Honey"
  ],
  recipe: "Blend all ingredients and serve chilled."
},
{
  label: "Apple Cider",
  calories: 120,
  totalNutrients: {
    PROCNT: { quantity: 0 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 0 }
  },
  ingredientLines: [
    "1 cup apple juice",
    "Cinnamon stick"
  ],
  recipe: "Heat apple juice with cinnamon for a warm cider."
},
{
  label: "Mint Mojito (non-alcoholic)",
  calories: 100,
  totalNutrients: {
    PROCNT: { quantity: 0 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 0 }
  },
  ingredientLines: [
    "Mint leaves",
    "1 lemon",
    "2 tsp sugar",
    "Soda water"
  ],
  recipe: "Muddle mint with sugar and lemon, top with soda."
},
{
  label: "Turmeric Milk",
  calories: 130,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 15 },
    FAT: { quantity: 6 }
  },
  ingredientLines: [
    "1 cup milk",
    "1/2 tsp turmeric",
    "Honey"
  ],
  recipe: "Warm milk with turmeric and honey. Stir well."
},
{
  label: "Buttermilk",
  calories: 60,
  totalNutrients: {
    PROCNT: { quantity: 3 },
    CHOCDF: { quantity: 6 },
    FAT: { quantity: 2 }
  },
  ingredientLines: [
    "1 cup yogurt",
    "1 cup water",
    "Salt, cumin"
  ],
  recipe: "Blend yogurt with water and spices. Serve chilled."
},
{
  label: "Banana Smoothie",
  calories: 200,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 4 }
  },
  ingredientLines: [
    "1 banana",
    "1/2 cup milk",
    "Honey"
  ],
  recipe: "Blend banana, milk, and honey. Serve chilled."
},
{
  label: "Pineapple Cooler",
  calories: 140,
  totalNutrients: {
    PROCNT: { quantity: 1 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 1 }
  },
  ingredientLines: [
    "1 cup pineapple juice",
    "Ice cubes",
    "Mint"
  ],
  recipe: "Serve pineapple juice over ice with mint garnish."
}

  ],
  IndianCuisines: [
    {
    label: "Paneer Butter Masala",
    calories: 520,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 30 },
      FAT: { quantity: 35 }
    },
    ingredientLines: [
      "200g paneer",
      "Tomato puree",
      "Butter, cream, spices"
    ],
    recipe: "Cook paneer in tomato gravy with butter and cream."
  },
  {
    label: "Rajma Chawal",
    calories: 550,
    totalNutrients: {
      PROCNT: { quantity: 22 },
      CHOCDF: { quantity: 70 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "1 cup kidney beans",
      "1 cup cooked rice",
      "Onion, tomato, spices"
    ],
    recipe: "Cook beans with masala, serve over rice."
  },
  {
    label: "Masala Dosa",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Dosa batter",
      "Potato filling",
      "Coconut chutney, sambar"
    ],
    recipe: "Make dosa, fill with potato masala, serve with chutney."
  },
  {
    label: "Palak Paneer",
    calories: 480,
    totalNutrients: {
      PROCNT: { quantity: 20 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 30 }
    },
    ingredientLines: [
      "Spinach puree",
      "Paneer cubes",
      "Cream, spices"
    ],
    recipe: "Cook paneer in spiced spinach gravy."
  },
  {
    label: "Chicken Biryani",
    calories: 650,
    totalNutrients: {
      PROCNT: { quantity: 30 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 28 }
    },
    ingredientLines: [
      "Marinated chicken",
      "Basmati rice",
      "Yogurt, spices, saffron"
    ],
    recipe: "Layer cooked chicken and rice, steam and serve."
  },
  {
    label: "Aloo Paratha",
    calories: 450,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Wheat flour dough",
      "Spiced mashed potatoes",
      "Butter or ghee"
    ],
    recipe: "Stuff dough with potatoes, roll and cook on tawa."
  },
  {
    label: "Baingan Bharta",
    calories: 380,
    totalNutrients: {
      PROCNT: { quantity: 8 },
      CHOCDF: { quantity: 20 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Roasted eggplant",
      "Onion, tomato, spices",
      "Oil"
    ],
    recipe: "Mash roasted eggplant and cook with masala."
  },
  {
    label: "Idli Sambar",
    calories: 420,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Idli batter",
      "Toor dal",
      "Tamarind, vegetables"
    ],
    recipe: "Steam idlis and serve with hot sambar."
  },
  {
    label: "Butter Chicken",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 28 },
      CHOCDF: { quantity: 20 },
      FAT: { quantity: 38 }
    },
    ingredientLines: [
      "Grilled chicken",
      "Tomato-butter-cream sauce",
      "Spices"
    ],
    recipe: "Simmer chicken in rich buttery tomato gravy."
  },
  {
    label: "Poha",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 8 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Flattened rice",
      "Onion, mustard seeds, curry leaves",
      "Lemon, coriander"
    ],
    recipe: "Sauté ingredients, add soaked poha, mix and serve."
  },
  {
    label: "Matar Paneer",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 30 },
      FAT: { quantity: 28 }
    },
    ingredientLines: [
      "Paneer cubes",
      "Green peas",
      "Tomato-onion gravy"
    ],
    recipe: "Cook paneer and peas in spicy gravy."
  },
  {
    label: "Kadhi Pakora",
    calories: 470,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 30 }
    },
    ingredientLines: [
      "Besan yogurt mix",
      "Onion pakoras",
      "Spices, curry leaves"
    ],
    recipe: "Simmer pakoras in spiced yogurt curry."
  },
  {
    label: "Tandoori Roti with Dal Makhani",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 25 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 28 }
    },
    ingredientLines: [
      "Whole wheat flour",
      "Black lentils, kidney beans",
      "Cream, butter"
    ],
    recipe: "Serve tandoori roti with creamy dal makhani."
  },
  {
    label: "Vegetable Pulao",
    calories: 430,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Basmati rice",
      "Mixed vegetables",
      "Spices, ghee"
    ],
    recipe: "Sauté vegetables with rice and spices, cook together."
  }
  ],
  ItalianCuisine: [
    {
    label: "Margherita Pizza",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 20 },
      CHOCDF: { quantity: 65 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh mozzarella",
      "Basil leaves"
    ],
    recipe: "Spread sauce on dough, top with cheese and basil, bake until golden."
  },
  {
    label: "Eggplant Parmesan",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 45 },
      FAT: { quantity: 22 }
    },
    ingredientLines: [
      "Sliced eggplant",
      "Marinara sauce",
      "Parmesan and mozzarella cheese",
      "Breadcrumbs"
    ],
    recipe: "Layer fried eggplant with sauce and cheese, bake until bubbly."
  },
  {
    label: "Minestrone Soup",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Chopped vegetables",
      "Beans",
      "Pasta or rice",
      "Vegetable broth"
    ],
    recipe: "Simmer vegetables, beans, and pasta in broth until tender."
  },
  {
    label: "Caprese Salad",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 15 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Tomatoes",
      "Fresh mozzarella",
      "Basil leaves",
      "Olive oil, balsamic vinegar"
    ],
    recipe: "Layer tomatoes and mozzarella, top with basil and drizzle oil/vinegar."
  },
  {
    label: "Spinach and Ricotta Stuffed Shells",
    calories: 550,
    totalNutrients: {
      PROCNT: { quantity: 22 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Pasta shells",
      "Ricotta and spinach filling",
      "Marinara sauce",
      "Mozzarella cheese"
    ],
    recipe: "Stuff shells, place in dish with sauce and cheese, and bake."
  },
  {
    label: "Gnocchi with Tomato Sauce",
    calories: 420,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 12 }
    },
    ingredientLines: [
      "Potato gnocchi",
      "Tomato sauce",
      "Parmesan cheese",
      "Garlic, olive oil"
    ],
    recipe: "Boil gnocchi, sauté in sauce, top with cheese."
  },
  {
    label: "Pesto Pasta",
    calories: 480,
    totalNutrients: {
      PROCNT: { quantity: 14 },
      CHOCDF: { quantity: 65 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Pasta",
      "Basil pesto",
      "Parmesan cheese",
      "Pine nuts"
    ],
    recipe: "Cook pasta and toss with pesto, top with cheese and pine nuts."
  },
  {
    label: "Vegetarian Lasagna",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 20 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 30 }
    },
    ingredientLines: [
      "Lasagna noodles",
      "Vegetables (zucchini, spinach)",
      "Ricotta and mozzarella",
      "Marinara sauce"
    ],
    recipe: "Layer noodles, veggies, cheese, and sauce. Bake until golden."
  },
  {
    label: "Bruschetta",
    calories: 200,
    totalNutrients: {
      PROCNT: { quantity: 5 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 8 }
    },
    ingredientLines: [
      "Toasted baguette slices",
      "Chopped tomatoes",
      "Garlic, basil",
      "Olive oil"
    ],
    recipe: "Top bread with tomato mixture and drizzle with olive oil."
  },
  {
    label: "Ratatouille (Italian Style)",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 30 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Zucchini, eggplant, bell peppers",
      "Tomato sauce",
      "Olive oil, herbs"
    ],
    recipe: "Sauté veggies and simmer with sauce until tender."
  },
  {
    label: "Polenta with Roasted Vegetables",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Cooked polenta",
      "Roasted vegetables (carrots, squash)",
      "Olive oil, thyme"
    ],
    recipe: "Serve roasted vegetables over creamy polenta."
  },
  {
    label: "Focaccia Bread with Herbs",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 8 },
      CHOCDF: { quantity: 40 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "Focaccia dough",
      "Olive oil",
      "Rosemary, sea salt"
    ],
    recipe: "Bake dough with oil and herbs until golden brown."
  },
  {
    label: "Zucchini Fritters",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Grated zucchini",
      "Flour, egg",
      "Parmesan cheese",
      "Garlic, herbs"
    ],
    recipe: "Mix ingredients, fry spoonfuls in pan until crisp."
  },
  {
    label: "Ricotta Gnocchi",
    calories: 420,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "Ricotta cheese",
      "Flour, egg",
      "Salt",
      "Tomato or butter sauce"
    ],
    recipe: "Form dough into gnocchi, boil, and toss with sauce."
  }
  ],
  MexicanCuisine: [
    {
    label: "Black Bean Tacos",
    calories: 450,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "2 corn tortillas",
      "1/2 cup black beans",
      "Lettuce, tomato, avocado",
      "Salsa"
    ],
    recipe: "Fill tortillas with beans and veggies, top with salsa."
  },
  {
    label: "Chiles Rellenos",
    calories: 480,
    totalNutrients: {
      PROCNT: { quantity: 16 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 30 }
    },
    ingredientLines: [
      "2 poblano peppers",
      "Cheese filling",
      "Tomato sauce"
    ],
    recipe: "Stuff peppers with cheese, bake, and top with sauce."
  },
  {
    label: "Vegetarian Enchiladas",
    calories: 520,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 22 }
    },
    ingredientLines: [
      "2 corn tortillas",
      "Mixed vegetables",
      "Enchilada sauce",
      "Cheese"
    ],
    recipe: "Fill tortillas with veggies, roll, top with sauce and cheese, and bake."
  },
  {
    label: "Mexican Rice Bowl",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "1 cup rice",
      "Black beans, corn, avocado",
      "Salsa, sour cream"
    ],
    recipe: "Layer rice with beans, veggies, and toppings."
  },
  {
    label: "Vegetarian Nachos",
    calories: 550,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 28 }
    },
    ingredientLines: [
      "Tortilla chips",
      "Cheese",
      "Black beans, jalapeños, tomatoes",
      "Sour cream, guacamole"
    ],
    recipe: "Top chips with cheese and toppings, then bake or microwave."
  },
  {
    label: "Mexican Street Corn (Elote)",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 8 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "1 ear corn",
      "Mayonnaise, cotija cheese",
      "Chili powder, lime juice"
    ],
    recipe: "Grill corn and coat with toppings."
  },
  {
    label: "Bean and Cheese Burrito",
    calories: 480,
    totalNutrients: {
      PROCNT: { quantity: 16 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "1 flour tortilla",
      "Refried beans",
      "Cheese",
      "Salsa"
    ],
    recipe: "Fill tortilla with beans and cheese, roll and warm."
  },
  {
    label: "Zucchini Tacos",
    calories: 420,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 45 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "2 corn tortillas",
      "Grilled zucchini",
      "Avocado, salsa"
    ],
    recipe: "Fill tortillas with grilled zucchini and toppings."
  },
  {
    label: "Mushroom Fajitas",
    calories: 460,
    totalNutrients: {
      PROCNT: { quantity: 14 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "1 cup sliced mushrooms",
      "Bell peppers, onions",
      "Tortillas"
    ],
    recipe: "Sauté veggies and serve in tortillas."
  },
  {
    label: "Mexican Quinoa Salad",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 45 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "1 cup cooked quinoa",
      "Black beans, corn, tomato",
      "Lime juice, olive oil"
    ],
    recipe: "Mix all ingredients and serve chilled."
  },
  {
    label: "Vegetarian Tamales",
    calories: 450,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 22 }
    },
    ingredientLines: [
      "Masa dough",
      "Vegetable filling",
      "Corn husks"
    ],
    recipe: "Fill masa with veggies, wrap in husks, and steam."
  },
  {
    label: "Mexican Stuffed Peppers",
    calories: 480,
    totalNutrients: {
      PROCNT: { quantity: 14 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Bell peppers",
      "Rice, black beans, corn",
      "Tomato sauce"
    ],
    recipe: "Stuff peppers with mixture, top with sauce, and bake."
  },
  {
    label: "Guacamole and Chips",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 5 },
      CHOCDF: { quantity: 40 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Tortilla chips",
      "Avocados",
      "Onion, tomato, lime"
    ],
    recipe: "Mash avocado with other ingredients, serve with chips."
  },
  {
    label: "Taco Salad",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 40 },
      FAT: { quantity: 28 }
    },
    ingredientLines: [
      "Lettuce, beans, corn, tomato",
      "Cheese, sour cream",
      "Taco seasoning"
    ],
    recipe: "Mix all ingredients for a hearty salad."
  }
  ],
  ChineseCuisine: [
   {
    label: "Vegetable Dumplings",
    calories: 280,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 40 },
      FAT: { quantity: 8 }
    },
    ingredientLines: [
      "Dumpling wrappers",
      "Cabbage, carrots, mushrooms",
      "Soy sauce, ginger"
    ],
    recipe: "Fill wrappers with veggies and steam or pan-fry until cooked."
  },
  {
    label: "Mapo Tofu (Vegetarian)",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Tofu cubes",
      "Doubanjiang (chili bean paste)",
      "Garlic, ginger, spring onions"
    ],
    recipe: "Cook tofu in spicy sauce with aromatics until well coated."
  },
  {
    label: "Szechuan Stir-Fry Vegetables",
    calories: 320,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Broccoli, bell peppers, snow peas",
      "Szechuan sauce",
      "Garlic, sesame oil"
    ],
    recipe: "Stir-fry vegetables with Szechuan sauce until tender-crisp."
  },
  {
    label: "Vegetarian Chow Mein",
    calories: 420,
    totalNutrients: {
      PROCNT: { quantity: 14 },
      CHOCDF: { quantity: 65 },
      FAT: { quantity: 12 }
    },
    ingredientLines: [
      "Noodles",
      "Cabbage, bean sprouts, carrots",
      "Soy sauce, sesame oil"
    ],
    recipe: "Toss boiled noodles with stir-fried vegetables and sauce."
  },
  {
    label: "Chinese Eggplant in Garlic Sauce",
    calories: 310,
    totalNutrients: {
      PROCNT: { quantity: 5 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Chinese eggplants",
      "Garlic, soy sauce, chili paste",
      "Cornstarch, sesame oil"
    ],
    recipe: "Stir-fry eggplant with garlic sauce until tender."
  },
  {
    label: "Tofu and Broccoli Stir-Fry",
    calories: 390,
    totalNutrients: {
      PROCNT: { quantity: 20 },
      CHOCDF: { quantity: 30 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "Tofu, broccoli",
      "Garlic, soy sauce, sesame oil"
    ],
    recipe: "Stir-fry tofu and broccoli in garlic soy sauce."
  },
  {
    label: "Hot and Sour Soup (Vegetarian)",
    calories: 150,
    totalNutrients: {
      PROCNT: { quantity: 8 },
      CHOCDF: { quantity: 15 },
      FAT: { quantity: 5 }
    },
    ingredientLines: [
      "Mushrooms, tofu, bamboo shoots",
      "Soy sauce, vinegar, pepper",
      "Cornstarch slurry"
    ],
    recipe: "Simmer ingredients and thicken with cornstarch for a hot-sour flavor."
  },
  {
    label: "Chinese Scallion Pancakes",
    calories: 250,
    totalNutrients: {
      PROCNT: { quantity: 6 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Flour, water",
      "Chopped scallions",
      "Sesame oil"
    ],
    recipe: "Roll dough with scallions and fry until crispy and golden."
  },
  {
    label: "Bok Choy with Garlic Sauce",
    calories: 180,
    totalNutrients: {
      PROCNT: { quantity: 6 },
      CHOCDF: { quantity: 15 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Bok choy",
      "Garlic, soy sauce, sesame oil"
    ],
    recipe: "Sauté bok choy in garlic sauce until wilted."
  },
  {
    label: "Vegetable Spring Rolls",
    calories: 220,
    totalNutrients: {
      PROCNT: { quantity: 5 },
      CHOCDF: { quantity: 30 },
      FAT: { quantity: 12 }
    },
    ingredientLines: [
      "Spring roll wrappers",
      "Cabbage, carrots, glass noodles",
      "Soy sauce, garlic"
    ],
    recipe: "Fill and roll wrappers, fry until golden."
  },
  {
    label: "Sweet and Sour Tofu",
    calories: 370,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 45 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Tofu cubes",
      "Bell peppers, pineapple",
      "Sweet and sour sauce"
    ],
    recipe: "Stir-fry tofu and vegetables, coat in sweet and sour sauce."
  },
  {
    label: "Chinese Cabbage Stir-Fry",
    calories: 210,
    totalNutrients: {
      PROCNT: { quantity: 6 },
      CHOCDF: { quantity: 20 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Napa cabbage",
      "Garlic, soy sauce, chili flakes"
    ],
    recipe: "Stir-fry cabbage in garlic and soy sauce until soft."
  },
  {
    label: "Tofu Lettuce Wraps",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 20 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "Tofu crumbles",
      "Soy sauce, hoisin, garlic",
      "Lettuce leaves"
    ],
    recipe: "Cook tofu with sauces and serve in lettuce cups."
  },
  {
    label: "Stir-Fried Chinese Greens",
    calories: 190,
    totalNutrients: {
      PROCNT: { quantity: 7 },
      CHOCDF: { quantity: 12 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Choy sum or gai lan",
      "Garlic, soy sauce, sesame oil"
    ],
    recipe: "Stir-fry greens in garlic until just tender."
  }
  ],
  ThaiCuisine: [
   {
  label: "Pad Thai",
  calories: 600,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 65 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "Rice noodles",
    "Tofu, peanuts, bean sprouts",
    "Tamarind paste, soy sauce, lime"
  ],
  recipe: "Stir-fry noodles with tofu and vegetables in sauce, garnish with peanuts and lime."
},
{
  label: "Tom Yum Soup",
  calories: 180,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 15 },
    FAT: { quantity: 8 }
  },
  ingredientLines: [
    "Lemongrass, kaffir lime leaves, galangal",
    "Mushrooms, chili paste, lime juice"
  ],
  recipe: "Simmer herbs and vegetables in broth, season with chili and lime."
},
{
  label: "Thai Basil Tofu",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Tofu cubes",
    "Bell peppers, Thai basil",
    "Soy sauce, garlic, chili"
  ],
  recipe: "Stir-fry tofu with vegetables and basil in sauce."
},
{
  label: "Som Tum (Green Papaya Salad)",
  calories: 220,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "Shredded green papaya",
    "Tomatoes, green beans, peanuts",
    "Lime juice, chili, palm sugar"
  ],
  recipe: "Pound ingredients together in mortar, serve fresh."
},
{
  label: "Massaman Curry",
  calories: 550,
  totalNutrients: {
    PROCNT: { quantity: 16 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 30 }
  },
  ingredientLines: [
    "Potatoes, tofu",
    "Coconut milk, massaman curry paste",
    "Peanuts, cinnamon"
  ],
  recipe: "Simmer tofu and vegetables in curry paste and coconut milk."
},
{
  label: "Thai Peanut Noodles",
  calories: 500,
  totalNutrients: {
    PROCNT: { quantity: 14 },
    CHOCDF: { quantity: 60 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Rice noodles",
    "Peanut butter, soy sauce, lime juice",
    "Carrots, green onions"
  ],
  recipe: "Toss noodles in peanut sauce with veggies."
},
{
  label: "Thai Fried Rice",
  calories: 520,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 65 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "Cooked jasmine rice",
    "Egg, peas, carrots",
    "Soy sauce, garlic"
  ],
  recipe: "Stir-fry rice with vegetables and seasonings."
},
{
  label: "Vegetable Thai Spring Rolls",
  calories: 280,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Rice paper",
    "Shredded vegetables",
    "Mint, cilantro, sweet chili sauce"
  ],
  recipe: "Wrap vegetables in rice paper, serve with chili dip."
},
{
  label: "Red Curry Vegetables",
  calories: 480,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 28 }
  },
  ingredientLines: [
    "Mixed vegetables",
    "Red curry paste, coconut milk",
    "Thai basil"
  ],
  recipe: "Simmer vegetables in red curry sauce until tender."
},
{
  label: "Larb Tofu (Thai Tofu Salad)",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "Crumbled tofu",
    "Mint, cilantro, red onion",
    "Lime juice, chili flakes"
  ],
  recipe: "Toss tofu with herbs and spicy lime dressing."
},
{
  label: "Thai Coconut Soup (Tom Kha)",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Coconut milk",
    "Galangal, lemongrass, mushrooms",
    "Lime juice, chili"
  ],
  recipe: "Simmer coconut milk with herbs and vegetables."
},
{
  label: "Thai Mango Sticky Rice",
  calories: 430,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 65 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Glutinous rice",
    "Coconut milk, mango slices",
    "Sugar, salt"
  ],
  recipe: "Serve sweetened coconut rice with fresh mango."
},
{
  label: "Thai Lettuce Wraps",
  calories: 310,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 16 }
  },
  ingredientLines: [
    "Tofu or tempeh",
    "Lettuce leaves, carrots, peanuts",
    "Chili garlic sauce"
  ],
  recipe: "Fill lettuce leaves with seasoned filling and roll."
},
{
  label: "Thai Eggplant Stir-Fry",
  calories: 390,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Thai eggplants",
    "Soy sauce, garlic, chili",
    "Basil leaves"
  ],
  recipe: "Stir-fry eggplant in sauce with basil until soft."
}

  ],
  MediterraneanCuisine: [
   {
  label: "Greek Salad",
  calories: 220,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 12 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "Cucumber, tomato, red onion",
    "Feta cheese",
    "Olives, olive oil"
  ],
  recipe: "Combine chopped veggies with feta, olives, and drizzle with olive oil."
},
{
  label: "Shakshuka",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "2 eggs",
    "Tomato sauce with onions and peppers",
    "Spices (paprika, cumin)"
  ],
  recipe: "Poach eggs in spiced tomato sauce and serve hot."
},
{
  label: "Hummus and Pita",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 16 }
  },
  ingredientLines: [
    "1 cup hummus",
    "2 pita breads",
    "Olive oil, paprika"
  ],
  recipe: "Serve hummus with warm pita and drizzle olive oil on top."
},
{
  label: "Stuffed Grape Leaves (Dolma)",
  calories: 250,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 10 }
  },
  ingredientLines: [
    "Grape leaves",
    "Rice, herbs, lemon juice"
  ],
  recipe: "Stuff leaves with herbed rice, roll, and steam until tender."
},
{
  label: "Grilled Halloumi",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 5 },
    FAT: { quantity: 25 }
  },
  ingredientLines: [
    "Halloumi cheese",
    "Olive oil",
    "Lemon, herbs"
  ],
  recipe: "Grill halloumi slices and serve with lemon and herbs."
},
{
  label: "Eggplant Parmesan (Melanzane alla Parmigiana)",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Eggplant slices",
    "Tomato sauce, mozzarella, Parmesan",
    "Olive oil, basil"
  ],
  recipe: "Layer fried eggplant with sauce and cheese, then bake."
},
{
  label: "Pasta Primavera",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 15 },
    CHOCDF: { quantity: 55 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "Whole wheat pasta",
    "Mixed vegetables (zucchini, bell peppers, broccoli)",
    "Olive oil, garlic"
  ],
  recipe: "Sauté veggies and toss with pasta and olive oil."
},
{
  label: "Chickpea Stew",
  calories: 380,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 15 }
  },
  ingredientLines: [
    "Chickpeas",
    "Tomato sauce, garlic, onion",
    "Cumin, paprika"
  ],
  recipe: "Simmer chickpeas in a spiced tomato sauce."
},
{
  label: "Tabbouleh",
  calories: 180,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 28 },
    FAT: { quantity: 6 }
  },
  ingredientLines: [
    "Bulgur wheat",
    "Parsley, mint, tomato",
    "Lemon juice, olive oil"
  ],
  recipe: "Mix soaked bulgur with herbs and veggies, then add lemon dressing."
},
{
  label: "Spanakopita",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 28 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "Phyllo dough",
    "Spinach, feta cheese",
    "Onion, dill"
  ],
  recipe: "Layer spinach-feta mix in phyllo and bake until golden."
},
{
  label: "Baba Ganoush",
  calories: 200,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 15 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Roasted eggplant",
    "Tahini, garlic, lemon juice",
    "Olive oil"
  ],
  recipe: "Blend ingredients into a creamy dip, drizzle with oil."
},
{
  label: "Mujaddara",
  calories: 420,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Lentils, rice",
    "Caramelized onions",
    "Cumin, olive oil"
  ],
  recipe: "Cook lentils and rice, top with caramelized onions."
},
{
  label: "Grilled Vegetable Skewers",
  calories: 260,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 14 }
  },
  ingredientLines: [
    "Zucchini, bell peppers, cherry tomatoes, mushrooms",
    "Olive oil, herbs"
  ],
  recipe: "Grill marinated vegetables on skewers until tender."
},
{
  label: "Mediterranean Quinoa Bowl",
  calories: 430,
  totalNutrients: {
    PROCNT: { quantity: 15 },
    CHOCDF: { quantity: 48 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "Cooked quinoa",
    "Chickpeas, cucumber, tomato, olives, feta",
    "Olive oil, lemon juice"
  ],
  recipe: "Toss all ingredients together and serve chilled."
}

  ],
  JapaneseCuisine: [
    {
    label: "Vegetable Sushi Rolls",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 8 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 5 }
    },
    ingredientLines: [
      "1 cup sushi rice",
      "Nori sheets",
      "Cucumber, avocado, carrot",
      "Soy sauce"
    ],
    recipe: "Roll rice and veggies in nori sheets, slice and serve with soy sauce."
  },
  {
    label: "Miso Soup",
    calories: 120,
    totalNutrients: {
      PROCNT: { quantity: 6 },
      CHOCDF: { quantity: 10 },
      FAT: { quantity: 5 }
    },
    ingredientLines: [
      "Miso paste",
      "Tofu cubes",
      "Seaweed",
      "Green onions"
    ],
    recipe: "Dissolve miso paste in water, add tofu and seaweed. Simmer and serve."
  },
  {
    label: "Udon Noodle Soup",
    calories: 450,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Udon noodles",
      "Vegetable broth",
      "Mushrooms, green onions",
      "Soy sauce, sesame oil"
    ],
    recipe: "Cook noodles in broth with vegetables and seasonings."
  },
  {
    label: "Vegetable Tempura",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Assorted vegetables (sweet potato, zucchini, bell pepper)",
      "Tempura batter",
      "Oil for frying"
    ],
    recipe: "Dip veggies in batter and deep fry until golden and crispy."
  },
  {
    label: "Onigiri (Rice Balls)",
    calories: 250,
    totalNutrients: {
      PROCNT: { quantity: 5 },
      CHOCDF: { quantity: 45 },
      FAT: { quantity: 3 }
    },
    ingredientLines: [
      "Cooked Japanese rice",
      "Furikake or pickled plum",
      "Nori strips"
    ],
    recipe: "Shape rice into triangles with filling, wrap in nori."
  },
  {
    label: "Soba Noodles with Dipping Sauce",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 5 }
    },
    ingredientLines: [
      "Soba noodles",
      "Soy sauce, mirin, dashi",
      "Green onions"
    ],
    recipe: "Serve chilled soba with dipping sauce on the side."
  },
  {
    label: "Tofu Teriyaki",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 30 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Firm tofu",
      "Teriyaki sauce",
      "Sesame seeds",
      "Green onions"
    ],
    recipe: "Pan-fry tofu and glaze with teriyaki sauce."
  },
  {
    label: "Japanese Curry Rice",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 20 },
      CHOCDF: { quantity: 70 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Rice",
      "Japanese curry roux",
      "Potatoes, carrots, onions"
    ],
    recipe: "Simmer vegetables in curry sauce and serve over rice."
  },
  {
    label: "Yakisoba (Fried Noodles)",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Yakisoba noodles",
      "Cabbage, carrots, onions",
      "Yakisoba sauce"
    ],
    recipe: "Stir-fry noodles and vegetables with sauce."
  },
  {
    label: "Tamago Sushi (Egg Sushi)",
    calories: 250,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 6 }
    },
    ingredientLines: [
      "Sushi rice",
      "Sweetened omelet (tamago)",
      "Nori"
    ],
    recipe: "Place sliced tamago over rice and secure with nori."
  },
  {
    label: "Daifuku (Sweet Rice Cake)",
    calories: 200,
    totalNutrients: {
      PROCNT: { quantity: 3 },
      CHOCDF: { quantity: 45 },
      FAT: { quantity: 2 }
    },
    ingredientLines: [
      "Glutinous rice flour",
      "Red bean paste",
      "Cornstarch"
    ],
    recipe: "Wrap red bean paste in mochi dough, dust with starch."
  },
  {
    label: "Japanese Pancake (Okonomiyaki)",
    calories: 550,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 40 },
      FAT: { quantity: 30 }
    },
    ingredientLines: [
      "Cabbage, green onions",
      "Flour, eggs",
      "Okonomiyaki sauce, mayo"
    ],
    recipe: "Pan-fry batter with cabbage, top with sauces."
  },
  {
    label: "Chawanmushi (Savory Egg Custard)",
    calories: 180,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 8 },
      FAT: { quantity: 12 }
    },
    ingredientLines: [
      "Eggs",
      "Dashi broth",
      "Mushrooms, tofu, green onions"
    ],
    recipe: "Steam egg mixture with fillings in cups."
  },
  {
    label: "Kinpira Gobo",
    calories: 220,
    totalNutrients: {
      PROCNT: { quantity: 4 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Burdock root and carrot",
      "Soy sauce, sugar, sesame oil"
    ],
    recipe: "Julienne and stir-fry veggies with sauce."
  }
  ],
  KoreanCuisine: [
   {
    label: "Kimchi Stew (Kimchi Jjigae)",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 20 },
      CHOCDF: { quantity: 15 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "1 cup aged kimchi",
      "100g tofu",
      "Pork belly slices",
      "Garlic, gochugaru, sesame oil"
    ],
    recipe: "Simmer kimchi with pork and tofu in broth and spices."
  },
  {
    label: "Tteokbokki",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Rice cakes",
      "Fish cakes",
      "Gochujang, sugar, soy sauce"
    ],
    recipe: "Simmer rice cakes in spicy gochujang sauce."
  },
  {
    label: "Japchae",
    calories: 320,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 45 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "Glass noodles",
      "Beef strips",
      "Carrots, spinach, mushrooms",
      "Soy sauce, sesame oil"
    ],
    recipe: "Stir-fry noodles and vegetables with sauce."
  },
  {
    label: "Kimbap",
    calories: 450,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 12 }
    },
    ingredientLines: [
      "Cooked rice",
      "Seaweed sheets",
      "Carrot, cucumber, spinach, egg",
      "Pickled radish"
    ],
    recipe: "Roll ingredients in seaweed and slice into rounds."
  },
  {
    label: "Bulgogi",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 30 },
      CHOCDF: { quantity: 20 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Sliced beef",
      "Soy sauce, sugar, garlic",
      "Onion, pear juice"
    ],
    recipe: "Marinate and grill beef with sauce."
  },
  {
    label: "Kimchi Fried Rice",
    calories: 420,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Cooked rice",
      "Kimchi",
      "Egg",
      "Gochujang, sesame oil"
    ],
    recipe: "Stir-fry rice with kimchi and top with fried egg."
  },
  {
    label: "Samgyeopsal (Pork Belly BBQ)",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 25 },
      CHOCDF: { quantity: 10 },
      FAT: { quantity: 50 }
    },
    ingredientLines: [
      "Pork belly slices",
      "Lettuce leaves",
      "Garlic, ssamjang",
      "Green chili, sesame oil"
    ],
    recipe: "Grill pork and wrap in lettuce with condiments."
  },
  {
    label: "Sundubu Jjigae (Soft Tofu Stew)",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 10 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Soft tofu",
      "Seafood (clams, shrimp)",
      "Gochugaru, garlic, onion"
    ],
    recipe: "Simmer tofu and seafood in spicy broth."
  },
  {
    label: "Haemul Pajeon (Seafood Pancake)",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Flour and egg batter",
      "Green onions",
      "Shrimp, squid",
      "Soy dipping sauce"
    ],
    recipe: "Pan-fry batter with seafood and vegetables."
  },
  {
    label: "Galbi (Grilled Short Ribs)",
    calories: 550,
    totalNutrients: {
      PROCNT: { quantity: 30 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 35 }
    },
    ingredientLines: [
      "Beef short ribs",
      "Soy sauce, sugar, garlic",
      "Pear juice"
    ],
    recipe: "Marinate and grill beef ribs."
  },
  {
    label: "Doenjang Jjigae (Soybean Paste Stew)",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 15 },
      CHOCDF: { quantity: 15 },
      FAT: { quantity: 12 }
    },
    ingredientLines: [
      "Doenjang (soybean paste)",
      "Zucchini, tofu, mushrooms",
      "Anchovy broth"
    ],
    recipe: "Simmer vegetables in fermented soybean broth."
  },
  {
    label: "Naengmyeon (Cold Buckwheat Noodles)",
    calories: 380,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 8 }
    },
    ingredientLines: [
      "Buckwheat noodles",
      "Cold broth",
      "Boiled egg, cucumber, pear"
    ],
    recipe: "Serve noodles in icy broth with toppings."
  },
  {
    label: "Dak Galbi (Spicy Stir-Fried Chicken)",
    calories: 470,
    totalNutrients: {
      PROCNT: { quantity: 30 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Chicken pieces",
      "Cabbage, rice cakes",
      "Gochujang, garlic, soy sauce"
    ],
    recipe: "Stir-fry chicken with vegetables and spicy sauce."
  },
  {
    label: "Gimbap Sandwich",
    calories: 480,
    totalNutrients: {
      PROCNT: { quantity: 18 },
      CHOCDF: { quantity: 55 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Gimbap rolls",
      "Fried egg",
      "Spam or tofu",
      "Lettuce"
    ],
    recipe: "Layer gimbap with fillings like a sandwich and serve."
  }
  ],
  AmericanCuisine: [
    {
  label: "Mac and Cheese",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 15 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "1 cup elbow macaroni",
    "1 cup cheddar cheese",
    "1 tbsp butter",
    "Milk, salt"
  ],
  recipe: "Boil macaroni, mix with cheese sauce made from butter and milk."
},
{
  label: "BBQ Chicken",
  calories: 600,
  totalNutrients: {
    PROCNT: { quantity: 40 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 30 }
  },
  ingredientLines: [
    "1 chicken breast",
    "BBQ sauce",
    "Salt, pepper",
    "Olive oil"
  ],
  recipe: "Marinate chicken with BBQ sauce and grill until cooked."
},
{
  label: "Pancakes with Syrup",
  calories: 520,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 70 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "1 cup pancake mix",
    "Milk, egg",
    "Maple syrup"
  ],
  recipe: "Prepare batter, cook pancakes on skillet. Serve with syrup."
},
{
  label: "Hot Dog",
  calories: 380,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "1 hot dog bun",
    "1 sausage",
    "Mustard, ketchup, onions"
  ],
  recipe: "Grill sausage and place in bun. Add toppings as desired."
},
{
  label: "Cheeseburger",
  calories: 700,
  totalNutrients: {
    PROCNT: { quantity: 30 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 40 }
  },
  ingredientLines: [
    "Beef patty",
    "Cheddar cheese",
    "Burger bun",
    "Lettuce, tomato, condiments"
  ],
  recipe: "Cook patty, melt cheese on top. Assemble with bun and veggies."
},
{
  label: "Buffalo Wings",
  calories: 650,
  totalNutrients: {
    PROCNT: { quantity: 35 },
    CHOCDF: { quantity: 20 },
    FAT: { quantity: 45 }
  },
  ingredientLines: [
    "Chicken wings",
    "Buffalo hot sauce",
    "Butter",
    "Salt"
  ],
  recipe: "Bake or fry wings and coat with buffalo sauce."
},
{
  label: "Caesar Salad",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "Romaine lettuce",
    "Caesar dressing",
    "Croutons",
    "Parmesan cheese"
  ],
  recipe: "Toss lettuce with dressing, croutons, and cheese."
},
{
  label: "Apple Pie",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 60 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "Apple slices",
    "Pie crust",
    "Sugar, cinnamon, butter"
  ],
  recipe: "Fill crust with apple mix and bake until golden."
},
{
  label: "Cornbread",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 6 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Cornmeal",
    "Flour, sugar",
    "Butter, milk, egg"
  ],
  recipe: "Mix ingredients, pour into a pan, and bake until set."
},
{
  label: "Fried Chicken",
  calories: 720,
  totalNutrients: {
    PROCNT: { quantity: 35 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 45 }
  },
  ingredientLines: [
    "Chicken pieces",
    "Flour, spices",
    "Oil for frying"
  ],
  recipe: "Coat chicken in seasoned flour and deep-fry until golden."
},
{
  label: "Sloppy Joe",
  calories: 500,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 25 }
  },
  ingredientLines: [
    "Ground beef",
    "Tomato sauce",
    "Burger bun",
    "Onion, garlic"
  ],
  recipe: "Cook beef with sauce, serve in buns."
},
{
  label: "Clam Chowder",
  calories: 480,
  totalNutrients: {
    PROCNT: { quantity: 15 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 28 }
  },
  ingredientLines: [
    "Clams",
    "Potatoes, onions",
    "Cream, butter"
  ],
  recipe: "Simmer clams and vegetables in creamy broth."
},
{
  label: "BLT Sandwich",
  calories: 390,
  totalNutrients: {
    PROCNT: { quantity: 18 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "Bacon",
    "Lettuce, tomato",
    "Toasted bread",
    "Mayonnaise"
  ],
  recipe: "Layer bacon, lettuce, tomato, and mayo between bread slices."
},
{
  label: "Pulled Pork Sandwich",
  calories: 650,
  totalNutrients: {
    PROCNT: { quantity: 35 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 35 }
  },
  ingredientLines: [
    "Pulled pork",
    "BBQ sauce",
    "Buns",
    "Pickles"
  ],
  recipe: "Slow cook pork, mix with BBQ sauce, serve in buns with pickles."
}

  ],
  FrenchCuisine: [
   {
    label: "Ratatouille",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 8 },
      CHOCDF: { quantity: 40 },
      FAT: { quantity: 10 }
    },
    ingredientLines: [
      "1 cup mixed vegetables (zucchini, eggplant, bell peppers)",
      "Tomato sauce",
      "Herbs de Provence"
    ],
    recipe: "Cook vegetables in tomato sauce with herbs until tender."
  },
  {
    label: "Quiche Lorraine",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 12 },
      CHOCDF: { quantity: 30 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "1 pie crust",
      "3 eggs",
      "1/2 cup cream",
      "Bacon bits",
      "Cheese"
    ],
    recipe: "Bake eggs, cream, bacon, and cheese in a pie crust."
  },
  {
    label: "Bouillabaisse",
    calories: 450,
    totalNutrients: {
      PROCNT: { quantity: 35 },
      CHOCDF: { quantity: 20 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Mixed seafood",
      "Fennel",
      "Tomato",
      "Saffron",
      "Garlic"
    ],
    recipe: "Simmer seafood with vegetables and saffron in broth."
  },
  {
    label: "Coq au Vin",
    calories: 500,
    totalNutrients: {
      PROCNT: { quantity: 35 },
      CHOCDF: { quantity: 15 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Chicken",
      "Red wine",
      "Mushrooms",
      "Onions",
      "Garlic"
    ],
    recipe: "Braise chicken in red wine with vegetables."
  },
  {
    label: "Nicoise Salad",
    calories: 320,
    totalNutrients: {
      PROCNT: { quantity: 20 },
      CHOCDF: { quantity: 15 },
      FAT: { quantity: 18 }
    },
    ingredientLines: [
      "Tuna",
      "Boiled eggs",
      "Green beans",
      "Olives",
      "Potatoes"
    ],
    recipe: "Assemble salad with tuna, eggs, and veggies."
  },
  {
    label: "Beef Bourguignon",
    calories: 550,
    totalNutrients: {
      PROCNT: { quantity: 40 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 30 }
    },
    ingredientLines: [
      "Beef",
      "Red wine",
      "Carrots",
      "Onions",
      "Garlic"
    ],
    recipe: "Slow-cook beef in wine and vegetables."
  },
  {
    label: "French Onion Soup",
    calories: 300,
    totalNutrients: {
      PROCNT: { quantity: 10 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Onions",
      "Beef broth",
      "Butter",
      "Bread",
      "Cheese"
    ],
    recipe: "Caramelize onions, add broth, top with cheese toast."
  },
  {
    label: "Tarte Tatin",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 4 },
      CHOCDF: { quantity: 60 },
      FAT: { quantity: 20 }
    },
    ingredientLines: [
      "Apples",
      "Sugar",
      "Butter",
      "Pastry dough"
    ],
    recipe: "Caramelize apples, cover with dough, bake and flip."
  },
  {
    label: "Duck à l'Orange",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 35 },
      CHOCDF: { quantity: 25 },
      FAT: { quantity: 35 }
    },
    ingredientLines: [
      "Duck",
      "Orange juice",
      "Sugar",
      "Vinegar",
      "Butter"
    ],
    recipe: "Roast duck and prepare orange sauce for glazing."
  },
  {
    label: "Croque Monsieur",
    calories: 450,
    totalNutrients: {
      PROCNT: { quantity: 25 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Bread",
      "Ham",
      "Cheese",
      "Bechamel sauce"
    ],
    recipe: "Layer ham, cheese, sauce on bread and grill."
  },
  {
    label: "Cassoulet",
    calories: 600,
    totalNutrients: {
      PROCNT: { quantity: 40 },
      CHOCDF: { quantity: 35 },
      FAT: { quantity: 30 }
    },
    ingredientLines: [
      "White beans",
      "Sausage",
      "Duck confit",
      "Tomato",
      "Garlic"
    ],
    recipe: "Slow-cook beans with meats and vegetables."
  },
  {
    label: "Crepes Suzette",
    calories: 350,
    totalNutrients: {
      PROCNT: { quantity: 6 },
      CHOCDF: { quantity: 50 },
      FAT: { quantity: 15 }
    },
    ingredientLines: [
      "Crepes",
      "Orange juice",
      "Butter",
      "Sugar",
      "Grand Marnier"
    ],
    recipe: "Flambé crepes in orange-butter sauce."
  },
  {
    label: "Salmon en Papillote",
    calories: 400,
    totalNutrients: {
      PROCNT: { quantity: 30 },
      CHOCDF: { quantity: 10 },
      FAT: { quantity: 25 }
    },
    ingredientLines: [
      "Salmon fillet",
      "Vegetables",
      "Lemon",
      "Olive oil",
      "Herbs"
    ],
    recipe: "Bake salmon and veggies in parchment paper."
  }
  ],
  SpanishCuisine: [
   {
  label: "Tortilla Española",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 8 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "2 eggs",
    "1 potato",
    "1 small onion",
    "Olive oil, salt"
  ],
  recipe: "Thinly slice potatoes and onions. Cook in olive oil, add beaten eggs and cook until set."
},
{
  label: "Patatas Bravas",
  calories: 350,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 45 },
    FAT: { quantity: 18 }
  },
  ingredientLines: [
    "2 potatoes",
    "Olive oil",
    "Spicy tomato sauce"
  ],
  recipe: "Fry diced potatoes until crispy. Top with spicy tomato sauce."
},
{
  label: "Pan con Tomate",
  calories: 200,
  totalNutrients: {
    PROCNT: { quantity: 4 },
    CHOCDF: { quantity: 25 },
    FAT: { quantity: 9 }
  },
  ingredientLines: [
    "Rustic bread",
    "Ripe tomato",
    "Garlic, olive oil"
  ],
  recipe: "Toast bread, rub with garlic and tomato, drizzle with olive oil."
},
{
  label: "Pisto",
  calories: 250,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Zucchini",
    "Bell pepper",
    "Tomato",
    "Onion, olive oil"
  ],
  recipe: "Sauté all vegetables with olive oil until soft. Serve warm."
},
{
  label: "Croquetas de Jamón",
  calories: 400,
  totalNutrients: {
    PROCNT: { quantity: 10 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 25 }
  },
  ingredientLines: [
    "Ham",
    "Flour",
    "Milk",
    "Breadcrumbs"
  ],
  recipe: "Make a thick béchamel with ham, chill, shape into croquettes, bread, and fry."
},
{
  label: "Empanadas Gallegas",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 12 },
    CHOCDF: { quantity: 50 },
    FAT: { quantity: 20 }
  },
  ingredientLines: [
    "Dough",
    "Tuna or vegetables",
    "Onions, bell peppers"
  ],
  recipe: "Fill dough with sautéed tuna and veggies, bake until golden."
},
{
  label: "Calamares a la Romana",
  calories: 380,
  totalNutrients: {
    PROCNT: { quantity: 20 },
    CHOCDF: { quantity: 22 },
    FAT: { quantity: 22 }
  },
  ingredientLines: [
    "Squid rings",
    "Flour",
    "Egg",
    "Oil for frying"
  ],
  recipe: "Coat squid in egg and flour. Fry until golden and serve with lemon."
},
{
  label: "Espinacas con Garbanzos",
  calories: 320,
  totalNutrients: {
    PROCNT: { quantity: 14 },
    CHOCDF: { quantity: 35 },
    FAT: { quantity: 14 }
  },
  ingredientLines: [
    "Chickpeas",
    "Spinach",
    "Garlic, paprika, olive oil"
  ],
  recipe: "Sauté garlic and paprika, add chickpeas and spinach. Simmer until combined."
},
{
  label: "Pollo al Ajillo",
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 32 },
    CHOCDF: { quantity: 10 },
    FAT: { quantity: 28 }
  },
  ingredientLines: [
    "Chicken pieces",
    "Garlic cloves",
    "Olive oil, white wine"
  ],
  recipe: "Sear chicken with garlic, deglaze with wine, and cook until tender."
},
{
  label: "Pimientos de Padrón",
  calories: 150,
  totalNutrients: {
    PROCNT: { quantity: 3 },
    CHOCDF: { quantity: 8 },
    FAT: { quantity: 12 }
  },
  ingredientLines: [
    "Padrón peppers",
    "Olive oil",
    "Sea salt"
  ],
  recipe: "Fry peppers in olive oil until blistered, sprinkle with sea salt."
},
{
  label: "Berenjenas con Miel",
  calories: 300,
  totalNutrients: {
    PROCNT: { quantity: 5 },
    CHOCDF: { quantity: 40 },
    FAT: { quantity: 14 }
  },
  ingredientLines: [
    "Eggplant slices",
    "Flour",
    "Honey",
    "Olive oil"
  ],
  recipe: "Fry battered eggplant slices and drizzle with honey."
},
{
  label: "Albondigas",
  calories: 500,
  totalNutrients: {
    PROCNT: { quantity: 25 },
    CHOCDF: { quantity: 30 },
    FAT: { quantity: 28 }
  },
  ingredientLines: [
    "Ground meat",
    "Breadcrumbs",
    "Egg, garlic, tomato sauce"
  ],
  recipe: "Mix meatballs, brown, and simmer in tomato sauce."
}
  ]
};

const MealSuggestions = () => {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  const handleAddMeal = async (recipe) => {
    try {
      const protein = recipe.totalNutrients.PROCNT?.quantity || 0;
      const carbs = recipe.totalNutrients.CHOCDF?.quantity || 0;
      const fat = recipe.totalNutrients.FAT?.quantity || 0;

      const nutrientString = `Calories: ${recipe.calories} kcal, Protein: ${protein} g, Carbs: ${carbs} g, Fat: ${fat} g`;

      await axios.post("http://localhost:5000/api/suggested-meals", {
        name: recipe.label,
        calories: recipe.calories,
        protein,
        carbs,
        fat,
        ingredients: recipe.ingredientLines,
        recipe: recipe.recipe,
        nutrients: nutrientString
      });

      alert("Meal added to your saved meals.");
    } catch (err) {
      console.error("Error saving meal:", err);
    }
  };

  const categories = Object.keys(mealSuggestionsData);
  const suggestions = mealSuggestionsData[selectedCategory];

  return (
    <div className="mt-10 px-6 md:px-12">
      <h2 className="text-3xl font-bold mb-6 text-neutral-800">
        Meal Suggestions
      </h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 border ${
              selectedCategory === cat
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Meal Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((recipe, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 rounded-xl p-5"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {recipe.label}
            </h3>

            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">
                Nutrients
              </h4>
              <ul className="text-sm text-gray-700 pl-4 list-disc">
                <li>Calories: {Math.round(recipe.calories)} kcal</li>
                <li>Protein: {Math.round(recipe.totalNutrients.PROCNT?.quantity || 0)} g</li>
                <li>Carbs: {Math.round(recipe.totalNutrients.CHOCDF?.quantity || 0)} g</li>
                <li>Fat: {Math.round(recipe.totalNutrients.FAT?.quantity || 0)} g</li>
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">
                Ingredients
              </h4>
              <ul className="text-sm text-gray-700 pl-4 list-disc">
                {recipe.ingredientLines.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">
                Recipe
              </h4>
              <p className="text-sm text-gray-700 italic">{recipe.recipe}</p>
            </div>

            <button
              onClick={() => handleAddMeal(recipe)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
            >
              Add to My Meals
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealSuggestions;

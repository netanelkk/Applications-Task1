var currentId = 1; // start index of ingredients

class ingredient {
  constructor (id, name, image, calories) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.calories = Number(calories);
  }

  get Calories() {
    return this.calories;
  }

  Render() {
    return '<div class="ingredient"><h3>' +this.name + "</h3><img src='" + this.image + "'><div>" + this.calories + ' Calories</div></div>';
  }
}

class DishRecipe {
  constructor (name, ingredients, time, cookingMethod, image) {
    this.name = name;
    this.ingredients = ingredients;
    this.time = time;
    this.cookingMethod = cookingMethod;
    this.image = image;
  }

  Render() {
    let card = '<div class="card" style="width:30%;margin:15px;">';
    card += '<img class="card-img-top" src="'+this.image+'">';
    card += '<div class="card-body">';
    card += '<h5 class="card-title">'+this.name+'</h5>';
    card += '<p class="card-text">' + this.time + " Minutes <BR> " + this.cookingMethod + ' <BR> Total Calories: ' + this.getTotalCalories() + '</p>';
    card += '<div class="cardIngrediets">';
      this.getIngredients().forEach((item) => {
        card += item.Render();
      });
    card += '</div></div></div>';
    return card;
  }

  getTotalCalories() {
    let calories = 0;
    this.ingredients.forEach((item) => {
      calories += item.Calories;
    });
    return calories;
  }

  getIngredients() {
    return this.ingredients;
  }
}

const ingredientsJson = [
  { id: 1,
    name: 'Flour',
    image: 'https://www.zaafrany.co.il/wp-content/uploads/2020/06/%D7%A7%D7%9E%D7%97-%D7%9C%D7%91%D7%9F-%D7%91%D7%94%D7%99%D7%A8-%D7%90%D7%A8%D7%95%D7%96-1-%D7%A7%D7%92.jpg',
    calories: 465
  },
  { id: 2,
    name: 'Bread Crumbs',
    image: 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/RXI60_L_P_7296073081449_1.png',
    calories: 230
  },
  { id: 3,
    name: 'Chicken Breast',
    image: 'https://d3m9l0v76dty0.cloudfront.net/system/photos/4825229/large/e69015678acf1306cbdb280703488336.jpg',
    calories: 344
  }
];

const recipes = [];

// Adding Ingredient Submit Handler
$('#addIngredientForm').submit(function (e) {
    e.preventDefault();
    const name = $("#formIngName").val();
    const image = $("#formIngImage").val();
    const calories = $("#formIngCalories").val();
    
    var myIngredient = new ingredient(0, name, image, calories);
    ingredientsJson.push(myIngredient);

    $("form input").val("");
    ingredientsRefresh();
    alert("Ingredient Added!");
});

// Dom Refresh of Ingredient List in Adding Recipe Form
function ingredientsRefresh() {
  $("#ingredientsList").html("");
  ingredientsJson.forEach((item) => {
    let ingredientObject = jsonItemToObject(item);
    $("#ingredientsList").append('<input type="checkbox" id="ingredient' + item.id + '" value="'+item.id+'"><label for="ingredient' + item.id + '">' + ingredientObject.Render() + '</label>');
  });
}

// Adding Recipe Submit Handler
$('#addRecipeForm').submit(function (e) {
    e.preventDefault();
    const name = $("#formRcpName").val();
    const method = $("#formRcpMethod").val();
    const time = Number($("#formRcpTime").val());
    const image = $("#formRcpImage").val();
    const ingredients = $('#ingredientsList input:checked').map(function() { 
      let id = Number($(this).val());
      for(let item of ingredientsJson) {
        if(item.id === id) {
          return jsonItemToObject(item);
        }
      }
    }).get();

    const recipe = new DishRecipe(name, ingredients, time, method, image);
    recipes.push(recipe);

    $("form input[type=text]").val("");
    $("input[type=checkbox]").prop('checked', false);
    recipesRefresh();
    alert("Recipe Added!");
});

// Refresh Main Screen Recipes
function recipesRefresh() {
  $("#recipes").html("");
  recipes.forEach((item) => {
    $("#recipes").append(item.Render());
  });
}

// Recipe Click Handler
$("body").on("click",".card",function() {
  $(this).find(".cardIngrediets").toggle();
});


$(document).ready(function() {
  ingredientsRefresh();
  AddSchnizel();
  recipesRefresh();
});

// Creating Ingredient Object From Json
function jsonItemToObject(item) {
  return new ingredient(item.id, item.name, item.image, item.calories);
}

// Default Recipe in System
function AddSchnizel() {
  const flour = new ingredient(ingredientsJson[0].id, ingredientsJson[0].name, ingredientsJson[0].image, ingredientsJson[0].calories);
  const breadcrumbs = new ingredient(ingredientsJson[1].id, ingredientsJson[1].name, ingredientsJson[1].image, ingredientsJson[1].calories);
  const chicken = new ingredient(ingredientsJson[2].id, ingredientsJson[2].name, ingredientsJson[2].image, ingredientsJson[2].calories);
  const recipe = new DishRecipe("Schnizel", [flour,breadcrumbs,chicken], 30, "Frying", "https://www.tavshilim.co.il/wp-content/uploads/2016/03/IMG_7878.jpg");
  recipes.push(recipe);
}
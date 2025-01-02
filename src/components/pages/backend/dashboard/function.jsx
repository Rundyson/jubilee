export const getFoodByCategory = (categoryId, dataFood) => {
  let result = [];

  dataFood?.data.map((item) => {
    if (Number(categoryId) === Number(item.category_aid)) {
      result.push(item);
    }
  });
  return result;
};

export const getCategoryPrices = (dataCategory, dataFood) => {
  let result = [];
  let resultCategoryId = [];

  dataCategory?.data.map((categoryItem) => {
    let isResultCategoryExist = false;

    dataFood?.data.map((foodItem) => {
      //BOOLEAN CHECK IF CATEGORY EXIST IN RESULT CATEGORY ARRAY
      isResultCategoryExist = resultCategoryId.includes(
        Number(categoryItem.category_aid)
      );
      //GET INDEX OF EXISTING CATEGORY
      const getIndexCategoryItem = resultCategoryId.indexOf(
        foodItem.food_category_id
      );

      //  if category not exist ad category with price
      if (
        Number(categoryItem.category_aid) ===
          Number(foodItem.food_category_id) &&
        !isResultCategoryExist
      ) {
        resultCategoryId.push(categoryItem.category_aid);
        result.push({
          ...categoryItem,
          menu_price: Number(foodItem.food_price),
        });
      }

      // IF CATEGORY EXIST ADD MENU ORUCE TO CATEGORY

      if (isResultCategoryExist == true && getIndexCategoryItem >= 0) {
        result[getIndexCategoryItem].menu_price += Number(foodItem.food_price);
      }
    });

    if (!isResultCategoryExist) {
      result.push({ ...categoryItem, menu_price: 0 });
      resultCategoryId.push(categoryItem.category_aid);
    }
  });
  return result;
};

import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from "../actions/categoriesActions";
import { categoryType } from "../../types/category";

export type categoriesStateType = {
    categoriesList: categoryType[]
}

const categriesState: categoriesStateType = {
    categoriesList: [
        {
            id: 0,
            name: "Home"
        },
        {
            id: 1,
            name: "Courses"
        },
        {
            id: 2,
            name: "Family"
        }
    ]
}

export const categoriesReducer = (state = categriesState, action: any) => {
    switch (action.type) {
        case ADD_CATEGORY: {
            return {
                categoriesList: [...state.categoriesList, {
                    id: Date.now(),
                    name: action.categoryName,
                    description: action.categoryDescription
                }]
            }
        }

        case DELETE_CATEGORY: {
            return {
                categoriesList: state.categoriesList.filter((category) => {
                    if (category.id != action.categoryId) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
            }
        }

        case EDIT_CATEGORY: {
            return {
                categoriesList: state.categoriesList.map((category) => {
                    if (category.id == action.categoryId) {
                        category.name = action.categoryName;
                        category.description = action.categoryDescription;
                    }
                    return category;
                })
            }
        }

        default: return state;
    }
}

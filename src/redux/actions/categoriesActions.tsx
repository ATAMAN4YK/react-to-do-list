export const ADD_CATEGORY = "ADD_ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";

export const addCategoryAction = (categoryName: string, categoryDescription: string | undefined) => {
    return (
        { type: ADD_CATEGORY, categoryName, categoryDescription }
    )
}

export const deleteCategoryAction = (categoryId: number) => {
    return (
        { type: DELETE_CATEGORY, categoryId }
    )
}

export const editCategoryAction = (categoryId: number, categoryName: string | null | undefined, categoryDescription: string | null | undefined) => {
    return (
        { type: EDIT_CATEGORY, categoryId, categoryName, categoryDescription }
    )
}
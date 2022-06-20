import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAction, deleteCategoryAction, editCategoryAction } from '../../redux/actions/categoriesActions';
import { globalStateType } from '../../redux/reducers/rootReducer';
import '../../styles/Categories.css';

function Categories() {
    const dispatch = useDispatch();
    const categories = useSelector((state: globalStateType) => state.categoriesState.categoriesList);

    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDescription, setCategoryDescription] = useState<string>("");

    const AddCategory = (event: React.FormEvent<HTMLFormElement | undefined | null>) => {
        event.preventDefault();
        dispatch(addCategoryAction(categoryName, categoryDescription));
    }

    const deleteCategory = (event: any) => {
        const categoryId = event.target.parentElement.id;
        if (categoryId != editCategoryId) {
            dispatch(deleteCategoryAction(categoryId));
        }
    }

    const [editCategoryMode, setEditCategorykMode] = useState<boolean>(false);
    const [editCategoryId, setEditCategoryId] = useState<number | null>();

    const editCategory = (event: any) => {
        const categoryId = event.target.parentElement.id;
        const htmlCategory = Array.from(event.target.parentElement.children);

        if (editCategoryMode == false) {
            setEditCategorykMode(true);
            setEditCategoryId(categoryId);
            htmlCategory.map((td: any, index) => {
                if (index == 0 || index == 1) {
                    td.children[0].setAttribute("hidden", true);
                    td.children[1].hidden = false;
                }
                if (index == 3) {
                    td.classList.add("line-through");
                }
            })
        }

        if (editCategoryMode == true && editCategoryId == categoryId) {
            htmlCategory.map((td: any, index) => {
                if (index == 0 || index == 1) {
                    td.children[0].hidden = false;
                    td.children[1].hidden = true;
                }
                if (index == 3) {
                    td.classList.remove("line-through");
                }
            })

            let editedCategoryName;
            let editedCategoryDescription;

            htmlCategory.map((td: any, index) => {
                if (index == 0) {
                    editedCategoryName = td.children[1].value;
                }
                if (index == 1) {
                    editedCategoryDescription = td.children[1].value;
                }
            })

            dispatch(editCategoryAction(categoryId, editedCategoryName, editedCategoryDescription));

            setEditCategorykMode(false);
            setEditCategoryId(null);
        }
    }


    return (
        <>
            <div className="add-category-form">
                <form onSubmit={(e) => AddCategory(e)}>
                    <div className="item">
                        <label htmlFor="Name">Category Name</label>
                        <input id="Name" name="Name" type="text" required onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    <div className="item">
                        <label htmlFor="Description">Description</label>
                        <input id="Description" name="Description" type="text" onChange={(e) => setCategoryDescription(e.target.value)} />
                    </div>
                    <div className="buttons">
                        <button type="reset">Clear</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
            <div className="categories-table">
                {categories.length === 0 ? <div className="clear-table">You don't have categories!</div> :
                    <table>
                        <thead>
                            <tr key="tableHead">
                                <td>Category Name</td>
                                <td>Description</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => {

                                return (
                                    <tr key={category.id} id={category.id.toString()} >
                                        <td>
                                            <span>{category.name}</span>
                                            <input hidden defaultValue={category.name}></input>
                                        </td>
                                        <td>
                                            <span>{category.description == undefined ? "" : category.description}</span>
                                            <input hidden defaultValue={category.description}></input>
                                        </td>
                                        <td className="edit-button" onClick={(e) => editCategory(e)}>🖊️</td>
                                        <td className="delete-button" onClick={(e) => deleteCategory(e)}>❌</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
}


export default Categories;
import { constants } from "./constants";
import {TCategoryAction, TCategory} from "../types";


let nextId = 1;

const countDepth = (arr: TCategory[], parentId?: number, depth = 0): number => {
  const parent = arr.find(category => category.id === parentId);
  parent && depth++;
  return parent ? countDepth(arr, parent.parentId, depth) : depth;
};

const categoryReducer = (state: TCategory[], action: TCategoryAction): TCategory[] => {
  const { type, payload } = action;
  let newState = [...state];
  switch (type) {
    case constants.ADD_CATEGORY: {
      const newId = nextId++;
      const parentIndex = newState.findIndex(category => category.id === payload.parentId);
      newState[parentIndex] = {
        ...newState[parentIndex],
        subcategories: [...newState[parentIndex].subcategories || [], newId]
      };
      const depth = countDepth(newState, payload.parentId);
      newState.push({id: newId, name: payload.name, parentId: payload.parentId, subcategories: [], depth});
      return newState;
    }
    case constants.EDIT_CATEGORY: {
      const index = newState.findIndex(category => category.id === payload.id);
      newState[index] = {
        ...newState[index],
        ...action.payload
      };
      return newState;
    }
    case constants.DELETE_CATEGORY: {
      const parentId = payload.parentId;
      if (parentId) {
        const parentIndex = newState.findIndex(category => category.id === parentId);
        newState[parentIndex] = {
          ...newState[parentIndex],
          subcategories: newState[parentIndex].subcategories?.filter(subCategoryId => subCategoryId !== payload.id)
        };
      }
      const deletingCategory = newState.find(category => category.id === payload.id);
      newState = newState.filter(category => (
        category.id !== deletingCategory?.id && !deletingCategory?.subcategories?.includes(category.id)
      ));
      return newState;
    }
    default:
      return state;
  }
};

export default categoryReducer;

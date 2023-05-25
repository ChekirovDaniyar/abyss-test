import {TCategoryAction, TCategory, TState, TOperation, TZoomAction} from "../store/types";
import {addCategory, deleteCategory, editCategory} from "../store/categories/actions";

export type TSlices = {
  zoom: (n: number) => number,
  categories: (state: TCategory[], action: TCategoryAction) => TCategory[]
};

export const combineReducers = (slices: {
  zoom: (state: number, action: TZoomAction) => (number);
  categories: (state: TCategory[], action: TCategoryAction) => TCategory[]
}) => (state: TState[keyof TState], action: TCategoryAction) => {
  return (
    Object.keys(slices).reduce(
      (acc, prop) => ({
        // @ts-ignore
        ...acc,
        // @ts-ignore
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    )
  );
};

export const compareOperationToAction = (operation: TOperation) => {
  switch (operation) {
    case 'ADD':
      return addCategory;
    case 'EDIT':
      return editCategory;
    case 'DELETE':
      return deleteCategory;
    default:
      return null;
  }
};

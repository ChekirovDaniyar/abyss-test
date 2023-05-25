import React from "react";
import { constants } from './constants';
import {TCategoryAction, TCategory} from "../types";


export const addCategory = (dispatch: React.Dispatch<TCategoryAction>, data: TCategory) => {
  dispatch({type: constants.ADD_CATEGORY, payload: data});
};

export const deleteCategory = (dispatch: React.Dispatch<TCategoryAction>, data: TCategory) => {
  dispatch({type: constants.DELETE_CATEGORY, payload: data});
};

export const editCategory = (dispatch: React.Dispatch<TCategoryAction>, data: TCategory) => {
  dispatch({type: constants.EDIT_CATEGORY, payload: data});
};

import React from "react";
import {constants} from "./constants";
import {zoomOption} from "../types";

export const setZoom = (dispatch: React.Dispatch<any>, data: typeof zoomOption[number]) => {
  dispatch({type: constants.SET_ZOOM, payload: data});
};

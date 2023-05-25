import {TZoomAction} from "../types";
import {constants} from "./constants";

const zoomReducer = (state: number, action: TZoomAction) => {
  const { type, payload } = action;
  switch (type) {
    case constants.SET_ZOOM:
      return payload;
    default:
      return state;
  }
};

export default zoomReducer;

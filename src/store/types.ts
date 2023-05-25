import {constants as categoryConstants} from "./categories/constants";
import {constants as zoomConstants} from "./zoom/constants";

export type TCategory = {
  parentId?: number,
  name: string,
  id: number,
  subcategories?: number[],
  depth?: number
};

export type TState = {
  zoom: number,
  categories: TCategory[]
};


export type TCategoryAction = {
  type: (typeof categoryConstants)[keyof typeof categoryConstants],
  payload: {
    id: number,
    parentId?: number,
    name: string
  }
};

export type TOperation = 'ADD' | 'ADD_CHILD' | 'EDIT' | 'DELETE' | null;

export const zoomOption = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150] as const;

export type TZoomAction = {
  type: typeof zoomConstants.SET_ZOOM,
  payload: typeof zoomOption[number]
};

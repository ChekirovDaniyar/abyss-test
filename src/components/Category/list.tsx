import React from 'react';
import {TCategory} from "../../store/types";
import Category from "./index";
import {connectContext} from "../../store";
import './style.css';

type TProps = {
  subcategories: number[],
  cancelAddition: () => void,
  addChild: boolean,
  categories: TCategory[],
  parentId?: number,
  colors: []
};

const CategoryList: React.FC<TProps> = ({subcategories, cancelAddition, addChild, categories, parentId, colors}) => {

  return (
    (!!subcategories?.length || addChild) ? (
    <ul className="subcategories-wrapper">
      {subcategories?.map(categoryId => {
        const category = categories.find(el => el.id === categoryId);
        return category && (
          <Category
            key={categoryId}
            {...category}
            cancelAddition={cancelAddition}
            colors={colors}
          />
        )
      })}
      {addChild && (
        <Category parentId={parentId} name="" cancelAddition={cancelAddition} type="ADD" />
      )}
    </ul>
  ) : null
  )
};

export default connectContext(CategoryList, ({categories}) => ({
  categories
}));

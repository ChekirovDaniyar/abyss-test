import React from "react";
import {TCategory, TOperation} from "../../store/types";

import {compareOperationToAction} from "../../utils";
import {connectContext} from "../../store";
import CategoryList from "./list";

import AddIcon from "../../assets/icons/add-icon.svg";
import DeleteIcon from "../../assets/icons/cancel-icon.svg";
import EditICon from "../../assets/icons/edit-icon.svg";
import CheckMarkIcon from '../../assets/icons/check-mark.svg';
import './style.css';
import {deleteCategory} from "../../store/categories/actions";


type TProps = TCategory & {
  type: TOperation,
  dispatch: React.Dispatch<any>,
  cancelAddition?: () => void,
  isRootCategory: boolean,
  colors: []
};

const Category: React.FC<TProps> = (
  {
    id,
    name = '',
    subcategories,
    type,
    parentId,
    isRootCategory = false,
    colors,
    depth = 0,
    cancelAddition,
    dispatch
  }) => {
  const [operation, setOperation] = React.useState<TOperation>(type);
  const [inputData, setInputData] = React.useState<string>(name);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isAddOrEdit = React.useMemo(() => operation === 'ADD' || operation === 'EDIT', [operation]);

  const handleAction = (type: TOperation) => () => {
    setOperation(type);
  };

  const handleDelete = () => {
    deleteCategory(dispatch, {id, parentId, name});
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const action = compareOperationToAction(operation);
    const payload = {
      id,
      name: inputData,
      ...(operation === 'ADD' ? {parentId: id || parentId} : {})
    };
    action && action(dispatch, payload);
    setOperation(null);
    operation === 'ADD' && cancelAddition && cancelAddition();
  };

  const deleteIconClassName = React.useMemo(() => (
    `${isAddOrEdit ? 'category-actions-cancel' : 'category-actions-delete'} category-actions-buttons`
  ), [isAddOrEdit]);

  React.useEffect(() => {
    if (operation === 'EDIT' || type === 'ADD') {
      inputRef.current && inputRef.current.focus();
    }
  }, [operation]);

  return (
    <li className="category-wrapper">
      <form action="#" onSubmit={handleSubmit} className="category">
        <input
          ref={inputRef}
          className="category-name"
          disabled={!isAddOrEdit}
          value={inputData}
          onChange={handleInputChange}
          style={{
            width: inputData.length + 2 + 'ch',
            backgroundColor: `#${colors && colors[depth]}`,
            color: isRootCategory || type === 'ADD' ? '#000' : '#fff'
        }}
        />
        <div className="category-actions">
          {!isAddOrEdit && (
            <>
              <button className="category-actions-buttons" type="reset" onClick={handleAction('ADD_CHILD')}>
                <img src={AddIcon} alt="Add" />
              </button>
              <button className="category-actions-buttons" onClick={handleAction('EDIT')} type="reset">
                <img src={EditICon} alt="Edit"/>
              </button>
            </>
          )}
          {!isRootCategory && (
            <button
              className={deleteIconClassName}
              onClick={!isAddOrEdit ? handleDelete : cancelAddition}
              type="reset"
            >
              <img src={DeleteIcon} alt="Delete"/>
            </button>
          )}
          {isAddOrEdit && (
            <>
              <button className="category-actions-buttons category-actions-submit" type="submit">
                <img src={CheckMarkIcon} alt="Submit"/>
              </button>
            </>
          )}
        </div>
      </form>
      <div className="subcategories">
        <CategoryList
          subcategories={subcategories}
          cancelAddition={() => setOperation(null)}
          addChild={operation === 'ADD_CHILD'}
          parentId={id}
          colors={colors}
        />
      </div>
    </li>
  );
};

export default connectContext(Category, () => ({}));

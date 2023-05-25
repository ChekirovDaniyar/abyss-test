import React from 'react';
import {TState} from "./types";
import {combineReducers, TSlices} from "../utils";
import categories from './categories/reducer';
import zoom from "./zoom/reducer";


const initialState: TState = {
  zoom: 100,
  categories: [{id: 1, name: 'Category', subcategories: []}]
};

type TContext = [TState, React.Dispatch<any>];
const Context = React.createContext<TContext>([initialState, () => {}]);

const combinedReducers = combineReducers({
  zoom,
  categories,
});

type ChildrenProps = {
  children: React.ReactNode
};


function ContextProvider ({children}: ChildrenProps) {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(combinedReducers, initialState);
  const context: TContext = React.useMemo(() => [state, dispatch], [state, dispatch]);
  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

const connectContext = (Component: React.FC<any>, select: (store: TState) => any) => {
  return (props: any) => {
    const [state, dispatch] = React.useContext(Context);
    const data = {...select ? select(state) : {}};

    return React.useMemo(() => (
      <Component
        {...props}
        {...data}
        dispatch={dispatch}
      />
    ), [JSON.stringify(data), JSON.stringify(props)])
  }
};

export { connectContext, ContextProvider, Context };

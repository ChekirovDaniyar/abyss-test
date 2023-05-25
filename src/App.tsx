import React from 'react';
import {connectContext} from "./store";
import {TCategory, zoomOption} from "./store/types";
import Category from "./components/Category";
import Header from "./components/Header";
import './App.css';


type TProps = {
  categories: TCategory[],
  maxDepth: number,
  zoom: typeof zoomOption[number]
};

type TPosition = {
  x: number,
  y: number
};

const colorLvl = 128;

const App: React.FC<TProps> = ({categories, maxDepth, zoom}) => {
  const [colors, setColors] = React.useState<string[]>(['fff']);
  const [position, setPosition] = React.useState<TPosition>({x: 0, y: 0});
  const [dragStartPosition, setDragStartPosition] = React.useState<TPosition>({x: 0, y: 0});
  const dragRef = React.useRef<HTMLUListElement>(null);

  const handleDragStart = (event: React.DragEvent<HTMLUListElement>) => {
    setDragStartPosition({x: event.clientX, y: event.clientY});
  };

  const handleDragEnd = (event: React.DragEvent<HTMLUListElement>) => {
    const diffX = event.clientX - dragStartPosition.x;
    const diffY = event.clientY - dragStartPosition.y;
    setPosition({
      x: position.x + diffX,
      y: position.y + diffY
    });
  };

  const handleCenter = () => {
    if (!dragRef.current) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dragWidth = dragRef.current.clientWidth;
    const dragHeight = dragRef.current.clientHeight;
    setPosition({x: (width - dragWidth) / 2, y: (height - dragHeight) / 2});
  };

  React.useEffect(() => {
    if (maxDepth > colors.length - 1) {
      const color = Math.floor(Math.random()*colorLvl)<<16 | Math.floor(Math.random()*colorLvl)<<8 | Math.floor(Math.random()*colorLvl);
      setColors([...colors, color.toString(16).padStart(6, '0')]);
    }
  }, [maxDepth]);

  React.useEffect(() => {
    handleCenter();
  }, []);

  return (
    <>
      <div className="App">
        <Header handleCenter={handleCenter} />
        <div className="zoom-wrapper">
          <div className="zoom-container" style={{transform: `scale(${zoom}%)`}}>
            <ul
              ref={dragRef}
              className="tree"
              style={{left: `${position.x}px`, top: `${position.y}px`}}
              draggable={true}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {categories.map(category => (
                <Category {...category} key={category.id} parentId={category.id} isRootCategory={true} colors={colors}/>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default connectContext(App, ({categories, zoom}) => ({
  categories: categories.filter(category => !category.parentId),
  maxDepth: Math.max(...categories.map(category => category.depth || 0)),
  zoom
}));

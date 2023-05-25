import React from "react";
import {connectContext} from "../../store";
import {zoomOption} from "../../store/types";
import {setZoom} from "../../store/zoom/actions";
import NavigationIcon from "../../assets/icons/navigation.svg";
import "./style.css";


type TProps = {
  dispatch: React.Dispatch<any>,
  zoom: number,
  handleCenter: () => void
};

type TZoomOperation = 'increment' | 'decrement';

const Header: React.FC<TProps> = ({zoom, handleCenter, dispatch}) => {
  const currentZoomIndex = React.useMemo(() => (
    zoomOption.findIndex(option => option === zoom)
  ), [zoom, zoomOption]);

  const handleZoomChange = (operation: TZoomOperation) => {
    const payloadIndex: number = operation === 'increment' ? currentZoomIndex + 1 : currentZoomIndex - 1;
    setZoom(dispatch, zoomOption[payloadIndex]);
  }

  const handleZoomSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setZoom(dispatch, +event.target.value as typeof zoomOption[number]);
  };

  return (
    <header>
      <div>
        <h1>Services</h1>
      </div>
      <div className="header-actions">
        <button className="header-actions-list-view">list view</button>
        <button className="header-actions-navigation" onClick={handleCenter}>
          <img src={NavigationIcon} alt="Center" />
        </button>
        <button
          className="header-actions-zoom"
          onClick={() => handleZoomChange('decrement')}
          disabled={currentZoomIndex === 0}
        >
          -
        </button>
        <select name="zoom" id="zoom" onChange={handleZoomSelect} value={zoom}>
          {zoomOption.map(n => (
            <option value={n} key={n}>{n}%</option>
          ))}
        </select>
        <button
          className="header-actions-zoom"
          onClick={() => handleZoomChange('increment')}
          disabled={currentZoomIndex === zoomOption.length - 1}
        >
          +
        </button>
      </div>
    </header>
  )
};

export default connectContext(Header, ({zoom}) => ({
  zoom
}));

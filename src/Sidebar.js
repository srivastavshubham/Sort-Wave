import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import Slider from '@mui/material/Slider';
// import './Sidebar.css';  // Assuming you use an external CSS file for styling

function Sidebar() {

   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();

   const [max, setMax] = useState(30);

   const handleAlgo = (algo) => {
      dispatch({
         type: 'UPDATE_ALGORITHM',
         algorithm: algo
      });
   }

   const resetColor = () => {
      dispatch({
         type: 'UPDATE_COLOR',
         color: document.getElementById('color').value
      });
   }

   const handleRange = (_range) => {
      let new_arr = [...myState.values];
      new_arr.forEach((_, i) =>
         document.getElementById(i).style.transform = `translateX(${i * 11}px)`
      );

      resetColor();
      dispatch({ type: 'UPDATE_RANGE', range: _range });
      dispatch({ type: 'CHANGE_VALUES' });
   }

   const handleColor = (_color) => {
      dispatch({
         type: 'UPDATE_COLOR',
         color: _color
      });
   }

   const handleSpeed = (_speed) => {
      dispatch({
         type: 'UPDATE_SPEED',
         speed: _speed
      });
   }

   useEffect(() => {
      handleRange(30);
   }, []);

   const handleWidth = () => {
      const width = window.innerWidth;
      setMax(
         width > 1300 ? 70 :
         width > 1200 ? 60 :
         width > 1100 ? 50 :
         width > 900  ? 45 :
         width > 800  ? 40 :
         width > 500  ? 30 : 20
      );
   }

   useEffect(() => {
      handleWidth();
      window.addEventListener('resize', handleWidth);
      return () => window.removeEventListener('resize', handleWidth);
   }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__option">
         <label htmlFor="algo">Algorithm:</label>
         <select name="algo" id="algo" onChange={(e) => handleAlgo(e.target.value)} disabled={myState.play}>
            <option value="bubble">Bubble Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="quick">Quick Sort</option>
         </select>
      </div>

      <div className="sidebar__option">
         <label htmlFor="range">Range:</label>
         {/* <Slider
            style={{ width: '100%' }}
            size="small"
            defaultValue={30}
            id="slider"
            min={1}
            max={max}
            onChange={(e) => handleRange(e.target.value)}
            valueLabelDisplay="auto"
            disabled={myState.play}
         /> */}
      </div>

      <div className="sidebar__option">
         <label htmlFor="color">Color:</label>
         <select name="color" id="color" onChange={(e) => handleColor(e.target.value)} disabled={myState.play}>
            <option value="rgb(0, 149, 199)" style={{ color: 'rgb(0, 149, 199)' }}>Blue</option>
            <option value='rgb(85, 212, 0)' style={{ color: 'rgb(85, 212, 0)' }}>Green</option>
            <option value="rgb(255, 112, 112)" style={{ color: 'rgb(255, 112, 112)' }}>Red</option>
            <option value="grey" style={{ color: 'grey' }}>Black</option>
            <option value="#ddd902" style={{ color: '#ddd902' }}>Yellow</option>
         </select>
      </div>

      <div className="sidebar__option">
         <label htmlFor="speed">Speed:</label>
         <select name="speed" defaultValue={100} id="speed" onChange={(e) => handleSpeed(e.target.value)} disabled={myState.play}>
            <option value={500}>Slow</option>
            <option value={200}>Medium</option>
            <option value={100}>Fast</option>
            <option value={20}>Super Fast</option>
            <option value={5}>Ultra Fast</option>
         </select>
      </div>
    </div>
  )
}

export default Sidebar;

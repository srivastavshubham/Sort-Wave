import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, InputLabel, Box, MenuItem, FormControl, Select, Typography } from '@mui/material';

function Header() {

  const myState = useSelector(state => state.updateProps);
  const dispatch = useDispatch();

  const [max, setMax] = useState(30);
  const [algoSelect, setAlgoSelect] = useState('');
  const [colorSelect, setColorSelect] = useState('rgb(255, 112, 112)');
  const [speedSelect, setSpeedSelect] = useState('');

  const handleAlgoDropdown = (e) => {
      setAlgoSelect(e.target.value)
      dispatch({
          type: 'UPDATE_ALGORITHM',
          algorithm: e.target.value
      });
  }

  const handleColorDropdown = (e) => {
      setColorSelect(e.target.value)
      dispatch({
          type: 'UPDATE_COLOR',
          color: e.target.value
      });
  }

  const handleSpeedDropdown = (e) => {
      setSpeedSelect(e.target.value)
      dispatch({
          type: 'UPDATE_SPEED',
          speed: e.target.value
      });
  }

  const resetColor = () => {
      dispatch({
          type: 'UPDATE_COLOR',
          color: colorSelect
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

 
 

  useEffect(() => {
      handleRange(30);
  }, []);

  const handleWidth = () => {
      const width = window.innerWidth;
      setMax(
          width > 1300 ? 70 :
              width > 1200 ? 60 :
                  width > 1100 ? 50 :
                      width > 900 ? 45 :
                          width > 800 ? 40 :
                              width > 500 ? 30 : 20
      );
  }

  useEffect(() => {
      handleWidth();
      window.addEventListener('resize', handleWidth);
      return () => window.removeEventListener('resize', handleWidth);
  }, []);

  return (
    <div className="header">
      <div className="header-logo">Sort<span>Wave</span></div>
      <Box sx={{ margin: '20px 10px' }}>
      <FormControl sx={{width:'200px'}}>
                    <InputLabel id="demo-simple-select-label">Select Algo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={algoSelect}
                        label="Select Algo"
                        onChange={handleAlgoDropdown}
                    >
                        <MenuItem value="bubble">Bubble Sort</MenuItem>
                        <MenuItem value="merge">Merge Sort</MenuItem>
                        <MenuItem value="insertion">Insertion Sort</MenuItem>
                        <MenuItem value="selection">Selection Sort</MenuItem>
                        <MenuItem value="quick">Quick Sort</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ margin: '20px 10px' ,width:'200px'}}>
                <Typography >Range</Typography>
                <Slider
                    style={{ width: '100%',height:'10px' }}
                    size="large"
                    defaultValue={30}
                    id="slider"
                    min={1}
                    max={max}
                    onChange={(e) => handleRange(e.target.value)}
                    valueLabelDisplay="auto"
                    disabled={myState.play}
                />
            </Box>
            <Box sx={{ margin: '20px 10px' }}>
            <FormControl sx={{width:'200px'}}>
            <InputLabel id="color-select-label">Change Color</InputLabel>
                    <Select
                        labelId="color-select-label"
                        id="color-select"
                        value={colorSelect}
                        label="Change Color"
                        onChange={handleColorDropdown}
                        disabled={myState.play}
                    >
                        <MenuItem value="rgb(0, 149, 199)">Blue</MenuItem>
                        <MenuItem value="rgb(85, 212, 0)">Green</MenuItem>
                        <MenuItem value="rgb(255, 112, 112)">Red</MenuItem>
                        <MenuItem value="grey">Black</MenuItem>
                        <MenuItem value="#ddd902">Yellow</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ margin: '20px 10px' }}>
                <FormControl sx={{width:'200px'}}>
                <InputLabel id="speed-select-label">Change Speed</InputLabel>
                    <Select
                        labelId="speed-select-label"
                        id="speed-select"
                        value={speedSelect}
                        label="Change Speed"
                        onChange={handleSpeedDropdown}
                        disabled={myState.play}
                    >
                        <MenuItem value={500}>Slow</MenuItem>
                        <MenuItem value={200}>Medium</MenuItem>
                        <MenuItem value={100}>Fast</MenuItem>
                    </Select>
                </FormControl>
            </Box>
   </div>
  )
}

export default Header;
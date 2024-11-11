import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BubbleSort from './BubbleSort';
import InsertionSort from './InsertionSort';
import QuickSort from './QuickSort';
import MergeSort from './MergeSort';
import SelectionSort from './SelectionSort';
import { TextField,Modal,Box,Typography } from '@mui/material'

function Bar() {

    const myState = useSelector(state => state.updateProps);
    const dispatch = useDispatch();
    const [customArray, setCustomArray] = useState('');
    const [errormsg, setErrorMsg] = useState(false);
    const [isCustomInputVisible, setIsCustomInputVisible] = useState(false);
    const color = myState.color;
    const range = myState.range;

    const changeValues = () => {

        let new_arr = [...myState.values];
        for (let i = 0; i < new_arr.length; i++)
            document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

        dispatch({
            type: 'CHANGE_VALUES'
        })
    }

    const handlePlayPause = (play) => {
        if (!myState.play) {
            document.getElementById('change-btn').disabled = true;
            document.getElementById('change-btn').style.backgroundColor = 'grey';
            document.getElementById('play-btn').disabled = true;
            document.getElementById('play-btn').style.backgroundColor = 'grey';
        }
        else {
            return;
        }
        dispatch({
            type: 'PLAY_PAUSE',
            _play: play
        })
    }

    const saveCustomArray = () => {
        if(!customArray){
            setErrorMsg(true)
        }else{
        const parsedArray = customArray.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
        const customValues = parsedArray.map((value, index) => [value, index]);

        dispatch({ type: 'SET_CUSTOM_VALUES', values: customValues });
        setIsCustomInputVisible(false); 
        setCustomArray(''); 
    }
};

const handleModal=()=>{
    setIsCustomInputVisible(!isCustomInputVisible)
    setErrorMsg(false)
}


const handleCloseModal=()=>{
    setIsCustomInputVisible(!isCustomInputVisible)
}
    useEffect(() => {
        if (!myState.play) {
            document.getElementById('play-btn').disabled = false;
            document.getElementById('play-btn').style.backgroundColor = 'rgb(0, 149, 199)';
            document.getElementById('change-btn').disabled = false;
            document.getElementById('change-btn').style.backgroundColor = 'rgb(0, 149, 199)';
        }
    }, [myState.play]);

    let speed = myState.speed;
    if (myState.algorithm === 'selection')
        speed *= 3;
    else if (myState.algorithm === 'merge')
        speed *= 5;
    else if (myState.algorithm === 'quick')
        speed *= 6;
    return (
        <div className="visuals">
            <div className="visualizer">
                {myState.algorithm === 'quick' && <div className="legend"><div className="legend__lable"></div> Pivot elements</div>}
                {
                    <div className="visual__items" style={{ width: `${myState.values.length * 11}px` }}>
                        {
                            myState.values.map((item) => {

                                return <div className="visual__item" key={item[1]} id={item[1]} style={{ transition: `${speed / 1000}s linear all`, transform: `translateX(${item[1] * 11}px)` }}>
                                    <h4>{item[0]}</h4>
                                    <div className="visual" style={{ height: `${item[0] * 3}px`, backgroundColor: color, width: (range < 35 ? '10px' : '9px') }}></div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
            <div className="visual__btns">
                <button id='change-btn' onClick={changeValues}>Generate values</button>
                <button id='play-btn' onClick={() => handlePlayPause(true)}>play</button>
                <button id="add-custom-array-btn" onClick={handleModal}>
                    Add Custom Array
                </button>
                <Modal
                    open={isCustomInputVisible}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        borderRadius:'10px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="modal-modal-title" variant="h6" sx={{textAlign:'center',paddingBottom:'20px'}}>
                            Add Custom Input
                        </Typography>
                        <TextField id="outlined-basic"
                            fullWidth
                            label="Custom Array"
                            variant="outlined"
                            value={customArray}
                            onChange={(e) => setCustomArray(e.target.value)}
                            placeholder=" 10, 20, 30....."
                            helperText={errormsg?'Please enter value':''}
                        /><br/>
                        <Box sx={{textAlign:'center',paddingTop:'20px'}}>
                        <button className='save-button' onClick={saveCustomArray}>Save</button>
                        </Box>
                    </Box>
                </Modal>
               
            </div>

            <BubbleSort />
            <InsertionSort />
            <MergeSort />
            <QuickSort />
            <SelectionSort />
        </div>
    )
}

export default Bar;
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'mdi-react/CloseIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import Snackbar from '@material-ui/core/Snackbar';

const Message = (props) => {
    const hideTime = 5000;
    const helperClass = props.helperClass ? props.helperClass : '';
    const btnActions = [];
    
    if(props.type === 'confirm'){
        btnActions.push(
            <IconButton
                key="ok"
                aria-label="Ok"
                color="inherit"
                className=""
                onClick={(e) => {
                    e.stopPropagation(); 
                    if(props.onConfirm && props.onConfirm instanceof Function){
                        props.onConfirm();
                    }
                }}
            >
                <CheckIcon/>
            </IconButton>
        );
    }

    btnActions.push(
        <IconButton
            key="close"
            aria-label="Cancelar"
            color="inherit"
            className=""
            onClick={(e) => {
                e.stopPropagation(); 
                if(props.onClose && props.onClose instanceof Function){
                    props.onClose();
                }
            }}
        >
            <CloseIcon/>
        </IconButton>
    );

    return <Snackbar
        className={`appSnackbar ${helperClass}`}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={hideTime}
        onClose={props.onClose}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.message}</span>}
        action={btnActions}
    />;
};

export default Message;
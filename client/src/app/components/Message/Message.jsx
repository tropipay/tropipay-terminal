import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'mdi-react/CloseIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import Snackbar from '@material-ui/core/Snackbar';
import { useTranslation } from "react-i18next";

export const Message = (props) => {
    const hideTime = 5000;
    const cls = props && props.cls ? props.cls : '';
    const btnActions = [];

    if (props && props.type === 'confirm') {
        btnActions.push(
            <IconButton
                key="ok"
                aria-label="Ok"
                color="inherit"
                className=""
                onClick={(e) => {
                    e.stopPropagation();
                    if (props.onConfirm && props.onConfirm instanceof Function) {
                        props.onConfirm();
                    }
                }}
            >
                <CheckIcon />
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
                if (props.onClose && props.onClose instanceof Function) {
                    props.onClose();
                }
            }}
        >
            <CloseIcon />
        </IconButton>
    );

    return <Snackbar
        className={`appSnackbar ${cls}`}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={(props && props.message && props.message !== "")}
        autoHideDuration={hideTime}
        onClose={props.onClose}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span id="message-id">{props.message}</span>}
        action={btnActions}
    />;
};

const Component = (props) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [style, setStyle] = useState("");

    const clean = () => setMessage("");

    return {
        render: () => {
            return <Message 
                style={style}
                message={message} 
                onClose={clean} 
                type={type} 
                />
        },
        show: (payload) => {
            if(!payload) return false;
            const msg = typeof(payload) === 'string' ? payload : payload.msg;
            setMessage(msg);
            setType(payload.type);
            setStyle(payload.style);
        },
        traslate: (payload) => {
            if(!payload) return false;
            const msgId = typeof(payload) === 'string' ? payload : payload.msgId;
            const msgDf = payload.default;
            const msg = t(msgId) !== msgId ? t(msgId) : t(msgDf);
            setMessage(msg);
            setType(payload.type);
            setStyle(payload.style);
        },
        hide: clean
    }
}

export default Component;
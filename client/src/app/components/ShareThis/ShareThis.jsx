import React from 'react';
import { useTranslation } from "react-i18next";
import Typography from '@material-ui/core/Typography';
import {
    TelegramShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton,
} from "react-share";

import { track } from '../../services/gtag';
import MessengerLogo from './image/msg-2.png';
import WhatsappLogo from './image/whatsapp-2.png';
import TelegramLogo from './image/telegram-2.png';

import "./ShareThis.scss";

export default function ShareThis(props) {

    const _miniFormat = (t, props) => {
        return (
            <div
                className="mt-0 mb-0 col-6 text-right"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <TelegramShareButton
                    url={props.sharedUrl}
                    className="mb-0 button-share"
                    beforeOnClick={() => {
                        track("SHARED_TELEGRAM", { event_label: "SHARE_BTN" });
                    }}
                >
                    <img
                        src={TelegramLogo}
                        alt="Telegram"
                        width="30px"
                        className="mb-0 mr-2"
                    />
                </TelegramShareButton>
                <WhatsappShareButton
                    url={props.sharedUrl}
                    beforeOnClick={() => {
                        track("SHARED_WHATSAPP", { event_label: "SHARE_BTN" });
                    }}
                    className="mb-0 button-share"
                >
                    <img
                        src={WhatsappLogo}
                        alt="Whatsapp"
                        width="30px"
                        className="mb-0 mr-2"
                    />
                </WhatsappShareButton>
                <FacebookMessengerShareButton
                    url={props.sharedUrl}
                    appId='276151887216053'
                    beforeOnClick={() => {
                        track("SHARED_FACEBOOK", { event_label: "SHARE_BTN" });
                    }}
                    className="mb-0 button-share"
                >
                    <img
                        src={MessengerLogo}
                        alt="Facebook Messenger"
                        width="30px"
                        className="mb-0 mr-2"
                    />
                </FacebookMessengerShareButton>
            </div>
        );
    };

    const _standardFormat = (t, props) => {
        return (
            <div className={props.className}>
                <div className="ShareLabel">
                    <Typography
                        variant="subtitle1"
                        className="text-left mt-1 font-weight-bold gray-label"
                    >
                        {t("component.shareThis.label")}:
                    </Typography>
                </div>
                <Typography variant="subtitle2" noWrap className="text-left mt-1">
                    <TelegramShareButton
                        url={props.sharedUrl}
                        className="ml-1"
                        beforeOnClick={() => {
                            track("SHARED_TELEGRAM", { event_label: "SHARE_BTN" });
                        }}
                    >
                        <img
                            src={TelegramLogo}
                            alt="Telegram"
                            width="40px"
                            className="shareIcon"
                        />
                    </TelegramShareButton>
                    <WhatsappShareButton
                        url={props.sharedUrl}
                        beforeOnClick={() => {
                            track("SHARED_WHATSAPP", { event_label: "SHARE_BTN" });
                        }}
                    >
                        <img
                            src={WhatsappLogo}
                            alt="Whatsapp"
                            width="40px"
                            className="shareIcon"
                        />
                    </WhatsappShareButton>
                    <FacebookMessengerShareButton
                        url={props.sharedUrl}
                        appId='276151887216053'
                        beforeOnClick={() => {
                            track("SHARED_FACEBOOK", { event_label: "SHARE_BTN" });
                        }}
                    >
                        <img
                            src={MessengerLogo}
                            alt="Facebook Messenger"
                            width="40px"
                            className="shareIcon"
                        />
                    </FacebookMessengerShareButton>
                </Typography>
            </div>
        );
    };

    const { t } = useTranslation();

    if (props.size === 'S') {
        return _miniFormat(t, props);
    } else {
        return _standardFormat(t, props);
    }
}
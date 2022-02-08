import React from "react";
import { exec } from "../../app/services/util";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  bookingStates,
  providersTypeList,
  movementTypes,
  serviceTypes
} from "../models/enum";
import DownloadIcon from "mdi-react/DownloadIcon";
import AvatarName from "../../app/components/Avatar/AvatarName";
import moment from "moment/moment";

function MovementItem(props) {
  function renderAvatar(item) {
    const id = item.provider !== null ? item.provider : 4;
    const icoLetter = item.isInternal ? "Tropipay" : providersTypeList[id];
    const nameStr =
      item.movementTypeId === movementTypes.exchange
        ? "C"
        : icoLetter.charAt(0).toUpperCase();
    return <AvatarName name={nameStr} />;
  }

  return (
    <ListItem
      key={props.data.id}
      className="history-list-item"
      onClick={() => exec(props.onSelect, [props.data])}
    >
      {renderAvatar(props.data)}

      <ListItemText
        className="pl-3 ref"
        primary={props.data.reference}
        secondary={
          <React.Fragment>
            {moment(props.data.createdAt).format("ll")}
            {props.data.movementTypeId === movementTypes.transfer &&
            props.data.state === bookingStates.paid &&
            !props.data.isInternal &&
            (!props.data.service ||
              props.data.service.slug === serviceTypes.REMITTANCE) ? (
              <DownloadIcon className="ml-2" size={17} />
            ) : null}
          </React.Fragment>
        }
      />
      {props.data.movementTypeId === movementTypes.transfer ? (
        <ListItemText
          className="text-right px-3"
          primary={
            (props.data.amount / 100).toFixed(2) + " " + props.data.currency
          }
          secondary={333}
        />
      ) : (
        <ListItemText
          className="text-right px-3"
          primary={
            (props.data.destinationAmount / 100).toFixed(2) +
            " " +
            props.data.destinationCurrency
          }
          secondary={333}
        />
      )}
    </ListItem>
  );
}
export default MovementItem;

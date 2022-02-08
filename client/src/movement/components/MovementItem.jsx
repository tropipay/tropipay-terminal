import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DownloadIcon from "mdi-react/DownloadIcon";
import moment from "moment/moment";
import {
  bookingStates,
  providersTypeList,
  movementTypes,
  serviceTypes
} from "../models/enum";
import { exec } from "../../app/services/util";
import calc from "../../payment/services/Calculator";
import AvatarName from "../../app/components/Avatar/AvatarName";
import "./MovementItem.scss";

function MovementItem(props) {
  function renderAvatar(item) {
    const id = item.provider !== null ? item.provider : 4;
    const icoLetter = item.isInternal ? "Tropipay" : providersTypeList[id];
    const nameStr =
      item.movementTypeId === movementTypes.exchange ? "C" : icoLetter;
    return <AvatarName name={nameStr} textColor="auto" />;
  }

  const { data } = props;

  return (
    <ListItem
      key={data.id}
      className="history-list-item"
      onClick={() => exec(props.onSelect, [data])}
    >
      <div className="movement-margin-right">{renderAvatar(data)}</div>

      <ListItemText
        className="pl-3 ref"
        primary={data.reference}
        secondary={
          <React.Fragment>
            {moment(data.createdAt).format("ll")}
            {data.movementTypeId === movementTypes.transfer &&
            data.state === bookingStates.paid &&
            !data.isInternal &&
            (!data.service || data.service.slug === serviceTypes.REMITTANCE) ? (
              <DownloadIcon className="ml-2" size={17} />
            ) : null}
          </React.Fragment>
        }
      />

      {data.movementTypeId === movementTypes.transfer ? (
        <ListItemText
          className="box-label-right"
          primary={calc.fix(data.amount) + " " + data.currency}
          secondary={333}
        />
      ) : (
        <ListItemText
          className="box-label-right"
          primary={
            calc.fix(data.destinationAmount) + " " + data.destinationCurrency
          }
          secondary={333}
        />
      )}
    </ListItem>
  );
}
export default MovementItem;

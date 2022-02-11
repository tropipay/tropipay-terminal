import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment/moment";
import { providersTypeList, movementTypes } from "../models/enum";
import Typography from "@material-ui/core/Typography";
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

  function getName(item) {
    if (item && item.charges && item.charges[0]) {
      return item.charges[0].clientName + " " + item.charges[0].clientLastName;
    }

    if (item.depositaccount && item.amount < 0) {
      return item.depositaccount.alias || item.depositaccount.accountNumber;
    }

    return item.reference;
  }

  function getReference(item) {
    return item.bankOrderCode;
  }

  function getCard(item) {
    if (!item || !item.charges || !item.charges[0]) return null;
    return "****" + item.charges[0].cardPan;
  }

  const { data } = props;
  const cardNumber = getCard(data);

  return (
    <ListItem
      key={data.id}
      className="movement-list-item"
      onClick={() => exec(props.onSelect, [data])}
    >
      <div className="movement-margin-right">{renderAvatar(data)}</div>

      <ListItemText
        className="movement-name"
        primary={getName(data)}
        secondary={
          <React.Fragment>
            {cardNumber ? (
              <Typography className=" ">{cardNumber}</Typography>
            ) : null}
            {moment(data.createdAt).format("ll")}
          </React.Fragment>
        }
      />

      {data.movementTypeId === movementTypes.transfer ? (
        <ListItemText
          className="box-label-right movement-item"
          primary={calc.fix(data.amount) + " " + data.currency}
          secondary={getReference(data)}
        />
      ) : (
        <ListItemText
          className="box-label-right movement-item"
          primary={
            calc.fix(data.destinationAmount) + " " + data.destinationCurrency
          }
          secondary={getReference(data)}
        />
      )}
    </ListItem>
  );
}
export default MovementItem;

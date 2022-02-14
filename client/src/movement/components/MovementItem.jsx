import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment/moment";
import calc from "../../payment/services/Calculator";
import AvatarName from "../../app/components/Avatar/AvatarName";
import { providersTypeList, movementTypes } from "../models/enum";
import { exec } from "../../app/services/util";
import "./MovementItem.scss";

function MovementItem(props) {
  const { data } = props;

  function renderAvatar(item) {
    const id = item.provider !== null ? item.provider : 4;
    const icoLetter = item.isInternal ? "Tropipay" : providersTypeList[id];
    const nameStr =
      item.movementTypeId === movementTypes.exchange ? "C" : icoLetter;
    return (
      <div className="movement-margin-right movement-item-avatar">
        <AvatarName name={nameStr} textColor="auto" />
      </div>
    );
  }

  function renderName(data) {
    const cardNumber = getCard(data);
    return (
      <ListItemText
        className="movement-name"
        primary={getName(data)}
        secondary={
          <div className="box-vertical movement-item-subtitles">
            {cardNumber ? (
              <span className="movement-name-card">{cardNumber} </span>
            ) : null}
            <span className="movement-name-date">
              {moment(data.createdAt).format("lll")}
            </span>
            {renderDescription(data)}
          </div>
        }
      />
    );
  }

  function renderAmount(data) {
    return data.movementTypeId === movementTypes.transfer ? (
      <ListItemText
        className="box-label-right movement-item movement-item-amount"
        primary={calc.fix(data.amount) + " " + data.currency}
        secondary={getReference(data)}
      />
    ) : (
      <ListItemText
        className="box-label-right movement-item movement-item-amount"
        primary={
          calc.fix(data.destinationAmount) + " " + data.destinationCurrency
        }
        secondary={getReference(data)}
      />
    );
  }

  function renderDescription(data) {
    const description = getDescription(data);
    return description ? (
      <span className="movement-item-des box-label-truncate-2">
        {description}
      </span>
    ) : null;
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

  function getDescription(item) {
    return item &&
      item.paymentcard &&
      item.paymentcard.description &&
      item.paymentcard.description !== ""
      ? data.paymentcard.description
      : null;
  }

  return (
    <ListItem
      key={data.id}
      className="movement-list-item box-align-top"
      onClick={() => exec(props.onSelect, [data])}
    >
      {renderAvatar(data)}
      {renderName(data)}
      {renderAmount(data)}
    </ListItem>
  );
}
export default MovementItem;

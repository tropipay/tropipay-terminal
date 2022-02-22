import IMG_VISA from "../../images/icon_visa.png";
import IMG_MASTERCARD from "../../images/icon_mastercard.png";
import IMG_MAESTRO from "../../images/icon_maestro.png";
import IMG_UNIONPLAY from "../../images/icon_unionplay.png";
import IMG_DISCOVER from "../../images/icon_discover.png";
import './CardsBtn.scss';

function CardsBtn(props) {
  const { className } = props;
  return (
    <div className={"logos box-horizontal " + (className || "")}>
      <img src={IMG_VISA} alt="Visa" />
      <img src={IMG_MASTERCARD} alt="Master Card" />
      <img src={IMG_MAESTRO} alt="IMG_MAESTRO" />
      <img src={IMG_UNIONPLAY} alt="IMG_UNIONPLAY" />
      <img src={IMG_DISCOVER} alt="IMG_DISCOVER" />
    </div>
  );
}
export default CardsBtn;

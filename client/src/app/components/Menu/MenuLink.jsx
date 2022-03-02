import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { exec, hasHTTP } from "../../services/util";
import useMediaQueryIn from '../../services/useMediaQueryIn.js';
import "./MenuLink.scss";

function MenuLink(props) {
  const nav = useHistory();
  const { t } = useTranslation();
  const mqIn = useMediaQueryIn();
  const allowHide = props.allowHide || false;

  function handleClick(item) {
    if (item.to) {
      if (!hasHTTP(item.to) && nav && nav.push instanceof Function) {
        nav.push(item.to);
      } else {
        window.location.href = item.to;
      }
    }
    exec(item.onClick, [item]);
  }

  const className = props.className || "";
  const align = props.align
    ? props.align === "horizontal"
      ? "box-horizontal"
      : "box-vertical"
    : "box-horizontal";
  const data = props.data && props.data instanceof Array ? props.data : [];

  return (
    <ul className={`box ${align} ${className} menu-link`}>
      {data.map((item, i) => (
        <li key={i} className="menu-link-item" hidden={allowHide && mqIn(item.hidden)} >
          <span
            className="menu-link-item-link gray-label"
            onClick={event => handleClick(item, event)}
          >
            {t(item.label)}
          </span>
        </li>
      ))}
    </ul>
  );
}
export default MenuLink;

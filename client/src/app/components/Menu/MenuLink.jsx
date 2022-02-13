import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { exec, hasHTTP } from "../../services/util";
import "./MenuLink.scss";

function MenuLink(props) {
  const nav = useHistory();
  const { t } = useTranslation();

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
    <ul className={`box ${align} ${className} lstMenu`}>
      {data.map((item, i) => (
        <li key={i} className="box-padding">
          <span
            className="menuLinkItem gray-label"
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

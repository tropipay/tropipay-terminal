import Avatar from "@material-ui/core/Avatar";
import "./Avatar.scss";

export const getStyleIndex = (str, max = 12) => {
  str = str || "";
  const ranM =
    str.charCodeAt(0) > 97 ? str.charCodeAt(0) - 32 : str.charCodeAt(0);
  const ranI = ranM - 64 <= 0 ? 1 : ranM - 64;
  const tmta = (ranI * max) / 26 + 1;
  return Math.trunc(tmta > 12 ? 12 : tmta);
};

function truncate(str, limit = 2) {
  if (typeof str !== "string") {
    return "GS";
  }
  const out = str && str.length > limit ? str.substring(0, limit) : str;
  return (out || "").toLocaleUpperCase();
}

const AvatarName = props => {
  const className = props.className || "";
  const textColor =
    props.textColor === "auto" ? `text-color-${getStyleIndex(props.name)}` : "";
  const bgColor =
    props.textColor !== "auto" ? props.bgColor || "avatar-name" : "";

  const width = props.size ? props.size : props.width || 60;
  const height = props.size ? props.size : props.height || 60;

  return (
    <Avatar
      className={`font-weight-bold ${bgColor} ${className} ${textColor}`}
      alt={props.alt || "AV"}
      style={{ width, height }}
    >
      {truncate(props.name)}
    </Avatar>
  );
};
export default AvatarName;

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
  };
}
/**
 * <Avatar {...stringAvatar('Kent Dodds')} />
 */

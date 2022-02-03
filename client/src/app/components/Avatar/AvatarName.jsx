import Avatar from "@material-ui/core/Avatar";
import './Avatar.scss';

export const getStyleIndex = (str, max = 12) => {
  const ranM =
    str.charCodeAt(0) > 97 ? str.charCodeAt(0) - 32 : str.charCodeAt(0);
  const ranI = ranM - 64 <= 0 ? 1 : ranM - 64;
  const tmta = (ranI * max) / 26 + 1;
  return Math.trunc(tmta > 12 ? 12 : tmta);
};

function truncate(str, limit=2) {
    if(typeof(str) !== 'string'){
        return "GS";
    }
    const out = str && str.length > limit ? str.substring(0, limit) : str
    return (out || "").toLocaleUpperCase();
}

const AvatarName = props => {
  return (
    <Avatar
      className={`mt-1 font-weight-bold avatar-name text-color-${getStyleIndex(
        props.name
      )}`}
    >
      {truncate(props.name)}
    </Avatar>
  );
};
export default AvatarName;
import CloseIcon from "mdi-react/CloseIcon";
import IconButton from "@mui/material/IconButton";

import AvatarName from "../Avatar/AvatarName";
import ContentHeader from "../Header/ContentHeader";
import "./MenuHeader.scss";

function MenuHeader(props) {
  const { model, onClose } = props;
  return (
    <div className="note-bg menu-header">
      <div className="menu-header-btn-close">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="box box-vertical box-align-center">
        <div className="menu-header-avatar">
          <AvatarName name={model ? model.name : "TS"} />
        </div>
        <ContentHeader
          classNameTitle="box-label-bold"
          classNameSubtitle="text-color-main-blue"
          title={model ? model.name : "Gest"}
          subtitle={model ? model.email : "gest@tropipay.com"}
        />
      </div>
    </div>
  );
}

export default MenuHeader;

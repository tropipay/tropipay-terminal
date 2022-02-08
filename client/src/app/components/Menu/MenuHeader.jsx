import CloseIcon from "mdi-react/CloseIcon";
import IconButton from "@mui/material/IconButton";

import AvatarName from "../Avatar/AvatarName";
import ContentHeader from "../Header/ContentHeader";

function MenuHeader(props) {
  const { model, onClose } = props;
  return (
    <div className="page-padding box box-vertical">
      <div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <div className="box box-vertical box-align-center">
          <AvatarName name={model ? model.name : "TS"} />

          <ContentHeader
            title={model ? model.name : "Gest"}
            subtitle={model ? model.email : "gest@tropipay.com"}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuHeader;

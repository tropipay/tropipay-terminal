import React from "react";
import Typography from "@material-ui/core/Typography";

function ContentHeader(props) {
    const classNameAll = "container content-header mb-2 mt-2 " + (props.className || 'box box-vertical box-align-center') ;
    const classNameTitle = props.classNameTitle ? props.classNameTitle + ' text-center' : 'text-center';
    const classNameSubtitle = props.classNameSubtitle ? props.classNameSubtitle + ' text-center sub-title mt-2' : 'text-center sub-title mt-2';
    return (
        <div className={classNameAll}>
            <Typography variant="h5" className={classNameTitle}>
                {props.title}
            </Typography>

            {props.subtitle ? (
                <Typography variant="body2" className={classNameSubtitle}>
                    {props.subtitle}
                </Typography>
            ) : null}
        </div>
    );
}

export default ContentHeader;

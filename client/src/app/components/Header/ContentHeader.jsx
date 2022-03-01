import React from "react";
import Typography from "@material-ui/core/Typography";

function ContentHeader(props) {
    const classNameAll = "container content-header " + (props.className || 'box box-vertical box-align-center') ;
    const classNameTitle = props.classNameTitle ? props.classNameTitle + ' text-center' : 'text-center';
    const classNameSubtitle = props.classNameSubtitle ? props.classNameSubtitle + ' text-center sub-title ' : 'text-center sub-title ';
    return (
        <div className={classNameAll} style={{marginBottom: '1rem'}}>
            <Typography variant="h5" className={classNameTitle}>
                {props.title}
            </Typography>

            {props.subtitle ? (
                <Typography variant="body2" className={classNameSubtitle} style={{marginTop: '0.5rem'}}>
                    {props.subtitle}
                </Typography>
            ) : null}
        </div>
    );
}

export default ContentHeader;

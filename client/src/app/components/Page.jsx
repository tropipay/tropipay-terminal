import React from "react";
import Menu from './Menu';

export default function Page({ children, ...rest }) {
    return (
        <div>
            <Menu />
            { (children) }
        </div>
    );
  }
  
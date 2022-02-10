import React from "react";
import Menu from '../Menu/Menu';

export default function Page({ children, ...rest }) {
    return (
        <div>
            <Menu />
            { (children) }
        </div>
    );
  }
  
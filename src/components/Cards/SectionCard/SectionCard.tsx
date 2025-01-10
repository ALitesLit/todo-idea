import React from "react";

import "./style.scss";


const SectionCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="section__card">
            {children}
        </div>
    )
}


export default SectionCard;
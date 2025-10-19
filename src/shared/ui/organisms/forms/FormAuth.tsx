import { IFormProps } from "@/src/shared/types/organisms/form.type";
import React from "react";

const Form : React.FC<IFormProps> = ({ onSubmit, className, children }) => {
    return(
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    )
}

export default Form;
import { useState } from "react";

export const useForm = <T extends Object>(formulario:T) => {
    
const [state, setstate] = useState(formulario);

const onChange = (value:string, campo:keyof T) => {
    setstate({
        ...state, //desesctructuracion del formulario
        [campo]: value
    });
}

return {
    ...state,  //desestructurar el objeto
    formulario:state,
    onChange
}

}

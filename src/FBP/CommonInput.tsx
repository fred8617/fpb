import { Input } from "antd"
import { InputProps } from "antd/lib/input"
import React,{ SFC, forwardRef } from "react"

/**
 * 通用input,带清除功能
 * @param props @interface InputProps
 */
const CommonInput:SFC<InputProps>=forwardRef((props,ref:React.LegacyRef<Input>)=>{
    return <Input allowClear ref={ref} {...props}/>
})

export default CommonInput
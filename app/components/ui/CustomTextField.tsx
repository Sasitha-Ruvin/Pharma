import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

interface CustomTextFieldProps{
  label:string;
  name:string;
  value:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?:string;
  fullWidth?:boolean;
  variant?:'filled'|'outlined'|'standard';
  InputLabelProps?:any;
  multiline?:boolean;
  rows?:number;
}

const CustomTextField = ({label,name,value,onChange,type = 'text', fullWidth = true, variant = 'outlined', InputLabelProps={},multiline = true, rows = 1}:CustomTextFieldProps) => {
  return (
    <MuiTextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth={fullWidth}
    variant={variant}
    InputLabelProps={InputLabelProps}
    multiline={multiline}
    rows={rows}
    />
  )
}

export default CustomTextField
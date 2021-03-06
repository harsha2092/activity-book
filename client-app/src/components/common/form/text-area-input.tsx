import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

export const TextAreaInput: React.FC<IProps> = ({
    input,
    width,
    rows,
    placeholder,
    type,
    meta: {touched, error}
}) => {
    return (
        <Form.Field
            error={touched && !!error}
            type={type}
            width={width}
        >
            <textarea {...input} rows={rows} placeholder={placeholder}/>
            {
                touched && 
                !!error && 
                (
                    <Label basic color="red">
                        {error}
                    </Label>
                )
            }
            
        </Form.Field>
    )
}

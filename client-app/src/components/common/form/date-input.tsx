import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
    input,
    width,
    placeholder,
    type,
    meta: {touched, error},
    date=false,
    time=false,
}) => {
    return (
        <Form.Field
            error={touched && !!error}
            type={type}
            width={width}
        >
            <DateTimePicker
                value={input.value || null}
                onChange={input.onChange} 
                onBlur={input.onBlur}
                onKeyDown={(event) => {event.preventDefault()}}
                placeholder={placeholder}
                date={date}
                time={time}
            />
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

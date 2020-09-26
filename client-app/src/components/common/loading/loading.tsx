import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface IProps {
    content?: string;
    inverted?: boolean;
}

export const LoadingComponent : React.FC<IProps> = ({inverted=true, content}) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader>{content}</Loader>
        </Dimmer>
    )
}

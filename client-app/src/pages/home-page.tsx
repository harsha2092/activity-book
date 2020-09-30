import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react'

export const HomePage = () => {
    return (
            <Segment inverted textAlign='center' vertical className='masthead' >
                <Container text>
                    <Header as='h1' inverted>
                        <Image size='massive' src={`${window.location.origin.toString()}/assets/images/logo.png`} alt='logo' style={{marginBottom: 12}}/>
                        Reactivities
                    </Header>
                    <Header as='h2' inverted content='Welcome to Reactivities' />
                    <Button as={Link} to='/activity' size='huge' inverted>
                        Take me to the activities!
                    </Button>
                </Container>
            </Segment>
    )
}

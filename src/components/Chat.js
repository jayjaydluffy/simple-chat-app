import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import NavBar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Redirect } from 'react-router'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import isBlank from 'lodash/isEmpty'
import Alert from 'react-bootstrap/Alert'

import { getConvo, sendMessage } from '../store/actions/chatActions'
import Preloader from './Preloader';
import classes from './Chat.module.css'

class Chat extends Component {
    state = {
        message: ''
    }

    componentDidMount() {
        if (this.props.user && this.props.chatWith ) {
            this.props.getConvo({
                user: this.props.user.id,
                friend: this.props.chatWith.id
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.send && prevProps.send && this.props.send.sent && prevProps.send.sending) {
            this.setState({ message: '' })
        }
    }

    handleWriteMessage = e => this.setState({ message: e.target.value })

    handleSendMessage = e => {
        e.preventDefault();
        if (!isBlank(this.state.message)) {
            this.props.sendMessage({
                user: this.props.user.id,
                friend: this.props.chatWith.id,
                message: {
                    message: this.state.message
                }
            })
        }
    }

    render() {
        if (!this.props.user) {
            return <Redirect to="/"/>
        }
        
        return (
            <div>
                <NavBar bg="light" variant="light" className="py-2 justify-content-center">
                    <h2 className="mb-0">{this.props.chatWith.name}</h2>
                </NavBar>
                { this.props.convo.messages ?
                    <Fragment>
                        <div className={`px-3 ${classes.Chat}`}>
                            { this.props.convo.totalMsgs < 1 && this.props.convo.fetched ?
                                <h4 className="w-100 mt-3">Start chatting with {this.props.chatWith.name} now.</h4> :
                                <div className='w-100 my-3'>
                                    { this.props.convo.messages.map((msg, key) => (
                                        <div 
                                            key={key}
                                            className={msg.type === 'sent' ? classes.Sent : classes.Received}>
                                            <Alert
                                                variant={msg.type === 'sent' ? 'success' : 'secondary'} >
                                                {msg.message}
                                            </Alert>
                                        </div>
                                    )) }
                                </div>
                            }
                        </div>
                        <Container fluid className="border-top">
                            <Form>
                                <Form.Row className="py-2">
                                    <Col sm={8} md={10}>
                                        <Form.Control 
                                            as="textarea" 
                                            rows="2" 
                                            className={classes.ChatBox}
                                            value={this.state.message}
                                            onChange={e => this.handleWriteMessage(e)} />
                                    </Col>
                                    <Col className="d-flex align-items-center">
                                        <Button block variant="primary" size="lg" onClick={e => this.handleSendMessage(e)}>
                                            Send
                                        </Button>
                                    </Col>
                                </Form.Row>
                            </Form> 
                        </Container>
                    </Fragment> : <Preloader />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        chatWith: state.chat.user,
        convo: state.chat.convo,
        send: state.chat.sendMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getConvo: contacts => dispatch(getConvo(contacts)),
        sendMessage: details => dispatch(sendMessage(details))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
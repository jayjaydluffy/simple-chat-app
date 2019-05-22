import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from 'react-bootstrap/Navbar'
import ListGroup from 'react-bootstrap/ListGroup'
import { Redirect } from 'react-router'
import reject from 'lodash/reject'
import { withRouter } from 'react-router'

import { selectFriend } from '../store/actions/chatActions'

class Friends extends Component {

    handleSelectFriend = account => {
        this.props.selectFriend(account)
        this.props.history.push('/chat')
    }

    render() {
        if (!this.props.user) {
            return <Redirect to="/"/>
        }

        const friends = reject(this.props.accounts, this.props.user)

        return (
            <div>
                <NavBar bg="light" variant="light" className="py-2 justify-content-center">
                    <h2 className="mb-0">Message a friend</h2>
                </NavBar>
                <ListGroup>
                    { friends.map(friend => (
                        <ListGroup.Item action variant="secondary" key={friend.id} onClick={() => this.handleSelectFriend(friend)}>
                            <h3 className="mb-0 py-3">{ friend.name }</h3>
                        </ListGroup.Item>
                    )) }
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps= state => {
    return {
        user: state.user.user,
        accounts: state.accounts.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectFriend: acct => dispatch(selectFriend(acct))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Friends));

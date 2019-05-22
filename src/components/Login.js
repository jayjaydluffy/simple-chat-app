import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from 'react-bootstrap/Navbar'
import ListGroup from 'react-bootstrap/ListGroup'
import { withRouter } from 'react-router'

import { getAccounts } from '../store/actions/accountsActions'
import { selectAccount } from '../store/actions/userActions'
import Preloader from './Preloader';

class Login extends Component {
    componentDidMount() {
        if (this.props.accounts && !this.props.accounts.data) {
            this.props.getAccounts()
        }
    }

    handleSelectAccount = account => {
        this.props.selectAccount(account)
        this.props.history.push('/friends')
    }
    
    render () {
        return (
            <div>
                <NavBar bg="light" variant="light" className="py-2 justify-content-center">
                    <h2 className="mb-0">Login</h2>
                </NavBar>
                { !this.props.accounts.data || this.props.accounts.fetching ?
                    <Preloader /> :
                    <ListGroup>
                        { this.props.accounts.data.map(account => (
                            <ListGroup.Item action variant="secondary" key={account.id} onClick={() => this.handleSelectAccount(account)}>
                                <h3 className="mb-0 py-3">{ account.name }</h3>
                            </ListGroup.Item>
                        )) }
                    </ListGroup>
                }
            </div>
        )
    }
}

const mapStateToProps= state => {
    return {
        accounts: state.accounts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAccounts: () => dispatch(getAccounts()),
        selectAccount: acct => dispatch(selectAccount(acct))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
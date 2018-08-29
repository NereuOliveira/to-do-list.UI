import React from 'react'
import { Link } from 'react-router-dom'

class NotFound extends React.Component
{
    render() {
        return (
            <div className="has-text-centered">
                <h1 className="is-size-1 has-text-grey has-text-weight-bold">404!</h1>
                <h2 className="is-size-3 has-text-grey-darker">Sorry, page not found</h2>
                <br/>
                <Link to="/" className="button is-link">
                    Back to Home
                </Link>
            </div>
        )
    }
}

export default NotFound

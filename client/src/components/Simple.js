import React from 'react';

import {withRouter} from "./WithRouter";


class Simple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("Simple")
        console.log(this.props)
        return (
            <div>
                Simple
            </div>
        );
    }
}


export default withRouter(Simple);
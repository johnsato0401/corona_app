import React from 'react';
import { connect } from 'react-redux';

class ChatPanel extends React.Component {
    render() {
        return (
            <div style={{ height: '438px' }}>
                Chat Data
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPanel);

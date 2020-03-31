import React from 'react';
import { connect } from 'react-redux';

import './SenderForm.css';

class SenderForm extends React.Component {
    render() {
        return (
            <form className='sender-form'>
                <div className='button-wrap'>
                    <button className='btn-menu'>
                        <span role='img' aria-label='donut'>
                            🏡 Menu
                        </span>
                    </button>
                </div>
                <div className='writer-wrap' >
                    <input className='' placeholder='Write a message...' />
                    <button className='btn-submit'>
                        <span>
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </form>
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
)(SenderForm);

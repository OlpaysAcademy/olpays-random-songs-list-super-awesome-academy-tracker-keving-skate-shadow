import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class PromptDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            prompt: '',
        };
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleCancel() {
        this.setState({ open: false });
    };

    handleSubmit() {
        this.props.onSubmit(this.state.prompt);
        this.setState({ open: false, prompt: '' });
    };

    handlePromptChange(event) {
        const prompt = event.target.value.trim();
        this.setState({
            enableSubmit: (prompt || '').length !== 0, 
            prompt,
        });
    }

    render() {
        const actions = [
            <FlatButton
                label={this.props.cancelText}
                primary={true}
                onTouchTap={() => this.handleCancel() }
                />,
            <FlatButton
                label={this.props.submitText}
                primary={true}
                disabled={!this.state.enableSubmit}
                onTouchTap={() => this.handleSubmit() }
                />,
        ];

        return (
            <div>
                <RaisedButton 
                    label={this.props.buttonText}
                    onTouchTap={() => this.handleOpen()}
                    style={this.props.buttonStyle}  />
                <Dialog
                    title={this.props.dialogTitle}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    >
                    {this.props.dialogBody && <p>{this.props.dialogBody}</p>}
                    <TextField
                        value={this.state.prompt}
                        onChange={(event) => this.handlePromptChange(event)}
                        hintText={this.props.dialogHint} />
                </Dialog>
            </div>
        );
    }
}

PromptDialog.propTypes = {
    onSubmit: React.PropTypes.func,
    buttonText: React.PropTypes.string,
    submitText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    dialogTitle: React.PropTypes.string,
    dialogBody: React.PropTypes.string,
    dialogHint: React.PropTypes.string,
    buttonStyle: React.PropTypes.object,
}

PromptDialog.defaultProps = {
    buttonText: 'Open Modal',
    submitText: 'Submit',
    cancelText: 'Cancel',
    dialogTitle: 'Wut mate?',
    dialogHint: 'Grite somting',
    buttonStyle: {}
}
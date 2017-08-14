import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class AppTopBar extends Component {
    render() {
        return (
            <div>
                <AppBar
                    title="Title"
                    iconElementLeft={
                        <IconButton>
                            <NavigationClose />
                        </IconButton>
                    }
                />
            </div>
        );
    }
}

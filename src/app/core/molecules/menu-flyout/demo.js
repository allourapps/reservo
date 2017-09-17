import React from 'react';
import Panel from 'molecules/panel';
import MenuFlyout from 'molecules/menu-flyout';
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete';
import ContentLink from 'material-ui/svg-icons/content/link';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.openPopover = this.openPopover.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        this.state = {
            open: false,
        };
    }

    openPopover(event) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    render() {
        const menuItems = [
            {
                primaryText: 'Menu'
            },
            {
                primaryText: 'Item'
            },
            {
                primaryText: 'Delete',
                leftIcon: <Delete />
            },
            {
                primaryText: 'Person Add',
                leftIcon: <PersonAdd />
            },
            {
                primaryText: 'Link',
                rightIcon: <ContentLink />
            },
            {
                primaryText: 'Copy',
                rightIcon: <ContentCopy />
            }
        ];

        return (
            <fb className="marginTop marginBottom">
                <Panel title="MenuFlyout with dividers bound to a RaisedButton" className="marginBottom">
                    <div>
                        <RaisedButton
                            onClick={this.openPopover}
                            label="Button"
                        />
                    </div>
                </Panel>

                <MenuFlyout open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            onRequestClose={this.handleRequestClose}
                            items={menuItems}
                            divider={true}/>
            </fb>
        );
    }
}

export { Demo };

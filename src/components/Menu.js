import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { withStyles  } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  appbar: {
    alignItems: 'center',
  }
});

@inject('rootStore')
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    const { rootStore, history } = this.props;
    this.ui = rootStore.ui;
    this.history = history;
  }

    handleClose = () => {
        this.ui.closeMenu();
    }

    handleOpen = (event) => {
        this.ui.openMenu(event.currentTarget);
    }

    handleSignOut = () => {
      this.ui.closeMenu();
      // sign user out and clear user from storage.
      this.ui.clearUser();
      this.history.push('/');
    }

    render() {
      const { classes } = this.props;
        return (
          <AppBar position="static" color="default" className={classes.appbar}>
            <Toolbar>
              <Typography variant="h2">
                PWC EPGP Standing
              </Typography>
             </Toolbar>
          </AppBar>
        );
    }
}

// with mobx inject, base component is wrapped with store injected, use wrappedcomp
Navbar.wrappedComponent.propTypes = {
  rootStore: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Navbar);

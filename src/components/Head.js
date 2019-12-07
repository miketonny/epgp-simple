import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles  } from '@material-ui/core/styles';
import moment from "moment";
import PropTypes from 'prop-types';

const styles = () => ({
  appbar: {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center'
  }
});

@inject('rootStore', 'db')
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    const { rootStore, history, db } = this.props;
    this.ui = rootStore.ui;
    this.db = db;
    this.history = history;
    this.data = rootStore.data;
  }

  componentDidMount() {
    this.data.getDate(this.db);
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
          <div>
          <AppBar position="static" color="default" className={classes.appbar}>
              <Typography variant="h4">
                PWC EPGP Standing
              </Typography> 
          </AppBar>
          <Typography className={classes.appbar} variant="h6">PR(Loot priority) = EP/GP, weekly decay 10% on both EP &amp; GP</Typography>
          <Typography className={classes.appbar} variant="h6">Reporting Date: {this.ui.reportDate}</Typography>
          </div>

        );
    }
}

// with mobx inject, base component is wrapped with store injected, use wrappedcomp
Navbar.wrappedComponent.propTypes = {
  rootStore: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Navbar);

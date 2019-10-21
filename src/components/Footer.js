import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles  } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  appbar: {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center'
  }
});

@inject('rootStore')
@observer
class Footer extends Component {
  constructor(props) {
    super(props);
    const { rootStore, history } = this.props;
    this.ui = rootStore.ui;
    this.history = history;
  }

    render() {
      const { classes } = this.props;
        return (
          <div>
            <Typography className={classes.appbar} variant="h6">&copy;Copyright PWC-Yojamba Guild 2019</Typography>
          </div>
        );
    }
}

// with mobx inject, base component is wrapped with store injected, use wrappedcomp
Footer.wrappedComponent.propTypes = {
  rootStore: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Footer);

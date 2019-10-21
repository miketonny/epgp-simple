import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles  } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from './Footer';

const styles = theme => ({
    loading: {
        position: 'absolute',
      top: '50%',
      left: '50%'
    },
    bg: {
        backgroundColor: 'black',
    }
  });

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#3c4249 !important',
      color: theme.palette.common.white,
    
    },
    root: {
        borderBottom: '0.1rem solid white',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    body: {
      fontSize: "1rem",
      color: 'white'
    },
  }))(TableCell);


@inject('rootStore','db')
@observer
class EPGP extends Component {
    componentDidMount () { 
        // const members = this.props.db.ref('/members');
        const { rootStore } = this.props;
        const memberRef = this.props.db.collection('members');
        memberRef.where('pr', '>', 0).orderBy('pr','desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                rootStore.data.members.push(doc.data());
            });
        });
    }

    // get class color
    getColor = (c) => {
        if (c === 'Mage') {
            return { color: '#5EB7D8' };
        } else if (c === 'Warrior') {
            return { color: '#B38F6A'};
        } else if (c === 'Warlock') {
            return { color: '#8578BB'};
        } else if (c === 'Shaman') {
            return { color: '#2053EC' };
        } else if (c === 'Rogue') {
            return { color: '#E5DF65'};
        } else if (c === 'Druid') {
            return { color: '#E57310'};
        } else if (c === 'Priest') {
            return { color: '#E5E8EC'};
        } else if (c === 'Hunter') {
            return { color: '#8EB667'};
        }
    }

 
    render() {
        const { rootStore, classes } = this.props;
        const members = rootStore.data.members;
        const loading = members.length === 0 ?  <CircularProgress className={classes.loading}/> : (
            <div className={classes.bg}>
                <Paper >
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell >Name</StyledTableCell >
                            <StyledTableCell  align="right">Class</StyledTableCell>
                            <StyledTableCell  align="right">EP</StyledTableCell>
                            <StyledTableCell  align="right">GP</StyledTableCell>
                            <StyledTableCell  align="right">PR</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {members.map((member,indx) => (
                            <TableRow key={indx} style ={ indx % 2? { background : '#2f363e' }:{ background : 'black' }} >
                                <StyledTableCell component="th" scope="row" style={this.getColor(member.class)}>
                                    {member.name}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={this.getColor(member.class)}>{member.class}</StyledTableCell>
                                <StyledTableCell align="right" >{member.ep}</StyledTableCell>
                                <StyledTableCell align="right" >{member.gp}</StyledTableCell>
                                <StyledTableCell align="right" >{member.pr}</StyledTableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>   
                <Footer/>
            </div>
        );
        return (
           loading
        );
    }
}

export default withStyles(styles)(EPGP);

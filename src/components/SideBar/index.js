import React,{useState} from 'react';
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Box } from '@material-ui/core';
import useStyles from './style';
import { useAuth } from '../Auth';
import { SubjectOutlined, AddCircleOutlineOutlined  } from '@material-ui/icons';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import { useHistory, useLocation } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ForwardIcon from '@material-ui/icons/Forward';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const SideBar = ({ children }) => {
    const classes = useStyles()
    const { currentUser } = useAuth()
    const history = useHistory()
    const location = useLocation()
    const {   logout } = useAuth()
    const [isOpen, setIsOpen] = useState(true)



    async function handleLogout() {
 
        try {
            await logout()
            history.push('/login')
        } catch {
            console.log('Failed to logout')
        }
    }

    const menuItems = [
        {
            text: 'Profile',
            icon: <AccountCircleIcon color='primary' />,
            path: '/',
 
        },
        {
            text: 'Add Evacuation',
            icon: <AddCircleOutlineOutlined color='primary' />,
            path: '/signup'
        },
        {
            text: 'Barangay',
            icon: <VerifiedUserOutlinedIcon color='primary' />,
            path: '/verify-account',
        },
        {
            text: 'Forwarded',
            icon: <ForwardIcon color='primary' />,
            path: '/forwarded'
        },
    


    ]

  const handleDrawerToggle = () => {
      setIsOpen(!isOpen)
  }

    return (
        <div className={classes.root}>
            {currentUser ? 
            <>
            <Drawer 
                 className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={isOpen}
                classes={{ paper: classes.drawerPaper }}
            >
                
                <List className={classes.drawerPadding}>
                    {
                        menuItems.map(item => (
                            <>
                            <Divider style={{ backgroundColor: 'black'}}/>
                            <ListItem
                                 button
                                 key={item.text}
                                onClick={() => history.push(item.path)}
                                className={location.pathname == item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem> 
                             </>
                        ))
                        
                    }
                    
                    
                </List>

                <img 
                src='/minalin.png' 
                style={{width: 200, height: 200, position: 'absolute', bottom: 60, left: 15}}
                />
                <ListItem
                    style={{ position: 'absolute', bottom: 0, left: 0}}
                    button
                    >
                     <ListItemIcon  >
                    <ExitToAppOutlinedIcon color='primary' />
                        </ListItemIcon>
                         <ListItemText onClick={handleLogout}>Logout</ListItemText>
 
                    </ListItem>
            </Drawer>

            <Box  > 
              <AppBar className={classes.appBar}  style={{backgroundColor: "#3db588"}} elevation={0}>
            <Toolbar disableGutters={true}>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                className={classes.menuButton}
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}

            >
                <MenuIcon />
            </IconButton>
            
            <Typography variant="title" color="inherit" noWrap  style={{marginLeft: '48%', fontWeight: 'bold'}}>
                Super
                 <img 
                src='/care.png' 
                style={{ height: 50, width: 50}}
                 /> 
                 Admin
            </Typography>
             
            </Toolbar>
        </AppBar>
        </Box>
            </>
            : null
            }
            <div className={classes.page}>
                {children}
            </div>

        </div >
    )
}

export default SideBar

// {currentUser ? <Drawer
//     className={classes.drawer}
//     variant='permanent'
//     anchor='left'
// >
//     <div>
//         <Typography variant='h5'>
//             {children}
//         </Typography>
//     </div>
// </Drawer> : null}
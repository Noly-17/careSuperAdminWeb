import { makeStyles } from "@material-ui/core";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {

    return {
        page: {
            background: 'white',
            width: '100%',
            padding: theme.spacing(3)
        },

        drawer: {
            width: drawerWidth,
          },

        drawerPaper: {
            backgroundColor: '#3db588',
            border: '1px solid white',

            position: "fixed",
            width: drawerWidth,
            borderRadius: 0,
            borderTop: "none",
            borderBottom: "none",
            top: theme.spacing(8), // push content down to fix scrollbar position
            height: `calc(100% - ${theme.spacing(8)}px)` // subtract appbar height
          },
        // root: {
        //     display: 'flex'
        // }
        active: {
            background: 'white',
        },

        title: {
            padding: theme.spacing(3)
        },

        appBar: {
            position: "fixed",
            width: "100%",
            zIndex: 1400,

           },

    }
})



export default useStyles;
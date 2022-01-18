import React, { Component } from "react";
import { db, auth } from '../../firebase';
import { getDatabase, ref, child, get, update, onValue } from "firebase/database";
import { Table, Button } from 'react-bootstrap';
import MapContainer from '../Map'
import { connect } from 'react-redux'


class Verify extends React.Component {
    state = {
        users: null,
        userId: null,
        usersAd: [],
        lat: null,
        long: null,
        isShow: true
    }


    async componentDidMount() {
        const dbRef = ref(db, 'evacuationRoutes/');
      onValue(dbRef, (snap) => {
                const users = []
                snap.forEach(item => {

                    const data = item.val()
                  
                        const userDat = item.val()
        
                        users.push(userDat)          
                
                })
                this.setState({
                    users: users,
                })

        });

    


    }



    render() {

        console.log(this.state.userId)


        return (
            <>
                {
                    this.state.isShow &&
                    <Table striped bordered hover style={{ marginTop: 45}}>
                        <thead style={{backgroundColor: '#3db588',border: 'solid 1px #000' }}>
                            <tr>
                                <th>Address</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        {
                            this.state.users &&
                            this.state.users.map(user => {
                                return (

                                    <tbody >
                                        <tr >
                                            <td style={{ border: 'solid 1px #000', borderStyle: 'none solid solid none', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>{`${user.evacuationAdd}`}</td>
                                            <td style={{ border: 'solid 1px #000', borderStyle: 'none solid solid none' }}>{`${user.latitude}`}</td>
                                            <td style={{ border: 'solid 1px #000', borderStyle: 'none solid solid none' }}>{`${user.longitude}`}</td>       
                                        </tr>
                                    </tbody>


                                )
                                
                            })
                        }

                    </Table>
                }

                {
                    this.state.isShow == false &&
                    this.state.users &&
                    this.state.users.map(user => {
                        return (


                            user.id == this.state.userId ?
                                <div className='card text-center'>
                                    <a className='btn btn-outline-danger' type='button' onClick={() => {
                                        this.setState({
                                            isShow: true
                                        })
                                    }}>Back</a>

                                    <div className='overflow'>
                                        <img className='card-img-top' src={`${user.verify_photo}`} alt='' />
                                    </div>
                                    <div className='card-body text-dark'>
                                        <h4 className='card-title'>{`${user.fullname}`}</h4>
                                    </div>
                                </div>
                                :null
                                
                        )
                    })
                }




            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lat: state.lat,
        long: state.long
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocation: () => dispatch({ type: 'LONGLAT', value: 69 })
    }
}

console.log(mapDispatchToProps)

export default connect(mapStateToProps, mapDispatchToProps)(Verify);



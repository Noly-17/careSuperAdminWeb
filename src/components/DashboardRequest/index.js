import React, { Component } from "react";
import { db, auth } from '../../firebase';
import { getDatabase, ref, child, get, update, onChildAdded, onChildChanged, onValue, onChildRemoved, query, orderByChild, equalTo } from "firebase/database";
import { Table, Button } from 'react-bootstrap';
import MapContainer from '../Map'
import { connect } from 'react-redux'
import { Form, Modal, Card, Alert, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';



class DashBoardRequest extends React.Component {
    state = {
        users: null,
        userId: null,
        lat: null,
        long: null,
        isShow: true,
        modalShow: false,
        usersAddress: null,
        tAddress: '',
        tpostData: []
    }
    


   async componentDidMount() {

         const dbRef = ref(db, 'requests/');

                        // Fetch the Request Address
                        onValue(dbRef, (snap) => {
                            const users = []
                            snap.forEach(req => {
                                const reqAd = req.val()
                                // Check the status
                                if(reqAd.status == 'Forwarded'){
                                 users.push(reqAd)
                                console.log(reqAd.address)
                                }
                            })
                            this.setState({
                                users: users,
                            })
            
                    });

    }


    handleSelect = (e) => {
        console.log(e);
        this.setState({
            tAddress: e
        })
    }



    render() {


        return (
            <>
                {
                    this.state.isShow &&
                    <>
                    <Table striped bordered hover >
                        <thead style={{backgroundColor: '#3db588',border: 'solid 1px #000' }}>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Latitude</th>
                                <th>Longtitude</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            this.state.users &&
                            this.state.users.map(user => {

                                return (

                                    <tbody >
                                        <tr >
                                            <td style={{  borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px'  }}>{`${user.username}`}</td>
                                            <td >{`${user.phoneNumber}`}</td>
                                            <td>{`${user.lat}`}</td>
                                            <td >{`${user.long}`}</td>
                                            <td style={{ borderBottomRightRadius: '15px' }}>
                                        
                                            {/* <Button style={{ marginRight: 20 }} onClick={() => {
                       

                                                    const postData = {
                                                        tAddress: this.state.tAddress,
                                                        email: user.email,
                                                        id: user.id,
                                                        lat: user.lat,
                                                        long: user.long,
                                                        address: user.address,
                                                        profile_picture: user.profile_picture,
                                                        status: "Transfered",
                                                        username: user.username,
                                                         };
                                                      

                                                        console.log(this.state.tpostData.email + ' ggwp')
                                                        console.log(this.state.tAddress)

                                                        this.setState({
                                                            userId: user.id,
                                                            tpostData: postData,
                                                            modalShow: true
                                                        })
                                                    }} key={user.id}>Assign</Button> */}

                                                <Button style={{ marginRight: 20 }}
                                                         onClick={() => {
                                                    this.setState({
                                                        userId: user.id,
                                                        isShow: false,

                                                    })
                                                }} key={user.id}>View</Button>
                                             </td>
                                        </tr>
                                    </tbody>


                                )
                            })
                        }

                    </Table>
                    
                    </>
                }

                

                {
                    this.state.isShow == false &&
                    this.state.users &&
                    this.state.users.map(user => {
                        return (


                            user.id == this.state.userId ?
                            <>
                               <a className='btn btn-outline-danger' style={{ width: 100, marginBottom: 10}} type='button' onClick={() => {
                                        this.setState({
                                            isShow: true
                                        })
                                    }}>Back</a>
                                <div className='card text-center'>
                                  
                                         
                                    <div className='overflow'>
                                        <img className='card-img-top' src={`${user.profile_picture}`} alt='' style={{ alignSelf: 'center', height: 1100}}/>
                                    </div>
                                    <div className='card-body text-dark'>
                                     
                                    </div>
                                     
                                </div>
                                <div style={{ display: "flex"}}>
                                    <div>
                 <Modal.Dialog style={{ flexDirection: 'row', width: 500, height: 300}}>
                <Modal.Header>
                  <Modal.Title>Assign</Modal.Title>
                </Modal.Header>
              
                <Modal.Body>
                <Form>

                <Form.Label>Select Barangay</Form.Label>
                <InputGroup className="mb-3">
                <DropdownButton
                variant="outline-secondary"
                title="Address"
                id="input-group-dropdown-1"
                onSelect={this.handleSelect}

                >
                <Dropdown.Item eventKey="San Isidro, Minalin, Pampanga" href="#">San Isidro, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Lourdes, Minalin, Pampanga" href="#">Lourdes, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="San Nicolas, Minalin, Pampanga" href="#">San Nicolas, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="San Nicolas 2nd, Minalin, Pampanga" href="#">San Nicolas 2nd, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Bulac, Minalin, Pampanga" href="#">Bulac, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="San Francisco 1st, Minalin, Pampanga" href="#">San Francisco 1st, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Dawe, Minalin, Pampanga" href="#">Dawe, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Saplad, Minalin, Pampanga" href="#">Saplad, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Maniango, Minalin, Pampanga" href="#">Maniango, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Sta. Maria, Minalin, Pampanga" href="#">Sta. Maria, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Sto. Dominggo, Minalin, Pampanga" href="#">Sto. Dominggo, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Sto. Rosario, Minalin, Pampanga" href="#">Sto. Rosario, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Sta. Catalina, Minalin, Pampanga" href="#">Sta. Catalina, Minalin, Pampanga</Dropdown.Item>
                <Dropdown.Item eventKey="Sta. Rita, Minalin, Pampanga" href="#">Sta. Rita, Minalin, Pampanga</Dropdown.Item>
                 
                </DropdownButton>

                <FormControl aria-label="Text input with dropdown button" value={this.state.tAddress} />
            </InputGroup>
                        <Form.Group id='email' className='mt-3'>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control type='text' required  />
                        </Form.Group>
                        
                    </Form>
 
                </Modal.Body>
              
                <Modal.Footer>
                   <Button variant="primary" onClick={()=> {
                  const postData = {
                     email: user.email,
                    id: user.id,
                    lat: user.lat,
                    long: user.long,
                    address: this.state.tAddress,
                    phoneNumber: user.phoneNumber,
                    profile_picture: user.profile_picture,
                    status: "Transfered",
                    username: user.username,
                     };
                const updates = {};
                updates['/requests/' + this.state.userId] = postData;
                try {
                    update(ref(db), updates)
                }catch {
                    console.log('Error Updating')
                }
                   }}>Transfer</Button>
                </Modal.Footer>
              </Modal.Dialog> 
          
                                    </div>
                                    <MapContainer lng={user.long} lat={user.lat} />
 
                                    </div>
                                </>
                                :
                                null
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardRequest);



import React, { useContext } from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { FaDollarSign, FaMoneyBill, FaServicestack } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import ReviewAdd from '../Reviews/ReviewAdd';
import Reviews from '../Reviews/Reviews';


const ServicesDetails = () => {

    const { user} = useContext(AuthContext);


    const {title, _id, img, price, description, service_id } =useLoaderData();

    useTitle('Details')
    return (
        <Container>
            <h3 style={{ color: '#E59866', marginTop: '40px', marginBottom:'30px', fontFamily: 'cursive', textAlign: 'center' }}>WELCOME TO SERVICE DETAILS AND REVIEW PAGE
            </h3>
            <Row>
            <div>
            <Card className="mb-5">
      <Card.Header className='d-flex justify-content-between align-items-center'>
       
      <Card.Title>  

        <h4 style={{ color: '#E59866', fontFamily: 'cursive', textAlign: 'center' }}> Service Name: {title}</h4>
      
      </Card.Title>
      </Card.Header>
      <Card.Body>
        
        <PhotoProvider>
            <PhotoView src={img}>
            <Card.Img variant="top" src={img} />
            </PhotoView>
        </PhotoProvider>
        <Card.Text>
            <h6 className='mt-4'style={{ color: '#E59866', fontFamily: 'cursive', textAlign: 'center' }}> <FaServicestack></FaServicestack> Service Details</h6>
            
            <p>{description}</p>
        
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">

          <h5 style={{ color: '#E59866', fontFamily: 'cursive', textAlign: 'center' }}> <FaMoneyBill style={{ fontSize:'40px'}} ></FaMoneyBill> Price For This Service : {price}<FaDollarSign></FaDollarSign></h5>
      </Card.Footer>
    </Card>
        </div>
            </Row>
            <div>
            <h3 style={{ color: '#E59866', marginTop: '40px', marginBottom:'30px', fontFamily: 'cursive', textAlign: 'center' }}>Review for This Service
            </h3>

            <div>

                <Reviews></Reviews>
            </div>

            {
                user?.email ? 
                <>
                {/* <Link to='/newReview'><Button variant="primary">Add a Review</Button></Link> */}

                <ReviewAdd  service_id={service_id} title={title} _id={_id}></ReviewAdd>
                </> :
                <>
                <Link to='/login'><Button variant="primary">Please Login to Add a Review</Button></Link>
                </>
            }

            
            <div>


            </div>

            </div>
        </Container>
    );
};

export default ServicesDetails;
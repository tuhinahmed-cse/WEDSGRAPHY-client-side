import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import UserReviewsRow from './UserReviewsRow';

const UserReviews = () => {

    const { user, logOut } = useContext(AuthContext);

    console.log(user);

    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {

        fetch(`https://b6a11-service-review-server-side-one-zeta.vercel.app/reviews?email=${user?.email}`,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }

        })
            .then(res => {

                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }

                  return res.json();
            })
            .then(data => setUserReviews(data))


    }, [user?.email, logOut])

    const handleDelete = id =>{

        const proceed = window.confirm('Are you sure, you want to Delect review');
        if (proceed){

            fetch(`https://b6a11-service-review-server-side-one-zeta.vercel.app/reviews/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data =>{

                if(data.deletedCount > 0){

                    toast.success('Deleted Successfully');
                    const remaining = userReviews.filter(rew => rew._id !== id);
                    setUserReviews(remaining);
                }
            })


        }

    }


    const navigate = useNavigate();

    const handleEdit = id =>{
        navigate(`/editreview/${id}`);
    }

    useTitle('My-Review')

    return (
        <Container className='mt-5'>

            {
                
                    userReviews.length == 0 && <h2 style={{color:"red", textAlign:'center', marginTop:'350px', marginBottom:'800px'}}>No Reviews Found! Please Review First!!</h2>
                
            }
            <h2  style={{ color: '#E59866', fontFamily: 'cursive', textAlign:'center' }}> List Of My All Review</h2>

<h3 style={{ color: '#E59866', fontFamily: 'cursive' }}>
                Total Review: {userReviews.length}



            </h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Service Name</th>
                        <th> Reviewer Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Review Details</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {

                        userReviews.map(userReview => <UserReviewsRow key={userReview._id} userReview={userReview} handleDelete={handleDelete} handleEdit={handleEdit} ></UserReviewsRow>)
                    }



                </tbody>
            </Table>
        </Container>


    );
};

export default UserReviews;

// 
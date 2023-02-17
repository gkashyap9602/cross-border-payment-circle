import React from 'react'
import "./home.css"
import { Field, Form, Formik } from "formik"
import { Button,Card } from 'react-bootstrap'

export const Home = () => {
    return (

        <div className='homee'>
        <Card>
<Card.Body>
    

            <div className='main page-content'>

                <div className=''>
                    <Formik
                        //   initialValues={user}
                        enableReinitialize
                    //   validationSchema={ProfileSchema}
                    //   onSubmit={updateProfile}
                    >
                        {({ errors, touched }) => (
                            <Form>

                                <div className='row'>
                                    <div className="col-md-12">
                                        <div className='mb-3 gap-10'>
                                            <Button className='me-3'>
                                                Get Balance
                                            </Button>
                                            <label htmlFor="create">
                                                <Field
                                                    disabled={true}
                                                    //   name="userName"
                                                    //   id="username"
                                                    value="10"

                                                    placeholder="XLM"
                                                    className="form-control"
                                                />

                                            </label>
                                        </div>
                                        <div className='mb-3'>
                                            <Button className='me-3'>
                                                Build TrustLine
                                            </Button>
                                            <label htmlFor="create">
                                                <Field
                                                    //   disabld={apiStatus.inProgress}
                                                    //   disabled={true}
                                                    //   name="userName"
                                                    //   id="username"
                                                    //    value = "1123444"
                                                    placeholder="Anchor Address"
                                                    className="form-control"
                                                />

                                            </label>
                                        </div>
                                        <Button>
                                            Create Account
                                        </Button>



                                    </div>

                                </div>
                            </Form>
                        )}

                    </Formik>
                    {/* <input type="text" placeholder=''/> 
    <input type="text" placeholder=''/> 
      */}
                </div>

            </div>
            </Card.Body>

        </Card>
        </div>


    )
}

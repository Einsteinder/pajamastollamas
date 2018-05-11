import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import AppLayout from './AppLayout';
import { Container } from 'semantic-ui-react'

class Home extends Component {
    render() {
        return (
            <AppLayout content={
                <Container textAlign='center'>

                    <Carousel autoplay>
                        <div><img src={"http://localhost:5000/img/a.jpg"} alt="home2" />
                        </div>
                        <div><img src={"http://localhost:5000/img/b.jpg"} alt="home1" />
                        </div>

                        <div><img src={"http://localhost:5000/img/c.jpg"} alt="home3" />
                        </div>
                        <div><img src={"http://localhost:5000/img/d.jpg"} alt="home4" />
                        </div>
                    </Carousel>
                </Container >

            } />

        );
    }
}

export default Home;
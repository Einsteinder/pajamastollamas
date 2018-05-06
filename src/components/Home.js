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
                        <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/191733/1000x1000/58818_Crop1.jpg"} alt="home2" />
                        </div>
                        <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/165250/1000x1000/51810_MN.jpg"} alt="home1" />
                        </div>

                        <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/190414/1000x1000/83200_MN.jpg"} alt="home3" />
                        </div>
                        <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/194651/1000x1000/26498_LAB.jpg"} alt="home4" />
                        </div>
                    </Carousel>
                </Container >

            } />

        );
    }
}

export default Home;
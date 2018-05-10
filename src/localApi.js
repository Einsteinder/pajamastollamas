import Axios from 'axios'

const localInstance = Axios.create();

localInstance.interceptors.request.use(config => {
    config.url = `http://localhost:5000/${config.url}`;
    return config;
});

export const postAProductComment = async Product => {
    
}

export const getProducts = async () => {
    const url = `items/`;
    const httpResponse = await localInstance({url: url, method: 'GET'});
    return httpResponse.data;
}

export const getForumPosts = async () => {
    const url = `forum/`;
    const httpResponse = await localInstance({url: url, method: 'GET'});
    return httpResponse.data;
}

export const getForumComments = async () => {
    const url = 'forum/comments/';
    const httpResponse = await localInstance({url: url, method: 'GET'});
    return httpResponse.data;
}

export const getProductComments = async () => {
    const url = `item/comments/`;
    const httpResponse = await localInstance({url: url, method: 'GET'});
    return httpResponse.data;
}

export const postlogin = async (email, password) => {
    Axios.post ( "http://localhost:5000/login", { foo: 'bar' } );
}
import Axios from 'axios'

const localInstance = Axios.create({withCredentials: true});

localInstance.interceptors.request.use(config => {
    config.url = `http://localhost:5000/${config.url}`;
    return config;
});

export const postAndLogout = async () => {
    const url = `logout/`;
    const httpResponse = await localInstance({url: url, method: 'POST' })
    return httpResponse.data;
}

export const postAProductComment = async Product => {
    const url = `item/comments/${Product.productId}`;
    const httpResponse = await localInstance({url: url, method: 'POST', data: Product});
    return httpResponse.data;
}

export const postAPost = async Post => {
    const url = `forum/`;
    const httpResponse = await localInstance({url: url, method: `POST`, data: Post});
    return httpResponse.data;
}

export const postALike = async postId => {
    const url = `forum/rating/${postId}`;
    const httpResponse = await localInstance({url: url, method: `POST`, data: 1 });
    return httpResponse.data;
}

export const postAProduct = async Product => {
    const url = `item/`
    const httpResponse = await localInstance({url: url, method: `POST`, data: Product});
    return httpResponse.data;
}

export const postAPostComment = async comment => {
    const url = `forum/comments/${comment.parentId}`;
    const httpResponse = await localInstance({url: url, method: `POST`, data: comment});
    return httpResponse.data;
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
    const url = `login/`;
    const httpResponse = await localInstance({url: url, method: 'POST', data: {username: email, password: password}});
    return httpResponse.data;
}

export const postNewUser = async ( user ) => {
    const url = `user/`;
    const httpResponse = await localInstance({url: url, method: 'POST', data: user});
    return httpResponse.data;
}
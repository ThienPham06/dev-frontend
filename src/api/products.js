import axiosInstance from '../configs/http-commons';

export default {
    getAll() {
        return axiosInstance.get('/products/getAllProducts')
            .then(resp => {
                return resp.data.products
            })
            .catch(err => {
                console.log(err)
            })
    },

    getProduct() {
        return axiosInstance.get('/products/getProduct')
            .then(resp => {
                return resp.data.product
            })        
            .catch(err => {
                console.log(err)
            })
    },

    deleteProduct(id) {
        return axiosInstance.delete('/products/deleteProduct/' + id)
            .then(resp => {
                return resp.status
            })
            .catch(err => {
                console.log(err)
            })
    },

    updateProduct(product, id) {
        return axiosInstance.put('/products/updateProduct/' + id, product)
            .then(resp => {
                return resp
            })              
            .catch(err => {
                console.log(err)
            })
    },

    createProduct(product) {
        return axiosInstance.post('/products/', product)
            .then(resp => {
                return resp
            })
            .catch(err => {
                console.log(err)
            })
    }
}
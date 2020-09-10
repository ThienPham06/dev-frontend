import productRepo from './products'

const repos = {
    'products': productRepo
}

export default {
    get: name => repos[name]
}
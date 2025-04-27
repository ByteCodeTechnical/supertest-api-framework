export const createRequest = (baseUrl: string) => {
    return (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) => {
        const request = require('supertest')(baseUrl);
        
        switch (method) {
            case 'GET':
                return request.get(endpoint);
            case 'POST':
                return request.post(endpoint).send(body);
            case 'PUT':
                return request.put(endpoint).send(body);
            case 'DELETE':
                return request.delete(endpoint);
            default:
                throw new Error('Invalid HTTP method');
        }
    };
};
import request from 'supertest';
import { createRequest } from '../utils/request';

const api = createRequest('http://localhost:8000'); // Replace with your API base URL

export const runTests = () => {
    describe('API Tests', () => {
        it('should return a list of items', async () => {
            const response = await api.get('/items'); // Replace with your endpoint
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should create a new item', async () => {
            const newItem = { name: 'Test Item', description: 'This is a test item' }; // Adjust as needed
            const response = await api.post('/items').send(newItem); // Replace with your endpoint
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(newItem.name);
        });

        it('should return a specific item', async () => {
            const response = await api.get('/items/1'); // Replace with your endpoint and item ID
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });

        it('should return a 404 for a non-existent item', async () => {
            const response = await api.get('/items/999'); // Replace with a non-existent item ID
            expect(response.status).toBe(404);
        });

        // New test cases
        it('should update an existing item', async () => {
            const updatedItem = { name: 'Updated Item', description: 'This is an updated item' }; // Adjust as needed
            const response = await api.put('/items/1').send(updatedItem); // Replace with your endpoint and item ID
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updatedItem.name);
        });

        it('should delete an existing item', async () => {
            const response = await api.delete('/items/1'); // Replace with your endpoint and item ID
            expect(response.status).toBe(204); // Assuming 204 No Content for successful deletion
        });

        it('should return validation error for invalid input', async () => {
            const invalidItem = { invalidField: 'Invalid Data' }; // Adjust as needed
            const response = await api.post('/items').send(invalidItem); // Replace with your endpoint
            expect(response.status).toBe(400); // Assuming 400 Bad Request for validation errors
        });

        it('should handle server errors gracefully', async () => {
            const response = await api.get('/cause-server-error'); // Replace with an endpoint that triggers a server error
            expect(response.status).toBe(500); // Assuming 500 Internal Server Error
        });
    });
};
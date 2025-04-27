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

        it('should return a paginated list of items', async () => {
            const response = await api.get('/items?page=1&limit=10'); // Replace with your endpoint and query params
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
            expect(response.body.items.length).toBeLessThanOrEqual(10);
        });

        it('should search for items by keyword', async () => {
            const response = await api.get('/items?search=test'); // Replace with your endpoint and query params
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
            response.body.items.forEach((item: any) => {
                expect(item.name).toContain('test'); // Adjust based on your API's search behavior
            });
        });

        it('should handle unauthorized access', async () => {
            const response = await api.get('/protected-resource'); // Replace with your protected endpoint
            expect(response.status).toBe(401); // Assuming 401 Unauthorized for missing/invalid credentials
        });

        it('should handle forbidden access', async () => {
            const response = await api.get('/admin-resource'); // Replace with your admin-only endpoint
            expect(response.status).toBe(403); // Assuming 403 Forbidden for insufficient permissions
        });

        it('should return a 405 for unsupported HTTP methods', async () => {
            const response = await api.patch('/items/1'); // Replace with an endpoint that doesn't support PATCH
            expect(response.status).toBe(405); // Assuming 405 Method Not Allowed
        });

        it('should validate required fields when creating an item', async () => {
            const invalidItem = {}; // Missing required fields
            const response = await api.post('/items').send(invalidItem); // Replace with your endpoint
            expect(response.status).toBe(400); // Assuming 400 Bad Request for validation errors
            expect(response.body.errors).toBeDefined(); // Assuming the API returns validation errors
        });

        it('should handle rate limiting', async () => {
            const responses = await Promise.all(
                Array(10).fill(null).map(() => api.get('/rate-limited-endpoint')) // Replace with your rate-limited endpoint
            );
            const lastResponse = responses[responses.length - 1];
            expect(lastResponse.status).toBe(429); // Assuming 429 Too Many Requests for rate limiting
        });
    });
};
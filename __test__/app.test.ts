import { describe, it } from '@jest/globals';
import request from 'supertest';
import createApp from '../src/app';

const app = createApp();

describe('GET /', () => {
  it('GET / should return 200', () => {
    return request(app).get('/').expect(200);
  });
});

describe('GET, POST, PUT, DELETE /unkanow endpoint', () => {
  it('GET /unkanow should return 404', () => {
    return request(app)
      .get('/unkanow')
      .expect('content-type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Not found' });
      });
  });

  it('POST /unkanow should return 404', () => {
    return request(app)
      .post('/unkanow')
      .expect('content-type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Not found' });
      });
  });

  it('PUT /unkanow should return 404', () => {
    return request(app)
      .put('/unkanow')
      .expect('content-type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Not found' });
      });
  });

  it('DELETE /unkanow should return 404', () => {
    return request(app)
      .delete('/unkanow')
      .expect('content-type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Not found' });
      });
  });

  it('GET /asdwdrad should return 404', () => {
    return request(app)
      .get('/asdwdrad')
      .expect('content-type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Not found' });
      });
  });
});

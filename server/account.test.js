const supertest = require('supertest');
const app = require('./index');
const mongoose = require('mongoose');

const Account = require('./models/accounts');

const singleAccountId = '623de11d261c049f0827ee66';
const userId = '623de0dd261c049f0827ee59';
let updateAccountId;
let deleteAccountId;

describe('account routes', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@cluster0.zeoe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET all accounts', () => {
    it('should return array of accounts', async () => {
      const response = await supertest(app).get(
        `/api/accounts/${userId}/user-accounts`
      );

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: expect.any(String) }),
        ])
      );
    });
  });

  describe('POST create account', () => {
    beforeAll(async () => {
      await Account.deleteOne({ title: 'create test' });
    });

    it('should create new account', async () => {
      const response = await supertest(app)
        .post(`/api/accounts/${userId}`)
        .send({ title: 'create test', description: 'create test' });

      expect(response.status).toBe(201);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          title: 'create test',
          description: 'create test',
        })
      );
    });
  });

  describe('POST create account ERROR', () => {
    it('should return error', async () => {
      const response = await supertest(app)
        .post(`/api/accounts/${userId}`)
        .send();

      expect(response.status).toBe(500);
    });
  });

  describe('GET single account', () => {
    it('should return single account', async () => {
      const response = await supertest(app).get(
        `/api/accounts/${singleAccountId}`
      );

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          title: 'get single test',
        })
      );
    });
  });

  describe('GET single account ERROR', () => {
    it('should return error', async () => {
      const response = await supertest(app).get(`/api/accounts/11`);

      expect(response.status).toBe(500);
    });
  });

  describe('PUT update account', () => {
    beforeAll(async () => {
      await Account.create({ title: 'update test' });
      const account = await Account.findOne({ title: 'update test' });
      updateAccountId = account._id;
    });

    afterAll(async () => {
      await Account.deleteOne({ title: 'updated' });
    });

    it('should update existing account and return new', async () => {
      const response = await supertest(app)
        .put(`/api/accounts/${updateAccountId}`)
        .send({ title: 'updated' });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          title: 'updated',
        })
      );
    });
  });

  describe('PUT update account ERROR', () => {
    it('should return error', async () => {
      const response = await supertest(app)
        .put(`/api/accounts/11`)
        .send({ title: 'updated' });

      expect(response.status).toBe(500);
    });
  });

  describe('DELETE account', () => {
    beforeAll(async () => {
      const account = await Account.create({ title: 'delete test' });
      deleteAccountId = account._id;
    });

    it('should delete account', async () => {
      const response = await supertest(app).delete(
        `/api/accounts/${deleteAccountId}`
      );

      expect(response.status).toBe(204);
    });
  });

  describe('DELETE account ERROR', () => {
    it('should return error', async () => {
      const response = await supertest(app).delete(`/api/accounts/11`);

      expect(response.status).toBe(500);
    });
  });

  describe('GET sum of account transaction', () => {
    it('should return sum number', async () => {
      const response = await supertest(app).get(
        `/api/accounts/${singleAccountId}/balance`
      );

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          sum: expect.any(Number),
        })
      );
    });
  });
});

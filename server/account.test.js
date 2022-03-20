const supertest = require('supertest');
const app = require('./index');
const mongoose = require('mongoose');
const Account = require('./models/accounts');
const oneAccountId = '623104c603ce9d2a1e4bb86b';

describe('account', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(
      'mongodb+srv://mekhrullaeva1999:Adulvam28.07@cluster0.zeoe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET all accounts', () => {
    it('should return accounts', async () => {
      const response = await supertest(app).get('/accounts');
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: expect.any(String) }),
        ])
      );
    });
  });

  describe('create account', () => {
    beforeAll(async () => {
      await Account.deleteOne({ name: 'account create test' });
    });

    it('should create new account', async () => {
      const response = await supertest(app).post('/accounts').send({
        name: 'account create test',
        description: 'account create test',
      });

      expect(response.status).toBe(201);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          title: 'account create test',
          description: 'account create test',
        })
      );
    });
  });

  describe('POST account error', () => {
    it('should return error', async () => {
      const response = await supertest(app).post('/accounts').send();

      expect(response.status).toBe(500);
    });
  });

  describe('GET one account', () => {
    it('should return an account', async () => {
      const response = await supertest(app).get(`/accounts/${accountId}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'a single test',
        })
      );
    });
  });

  describe('GET an account ERROR', () => {
    it('should return error', async () => {
      const response = await supertest(app).get(`/accounts/4`);

      expect(response.status).toBe(500);
    });
  });

  describe('PUT update account', () => {
    beforeAll(async () => {
      await Account.create({ name: 'update test' });
      const account = await Account.findOne({ name: 'update test' });
      accountId = account._id;
    });

    afterAll(async () => {
      await Account.deleteOne({ name: 'account updated' });
    });

    it('should update account and return updated one', async () => {
      const response = await supertest(app)
        .patch(`/accounts/${accountId}`)
        .send({ name: 'account updated' });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'account updated',
        })
      );
    });
  });

  describe('PUT  account error', () => {
    it('should return error', async () => {
      const response = await supertest(app)
        .patch(`/accounts/100`)
        .send({ name: 'updated' });

      expect(response.status).toBe(500);
    });
  });

  describe('DELETE account', () => {
    beforeAll(async () => {
      const account = await Account.create({ name: 'delete account test' });
      accountId = account._id;
    });

    it('should delete account', async () => {
      const response = await supertest(app).delete(`/accounts/${accountId}`);

      expect(response.status).toBe(204);
    });
  });

  describe('DELETE account error', () => {
    it('should return error', async () => {
      const response = await supertest(app).delete(`/accounts/100`);

      expect(response.status).toBe(500);
    });
  });

  describe('GET sum of account incomes', () => {
    it('should return incomes sum number', async () => {
      const response = await supertest(app).get(
        `/accounts/${oneAccountId}/incomes-sum`
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

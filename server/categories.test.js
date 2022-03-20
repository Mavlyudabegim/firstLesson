const supertest = require('supertest');
const app = require('./index');
const mongoose = require('mongoose');
const Category = require('./models/category');

describe('category routes', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(
      'mongodb+srv://mekhrullaeva1999:Adulvam28.07@cluster0.zeoe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET all categories', () => {
    it('should return category array', async () => {
      const response = await supertest(app).get('/category');

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(expect.arrayContaining([]));
    });
  });

  describe('POST category', () => {
    beforeAll(async () => {
      await Category.deleteOne({ name: 'create category test' });
    });

    it('should create new category', async () => {
      const response = await supertest(app)
        .post('/category')
        .send({ name: 'create category test' });

      expect(response.status).toBe(201);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'create category test',
        })
      );
    });
  });

  describe('POST category error', () => {
    it('should return error', async () => {
      const response = await supertest(app)
        .post('/category')
        .send({ name: 'something', sum: 200 });

      expect(response.status).toBe(500);
    });
  });

  describe('PUT  cateogry', () => {
    beforeAll(async () => {
      await Category.create({ name: 'update category test' });
      const category = await Category.findOne({
        title: 'update category test',
      });
      categoryId = category._id;
    });

    afterAll(async () => {
      await Category.deleteOne({ name: 'updated category' });
    });

    it('should update category and return updated one', async () => {
      const response = await supertest(app)
        .put(`/category/${categoryId}`)
        .send({ name: 'updated category' });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'updated category',
        })
      );
    });
  });

  describe('PUT cateogry ERROR', () => {
    it('should return error', async () => {
      const response = await supertest(app)
        .patch(`/category/100`)
        .send({ name: 'updated category' });

      expect(response.status).toBe(500);
    });
  });

  describe('DELETE category', () => {
    beforeAll(async () => {
      const category = await Category.create({
        name: 'delete category test',
      });
      deleteCategoryId = category._id;
    });

    it('should delete category', async () => {
      const response = await supertest(app).delete(
        `/category/${deleteCategoryId}`
      );

      expect(response.status).toBe(204);
    });
  });

  describe('DELETE category error', () => {
    it('should return error', async () => {
      const response = await supertest(app).delete(`/category/100`);

      expect(response.status).toBe(500);
    });
  });
});

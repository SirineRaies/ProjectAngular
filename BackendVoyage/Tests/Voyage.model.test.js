// Tests/Voyage.model.test.js
const mongoose = require('mongoose');
const db = require('../src/Database/Database');
require('dotenv').config();

beforeAll(async () => {
  await db.mongoose.connect(db.url);
});

afterAll(async () => {
  await db.mongoose.connection.close();
});

describe('Voyage Model', () => {
  it('should create a valid voyage', async () => {
    const voyage = new db.voyages({
      nomAgence: 'Test',
      adresse: 'Test Address',
      offre: 'Test Offer'
    });
    const saved = await voyage.save();
    expect(saved._id).toBeDefined();
    expect(saved.nomAgence).toBe('Test');
  });

  it('should fail without required fields', async () => {
    const voyage = new db.voyages({});
    await expect(voyage.save()).rejects.toThrow();
  });

  afterEach(async () => {
    await db.voyages.deleteMany({});
  });
});
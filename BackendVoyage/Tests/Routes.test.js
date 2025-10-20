// Tests/Routes.test.js
const request = require('supertest');
const express = require('express');
const voyageRoutes = require('../src/Routes/Route.js');
const db = require('../src/Database/Database.js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
voyageRoutes(app);

beforeAll(async () => {
  if (db.mongoose.connection.readyState === 0) {
    await db.mongoose.connect(db.url);
  }
}, 10000);

afterAll(async () => {
  // Nettoyer toutes les données de test
  if (db.voyages) {
    await db.voyages.deleteMany({});
  }
  
  // Fermer la connexion
  if (db.mongoose.connection.readyState !== 0) {
    await db.mongoose.disconnect();
  }
}, 10000);

describe('Voyage Routes', () => {
  let createdId;

  it('POST /voyages -> should create a voyage', async () => {
    const response = await request(app)
      .post('/voyages')
      .field('nomAgence', 'Test Agence')
      .field('adresse', 'Test Adresse')
      .field('offre', 'Offre spéciale')
      .attach('image', 'Tests/test-image.jpg');

    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
    expect(response.body.data._id).toBeDefined();
    expect(response.body.data.nomAgence).toBe('Test Agence');
    expect(response.body.data.adresse).toBe('Test Adresse');
    expect(response.body.data.offre).toBe('Offre spéciale');
    
    createdId = response.body.data._id;
  }, 15000);

  it('POST /voyages -> should fail without required fields', async () => {
    const response = await request(app)
      .post('/voyages')
      .field('nomAgence', 'Test Agence');

    expect(response.status).toBe(500);
  });

  it('GET /voyages -> should return all voyages', async () => {
    const response = await request(app).get('/voyages');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /voyages/:id -> should return a single voyage', async () => {
    const response = await request(app).get(`/voyages/${createdId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(createdId);
    expect(response.body.nomAgence).toBe('Test Agence');
    expect(response.body.adresse).toBe('Test Adresse');
    expect(response.body.offre).toBe('Offre spéciale');
  });

  it('GET /voyages/:id -> should return 404 for non-existent voyage', async () => {
    const fakeId = '507f1f77bcf86cd799439011'; // ID MongoDB valide mais inexistant
    const response = await request(app).get(`/voyages/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  it('GET /voyages/:id -> should return 500 for invalid ID format', async () => {
    const invalidId = 'invalid-id-format';
    const response = await request(app).get(`/voyages/${invalidId}`);

    expect(response.status).toBe(500);
  });

  it('PUT /voyages/:id -> should update a voyage', async () => {
    const updateData = {
      nomAgence: 'Updated Agence',
      adresse: 'Updated Adresse',
      offre: 'Nouvelle Offre'
    };

    const response = await request(app)
      .put(`/voyages/${createdId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.nomAgence).toBe('Updated Agence');
    expect(response.body.data.adresse).toBe('Updated Adresse');
    expect(response.body.data.offre).toBe('Nouvelle Offre');
    expect(response.body.data._id).toBe(createdId);
  });

  it('PUT /voyages/:id -> should partially update a voyage', async () => {
    const updateData = {
      nomAgence: 'Partially Updated Agence'
    };

    const response = await request(app)
      .put(`/voyages/${createdId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.data.nomAgence).toBe('Partially Updated Agence');
    expect(response.body.data.adresse).toBe('Updated Adresse'); // Reste inchangé
    expect(response.body.data.offre).toBe('Nouvelle Offre'); // Reste inchangé
  });

  it('PUT /voyages/:id -> should return 404 for non-existent voyage', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const response = await request(app)
      .put(`/voyages/${fakeId}`)
      .send({ nomAgence: 'Test' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  it('PUT /voyages/:id -> should return 500 for invalid ID format', async () => {
    const invalidId = 'invalid-id-format';
    const response = await request(app)
      .put(`/voyages/${invalidId}`)
      .send({ nomAgence: 'Test' });

    expect(response.status).toBe(500);
  });

  it('DELETE /voyages/:id -> should delete a voyage', async () => {
    const response = await request(app).delete(`/voyages/${createdId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toContain('deleted');
  });

  it('DELETE /voyages/:id -> verify voyage is deleted', async () => {
    const response = await request(app).get(`/voyages/${createdId}`);

    expect(response.status).toBe(404);
  });

  it('DELETE /voyages/:id -> should return 404 for already deleted voyage', async () => {
    const response = await request(app).delete(`/voyages/${createdId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  it('DELETE /voyages/:id -> should return 500 for invalid ID format', async () => {
    const invalidId = 'invalid-id-format';
    const response = await request(app).delete(`/voyages/${invalidId}`);

    expect(response.status).toBe(500);
  });

  // Test de création multiple pour vérifier GET /voyages
  it('POST /voyages -> should create multiple voyages', async () => {
    const voyage1 = await request(app)
      .post('/voyages')
      .field('nomAgence', 'Agence 1')
      .field('adresse', 'Adresse 1')
      .field('offre', 'Offre 1')
      .attach('image', 'Tests/test-image.jpg');

    const voyage2 = await request(app)
      .post('/voyages')
      .field('nomAgence', 'Agence 2')
      .field('adresse', 'Adresse 2')
      .field('offre', 'Offre 2')
      .attach('image', 'Tests/test-image.jpg');

    expect(voyage1.status).toBe(201);
    expect(voyage2.status).toBe(201);

    const allVoyages = await request(app).get('/voyages');
    expect(allVoyages.body.length).toBeGreaterThanOrEqual(2);
  }, 15000);
});
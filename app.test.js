const request = require('supertest');
const app = require('./app');

describe('Test the API requests', () => {

    test('POST /api/team/create succeeds', () => {
        const params = {
            "name": "A"
        };
        return request(app)
        .post('/api/team/create')
        .send(params)
	    .expect(200);
    });

    test('POST /api/team/create no input', () => {
        const params = {
            "name": ""
        };
        return request(app)
        .post('/api/team/create')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add succeeds', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(200);
    });

    test('POST /api/player/add empty name field', () => {
        const params = {
            "name": "",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add empty team field', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "",
            "goalsScored": "10",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add empty goalsScored field', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add empty position field', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add empty assists field', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add empty clean sheets field', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "10",
            "cleanSheets": ""
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add negative goals scored', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "-1",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add decimal goals scored', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "2.5",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add negative assists', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "-5",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add decimal assists', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "0.5",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add negative clean sheets', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "8",
            "cleanSheets": "-7"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/add decimal clean sheets', () => {
        const params = {
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "8",
            "cleanSheets": "4.7"
        };
        return request(app)
        .post('/api/player/add')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit succeeds', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "12",
            "position": "MID",
            "assists": "11",
            "cleanSheets": "11"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(200);
    });

    test('POST /api/player/edit empty name field', () => {
        const params = {
            "id": 1,
            "name": "",
            "team": "A",
            "goalsScored": "12",
            "position": "MID",
            "assists": "11",
            "cleanSheets": "11"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit empty team field', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "",
            "goalsScored": "12",
            "position": "MID",
            "assists": "11",
            "cleanSheets": "11"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });


    test('POST /api/player/edit empty goalsScored field', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "",
            "position": "MID",
            "assists": "11",
            "cleanSheets": "11"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit empty position field', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "12",
            "position": "",
            "assists": "11",
            "cleanSheets": "11"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit empty assists field', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "12",
            "position": "MID",
            "assists": "",
            "cleanSheets": "11"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit empty clean sheets field', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "12",
            "position": "MID",
            "assists": "11",
            "cleanSheets": ""
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit negative goals scored', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "-2",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit decimal goals scored', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "1.1",
            "position": "MID",
            "assists": "10",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit negative assists', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "-11",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit decimal assists', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "6.8",
            "cleanSheets": "10"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit negative clean sheets', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "8",
            "cleanSheets": "-9"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });

    test('POST /api/player/edit decimal clean sheets', () => {
        const params = {
            "id": 1,
            "name": "Samuel Singleton",
            "team": "A",
            "goalsScored": "10",
            "position": "MID",
            "assists": "8",
            "cleanSheets": "6.2"
        };
        return request(app)
        .post('/api/player/edit')
        .send(params)
	    .expect(400);
    });
    
    test('GET /api/players returns JSON', () => {
        return request(app)
	    .get('/api/players')
	    .expect('Content-type', /json/);
    });

    test('GET /api/players succeeds', () => {
        return request(app)
	    .get('/api/players')
	    .expect(200);
    });

    test('GET /api/teams returns JSON', () => {
        return request(app)
	    .get('/api/teams')
	    .expect('Content-type', /json/);
    });

    test('GET /api/teams succeeds', () => {
        return request(app)
	    .get('/api/teams')
	    .expect(200);
    });
});
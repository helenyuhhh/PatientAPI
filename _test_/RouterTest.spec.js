// test Router

import Patient from '../models/patients.js'
import router from '../routes/patientsRouter.js'

jest.mock('../models/patients.js'); // Mock the Patient model
const jest = require('@jest/globals');

describe('GET /api/patients', () => {
  afterEach(() => {
    jest.clearAllMocks()
  });

  it('returns a list of patient and status 200', async () => {
    // mock patients
    const mockedPatients = [
      {
        name:{first: "Sam", last: "Smith"},
        age:34,
        gender:"Male",
        room:"203A",
        condition: "Normal",
        tests:[],
        weight:"150lb",
        height:"5.6ft",
        date:new Date("2020-2-20")
      },
      {
        name:{first: "Kim", last: "Lammy"},
        age:33,
        gender:"Female",
        room:"202A",
        condition: "Normal",
        tests:[],
        weight:"130lb",
        height:"5.3ft",
        date:new Date("2020-2-20")
      }
    ]
    // simulate the fetch function and successful return the array
    Patient.find.mockResolvedValue(mockedPatients)
    // simulate the request and responde
    const req = {}
    const res = {
      json: jest.fn(),
      // simulate the 200
      status: jest.fn().mockReturnThis()
    };
    // route.stack contains the header like http and middleware functions
    // GET /, and extract the function then assign it to routeHandler
    const routeHandler = router.stack.find(
      (layer) => layer.route && layer.route.path === '/' && layer.route.methods.get
    ).route.stack[0].handle

    // Call the route handler
    await routeHandler(req, res)

    // expect the response is 200 (moclResolvedValues)
    expect(res.status).not.toHaveBeenCalled() 
    // make sure that the patient list is returned
    expect(res.json).toHaveBeenCalledWith(mockedPatients);
    // make sure that the find method has been called
    expect(Patient.find).toHaveBeenCalledTimes(1)
  });

  it('should return status 500 if there is an error', async () => {
    // Mock error, 500
    Patient.find.mockRejectedValue(new Error('Database error'));

    // Mock req and res
    const req = {}
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // simulate the async(req, res)
    const routeHandler = router.stack.find(
      (layer) => layer.route && layer.route.path === '/' && layer.route.methods.get
    ).route.stack[0].handle;
    await routeHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(500); // Check the status code
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' }); // Check the error message
    expect(Patient.find).toHaveBeenCalledTimes(1); // Ensure the find method was called
  });
});

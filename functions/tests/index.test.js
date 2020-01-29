const { fetchBeaches } = require("../index");

jest.mock("cors") // from ../__mocks__/cors.js

jest.mock('firebase-admin',() =>({
  initializeApp: () => true,
  firestore: () => ({ collection: () => ({
    get: () => new Promise((resolve,reject) => {
      resolve([{id:'first', data: () => ({foo:'bar'})},{id:'second',data: () => ({foz:"baz"})}])
    })
  })})
}));

describe('fetchBeaches',() => {
  it("should return a 200 with data as json", done => {
    const mockRequest = {
      method: "GET",
    };
    const mockResponse = {
      status: code => {
        expect(code).toEqual(200);
        return {
          send: jest.fn(data => {
            expect(data).toEqual({"data": {"first": {"foo": "bar"}, "second": {"foz": "baz"}}});
            done();
          })
        }
      }
    }
    fetchBeaches(mockRequest, mockResponse);
  })
})

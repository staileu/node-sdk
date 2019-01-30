import Client from '../src/Client'

describe('client', () => {
  let client = new Client();
  test('client is working', () => {
    expect(client.isWorking()).toBe(true)
  })
});

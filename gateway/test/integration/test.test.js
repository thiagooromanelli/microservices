
describe('Tests /start-auction-test route', () => {
  let token

  before(() => token = jwt.sign({ userId: '123456789abc12def32' }, config.jwt.secret))

  it('Should respond with 200', () => request.get('/start-auction-test')
    .set('authorization', token)
    .expect(200)
    .then()
    .catch(e => console.log(e)))
})
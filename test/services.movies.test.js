const assert = require('assert');
const proxyquire = require('proxyquire');

const { getAllStub, MongolibMock } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {
  const MoviesServices = proxyquire.load('../services/movies.js', {
    '../lib/mongo': MongolibMock
  });

  const moviesService = new MoviesServices();
  describe('when getMovies method is called', async function() {
    it('should call the getAll Mongolib method', async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });
    it('should return an array of movies', async function() {
      const movies = await moviesService.getMovies({});
      const expected = await moviesMock;
      assert.deepEqual(movies, expected);
    });
  });
});

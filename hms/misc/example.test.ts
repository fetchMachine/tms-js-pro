import { Api } from './Api';

const mockedFetch = () => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({}),
});


describe('Api.getCategories', () => {
  const GET_CATEGORIES_URL = '/api/categories';

  let api: Api;

  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-native-reassign
    fetch = jest.fn(mockedFetch);

    api = new Api()
  });

  it('корректно собирает пустой урд урл', async () => {
    await api.getCategories();
    expect(fetch).toBeCalledWith(GET_CATEGORIES_URL);
  })

  it('корректно собирает урл с параметрами', async () => {
    await api.getCategories({ ids: '2' });
    expect(fetch).toBeCalledWith(`${GET_CATEGORIES_URL}?ids=2`);
  })
});

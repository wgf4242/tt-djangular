import { ClienPage } from './app.po';

describe('clien App', () => {
  let page: ClienPage;

  beforeEach(() => {
    page = new ClienPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

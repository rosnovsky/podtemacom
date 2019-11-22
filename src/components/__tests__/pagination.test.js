import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import Pagination from '../pagination';
import { useStaticQuery } from 'gatsby';

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      avatar: {
        childImageSharp: {
          fixed: {
            base64: 'foo',
            width: 1,
            height: 1,
            src: 'foo',
            srcSet: 'foo',
          },
        },
      },
      site: {
        siteMetadata: {
          author: 'Mock author',
        },
      },
    };
  });
});

describe('Pagination Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const onChangePage = items => null;
    const items = [
      {
        excerpt:
          'Спасибо патронам! Забрал ребенка из лагеря На носу первый день High School Rolling Stones (следующая остановка – Bryan Adams) Работа. Проект…',
        fields: {
          slug: '/evergreen/2019/08/31/episode-088/',
        },
        frontmatter: {
          date: 'August 31, 2019',
          title: 'Episode #088',
          description:
            'Новое место, и такой искренний и откровенный подкаст. Поговорим о моем новом лэптопе и концерте Rolling Stones.',
          cover: {
            publicURL:
              '/static/cropped-IMG_6044-84e7efb29cc0b8bf06d43dd23162088a.jpeg',
          },
          audioUrl: 'https://podtema.com/media/evergreen/evergreen088.mp3',
        },
      },
      {
        excerpt:
          'Спасибо патронам! Где я и почему я здесь? 🌎 Ребенок и футбол 🏈 Ребенок и кемп по дизайну игр 🎮 Последние дни в Майкрософт 💾 Гей-парад…',
        fields: {
          slug: '/evergreen/2019/07/29/episode-087/',
        },
        frontmatter: {
          date: 'July 29, 2019',
          title: 'Episode #087',
          description:
            'Подкаст из такого неожиданного, но такого привычного места, где я не записывал подкасты года, наверное, два.',
          cover: {
            publicURL:
              '/static/cropped-IMG_5809-3a8995ae2430ef30da2281b1088fa956.jpeg',
          },
          audioUrl: 'https://podtema.com/media/evergreen/evergreen087.mp3',
        },
      },
    ];
    ReactDOM.render(
      <Pagination items={items} onChangePage={onChangePage} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('doesn\'t break on empty page', () => {
    const div = document.createElement('div');
    const onChangePage = items => null;
    const items = [];
    ReactDOM.render(
      <Pagination items={items} onChangePage={onChangePage} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const onChangePage = items => null;

    const items = [
      {
        excerpt:
          'Спасибо патронам! Забрал ребенка из лагеря На носу первый день High School Rolling Stones (следующая остановка – Bryan Adams) Работа. Проект…',
        fields: {
          slug: '/evergreen/2019/08/31/episode-088/',
        },
        frontmatter: {
          date: 'August 31, 2019',
          title: 'Episode #088',
          description:
            'Новое место, и такой искренний и откровенный подкаст. Поговорим о моем новом лэптопе и концерте Rolling Stones.',
          cover: {
            publicURL:
              '/static/cropped-IMG_6044-84e7efb29cc0b8bf06d43dd23162088a.jpeg',
          },
          audioUrl: 'https://podtema.com/media/evergreen/evergreen088.mp3',
        },
      },
      {
        excerpt:
          'Спасибо патронам! Где я и почему я здесь? 🌎 Ребенок и футбол 🏈 Ребенок и кемп по дизайну игр 🎮 Последние дни в Майкрософт 💾 Гей-парад…',
        fields: {
          slug: '/evergreen/2019/07/29/episode-087/',
        },
        frontmatter: {
          date: 'July 29, 2019',
          title: 'Episode #087',
          description:
            'Подкаст из такого неожиданного, но такого привычного места, где я не записывал подкасты года, наверное, два.',
          cover: {
            publicURL:
              '/static/cropped-IMG_5809-3a8995ae2430ef30da2281b1088fa956.jpeg',
          },
          audioUrl: 'https://podtema.com/media/evergreen/evergreen087.mp3',
        },
      },
    ];
    const pagination = render(
      <Pagination items={items} onChangePage={onChangePage} />
    );
    expect(pagination).toMatchSnapshot();
  });
});

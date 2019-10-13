module.exports = {
  siteMetadata: {
    title: `Evergreen Podcast`,
    author: `Artem Rosnovsky`,
    description: `Evergreen Podcast: from Pacific Northwest to the World`,
    siteUrl: `https://podtema.com/`,
    social: {
      twitter: `rosnovsky`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `evergreen`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: ({
          query: {
            site: { siteMetadata },
            ...rest
          },
        }) => {
          return {
            ...siteMetadata,
            ...rest,
            description: "От автора Rosnovsky Park™ Weekly и Rosnovsky in Canada! Самый аутентичный подкаст на русском языке! Evergreen Podcast: Смотри ушами. Легендарный ведущий старейших подкастов на русском языке представляет третью серию подкастов — Вечнозелёный подкаст из вечнозелёного штата Вашингтон, что на Тихоокеанском Северо-Западе США 🇺🇸. Путешествия, походы, природа, работа, технологии, семья, дети, деньги — всё, что волнует интересует!",
            custom_namespaces: {
              'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
            },
            custom_elements: [
              {
                'itunes:image': {
                  _attr: {
                    href: `${siteMetadata.siteUrl}cover.png`
                  }
                },

                "itunes:owner":
                {
                  "itunes:name": "Artem Rosnovsky",
                  "itunes:email": "artem@rosnovsky.us"
                },

                "itunes:category": "Personal Journals",
                "itunes:category": "Places & Travel",
                "itunes:category": "Society & Culture",

                "itunes:keywords": "США, Канада, иммиграция, истории, Вашингтон, Орегон, росновский",
                "itunes:explicit": "clean",
                "itunes:language": "ru-RU",
                "itunes:author": "Artem Rosnovsky",
                "itunes:email": "artem@rosnovsky.us",
                "itunes:summary": "От автора Rosnovsky Park™ Weekly и Rosnovsky in Canada! Самый аутентичный подкаст на русском языке! Evergreen Podcast: Смотри ушами. Легендарный ведущий старейших подкастов на русском языке представляет третью серию подкастов — Вечнозелёный подкаст из вечнозелёного штата Вашингтон, что на Тихоокеанском Северо-Западе США 🇺🇸. Путешествия, походы, природа, работа, технологии, семья, дети, деньги — всё, что волнует интересует!",
                "itunes:subtitle": "From Pacific Northwest to the World"
              }
            ]
          }
        },
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is a blog post I've posted at rosnovsky.us. You can read it <a href="${siteUrl +
                  edge.node.fields.slug}">here</a>.)</div>
              `

                let html = edge.node.html
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': html + postText }],
                })
              })
            },

            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: {frontmatter: { type: {ne: "podcast"}}}
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Rosnovsky Park™ RSS Feed',
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl
                let html = edge.node.html
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  date: edge.node.frontmatter.date,
                  lat: 47.84311, //optional latitude field for GeoRSS
                  long: -122.204579, //optional longitude field for GeoRSS
                  enclosure: { url: edge.node.frontmatter.source, size: edge.node.frontmatter.size * 1048576, type: "audio/mp3" },
                  custom_elements: [
                    {
                      'itunes:duration': edge.node.frontmatter.time * 60,
                      "content:encoded": html,
                      "itunes:episode": edge.node.frontmatter.episode,
                      "itunes:episodeType": edge.node.frontmatter.episodeType,
                      "itunes:author": "Artem Rosnovsky",
                    }
                  ]
                })
              })
            },

            query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {frontmatter: { type: {eq: "podcast"}}}
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        type
                        audioURL
                        cover {publicURL}
                        time
                        size
                        episode
                        episodeType
                        mentions {type, text, url}
                      }
                    }
                  }
                }
              }
            `,
            output: '/podcast.xml',
            title: 'Evergreen Podcast',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Evergreen Podcast`,
        short_name: `Evergreen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}

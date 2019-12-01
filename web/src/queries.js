import ApolloClient, { gql } from 'apollo-boost';

export const client = new ApolloClient({
    uri: 'https://h3yilaad.api.sanity.io/v1/graphql/production/default'
});

export const GET_POSTS = gql`
{
	allPosts {
        title
        tags {
            title
            description
        }
        shownotesRaw
        author {
            name
            slug {
                current
            }
        }
        coverArt {
                asset {
                    path
                }
            }
        }  
    }
`;

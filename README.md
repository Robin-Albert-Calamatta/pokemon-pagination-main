# Pagination NextJS Training

Your Task is to create a a Nice Paginated List of Pokemon.

## Criteria

### User Story

> As a `User`
>
> I want to be able to browse through pages of pokemon in a quick and organized fashion.

### Acceptance Criteria

-   Click on `Next` and `Previous` should navigate to the correct page
-   A Block of available Page Numbers should be displayed
-   The Current Page Number should be highlighted
-   The Current Page Number should be centered in the List when appropriate
    -   Page Numbers `1` and `2` should not be centered
    -   Page Numbers `Max` and `Max - 1` should not be centered
-   Invalid Page Numbers should not be displayed
-   A Clicking on a Page Number should goto that Page in the List
-   Changing the Items Per Page should Reset the list to Page 1
-   System should only accept Valid Page Numbers from `1` to the max Page Number
-   Invalid Page Numbers should produce an Error

## Expected Environment

We expect you to be working in a unix based environment (mac, linux, ubuntu, mint, etc...) with node installed with a node package manager.

-   [NVM](https://github.com/nvm-sh/nvm) - A Node Version Manager
-   [Yarn](https://classic.yarnpkg.com/lang/en/) - a Node Package Manager (Note we link to version 1.x)
-   [VSCode](https://code.visualstudio.com/) - A Code Editor suited to web development

> **NOTE**
>
> Many other environments and tools will work with this project, but are not supported by 44 North.

## Get Started

1. Download this repository
2. Install the Dependencies
3. Run the Application in your command line. `yarn dev`

## Scripts

-   `dev`: Run NextJS in Development Mode
-   `build`: Build NextJS for Production Mode
-   `start`: Run NextJS in Production Mode
-   `lint`: Run the NextJS Linter
-   `knex:make <name>`: Make a KnexJS migration file
-   `knex:latest`: Run all of the migration files
-   `knex:up`: Run the next migration file
-   `knex:down`: Revert the last migration file run

## Resources

-   [NextJS](https://nextjs.org/docs/getting-started) - The Application Framework
-   [KnexJS](http://knexjs.org/) - A Database Adapter API
-   [GraphQL](https://graphql.org/) - An Open Graph Based Web API
-   [Apollo](https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/) - A Client Side GraphQL Library
-   [tailwindcss](https://tailwindcss.com/docs) - A CSS Utility Framework
-   [headlessui](https://headlessui.dev/) - A utility framework for common JavaScript Components
-   [heroicons](https://heroicons.com/) - A Icon Library
-   [axios](https://www.npmjs.com/package/axios) - A Client and Server Side XHR Request API Library
-   [@44north/classnames](https://www.npmjs.com/package/@44north/classnames) - A Library for managing Class Names in React
-   [PokeAPI](https://pokeapi.co/) - An online open source data API of Pokemon

## GraphQL Query to Run

you can visit [/api/graphql](http://localhost:3000/api/graphql) on your running NextJS instance to see everything available to you through the GraphQL implementation we setup.

You can run this query to get a list of Pokemon in the System.

```gql
{
    listPokemon(itemsPerPage: 3, pageNo: 1) {
        id
        name
        height
        weight
        species {
            habitat {
                name
            }
            color {
                name
            }
        }
        sprites {
            official_artwork_front_default
        }
        types {
            name
        }
        abilities {
            name
            is_hidden
        }
    }
}
```

> **Note**
>
> To make this api more responsive, we have setup an SQLite3 Database to cache responses from the RestfulAPI. The means that the first time you call an endpoint with a set of parameters, the response may be slow, but subsequent requests to the same endpoint with the same parameters will be quick.

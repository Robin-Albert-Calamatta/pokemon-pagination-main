import React, { useState, useEffect } from "react";
import { PokemonCard, ErrorBlock } from "./../components";
import { ClassNames } from "@44north/classnames";
import { useQuery, gql } from "@apollo/client";
import type { IPokemonRecord } from "./../types";

import Pagination from "./../components/Pagination";
const POKEMON_QUERY = gql`
    query GetPokemon($pageNo: Int, $itemsPerPage: Int) {
        listPokemon(pageNo: $pageNo, itemsPerPage: $itemsPerPage) {
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
`;
function Homepage() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [pageNo, setPageNo] = useState<number>(1);
    const { data, loading, error, refetch } = useQuery<{ listPokemon: IPokemonRecord[] }>(
        POKEMON_QUERY,
        {
            variables: {
                pageNo,
                itemsPerPage
            }
        }
    );

    useEffect(() => {
        //fetch data

        refetch({
            pageNo,
            itemsPerPage
        });
    }, [pageNo, itemsPerPage]);
    return (
        <div className={new ClassNames(["flex", "flex-col", "space-y-4"]).list()}>
            {error && <ErrorBlock error={error} />}
            {loading ? (
                <p>I am Loading...</p>
            ) : (data?.listPokemon || []).length === 0 ? (
                <ErrorBlock error={new Error("No Records Found")} />
            ) : (
                <ul>
                    {data.listPokemon.map((record) => (
                        <li key={record.id}>
                            <PokemonCard data={record} />
                        </li>
                    ))}
                </ul>
            )}
            <div
                className={new ClassNames([
                    "flex",
                    "justify-between items-center",
                    "space-x-8"
                ]).list()}
            >
                <Pagination
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                    loading={loading}
                    data={data}
                    setItemsPerPage={setItemsPerPage}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
}
export default Homepage;

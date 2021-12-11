import React, { useState, useEffect } from "react";
import { Button, PokemonCard, ErrorBlock, SelectBox } from "./../components";
import { ClassNames } from "@44north/classnames";
import { useQuery, gql } from "@apollo/client";
import type { IPokemonRecord } from "./../types";
import axios from "axios";
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

    const [pageList, setPageList] = useState([]);
    const [pages, setPages] = useState<number>(1);
    const [toggleNext, setToggleNext] = useState<boolean>(true);
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

    const [pokemonCount, setPokemonCount] = useState<number>(100);
    //use effect using axios to get total pokemon count
    useEffect(() => {
        //ensuring that next button is toggled true once the application starts
        pageNo === 1 ? setToggleNext(true) : "";

        axios.get<any>(`https://pokeapi.co/api/v2/pokemon`).then((res) => {
            setPokemonCount(res.data.count);
        });
    }),
        [];

    useEffect(() => {
        //Performs calculation of how many pages there will be and
        setPages(Math.ceil(pokemonCount / itemsPerPage));
        refetch({
            pageNo,
            itemsPerPage
        });
        //logic for toggling the next button in pagination
        if (pages - 3 < pageNo) {
            setToggleNext(false);
        } else {
            setToggleNext(true);
        }
        //logic for creating the pagination bar and ensuring that the data is only 7 elements long
        //current page will be centred
        if (pageNo > 3) {
            for (let i = pageNo - 3; i <= pageNo + 3; i++) {
                pageList.push(i);
            }
        } else if (pageNo <= 3) {
            for (let i = 1; i < 8; i++) {
                pageList.push(i);
            }
        } else if (pageNo > data.listPokemon.length - 7) {
            for (let i = data.listPokemon.length - 7; i < data.listPokemon.length; i++) {
                pageList.push(i);
            }
        }
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
                <div className={new ClassNames(["flex", "space-x-2", "items-center"]).list()}>
                    {
                        //utilizing pagination component created and sending props
                    }
                    <Pagination
                        pageNo={pageNo}
                        setPageNo={setPageNo}
                        toggleNext={toggleNext}
                        setPageList={setPageList}
                        pageList={pageList}
                        loading={loading}
                        data={data}
                        pages={pages}
                    />
                </div>
                <div>
                    <SelectBox
                        value={itemsPerPage}
                        onChange={(value) => {
                            setItemsPerPage(Number(value)), setPageList([]), setPageNo(1);
                        }}
                        options={[1, 3, 6, 9, 12, 24, 48]}
                    />
                </div>
            </div>
        </div>
    );
}
export default Homepage;

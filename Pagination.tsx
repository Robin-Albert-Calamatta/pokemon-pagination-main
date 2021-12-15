import { useEffect, useState } from "react";
import { Button, ErrorBlock, SelectBox } from "./../components";

import { ClassNames } from "@44north/classnames";

import axios from "axios";

function Pagination(props) {
    const [pageList, setPageList] = useState([]);
    const [pages, setPages] = useState<number>();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon`).then((res) => {
            // console.log("res.data.count: " + res.data.count);
            setPages(Math.ceil(res.data.count / props.itemsPerPage));
        });

        if (props.pageNo > 3 && !(props.pageNo > pages - 4)) {
            for (let i = props.pageNo - 3; i <= props.pageNo + 3; i++) {
                pageList.push(i);
            }
        } else if (props.pageNo <= 3) {
            for (let i = 1; i < 8; i++) {
                pageList.push(i);
            }
        } else if (props.pageNo > pages - 4) {
            for (let i = pages - 6; i <= pages; i++) {
                pageList.push(i);
            }
        }

        // setPages(Math.ceil(pokemonCount / props.itemsPerPage));
    }, [props.pageNo, props.itemsPerPage]);

    return (
        <>
            <div className={new ClassNames(["flex", "space-x-2", "items-center"]).list()}>
                {
                    //disable the back button if our page value is 1
                }
                {props.pageNo === 1 ? (
                    <Button
                        onClick={() => {
                            props.setPageNo(props.pageNo - 1), setPageList([]);
                        }}
                        disabled
                    >
                        Previous Page
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            props.setPageNo(props.pageNo - 1), setPageList([]);
                        }}
                    >
                        Previous Page
                    </Button>
                )}
                {props.loading ? (
                    <p>I am Loading...</p>
                ) : (props.data?.listPokemon || []).length === 0 ? (
                    <ErrorBlock error={new Error("No Records Found")} />
                ) : (
                    <div className={new ClassNames(["flex", "space-x-2", "items-center"]).list()}>
                        {
                            //map the page number as button elements and disable the page that user is on
                            pageList.map((_, index) => {
                                if (props.pageNo === pageList[index]) {
                                    return (
                                        <Button
                                            key={pageList[index]}
                                            onClick={() => setPageList([])}
                                            disabled
                                        >
                                            {pageList[index]}
                                        </Button>
                                    );
                                }

                                return (
                                    <>
                                        {
                                            //continue to map out the pages as buttons

                                            pages >= pageList[index] ? (
                                                <Button
                                                    key={pageList[index]}
                                                    onClick={() => {
                                                        props.setPageNo(pageList[index]),
                                                            setPageList([]);
                                                    }}
                                                >
                                                    {pageList[index]}
                                                </Button>
                                            ) : (
                                                ""
                                            )
                                        }
                                    </>
                                );
                            })
                        }
                    </div>
                )}
                {
                    //Logic to determine whether the next button will be disabled or active
                    props.pageNo === pages ? (
                        <Button
                            onClick={() => {
                                props.setPageNo(props.pageNo + 1), setPageList([]);
                            }}
                            disabled
                        >
                            Next Page
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                props.setPageNo(props.pageNo + 1), setPageList([]);
                            }}
                        >
                            Next Page
                        </Button>
                    )
                }
            </div>
            <div>
                <SelectBox
                    value={props.itemsPerPage}
                    onChange={(value) => {
                        props.setItemsPerPage(Number(value)), setPageList([]), props.setPageNo(1);
                    }}
                    options={[1, 3, 6, 9, 12, 24, 48]}
                />
            </div>
        </>
    );
}

export default Pagination;

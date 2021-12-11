import React from "react";
import { Button, PokemonCard, ErrorBlock, SelectBox } from "./../components";
import PropTypes from "prop-types";
import { ClassNames } from "@44north/classnames";

function Pagination(props) {
    return (
        <>
            {
                //disable the back button if our page value is 1
            }
            {props.pageNo === 1 ? (
                <Button
                    onClick={() => {
                        props.setPageNo(props.pageNo - 1), props.setPageList([]);
                    }}
                    disabled
                >
                    Previous Page
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        props.setPageNo(props.pageNo - 1), props.setPageList([]);
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
                        props.pageList.map((_, index) => {
                            if (props.pageNo === props.pageList[index]) {
                                return (
                                    <Button
                                        key={props.pageList[index]}
                                        onClick={() => props.setPageList([])}
                                        disabled
                                    >
                                        {props.pageList[index]}
                                    </Button>
                                );
                            }

                            return (
                                <>
                                    {
                                        //continue to map out the pages as buttons

                                        props.pages >= props.pageList[index] ? (
                                            <Button
                                                onClick={() => {
                                                    props.setPageNo(props.pageList[index]),
                                                        props.setPageList([]);
                                                }}
                                            >
                                                {props.pageList[index]}
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
                props.toggleNext ? (
                    <Button
                        onClick={() => {
                            props.setPageNo(props.pageNo + 1), props.setPageList([]);
                        }}
                    >
                        Next Page
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            props.setPageNo(props.pageNo + 1), props.setPageList([]);
                        }}
                        disabled
                    >
                        Next Page
                    </Button>
                )
            }
        </>
    );
}

export default Pagination;

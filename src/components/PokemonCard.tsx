import { FC } from "react";
import { ClassNames } from "@44north/classnames";
import type { IPokemonRecord } from "./../types";

const PokemonCard: FC<{ data: IPokemonRecord; className?: string | ClassNames }> = ({
    data,
    className = ""
}) => {
    return (
        <>
            {/* <img src={data.sprites.official_artwork_front_default} /> */}
            <div className={new ClassNames().add(className).list()}>{data.name}</div>
        </>
    );
};

export { PokemonCard };

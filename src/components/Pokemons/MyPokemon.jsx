/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { mqx } from "../../helper/functions";
import { Modal } from "antd";

import Header from "../Header/Header";
import PokemonCard from "./components/PokemonCard";

const MyPokemon = (props) => {
    let pokemons = JSON.parse(localStorage.getItem("myPokemon"));

    let [myPokemons, setMyPokemons] = useState(pokemons ? pokemons : []);
    let [modalVisibility, setModalVisibility] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [modalText, setModalText] = useState("");
    let [deletedPokemonId, setDeletedPokemonId] = useState("");

    let detailCss = {
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "15vh",
        userSelect: "none",
        backgroundColor: "#E4EBE0",
        color: "#263F60",
        minHeight: "100vh",
        paddingBottom: "15vh",
    };

    let titleTextCss = {
        fontSize: "1.25em",
        marginBottom: "5vh",
    };

    let pokemonListCss = {
        marginTop: "2.5%",
        display: "flex",
        width: "50%",
        flexWrap: "wrap",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        [mqx[2]]: {
            width: "100%",
            marginTop: "5%",
        },
    };

    const onDeleteClicked = (id, nickname) => {
        setModalTitle(`Release ${nickname}`);
        setModalText(`Are you sure you want to release ${nickname}`);
        setModalVisibility(true);
        setDeletedPokemonId(id);
    };

    const onConfirmDelete = () => {
        let myPokemonsFromLocalStorage = JSON.parse(
            localStorage.getItem("myPokemon")
        );

        let filterPokemon = myPokemonsFromLocalStorage.filter(
            (localPokemon) => {
                return localPokemon.id !== deletedPokemonId;
            }
        );

        if (filterPokemon.length === 0) {
            localStorage.removeItem("myPokemon");
        } else {
            localStorage.setItem("myPokemon", JSON.stringify(filterPokemon));
        }

        let newPokemons = JSON.parse(localStorage.getItem("myPokemon"));
        setMyPokemons(newPokemons ? newPokemons : []);
        setModalVisibility(false);
    };

    const onCancelDelete = () => {
        setDeletedPokemonId("");
        setModalVisibility(false);
    };

    return (
        <div>
            <Header active={props.active} menuItem={props.menuItem} />
            <div css={detailCss}>
                <div css={titleTextCss}>My Pokemon List</div>

                <div css={pokemonListCss}>
                    {myPokemons.length > 0 ? (
                        myPokemons.map((item, index) => {
                            return (
                                <PokemonCard
                                    pokemon={item}
                                    nickname={item.nickname}
                                    id={item.id}
                                    handleDelete={onDeleteClicked}
                                />
                            );
                        })
                    ) : (
                        <div>No Pokemon Found</div>
                    )}
                </div>
            </div>

            <Modal
                title={modalTitle}
                centered
                visible={modalVisibility}
                onOk={onConfirmDelete}
                onCancel={onCancelDelete}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    );
};

export default MyPokemon;

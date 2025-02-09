import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles/individualRecipeStyles";

import { Swipeable } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {
    editInstruct,
    setCurrentActive,
    resetCurrentActive,
    deleteInstruction,
} from "../../store/singleRecipe/singleRecipeActions";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const IndividualRecipeInstruction = ({ instruction, index, currentActive }) => {
    const dispatch = useDispatch();

    const [editing, setEditing] = useState(false);
    const swipeableEl = useRef(null);

    const closeSwipe = () => swipeableEl.current.close();
    const closeEdit = () => setEditing(false);

    const makeActive = (type, close) => {
        dispatch(
            setCurrentActive({
                type,
                field: "instruction",
                index,
                close,
            }),
        );
    };

    const checkActive = () =>
        (currentActive.field && currentActive.field !== "instruction") ||
        (currentActive.field && currentActive.index !== index);

    const editHandler = () => {
        setEditing(true);
        closeSwipe();
        makeActive("edit", closeEdit);
    };

    const handleWillOpen = () => {
        if (checkActive()) currentActive.close();
        // dispatch(stopEdit());
    };

    const checkIfCurrentActiveIsAdd = () =>
        currentActive && currentActive.type === "add";

    return (
        <View style={styles.swipeableContainer}>
            <Swipeable
                ref={swipeableEl}
                onSwipeableWillOpen={handleWillOpen}
                onSwipeableOpen={() => makeActive("swipe", closeSwipe)}
                friction={checkIfCurrentActiveIsAdd() ? 10 : 1}
                renderRightActions={() => (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={editHandler}
                            style={styles.editButton}
                        >
                            <FontAwesome
                                name="pencil-square-o"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(deleteInstruction(index));
                                dispatch(resetCurrentActive());
                            }}
                            style={styles.deleteButton}
                        >
                            <FontAwesome
                                name="trash-o"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            >
                {editing ? (
                    <View style={styles.stepTextView}>
                        <View>
                            <Text style={{ marginBottom: -7 }}>
                                {instruction.step_number}.
                            </Text>
                        </View>
                        <TextInput
                            value={instruction.description}
                            onChangeText={description =>
                                dispatch(
                                    editInstruct(index, {
                                        step_number: instruction.step_number,
                                        description,
                                    }),
                                )
                            }
                            style={styles.instructionInput}
                            multiline
                            returnKeyType="done"
                            autoFocus={true}
                            enablesReturnKeyAutomatically={true}
                            onSubmitEditing={() => {
                                setEditing(false);
                                dispatch(resetCurrentActive());
                            }}
                        />
                    </View>
                ) : (
                    <View style={styles.stepTextView}>
                        <Text style={styles.stepText}>
                            {instruction.step_number}. {instruction.description}
                        </Text>
                        <MaterialCommunityIcons
                            name="drag-vertical"
                            size={32}
                            color="#2E2E2E"
                        />
                    </View>
                )}
            </Swipeable>
        </View>
    );
};

export default IndividualRecipeInstruction;

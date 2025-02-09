import React, { useState } from "react";
import {
    View,
    Modal,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableHighlight,
    Button,
} from "react-native";

const CommitModal = props => {
    const { modal, setModal, saveButtonEditedRecipe } = props;
    const [author_comment, setAuthor_comment] = useState();
    const [highlighted, setHighlighted] = useState(false);

    const saveModalHandler = () => {
        if (!author_comment) {
            setHighlighted(true);
        } else {
            saveButtonEditedRecipe(author_comment);
        }
    };

    const closeModalHandler = () => {
        setHighlighted(false);
        setModal({ save: false, cancel: false });
    };

    return (
        <View style={{ flexDirection: "row" }}>
            <Modal visible={modal.save} animationType="fade" transparent>
                <TouchableHighlight onPress={closeModalHandler}>
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: "rgba(50, 50, 50, 0.4)",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <KeyboardAvoidingView behavior={"position"}>
                            <View
                                style={{
                                    backgroundColor:
                                        "rgba(300, 300, 300, 0.95)",
                                    borderRadius: 10,
                                    padding: 15,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginHorizontal: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    Please leave a brief comment describing your
                                    recipe changes.
                                </Text>
                                <TextInput
                                    multiline
                                    onChangeText={text =>
                                        setAuthor_comment(text)
                                    }
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 20,
                                        minHeight: 40,
                                        maxWidth: "90%",
                                        width: "90%",
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        borderColor: highlighted
                                            ? "red"
                                            : "black",
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        width: "80%",
                                    }}
                                >
                                    <Button
                                        title="Cancel"
                                        onPress={closeModalHandler}
                                    />

                                    <Button
                                        title="OK"
                                        onPress={saveModalHandler}
                                    />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableHighlight>
            </Modal>
        </View>
    );
};

export default CommitModal;

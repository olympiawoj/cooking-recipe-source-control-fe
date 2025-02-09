import React from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import MinusDeleteButton from "./MinusDeleteButton";

const Instruction = ({ instruction, setRecipe, index, removeInstruction }) => {
    const handleChange = value => {
        setRecipe(oldRecipe => ({
            ...oldRecipe,
            instructions: oldRecipe.instructions.map((step, i) => {
                if (i === index) return value;
                else return step;
            }),
        }));
    };

    return (
        <View
            style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    flexGrow: 1,
                    flexDirection: "column",
                    maxWidth: "95%",
                }}
            >
                <Text style={{ marginLeft: 14, marginBottom: 5 }}>
                    Step {index + 1}
                </Text>
                <TextInput
                    style={{
                        maxWidth: "100%",
                        width: "100%",
                        padding: 10,
                        borderWidth: 0.8,
                        borderColor: "#363838",
                        borderRadius: 4,
                        minHeight: 40,
                    }}
                    placeholder=" Add Instructions"
                    multiline
                    onChangeText={handleChange}
                    value={instruction}
                />
            </View>
            {/* A remove button for the CreateRecipeForm */}
            <MinusDeleteButton
                action={() => removeInstruction(index)}
                parent="instruction"
            />
        </View>
    );
};

export default Instruction;

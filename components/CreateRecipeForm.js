import React, { useState } from "react";
import {
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles/createRecipeStyles";

import RecipeName from "./RecipeName";
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";
import TagButton from "./TagButton";
import Add from "./Add";
import Notes from "./Notes";

import DoneImg from "../assets/done_button.png";
import axiosWithAuth from "../utils/axiosWithAuth";
import { validateFields } from "../utils/helperFunctions/vaildateFields";

function CreateRecipeForm(props) {
    const initialFormState = {
        title: "",
        prep_time: "",
        cook_time: "",
        tags: [],
        ingredients: [{ name: "", quantity: "", units: "" }],
        instructions: [""],
        notes: [""],
    };

    const [recipe, setRecipe] = useState(initialFormState);
    let [errors, setErrors] = useState([]);

    const courses = [
        "Breakfast",
        "Brunch",
        "Lunch",
        "Dinner",
        "Dessert",
        "Snack",
    ];

    const postRecipe = async () => {
        const postRecipe = {
            ...recipe,
            // Remove any ingredients that are empty
            ingredients: recipe.ingredients.filter(
                ing => ing.name.length && ing.quantity.length && ing.units,
            ),
            instructions: recipe.instructions
                .filter(step => step.length) // Remove empty instructions
                .map((step, i) => ({
                    step_number: i + 1, // Add the step number
                    description: step.replace(/\n+/g, " "), // Remove any newlines
                })),
            notes: recipe.notes
                .filter(note => note.length) // Remove empty instructions
                .map(
                    (note, i) => note.replace(/\n+/g, " "), // Remove any newlines
                ),
            author_comment: "Original Recipe",
        };

        const errMessages = validateFields(postRecipe, courses);

        if (errMessages.length) {
            setErrors(errMessages);
            return; //if any missing fields exists, do not submit the data and set the errors state variable array.
        }

        try {
            const axiosCustom = await axiosWithAuth();
            const res = await axiosCustom.post("recipes", postRecipe);

            recipeID = res.data.id;
            setRecipe(initialFormState);
            props.navigation.navigate("IndividualR", { recipe, recipeID });
        } catch (err) {
            console.log("error from adding new recipe \n", err.response);
            if (err.response.status === 500) {
                serverErrorAlert();
            }
        }
    };

    const serverErrorAlert = () => {
        return Alert.alert(
            "Sorry",
            "There was an error when trying to create your recipe. Please try again.",
            [{ text: "Okay" }],
        );
    };

    const addIng = () => {
        const newIng = { name: "", quantity: "", units: "" };
        setRecipe(oldRecipe => ({
            ...oldRecipe,
            ingredients: [...oldRecipe.ingredients, newIng],
        }));
    };

    const addInstruction = () => {
        setRecipe(oldRecipe => ({
            ...oldRecipe,
            instructions: [...oldRecipe.instructions, ""],
        }));
    };

    const addNote = () => {
        setRecipe(oldRecipe => ({
            ...oldRecipe,
            notes: [...oldRecipe.notes, ""],
        }));
    };

    const removeNote = index => {
        setRecipe(oldRecipe => ({
            ...oldRecipe,
            notes: oldRecipe.notes.filter((val, i) => i !== index),
        }));
    };

    const removeIng = index => {
        setRecipe(oldRecipe => ({
            ...oldRecipe,
            ingredients: oldRecipe.ingredients.filter((val, i) => i !== index),
        }));
    };

    const removeInstruction = index => {
        setRecipe(oldRecipe => ({
            ...oldRecipe,
            instructions: oldRecipe.instructions.filter(
                (val, i) => i !== index,
            ),
        }));
    };

    const addIngredients = () => {
        return recipe.ingredients.map((ingredient, i) => (
            <Ingredient
                key={i}
                index={i}
                removeIng={removeIng}
                recipeIng={ingredient}
                recipe={recipe}
                setRecipe={setRecipe}
                parent="create"
            />
        ));
    };

    const addInstructions = () => {
        return recipe.instructions.map((instruction, i) => (
            <Instruction
                key={i}
                index={i}
                removeInstruction={removeInstruction}
                instruction={instruction}
                setRecipe={setRecipe}
            />
        ));
    };

    const addNotes = () => {
        return recipe.notes.map((note, i) => (
            <Notes
                key={i}
                index={i}
                removeNote={removeNote}
                note={note}
                setRecipe={setRecipe}
            />
        ));
    };

    return (
        <KeyboardAwareScrollView>
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <RecipeName
                                recipe={recipe}
                                setRecipe={setRecipe}
                                missing={errors.includes("title")}
                            />

                            <View style={styles.heading}>
                                <Text>Total Cook Time (minutes)</Text>
                                {errors.includes(
                                    "prep_time and/or cook_time",
                                ) && <Text style={styles.missing}>*</Text>}
                            </View>
                            <View style={styles.totalTimeView}>
                                <TextInput
                                    style={styles.totalTimeContainer}
                                    placeholder="Prep"
                                    keyboardType={"numeric"}
                                    onChangeText={min => {
                                        if (isNaN(Number(min))) return;
                                        setRecipe({
                                            ...recipe,
                                            prep_time: min,
                                        });
                                    }}
                                    value={String(recipe.prep_time)}
                                />
                                <TextInput
                                    style={styles.totalTimeContainer}
                                    placeholder="Cook"
                                    keyboardType={"numeric"}
                                    onChangeText={min => {
                                        if (isNaN(Number(min))) return;
                                        setRecipe({
                                            ...recipe,
                                            cook_time: min,
                                        });
                                    }}
                                    value={String(recipe.cook_time)}
                                />
                            </View>
                            <View style={styles.heading}>
                                <Text>Course Type</Text>
                                {errors.includes("tags") && (
                                    <Text style={styles.missing}>*</Text>
                                )}
                            </View>
                            <View style={styles.tagGroup}>
                                {courses.map((course, i) => (
                                    <TagButton
                                        key={i}
                                        tag={course}
                                        isSelected={recipe.tags.includes(
                                            course,
                                        )}
                                        setRecipe={setRecipe}
                                    />
                                ))}
                            </View>
                            <View style={styles.heading}>
                                <Text>Ingredients</Text>
                                {errors.includes("ingredients") && (
                                    <Text style={styles.missing}>*</Text>
                                )}
                            </View>
                            {addIngredients()}
                            <Add text="Add Ingredient" submit={addIng} />

                            <View style={styles.heading}>
                                <Text>Instructions</Text>
                                {errors.includes("instructions") && (
                                    <Text style={styles.missing}>*</Text>
                                )}
                            </View>
                            {addInstructions()}
                            <Add text="Add A Step" submit={addInstruction} />

                            <Text style={styles.heading}>Notes</Text>

                            {addNotes()}
                            <Add text="Add A Note" submit={addNote} />
                            {errors.length > 0 && (
                                <Text style={styles.errors}>
                                    * Please fill out all required fields.
                                </Text>
                            )}
                            <TouchableOpacity
                                style={styles.doneView}
                                onPress={postRecipe}
                            >
                                <Image
                                    source={DoneImg}
                                    style={styles.doneCreateBtn}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAwareScrollView>
    );
}
CreateRecipeForm.navigationOptions = {
    tabBarLabel: "create new recipe",
    headerTitle: "Create Recipe",
    headerTitleStyle: {
        fontSize: 22,
        color: "#42C200",
    },
};

export default CreateRecipeForm;

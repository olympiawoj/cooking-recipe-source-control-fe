import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    recipeContainer: {
        marginBottom: 200,
    },
    titleWrapper: {
        backgroundColor: "#8FCC70",
    },
    titleContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginRight: 3,
        paddingVertical: 3,
    },
    title: {
        fontSize: 24,
        color: "#363838",
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 12,
        marginLeft: 14,
    },
    icon: { width: 20, height: 20, marginRight: 5 },
    editIcon: {
        marginRight: 20,
    },
    innovatorContainer: {
        flexDirection: "row",
        marginRight: 10
    },
    timeContainer: {
        flexDirection: "row",
    },
    innovatorTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 30,
        paddingLeft: 14,
        borderBottomWidth: 0.3,
        borderBottomColor: "#6B6F70",
        paddingBottom: 10,
        marginBottom: 10,
    },
    likeView: {
        flexDirection: "row",
    },
    tags: {
        fontSize: 14,
        color: "#363838",
        fontWeight: "500",
        marginLeft: 13,
        marginBottom: 8,
    },
    individualTags: {
        fontSize: 14,
        color: "#363838",
        fontWeight: "500",
    },
    tagBox: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        paddingBottom: 16.5,
        marginLeft: 14,
        marginRight: 14,
    },
    ingredients: {
        alignItems: "center",
        flexDirection: "row",
    },
    tabsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    showTab: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#047396",
        paddingLeft: "16.5%",
        paddingRight: "16.5%",
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    hideTab: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        paddingLeft: "16.5%",
        paddingRight: "16.5%",
        color: "#047396",
        fontWeight: "bold",
        shadowColor: "grey",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 5,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    tabTextWhite: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    tabTextBlue: {
        textAlign: "center",
        color: "#047396",
        fontWeight: "bold",
    },
    recipeDetails: {
        alignItems: "center",
    },
    titlesViewBorderIng: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#047396",
        paddingLeft: "16.5%",
        paddingRight: "16.5%",
    },
    titlesViewBorderIngOff: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        paddingLeft: "16.5%",
        paddingRight: "16.5%",
    },
    titlesViewBorderInst: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: "16.5%",
        paddingRight: "16.5%",
    },
    titlesViewBorderInstOn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: "16.5%",
        paddingRight: "16.5%",
        backgroundColor: "#047396",
    },
    ingredientList: {
        backgroundColor: "#F4F8FA",
        paddingTop: 9,
        paddingBottom: 9,
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        paddingRight: 10,
        marginLeft: 14,
        marginRight: 14,
    },
    ingredientText: {
        color: "#1E1F20",
        fontSize: 16,
    },
    ingredientView: {
        width: "50%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    stepText: {
        color: "#1E1F20",
        width: "90%",
        fontSize: 16,
    },

    stepTextView: {
        backgroundColor: "#F4F8FA",
        width: "90%",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 14,
        marginRight: 14,
        flexDirection: "row",
        alignItems: "center",
    },
    details: {
        alignItems: "center",
    },
    notes: {
        // marginLeft: 14,
        fontSize: 14,
        fontWeight: "500",
    },
    hidden: {
        display: "none",
    },
    image: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
        flexDirection: "row",
    },
    imageContainer: {
        borderRadius: 5
    },
    editButton: {
        backgroundColor: "#8FCC70",
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        width: 35,
        height: 35,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    deleteButton: {
        backgroundColor: "#C00000",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: 35,
        height: 35,
        margin: 10,
        marginLeft: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8FCC70",
        width: 25,
    },
    editIcons: {
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: 150,
        height: "100%",
        marginRight: 16,
    },
    input: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "30%",
        height: "100%",
    },
    ingredientContainer: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    swipeableContainer: {
        width: "95%",
    },
    instructionInput: {
        width: "90%",
        fontSize: 16,
        marginLeft: 5,
    },
    swipeable: {
        flexDirection: "row",
    },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

module.exports = styles;

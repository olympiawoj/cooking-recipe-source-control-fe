import * as actions from "../../../store/singleRecipe/singleRecipeActions";
import axiosWithAuth from "../../../utils/axiosWithAuth";
jest.mock("../../../utils/axiosWithAuth");

beforeEach(() => {
    jest.resetAllMocks();
});

test("axiosWithAuth is mocked", () => {
    // Test to make sure we can mock our axiosWithAuth
    //     function to return an object with a get method
    axiosWithAuth.mockImplementation(() => {
        return {
            get: () => ({}),
        };
    });
    const test = axiosWithAuth();
    expect(typeof test).toBe("object");
    expect(typeof test.get).toBe("function");
    expect(test.get()).toEqual({});
});

describe("startEdit action creator", () => {
    test("Calling function returns START_EDIT type", () => {
        const returnObj = actions.startEdit();

        expect(returnObj).toEqual({ type: actions.START_EDIT });
    });
});

describe("resetRecipe action creator", () => {
    test("Calling function returns RESET_RECIPE type", () => {
        const returnObj = actions.resetRecipe();

        expect(returnObj).toEqual({ type: actions.RESET_RECIPE });
    });
});

describe("fetchRecipe action creator", () => {
    test("dispatches START_FETCH_RECIPE", () => {
        axiosWithAuth.mockImplementation(() => {
            return {
                get: () => ({}),
            };
        });
        // Turn dispatch into a simple jest function.
        // This means that we won't dash to our reducer, and
        //     we can instead check for our dispatch
        //     "toHaveBeenCalledWith" the correct action.
        const dispatch = jest.fn();
        actions.fetchRecipe()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            type: actions.START_FETCH_RECIPE,
        });
    });

    test("dispatches FETCH_RECIPE_SUCCESS upon a successful request", async () => {
        const dispatch = jest.fn();

        // Our test responseData, and our mocked axios.get() function
        const responseData = [{ title: "testRecipe" }];
        axiosWithAuth.mockImplementation(() => {
            return {
                get: () => ({ data: responseData }),
            };
        });

        await actions.fetchRecipe()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.START_FETCH_RECIPE,
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.FETCH_RECIPE_SUCCESS,
            payload: responseData,
        });
    });

    test("dispatches FETCH_RECIPE_FAILURE upon an unsuccessful request", async () => {
        const dispatch = jest.fn();

        // Our test responseData, and our mocked axios.get() function
        const errorMessage = "testError";
        axiosWithAuth.mockImplementation(() => {
            return {
                get: () => {
                    throw errorMessage;
                },
            };
        });

        await actions.fetchRecipe()(dispatch);

        // expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.START_FETCH_RECIPE,
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.FETCH_RECIPE_FAILURE,
            payload: errorMessage,
        });
    });
});

describe("saveNewRecipe action creator", () => {
    test("dispatches START_SAVE_NEW_RECIPE", () => {
        axiosWithAuth.mockImplementation(() => {
            return {
                post: () => ({}),
            };
        });
        // Turn dispatch into a simple jest function.
        // This means that we won't dash to our reducer, and
        //     we can instead check for our dispatch
        //     "toHaveBeenCalledWith" the correct action '' '
        const dispatch = jest.fn();
        actions.saveNewRecipe()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            type: actions.START_SAVE_NEW_RECIPE,
        });
    });

    test("dispatches SAVE_NEW_RECIPE_SUCCESS upon a successful request", async () => {
        const dispatch = jest.fn();

        // Our test responseData, and our mocked axios.post() function
        axiosWithAuth.mockImplementation(() => {
            return {
                post: () => ({}),
            };
        });

        await actions.saveNewRecipe()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.START_SAVE_NEW_RECIPE,
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.SAVE_NEW_RECIPE_SUCCESS,
        });
    });

    test("dispatches SAVE_NEW_RECIPE_FAILURE upon an unsuccessful request", async () => {
        const dispatch = jest.fn();

        // Our test responseData, and our mocked axios.post() function
        const errorMessage = "testError";
        axiosWithAuth.mockImplementation(() => {
            return {
                post: () => {
                    throw errorMessage;
                },
            };
        });

        await actions.saveNewRecipe()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.START_SAVE_NEW_RECIPE,
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: actions.SAVE_NEW_RECIPE_FAILURE,
            payload: errorMessage,
        });
    });
});

describe("editTitle action creator", () => {
    test("dispatches object with input value", () => {
        const input = "Charlie horse";
        const expectedDispatch = {
            type: actions.EDIT_TITLE,
            payload: input,
        };
        const dispatch = jest.fn();

        actions.editTitle(input)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(expectedDispatch);
    });
    test.skip("dispatches stopEdit() function when last character of the input is '\\n'", () => {
        const input = "Charlie horse\n";
        const dispatch = jest.fn(cb => cb.toString());

        actions.editTitle(input)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        // expect(stopEditSpy).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(actions.stopEdit());
    });
});

describe("editIngred action creator", () => {
    test("dispatches object with index and input value", () => {
        const input = { name: "v = dx/dt" };
        const index = 2;
        const expectedDispatch = {
            type: actions.EDIT_INGRED,
            payload: input,
            index,
        };
        const dispatch = jest.fn();

        actions.editIngred(2, input)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(expectedDispatch);
    });
    test.todo(
        "dispatches stopEdit() function when last character of the input is '\\n'",
    );
});

describe("editInstruct action creator", () => {
    test("dispatches object with index and input value", () => {
        const input = { body: "F=m*a" };
        const index = 2;
        const expectedDispatch = {
            type: actions.EDIT_INSTRUCT,
            payload: input,
            index,
        };
        const dispatch = jest.fn();

        actions.editInstruct(2, input)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(expectedDispatch);
    });
    test.todo(
        "dispatches stopEdit() function when last character of the input is '\\n'",
    );
});

describe("editNotes action creator", () => {
    test("dispatches object with index and input value", () => {
        const input = "test notes";
        const index = 2;
        const expectedDispatch = {
            type: actions.EDIT_NOTES,
            notes: input,
        };
        const dispatch = jest.fn();

        actions.editNotes(input)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(expectedDispatch);
    });
    test.todo(
        "dispatches stopEdit() function when last character of the input is '\\n'",
    );
});

describe("stopEdit action creator", () => {
    test("dispatches STOP_EDIT, UPDATE_RECIPE_START, and UPDATE_RECIPE_SUCCESS with a successful request", async () => {
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({ singleRecipe: { recipe: null } }));
        axiosWithAuth.mockImplementation(() => {
            return {
                put: () => ({ data: "testResponse" }),
            };
        });
        const expectedDispatchStopEdit = { type: actions.STOP_EDIT };
        const expectedDispatchStartUpdate = {
            type: actions.START_UPDATE_RECIPE,
        };
        const expectedDispatchUpdateSuccess = {
            type: actions.UPDATE_RECIPE_SUCCESS,
            payload: "testResponse",
        };
        await actions.stopEdit()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(expectedDispatchStopEdit);
        expect(dispatch).toHaveBeenCalledWith(expectedDispatchStartUpdate);
        expect(dispatch).toHaveBeenCalledWith(expectedDispatchUpdateSuccess);
    });
    test("dispatches UPDATE_RECIPE_FAILURE with the old recipe from the database when a request fails", async () => {
        // Mock dispatch and getState
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({ singleRecipe: { recipe: null } }));

        // When throwing an error, if a recipe is returned from the database
        //     we need to make sure it is sent with the action.
        const expectedRecipe = {
            title: "Tango",
            steps: [{ name: "Cash" }, { name: "randall" }],
        };
        const testError = {
            response: { data: { currentRecipe: expectedRecipe } },
        };
        axiosWithAuth.mockImplementation(() => {
            return {
                put: () => {
                    throw testError;
                },
            };
        });

        // Expected objects that will be dispatched
        const expectedDispatchStartUpdate = {
            type: actions.START_UPDATE_RECIPE,
        };
        const expectedDispatchUpdateFailure = {
            type: actions.UPDATE_RECIPE_FAILURE,
            payload: testError,
            recipe: expectedRecipe,
        };
        await actions.stopEdit()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(expectedDispatchStartUpdate);
        expect(dispatch).toHaveBeenCalledWith(expectedDispatchUpdateFailure);
    });
    test("dispatches a simple UPDATE_RECIPE_FAILURE if the database returns no recipe when a request fails", async () => {
        // Mock dispatch and getState
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({ singleRecipe: { recipe: null } }));

        // This testError has no currentRecipe property, so we should
        //     dispatch a simpler UPDATE_RECIPE_FAILURE action object
        const testError = { response: { data: {} } };
        axiosWithAuth.mockImplementation(() => {
            return {
                put: () => {
                    throw testError;
                },
            };
        });

        // Expected objects that will be dispatched
        const expectedDispatchStartUpdate = {
            type: actions.START_UPDATE_RECIPE,
        };
        const expectedDispatchUpdateFailure = {
            type: actions.UPDATE_RECIPE_FAILURE,
            payload: testError,
        };
        await actions.stopEdit()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(expectedDispatchStartUpdate);
        expect(dispatch).toHaveBeenCalledWith(expectedDispatchUpdateFailure);
    });
    test.skip("does not call the put method multiple times", () => {
        expect.assertions(4);
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({ singleRecipe: { recipe: null } }));
        axiosWithAuth.mockImplementation(() => {
            return {
                put: () =>
                    new Promise(res => {
                        setTimeout(() => ({ data: "testResponse" }), 500);
                    }),
            };
        });
        const expectedDispatchStartUpdate = {
            type: actions.START_UPDATE_RECIPE,
        };
        const expectedDispatchUpdateSuccess = {
            type: actions.UPDATE_RECIPE_SUCCESS,
            payload: "testResponse",
        };

        // The goal:
        // The first actions.stopEdit() call should dispatch all three objects.
        // The second and third calls should dispatch STOP_EDIT, but should not
        //     dispatch the other actions because the first action is still working.
        // The issue:
        // We need to wait until the first function finishes before running our assertions,
        //     but right now, jest is finishing the test before the first call finishes.
        Promise.all([
            actions.stopEdit()(dispatch, getState),
            actions.stopEdit()(dispatch, getState),
            actions.stopEdit()(dispatch, getState),
        ]).then(res => {
            console.log(res);
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith(expectedDispatchStartUpdate);
            expect(dispatch).toHaveBeenCalledWith(
                expectedDispatchUpdateSuccess,
            );
            done();
        });
    });
});

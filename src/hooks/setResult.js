import { postServerData } from '../helper/helper';
import * as Action from '../redux/result_reducer';

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.log(error);
    }
};

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error);
    }
};

/** insert user data */
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;

    if (Array.isArray(result) && result.length > 0 && username) {
        (async () => {
            try {
                await postServerData(`http://localhost:8080/api/result`, resultData, data => {
                    console.log('Result published successfully:', data);
                });
            } catch (error) {
                console.log('Error publishing result:', error);
            }
        })();
    } else {
        console.log("Invalid result data or username not provided");
    }
};

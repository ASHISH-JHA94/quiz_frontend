import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";

/** redux actions */
import * as Action from '../redux/question_reducer';

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            setGetData(prev => ({ ...prev, isLoading: true }));
            try {
                const [{ questions, answers }] = await getServerData(`https://quiz-backend-alpha-inky.vercel.app/api/questions`, (data) => data);

                if (questions.length > 0) {
                    setGetData({ isLoading: false, apiData: questions, serverError: null });

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question: questions, answers }));
                } else {
                    throw new Error("No Questions Available");
                }
            } catch (error) {
                setGetData({ isLoading: false, apiData: [], serverError: error.message });
            }
        };

        fetchData();
    }, [dispatch]);

    return [getData, setGetData];
};

/** MoveNextQuestion Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.error(error);
    }
};

/** MovePrevQuestion Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.error(error);
    }
};

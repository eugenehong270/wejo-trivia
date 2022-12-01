import React from 'react'
import { useGetTriviaQuestionsQuery, useGetTokenQuery } from '../store/api';
import Button from "@mui/material/Button";
import parse from "html-react-parser";

const TriviaPlay = ({ category, queryDifficulty }) => {
    const { data: tokenData } = useGetTokenQuery();
    const { data: questionData, isLoading } = useGetTriviaQuestionsQuery({ category, difficulty: queryDifficulty });
    console.log(isLoading)
    if (isLoading) {
        return null
    }
    console.log(questionData);
    return (
        <div className="container">
            <Button className="font_large" variant="contained">
                {" "}
                {/* {parse(question)}{" "} */}
            </Button>
            <div className="div_possible_answers">
                {/* {possibleAnswers.map((ans, idx) => {
                    // for answer in response_answer make button
                    return (
                        <div className="possbile_answer_div" key={btoa(ans) + idx}>
                            <Button
                                className="possbile_answer font_large"
                                onClick={() => onSelectAnswer(idx, ans)}
                                id={idx}
                                variant="contained"
                                keyprop={idx}
                            >
                                {" "}
                                {parse(ans)}{" "}
                            </Button>
                        </div>
                    );
                })} */}
            </div>
        </div>
    )
}

export default TriviaPlay

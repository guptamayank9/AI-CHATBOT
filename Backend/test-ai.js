const { getAIResponse } =
    require("./src/services/ai.service");

const test = async () => {

    const response =
        await getAIResponse("What is React in simple words?");

    console.log("\nAI RESPONSE:\n");
    console.log(response);
};

test();
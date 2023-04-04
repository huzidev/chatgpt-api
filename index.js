const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");


const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const configuration = new Configuration({
    apiKey: dotenv.parsed.API_KEY
})
const openai = new OpenAIApi(configuration);
// runs the func to take input
userInterface.prompt();

let promptAPI;
userInterface.on("line", async input => {
    promptAPI = input
    const apiRes = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: promptAPI }
        ]
    })
    console.log("GPT:", apiRes.data.choices[0].message.content);
})

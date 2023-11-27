import { useState } from 'react';
import { Configuration, OpenAIApi } from 'your-openai-library'; // Replace 'your-openai-library' with the actual library you are using

const constPrompt = 'You: ';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openia = new OpenAIApi(configuration);

const Main = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInput = async () => {
    try {
      const userInput = constPrompt + input;
      const response = await openia.createCompletion({
        model: "text-davinci-003",
        prompt: `You: ${userInput}\nAI: `,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5, // Corrected typo in frequency_penalty
        presence_penalty: 0.0,
        stop: ["You:"], // Corrected stop condition

      });
      setOutput(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    } finally {
      setInput(''); // Clear input after processing
    }
  };

  return (
    <div>
      {/* Your JSX for rendering the component */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleInput}>Submit</button>
      <div>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default Main;
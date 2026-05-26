import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const processTask = inngest.createFunction(
  {
    id: "process-task",
    triggers: [{ event: "agent/hello" }],
  },
  async ({ event }) => {
    const helloAgent = createAgent({
      name: "hello-agent",
      description: "A simple agent that says hello",
      system: "You are a very helpful assistant. Always greet with enthusiasm",
      model: gemini({
        model: "gemini-2.5-flash",
        apiKey: process.env.GOOGLE_API_KEY,
      }),
    });

    const { output } = await helloAgent.run("Say hello to user");

    return {
     message:output[0].content,
    };
  }
);
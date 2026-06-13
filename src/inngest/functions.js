import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import Sandbox from "@e2b/code-interpreter";
import { step } from "inngest";

export const processTask = inngest.createFunction(
  {
    id: "process-task",
    triggers: [{ event: "agent/hello" }],
  },
  async ({ event }) => {

    const sandboxId=await step.run("get-sandbox-id",async()=>{
      const sandbox=await Sandbox.create("wk66qshc2qf8t1tueqz1")
      return sandbox.sandboxId
    })

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


    const sandboxUrl=await step.run("get-sandbox-url",async()=>{
      const sandbox=await Sandbox.connect(sandboxId);
      const host=sandbox.getHost(3000);
      return `http://${host}`
    })
    return {
     message:output[0].content,
    };
  }
);
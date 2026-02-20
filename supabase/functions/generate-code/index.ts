import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// The API key should be set in Supabase secrets. 
// For local development with 'supabase start', it can be in supabase/functions/.env
const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set in environment variables");
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY is not configured. Please set it in Supabase secrets." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    console.log(`Generating code for prompt: ${prompt.substring(0, 50)}...`);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content: `You are an expert React developer. Generate a single-file React component based on the user's request. 
            Return ONLY a JSON object with the following structure:
            {
              "jsx": "the react component code as a string",
              "css": "any custom css as a string",
              "html": "a simple html template"
            }
            
            Guidelines:
            - Use Tailwind CSS classes for styling whenever possible.
            - The JSX should be a complete functional component.
            - Do not include imports like 'import React from "react"' as they are handled by the previewer.
            - Ensure the code is clean and functional.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 1,
        max_completion_tokens: 65536,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      throw new Error(errorData.error?.message || `Groq API returned status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0 || !data.choices[0].message.content) {
      console.error("Unexpected Groq API response structure:", data);
      throw new Error("Invalid response from Groq API");
    }

    const content = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Function error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errMsg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

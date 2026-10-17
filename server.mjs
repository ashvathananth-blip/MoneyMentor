
import express from "express";
import "dotenv/config";

const app = express();
const PORT = 3001;

// Allow JSON requests from the frontend.
app.use(express.json({ limit: "10kb" }));

// Trusted websites for future source-grounded research.
// These are NOT searched automatically yet.
const approvedDomains = [
  "consumerfinance.gov",
  "studentaid.gov",
  "irs.gov",
  "investor.gov",
  "fdic.gov"
];

// Check that the API key exists without displaying it.
console.log(
  "Groq API key detected:",
  Boolean(process.env.XAI_Grok_API)
);

// Accept a question from MoneyMentor.
app.post("/api/ask", async (req, res) => {
  const question = req.body?.question;

  // Step 1: Validate the question.
  if (
    typeof question !== "string" ||
    !question.trim() ||
    question.length > 1000
  ) {
    return res.status(400).json({
      error: "Enter a question under 1,000 characters."
    });
  }

  // Step 2: Check for the API key.
  if (!process.env.XAI_Grok_API) {
    return res.status(500).json({
      error: "Missing Groq API key."
    });
  }

  try {
    // Step 3: Send the question to Groq Cloud.
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.XAI_Grok_API}`
        },

        body: JSON.stringify({
          model: "openai/gpt-oss-120b",

          messages: [
            {
              role: "system",
              content: `
                You are MoneyMentor, an AI financial
                education assistant for teenagers.

                Your job is to explain financial
                concepts, opportunities, and risks
                in a clear and understandable way.

                Focus on these subjects:

                - College financial aid
                - FAFSA and scholarships
                - Student loans
                - Credit building
                - Banking and savings
                - Investing and Roth IRAs
                - Employment and taxes
                - Financial mistakes and hidden fees

                Explain important restrictions,
                eligibility conditions, risks,
                and exceptions.

                Help students learn how to make
                informed decisions independently.

                Never fabricate sources, citations,
                financial rules, or statistics.

                Do not claim to have researched
                or verified information unless
                evidence was provided.

                Do not request Social Security
                numbers, passwords, or bank details.

                If information is uncertain,
                explain the uncertainty.

                Encourage students to check
                official financial resources
                for current information.

                Keep responses educational,
                understandable, and practical.
              `
            },
            {
              role: "user",
              content: question.trim()
            }
          ],

          temperature: 0.3,
          max_completion_tokens: 900
        })
      }
    );

    // Step 4: Handle Groq API errors.
    if (!response.ok) {
      const errorData = await response.json()
        .catch(() => ({}));

      console.error(
        "Groq HTTP status:",
        response.status
      );

      console.error(
        "Groq error:",
        errorData.error?.message || "Unknown error"
      );

      return res.status(502).json({
        error: "Groq request failed.",
        status: response.status
      });
    }

    // Step 5: Read Groq's response.
    const data = await response.json();

    const answer =
      data.choices?.[0]?.message?.content?.trim() || "";

    if (!answer) {
      return res.status(502).json({
        error: "Groq returned an empty answer."
      });
    }

    // Step 6: Return the answer to MoneyMentor.
    // Verified-source retrieval is not connected yet.
    return res.json({
      answer: answer,
      sources: [],
      verified: false
    });

  } catch (error) {
    console.error(
      "Groq connection error:",
      error.message
    );

    return res.status(500).json({
      error: "Unable to contact Groq."
    });
  }
});

// Start the local backend server.
app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `MoneyMentor Groq API running on port ${PORT}`
  );
});


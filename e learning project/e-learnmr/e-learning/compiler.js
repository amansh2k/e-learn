document.getElementById("run-btn").addEventListener("click", async () => {
  const source = document.getElementById("source").value;
  const language_id = document.getElementById("language").value;
  const outputBox = document.getElementById("output");
  outputBox.textContent = "⏳ Running your code...";

  try {
    const response = await fetch("/.netlify/functions/run-judge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source_code: source, language_id }),
    });

    const data = await response.json();

    if (data.stdout) {
      outputBox.textContent = data.stdout;
    } else if (data.stderr) {
      outputBox.textContent = "⚠️ Error:\n" + data.stderr;
    } else {
      outputBox.textContent = "❌ " + (data.message || "Unknown error");
    }
  } catch (err) {
    outputBox.textContent = "💥 Failed to connect to backend.\n" + err.message;
  }
});

const clipboardTerms = [
  "clipboard.writeText",
  "clipboard.write",
  "ClipboardItem",
  "execCommand"
];


const detectedTerms = clipboardTerms.filter(term => document.documentElement.innerHTML.includes(term));

if (detectedTerms.length > 0) {
  const commandsText = detectedTerms.join(", ");
  const warningText = `⚠️ Clipboard-related command(s) detected: ${commandsText}.\nThis could indicate a clickfix or fakecaptcha attack!`;

  (function showBanner(text) {
    const banner = document.createElement("div");
    banner.textContent = text;
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.right = "0";
    banner.style.backgroundColor = "#d32f2f";
    banner.style.color = "#fff";
    banner.style.fontSize = "18px";
    banner.style.fontWeight = "bold";
    banner.style.zIndex = "99999";
    banner.style.textAlign = "center";
    banner.style.padding = "12px";
    banner.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
    banner.style.fontFamily = "sans-serif";
    banner.style.whiteSpace = "pre-line";
    document.body.appendChild(banner);

   
    setTimeout(() => banner.remove(), 12000);
  })(warningText);

  // Send a message to the background script with the details
  browser.runtime.sendMessage({
    found: true,
    commands: commandsText,
    warning: "This could indicate a clickfix or fakecaptcha attack!"
  });
}
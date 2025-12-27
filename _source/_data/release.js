const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  try {
    let json = await Cache("https://api.github.com/repos/hotwired/turbo/releases/latest", {
      duration: "1d",
      type: "json"
    });

    return {
      url: json.html_url,
      tag_name: json.tag_name.replace('v', ''),
      created_at: json.created_at
    };
  } catch (error) {
    // Fallback when GitHub API is unavailable
    console.log("Warning: Could not fetch release info from GitHub, using fallback values");
    return {
      url: "https://github.com/hotwired/turbo/releases/latest",
      tag_name: "8.0.0",
      created_at: "2024-01-01T00:00:00Z"
    };
  }
};

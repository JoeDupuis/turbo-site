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
    return {
      url: "https://github.com/hotwired/turbo/releases/latest",
      tag_name: "8.0.12",
      created_at: "2024-11-22T00:00:00Z"
    };
  }
};

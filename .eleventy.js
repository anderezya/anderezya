const { DateTime } = require("luxon");
const { execSync } = require("child_process");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const md = markdownIt({ html: true })
  .use(require("markdown-it-anchor"))
  .use(require("markdown-it-attrs"))
  .use(require("markdown-it-task-lists"));
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
  eleventyConfig.addPassthroughCopy("external");
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc+07:00" }).toFormat(
      "yyyy-LL-dd"
    );
  });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.on("eleventy.after", () => {
    execSync(`npx pagefind --site build --glob \"**/*.html\"`, {
      encoding: "utf-8",
    });
  });

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};

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
  eleventyConfig.addFilter("noYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc+07:00" })
      .setLocale("id")
      .toFormat("LLLL dd, EEEE");
  });

  // Credit: https://github.com/11ty/eleventy/issues/1284#issuecomment-1026679407
  eleventyConfig.addCollection("postsByYear", (collection) => {
    const posts = collection.getFilteredByTag("postingan").reverse();
    const years = posts.map((post) => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];

    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(
        (post) => post.date.getFullYear() === year
      );

      return [...prev, [year, filteredPosts]];
    }, []);

    return postsByYear;
  });

  eleventyConfig.addCollection("articleByYear", (collection) => {
    const posts = collection.getFilteredByTag("artikel").reverse();
    const years = posts.map((post) => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];

    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(
        (post) => post.date.getFullYear() === year
      );

      return [...prev, [year, filteredPosts]];
    }, []);

    return postsByYear;
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

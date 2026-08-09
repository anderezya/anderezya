const { DateTime } = require("luxon");
const { execSync } = require("child_process");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const md = markdownIt({ html: true })
  .use(require("markdown-it-anchor"))
  .use(require("markdown-it-attrs"))
  .use(require("markdown-it-task-lists"));
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

/* 
Group By Year Function
Origin: https://github.com/11ty/eleventy/issues/1284#issuecomment-1026679407
By: Budi Irawan(@deerawan) 
*/
function groupByYear(collection, Tags) {
  const posts = collection.getFilteredByTag(Tags).reverse();
  const years = posts.map((post) => post.date.getFullYear());
  const uniqueYears = [...new Set(years)];

  const postsByYear = uniqueYears.reduce((prev, year) => {
    const filteredPosts = posts.filter(
      (post) => post.date.getFullYear() === year,
    );

    return [...prev, [year, filteredPosts]];
  }, []);

  return postsByYear;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
  eleventyConfig.addPassthroughCopy("external");
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h1", "h2", "h3"],
    wrapper: "div",
    ul: true,
    flat: false,
  });
  eleventyConfig.addFilter("customFormat", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc+07:00" }).toFormat(
      " DD hh:mm:ss | cccc | 'Day' o 'of' yyyy",
    );
  });
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc+07:00" }).toFormat(
      "yyyy-M-dd",
    );
  });
  
  eleventyConfig.addFilter("noYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc+07:00" })
      .setLocale("id")
      .toFormat("LLLL dd, EEEE");
  });

  eleventyConfig.addCollection("postsByYear", (collection) =>
    groupByYear(collection, "postingan"),
  );

  eleventyConfig.addCollection("articlesByYear", (collection) =>
    groupByYear(collection, "artikel"),
  );

  eleventyConfig.addCollection("jurnalByYear", (collection) =>
    groupByYear(collection, "jurnal"),
  );

  eleventyConfig.addLayoutAlias("layouts/postingan.njk", "layouts/konten.njk");

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", 
    outputPath: "/feed.xml",
    collection: {
      name: "postingan",
      limit: 10,    
    },
    metadata: {
      language: "id",
      title: "Kabar Ander",
      subtitle: "Postingan terbaru dari Anderezya.",
      base: "https://anderezya.pages.dev/",
      author: {
        name: "Anderezya",
        email: "alexander.dividers762@passinbox.com ", 
      }
    }
  });

  eleventyConfig.on("eleventy.after", () => {
    execSync(`npx pagefind --site build --glob \"**/*.html\"`, {
      encoding: "utf-8",
    });
  });

  return {
    dir: {
      input: "src",
      data: "_data",
      output: "build",
    },
    serverOptions: {
      host: "0.0.0.0",
    },
  };
};

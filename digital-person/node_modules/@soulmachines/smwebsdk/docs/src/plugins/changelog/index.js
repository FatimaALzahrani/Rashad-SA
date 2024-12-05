/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs-extra');
const pluginContentBlog = require('@docusaurus/plugin-content-blog');
const {aliasedSitePath, docuHash, normalizeUrl} = require('@docusaurus/utils');

/**
 * Multiple versions may be published on the same day, causing the order to be
 * the reverse. Therefore, our publish time has a "fake hour" to order them.
 */
const publishTimes = new Set();

/**
 * @param {string} section
 */
function processSection(section) {
  const title = section
    .match(/^# .*/m)?.[0]
    .replace('# ', '')
    .trim();
  if (!title) {
    return null;
  }
  const content = section
    .replace(/^# .*/m, '')
    .replace(/ \(\[.*$/gm, '')
    .trim();
    
  const date = title.match(/ \((?<date>.*)\)/)?.groups.date;
  publishTimes.add(`${date}`);
  const version=title.match(/\[(?<version>[^[\]]+)\]/)?.groups.version;

  return {
    title: version,
    content: `---
date: ${`${date}`}
---

# ${version}

<!-- truncate -->

${content.replace(/###/g, '##')}`,
  };
}

/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin}
 */
async function ChangelogPlugin(context, options) {
  const generateDir = path.join(__dirname, '../../../changelog/source');
  const blogPlugin = await pluginContentBlog.default(context, {
    ...options,
    path: generateDir,
    id: 'changelog',
    blogListComponent: '@theme/ChangelogList',
    blogPostComponent: '@theme/ChangelogPage',
  });
  const changelogPath = path.join(__dirname, '../../../../CHANGELOG.md');
  return {
    ...blogPlugin,
    name: 'changelog-plugin',
    async loadContent() {
      const fileContent = await fs.readFile(changelogPath, 'utf-8');
      const sections = fileContent
        .split(/(?=^# )/m)
        .map(processSection)
        .filter(Boolean);
      await Promise.all(
        sections.map((section) =>
          fs.outputFile(
            path.join(generateDir, `${section.title}.md`),
            section.content,
          ),
        ),
      );
      const content = await blogPlugin.loadContent();
      content.blogPosts.forEach((post, index) => {
        const pageIndex = Math.floor(index / options.postsPerPage);
        post.metadata.listPageLink = normalizeUrl([
          context.baseUrl,
          options.routeBasePath,
          pageIndex === 0 ? '/' : `/page/${pageIndex + 1}`,
        ]);
      });
      return content;
    },
    configureWebpack(...args) {
      const config = blogPlugin.configureWebpack(...args);
      const pluginDataDirRoot = path.join(
        context.generatedFilesDir,
        'changelog-plugin',
        'default',
      );
      // Redirect the metadata path to our folder
      config.module.rules[0].use[1].options.metadataPath = (mdxPath) => {
        // Note that metadataPath must be the same/in-sync as
        // the path from createData for each MDX.
        const aliasedPath = aliasedSitePath(mdxPath, context.siteDir);
        return path.join(pluginDataDirRoot, `${docuHash(aliasedPath)}.json`);
      };
      return config;
    },
    getThemePath() {
      return './theme';
    },
    getPathsToWatch() {
      // Don't watch the generated dir
      return [changelogPath];
    },
  };
}

ChangelogPlugin.validateOptions = pluginContentBlog.validateOptions;

module.exports = ChangelogPlugin;

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// 替代shelljs的函数
const cd = (dir) => {
  const absolutePath = resolve(projectRoot, dir);
  echo(`Changing directory to: ${absolutePath}`);
  process.chdir(absolutePath);
};
const exec = (cmd) => {
  echo(`Executing: ${cmd}`);
  return execSync(cmd, { stdio: 'inherit' });
};
const echo = (msg) => console.log(msg);
const touch = (file) => {
  echo(`Creating file: ${file}`);
  writeFileSync(file, '');
};

let repoUrl;
let pkg = JSON.parse(readFileSync("package.json", "utf-8"));
if (typeof pkg.repository === "object") {
  if (!pkg.repository.hasOwnProperty("url")) {
    throw new Error("URL does not exist in repository section");
  }
  repoUrl = pkg.repository.url;
} else {
  repoUrl = pkg.repository;
}

// Use modern URL API instead of deprecated url.parse
let parsedUrl = new URL(repoUrl);
let repository = parsedUrl.host + parsedUrl.pathname;
let ghToken = process.env.GH_TOKEN;

echo(`Repository URL: ${repoUrl}`);
echo(`Parsed repository: ${repository}`);
echo(`GH_TOKEN exists: ${Boolean(ghToken)}`);
echo("Building docs...");
exec("pnpm run docs:build"); // Add build command
echo("Deploying built docs!!!");

// 检查构建目录是否存在
const distPath = "docs/.vitepress/dist";
const absoluteDistPath = resolve(projectRoot, distPath);
echo(`Checking if build directory exists: ${absoluteDistPath}`);

if (!existsSync(absoluteDistPath)) {
  echo(`Error: Build directory '${absoluteDistPath}' not found.`);
  echo("Checking for other possible build directories...");
  
  // 列出可能的构建目录
  const possibleDirs = [
    "docs/dist",
    "docs/.vitepress/dist",
    "dist",
    ".vitepress/dist"
  ];
  
  let foundDir = null;
  for (const dir of possibleDirs) {
    const absoluteDir = resolve(projectRoot, dir);
    echo(`Checking: ${absoluteDir}`);
    if (existsSync(absoluteDir)) {
      echo(`Found alternative build directory: ${absoluteDir}`);
      foundDir = dir;
      break;
    }
  }
  
  if (foundDir) {
    echo(`Using ${foundDir} as build directory.`);
    cd(foundDir);
  } else {
    echo("No build directory found. Creating it...");
    mkdirSync(absoluteDistPath, { recursive: true });
    cd(distPath);
  }
} else {
  echo(`Build directory found: ${absoluteDistPath}`);
  cd(distPath);
}
cd("docs/.vitepress/dist"); // Change to build output directory
touch(".nojekyll");
exec("git init");
exec("git add .");
exec('git config user.name "LoadChange"');
exec('git config user.email "soocto@gmail.com"');
exec('git commit -m "docs(docs): update gh-pages"');

// 检查GH_TOKEN是否存在
if (!ghToken) {
  echo("Error: GH_TOKEN environment variable is not set.");
  echo("Please set the GH_TOKEN environment variable to a valid GitHub token.");
  process.exit(1);
}
// 使用更安全的方式处理令牌
try {
  echo("Pushing to GitHub Pages...");
  
  // 使用GitHub Actions推荐的方式
  if (process.env.GITHUB_ACTIONS) {
    // 在GitHub Actions中，使用GITHUB_TOKEN
    echo("Running in GitHub Actions environment");
    
    // 设置远程仓库URL（不包含令牌）
    echo(`Setting remote URL: https://${repository}`);
    exec(`git remote add origin https://${repository}`);
    
    // 使用git命令行凭证助手
    exec('git config --global credential.helper "store --file=.git/credentials"');
    
    // 将令牌写入凭证文件
    if (ghToken) {
      echo("Writing credentials to .git/credentials");
      writeFileSync('.git/credentials', `https://x-access-token:${ghToken}@github.com\n`);
    }
    
    // 推送到gh-pages分支
    exec("git push --force origin HEAD:gh-pages");
  } else {
    // 本地环境
    echo("Running in local environment");
    if (ghToken) {
      exec(`git remote add origin https://${ghToken}@${repository}`);
      exec("git push --force origin HEAD:gh-pages");
    } else {
      echo("No GH_TOKEN provided. Cannot push to GitHub.");
      process.exit(1);
    }
  }
} catch (error) {
  echo("Error pushing to GitHub Pages. Check your token permissions.");
  echo("Error details: " + error.message);
  process.exit(1);
}
echo("Docs deployed!!");
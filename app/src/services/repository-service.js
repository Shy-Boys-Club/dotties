import { API_URL } from "../util/api-util";

const GITHUB_API_BASE = `https://api.github.com`;
const GITHUB_REPO_BASE = `https://github.com/REPO_NAME/blob/`
const GITHUB_DOWNLOAD_BASE = `https://raw.githubusercontent.com/REPO_NAME/master/`
const GITHUB_REPOSITORY_LIST_BASE = `https://api.github.com/users/USER_NAME/repos`;


/**
 * @param {string} repoName
 */
export async function getDotfiles(repoName) {
    const downloadBase = GITHUB_DOWNLOAD_BASE.replace('REPO_NAME', repoName);
    const repoUrl = GITHUB_REPO_BASE.replace('REPO_NAME', repoName);

    const dottiesJSON = await fetch(downloadBase + "dotties.json").then(res => res.json())

    const dotfileInfo = {};
    for (const dotfileKey of Object.keys(dottiesJSON)) {
        dotfileInfo[dotfileKey] = {
            github_url: repoUrl + dottiesJSON[dotfileKey],
            download_url: downloadBase + dottiesJSON[dotfileKey]
        }
    }

    return dotfileInfo;
}


/**
 * @param {string} repoName
 */
export async function getRepositoryInformation(repoName) {
    try {
        const repositoryUrl = GITHUB_API_BASE + "/repos/" + repoName;
        const repositoryData = await fetch(repositoryUrl).then(res => res.json());
        const defaultBranch = repositoryData.default_branch;

        const branchesUrl = repositoryData.branches_url.replace("{/branch}", "/" + defaultBranch);
        const branchData = await fetch(branchesUrl).then(res => res.json());

        const latestCommitSha = branchData.commit.sha;
        const fileTreeUrl = GITHUB_API_BASE + "/repos/" + repoName + "/git/trees/" + latestCommitSha + "?recursive=true"
        const fileTreeData = await fetch(fileTreeUrl).then(res => res.json());

        return fileTreeData.tree;
    } catch (err) {
        return null;
    }
}

/**
 * @param {string} username
 */
export async function getUserRepositories(username) {
    const repositoryListUrl = GITHUB_REPOSITORY_LIST_BASE.replace("USER_NAME", username);
    const repositoryData = await fetch(repositoryListUrl);

    return await repositoryData.json();
}

/**
 * @param {FormData} formData
 */
export async function submitRepository(formData) {
    const addRepositoryUrl = API_URL + "/repos";

    const res = await fetch(addRepositoryUrl, {
        method: "POST",
        credentials: "include",
        body: formData
    });

    return await res.json();
}

import { API_URL } from '../util/api-util';

const GITHUB_API_BASE = `https://api.github.com`;
const GITHUB_REPO_BASE = `https://github.com/REPO_NAME/blob/`;
const GITHUB_DOWNLOAD_BASE = `https://raw.githubusercontent.com/REPO_NAME/master/`;
const GITHUB_REPOSITORY_LIST_BASE = `https://api.github.com/users/USER_NAME/repos`;

/**
 * @param {string} repoName
 */
export async function getDotfiles(repoName) {
    const downloadBase = GITHUB_DOWNLOAD_BASE.replace('REPO_NAME', repoName);
    const repoUrl = GITHUB_REPO_BASE.replace('REPO_NAME', repoName);

    const dottiesJSON = await fetch(downloadBase + 'dotties.json')
        .then(res => res.json())
        .catch(res => null);

    if (!dottiesJSON) {
        return null;
    }

    const dotfileInfo = {};
    for (const dotfileKey of Object.keys(dottiesJSON)) {
        dotfileInfo[dotfileKey] = {
            github_url: repoUrl + dottiesJSON[dotfileKey],
            download_url: downloadBase + dottiesJSON[dotfileKey],
        };
    }

    return dotfileInfo;
}

/**
 * @param {string} repoName
 */
export async function getRepositoryInformation(repoName) {
    try {
        const repositoryUrl = GITHUB_API_BASE + '/repos/' + repoName;
        const repositoryData = await fetch(repositoryUrl).then(res => res.json());
        const defaultBranch = repositoryData.default_branch;

        const branchesUrl = repositoryData.branches_url.replace('{/branch}', '/' + defaultBranch);
        const branchData = await fetch(branchesUrl).then(res => res.json());

        const latestCommitSha = branchData.commit.sha;
        const fileTreeUrl =
            GITHUB_API_BASE + '/repos/' + repoName + '/git/trees/' + latestCommitSha + '?recursive=true';
        const fileTreeData = await fetch(fileTreeUrl).then(res => res.json());

        return fileTreeData.tree;
    } catch (err) {
        return null;
    }
}

export async function getRepositories() {
    const repositoryListUrl = API_URL + `/repos`;
    return await fetch(repositoryListUrl).then(res => res.json());
}

/**
 * @param {string} username
 */
export async function getUserRepositories(username) {
    const repositoryListUrl = GITHUB_REPOSITORY_LIST_BASE.replace('USER_NAME', username);
    return await await fetch(repositoryListUrl).then(res => res.json());
}

/**
 * @param {any} repoName
 */
export async function getRepositoryDataFromAPI(repoName) {
    const repositoryDataUrl = API_URL + `/repos?repository=${repoName}`;

    return await fetch(repositoryDataUrl).then(res => res.json());
}

/**
 * @param {FormData} formData
 */
export async function submitRepository(formData) {
    const addRepositoryUrl = API_URL + '/repos';

    const res = await fetch(addRepositoryUrl, {
        method: 'POST',
        credentials: "include",
        body: formData,
    });

    if (res.status <= 204)
        return await res.json();

    const errorText = await res.text();
    return { error: errorText };
}

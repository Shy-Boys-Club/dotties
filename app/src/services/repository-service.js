const GITHUB_API_BASE = `https://api.github.com/repos/REPO_NAME/contents/`;
const GITHUB_REPO_BASE = `https://github.com/REPO_NAME/blob/`
const GITHUB_DOWNLOAD_BASE = `https://raw.githubusercontent.com/REPO_NAME/master/`


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

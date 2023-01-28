import core from '@actions/core';
import github from '@actions/github';

import * as fs from 'fs/promises';

const main = async () => {
    // TODO: Make this path configurable
    const path = "./github/issues.json"

    const token = core.getInput('repo-token', {required: true});

    const content = await fs.readFile(path, "utf8");
    const localLabels = JSON.parse(content);

    console.log(localLabels)

    const client = github.getOctokit(token);

    const existingLabels = await client.rest.issues.listLabelsForRepo({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
    });

    console.log(existingLabels);

}

main().catch(error => core.setFailed(error.message));

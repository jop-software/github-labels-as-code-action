import * as core from '@actions/core';
import * as github from '@actions/github';

import * as fs from 'fs/promises';

async function main(): Promise<void> {
    try {
        // TODO: Make this path configurable
        const path = "./github/issues.json"

        const token = core.getInput('token', {required: true});

        const content = await fs.readFile(path, "utf8");
        const localLabels = JSON.parse(content);

        const client = github.getOctokit(token);

        const existingLabels = await client.rest.issues.listLabelsForRepo({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
        });

        core.info('local labels: ' + JSON.stringify(localLabels))
        core.info('existing labels: ' + JSON.stringify(existingLabels))
    } catch (error) {
        core.setFailed(`${(error as any)?.message ?? error}`)
    }
}

if (!!core.getState('isPost')) {
    main()
}

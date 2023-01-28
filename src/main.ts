import * as core from '@actions/core';
import * as github from '@actions/github';

import * as fs from 'fs/promises';
import { GitHub } from "@actions/github/lib/utils";

interface Repository {
    owner: string;
    repo: string;
}

interface Label {
    "name": string;
    "description": string | null;
    "color": string;
}

interface GithubLabel extends Label {
    "id": number;
    "node_id": string;
    "url": string;
}

async function getLabelByName(client: InstanceType<typeof GitHub>, repository: Repository, name: string): Promise<GithubLabel|false> {
    const response = await client.rest.issues.getLabel({
        owner: repository.owner,
        repo: repository.repo,
        name: name
    });

    if (response.status !== 200) {
        return false;
    }

    return response.data as GithubLabel;
}

async function updateLabelByName(client: InstanceType<typeof GitHub>, repository: Repository, label: Label) {
    const response = await client.rest.issues.updateLabel({
        owner: repository.owner,
        repo: repository.repo,
        name: label.name,
        new_name: label.name,
        color: label.color,
        description: label.description || "",
    });

    return response.data as GithubLabel;
}

async function createLabel(client: InstanceType<typeof GitHub>, repository: Repository, label: Label) {
    const response = await client.rest.issues.createLabel({
        owner: repository.owner,
        repo: repository.repo,
        name: label.name,
        new_name: label.name,
        color: label.color,
        description: label.description || "",
    });

    return response.data as GithubLabel;
}


async function main(): Promise<void> {
    try {
        const token = core.getInput('token', {required: true});
        const labelsFilesPath = core.getInput("file", {required: true})

        const content = await fs.readFile(labelsFilesPath, "utf8");
        const localLabels: Label[] = JSON.parse(content);

        core.debug(`Found ${localLabels.length} labels in ${labelsFilesPath}`);

        const repository: Repository = {
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
        };

        const client = github.getOctokit(token);

        for (const label of localLabels) {
            core.debug(`Processing label ${label.name}`);

            // 1. Check weather the label exists
            const ghLabel = await getLabelByName(client, repository, label.name);
            core.debug(`ghLabel is: ${ghLabel}`);

            if (ghLabel) {
                core.debug(`Updating label ${label.name}`);
                // 2. if yes: update with local information
                await updateLabelByName(client, repository, label);
            } else {
                core.debug(`Creating label ${label.name}`);
                // 3. if not: create a new label with local information
                await createLabel(client, repository, label);
            }
        }
    } catch (error) {
        core.setFailed(`${(error as any)?.message ?? error}`)
    }
}

main()

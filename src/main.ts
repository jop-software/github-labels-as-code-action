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

async function getAllLabels(client: InstanceType<typeof GitHub>, repository: Repository): Promise<GithubLabel[]> {
    const response = await client.rest.issues.listLabelsForRepo({
        owner: repository.owner,
        repo: repository.repo,
    });

    return response.data as GithubLabel[];
}

async function updateLabel(client: InstanceType<typeof GitHub>, repository: Repository, label: Label) {
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

        const githubLabels = await getAllLabels(client, repository);
        core.debug(`Found ${githubLabels.length} labels in GitHub`);

        for (const label of localLabels) {
            core.debug(`Processing label '${label.name}'`);

            // Try finding our local label in the list from GitHub
            const ghLabel = githubLabels.find(ghLabel => ghLabel.name === label.name);

            // If we haven't found it - create it
            if (!ghLabel) {
                core.info(`Label ${label.name} not found in Github. Creating`);
                await createLabel(client, repository, label);
                continue;
            }

            core.debug(`Found label '${label.name}'`);

            // Compare the labels to determine weather we need to update it
            const needsUpdate = (
                label.description !== ghLabel.description ||
                label.color !== ghLabel.color
            );

            core.debug(`Does label '${label.name}' need an update: ${needsUpdate}`);

            if (needsUpdate) {
                core.debug(`Updating label '${label.name}'`);
                await updateLabel(client, repository, label);
            }
        }
    } catch (error) {
        core.setFailed(`${(error as any)?.message ?? error}`)
    }
}

main()

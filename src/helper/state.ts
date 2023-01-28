import * as core from '@actions/core';

export const isPost = !!core.getState('isPost');

import { Handler } from '@netlify/functions';
import { Octokit } from '@octokit/core';

export const handler: Handler = async (event, context) => {
  const {
    GH_OWNER: owner,
    GH_REPOSITORY: repo,
    GH_TOKEN: token,
    HOOK_SECRET_KEY: hookSecretKey
  } = process.env;
  const { hook_key: hookKey } = event.queryStringParameters;

  if (hookSecretKey !== hookKey) {
    return {
      statusCode: 401,
      body: 'Invalid secret'
    };
  }

  const octokit = new Octokit({ auth: token });

  try {
    await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
      owner,
      repo,
      event_type: 'static_build'
    });

    return {
      statusCode: 200,
      body: 'ok'
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err
    };
  }
}

import { Handler } from '@netlify/functions';
import { Octokit } from '@octokit/core';

export const handler: Handler = async (event, context) => {
  const { owner, repository, token } = event.queryStringParameters;
  const octokit = new Octokit({ auth: token });

  try {
    const { data } = await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
      owner,
      repo: repository,
      event_type: 'static_build'
    });

    return {
      statusCode: 200,
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err
    };
  }
}

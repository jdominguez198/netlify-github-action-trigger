# netlify-github-action-trigger

### Description

This repository is made for creating a Netlify's Function to request an Event Dispatch in a Github repository,
using the GitHub API.

### Netlify Setup

You should create the following Environment Variables in your Site Configuration:

Variable        | Description                |
----------------|----------------------------|
GH_OWNER        | Repository owner / author
GH_REPOSITORY   | Repository identifier
GH_TOKEN        | Personal Access Token
HOOK_SECRET_KEY | Secret key for validation

### Function Usage

Request to the following url format:

```
https://<site_name>.netlify.app/.netlify/functions/github-action-trigger?hook_key=<HOOK_SECRET_KEY>
```

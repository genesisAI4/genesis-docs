# Workflows API

The Workflows API allows you to programmatically manage and execute automation workflows.

## Endpoints

### List Workflows
`GET /workflows`

Returns a list of all workflows for the authenticated user.

### Create Workflow
`POST /workflows`

Creates a new workflow definition.

**Body:**
```json
{
  "name": "My Automation",
  "definition": { ... }
}
```

### Execute Workflow
`POST /workflows/{id}/execute`

Triggers an execution of the specified workflow.

**Body:**
```json
{
  "data": {
    "variable": "value"
  }
}
```

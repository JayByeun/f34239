const MOCK_SERVER_BASE = process.env.REACT_APP_MOCK_SERVER_BASE;
const TENANT_ID = process.env.REACT_APP_TENANT_ID;
const ACTION_BLUEPRINT_ID = process.env.REACT_APP_ACTION_BLUEPRINT_ID;

export const API_URL = `${MOCK_SERVER_BASE}/api/v1/${TENANT_ID}/actions/blueprints/${ACTION_BLUEPRINT_ID}/graph`;

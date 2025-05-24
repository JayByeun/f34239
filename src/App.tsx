import './App.css';
import React, { useEffect, useState } from 'react';
import {BlueprintGraph} from './utils/types';
import FormList from './components/FormList';

const MOCK_SERVER_BASE = process.env.REACT_APP_MOCK_SERVER_BASE;
const TENANT_ID = process.env.REACT_APP_TENANT_ID;
const ACTION_BLUEPRINT_ID = process.env.REACT_APP_ACTION_BLUEPRINT_ID;

const API_URL = `${MOCK_SERVER_BASE}/api/v1/${TENANT_ID}/actions/blueprints/${ACTION_BLUEPRINT_ID}/graph`;

function App() {
  const [graphData, setGraphData] = useState<BlueprintGraph | null>(null);
  const [error, setError] = useState<null | string>(null);

  const [prefillMap, setPrefillMap] = useState<{
    [fieldName: string]: { sourceFormId: string; sourceFieldName: string } | null;
  }>({
    dynamic_checkbox_group: null,
    dynamic_object: null,
    email: { 
      sourceFormId: "f_01jk7aygnqewh8gt8549beb1yc",
      sourceFieldName: "email",
  },
  });

  useEffect(() => {
    const fetchFormGraph = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`HTTP Error, status: ${res.status}`);
        }
        const data = await res.json();
        const emailForm = data.forms.find((form: any) => {
        const fields = form.field_schema?.properties || {};
        return 'email' in fields;
      });

      if (emailForm) {
        setPrefillMap({
          dynamic_checkbox_group: null,
          dynamic_object: null,
          email: { sourceFormId: emailForm.id, sourceFieldName: 'email' },
        });
      } else {
        setPrefillMap({
          dynamic_checkbox_group: null,
          dynamic_object: null,
          email: null,
        });
      }
        setGraphData(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e));
        }
      }
    }

    fetchFormGraph();
  }, []);

  if (!graphData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className='header'>
        <h2>Prefill</h2>
        <span className='description'>Prefill fields for this form</span>
      </div>
      <div className='fields'>
        <FormList formData={graphData} prefillMap={prefillMap} />
      </div>
    </div>
  );
}

export default App;

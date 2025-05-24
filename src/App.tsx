import './App.css';
import Database from './icons/Database';
import Close from './icons/Close';
import React, { useEffect, useState } from 'react';

const MOCK_SERVER_BASE = process.env.REACT_APP_MOCK_SERVER_BASE;
const TENANT_ID = process.env.REACT_APP_TENANT_ID;
const ACTION_BLUEPRINT_ID = process.env.REACT_APP_ACTION_BLUEPRINT_ID;

const API_URL = `${MOCK_SERVER_BASE}/api/v1/${TENANT_ID}/actions/blueprints/${ACTION_BLUEPRINT_ID}/graph`;

function App() {
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    console.log(API_URL)
    const fetchFormGraph = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`HTTP Error, status: ${res.status}`);
        }
        const data = await res.json();
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

  return (
    <div className="App">
      <div className='header'>
        <h2>Prefill</h2>
        <span className='description'>Prefill fields for this form</span>
      </div>

      <div className='fields'>
        <div className='field dynamic-checkbox'>
          <Database />
          <span>dynamic_checkbox_group</span>
        </div>
        <div className='field dynamic-object'>
          <Database />
          <span>dynamic_object</span>
        </div>
        <div className='field email-form'>
          <span>email: Form A.email</span>
          <button>
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

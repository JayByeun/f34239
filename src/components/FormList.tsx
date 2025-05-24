import React, { JSX, useState } from 'react';
import Database from '../icons/Database';
import Close from '../icons/Close';
import { PrefillFields } from '../utils/types';
import PrefillModal from './PrefillModal';
import { BlueprintGraph } from '../utils/types';

const getPrefillValue = (
    data: null | BlueprintGraph,
    fieldName: string,
    prefillMap: {[fieldName: string]: { sourceFormId: string; sourceFieldName: string } | null},
) => {
  const mapping = prefillMap[fieldName];
  if (!mapping) {
    return '';
  }

  const sourceForm = data?.forms.find(f => f.id === mapping.sourceFormId);
  if (!sourceForm) {
    return '';
  }

  return `${sourceForm.name} - ${mapping.sourceFieldName}`;
};

const FormList = ({formData, prefillMap}: {formData: any, prefillMap: any}): JSX.Element => {
    const [open, setOpen] = useState(false);
    return (<>
        <div className='field dynamic-checkbox'>
          <Database />
          <span>dynamic_checkbox_group</span>
        </div>
        <div className='field dynamic-object'>
          <Database />
          <span>dynamic_object</span>
        </div>
        <div
            className='field email-form'
            onClick={() => setOpen(true)}
        >
          <span>email: {getPrefillValue(formData, 'email', prefillMap)}</span>
          <button>
            <Close />
          </button>
        </div>
        <PrefillModal open={open} onClose={() => setOpen(false)} />
    </>);
}

export default FormList;

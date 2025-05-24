type FormNode = {
  id: string;
  name: string;
  fields: Field[];
  dependencies: string;
}

type Field = {
  id: string;
  name: string;
  type: string;
  prefillMapping?: PrefillMapping;
}

type PrefillMapping = {
  sourceType: 'formField' | 'global';
  sourceFormId?: string;
  sourceFieldId?: string;
}

type Graph = {
  forms: FormNode[];
  edges: GraphEdge[];
}

type GraphEdge = {
  from: string;
  to: string;
}

interface PrefillDataSource {
  getName(): string;
  getField(formId: string, graph: Graph): PrefillField;
}

type PrefillField = {
  id: string;
  name: string;
  sourceFormId?: string;
  sourceType: string;
}

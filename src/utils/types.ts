interface Edge {
    source: string;
    target: string;
}

interface PayloadField {
    component_key: string;
    is_metadata: boolean;
    output_key: string;
    type: string;
}

interface DynamicFieldConfigItem {
    endpoint_id: string;
    output_key: string;
    payload_fields: { [key: string]: PayloadField };
    selector_field: string;
}

interface FieldSchema {
    properties: { [key: string]: any | null };
    required: (string | null)[];
    type: string;
}

interface UISchema {
    elements: (any | null)[];
    type: string;
}

export interface Form {
    description: string;
    dynamic_field_config: { [key: string]: DynamicFieldConfigItem };
    field_schema: FieldSchema;
    id: string;
    is_reusable: boolean;
    name: string;
    ui_schema: UISchema;
}

interface Duration {
    number: number;
    unit: string;
}

interface InputMappingItem {
    component_key: string;
    is_metadata: boolean;
    output_key: string;
    type: string;
}

interface NodeData {
    approval_required: boolean;
    approval_roles: string[];
    approval_sla_duration: Duration;
    component_id: string;
    component_key: string;
    component_type: string;
    id: string;
    input_mapping: { [key: string]: InputMappingItem };
    name: string;
    permitted_roles: string[];
    prerequisites: string[];
    scheduled_delay: Duration;
    sla_duration: Duration;
}

interface Position {
    x: number;
    y: number;
}

export interface Node {
    data: NodeData;
    id: string;
    position: Position;
    type: string;
}

export interface BlueprintGraph {
    $schema: string;
    blueprint_id: string;
    blueprint_name: string;
    branches: [];
    edges: Edge[];
    forms: Form[];
    nodes: Node[];
    tenant_id: string;
    triggers: [];
}

export type FormInfo = {
    formName: "Form A" | "Form B" | "Form C" | "Form D" | "Form F";
    field: "email" | "checkboxes" | "object";
};

export type PrefillConfig = {
    email: null | FormInfo;
    dynamic_checkbox_group: null | FormInfo;
    dynamic_object: null | FormInfo;
};

interface Condition {
    left: {
        object: string;
        property: string;
        type: string;
    };
    operator: string;
    right: {
        type: string;
        value: string;
    };
    type: string;
}

interface Branch {
    $schema: string;
    condition: Condition;
    created_at: string;
    created_by: string;
    description: string;
    id: string;
    name: string;
    tenant_id: string;
    updated_at: string;
}

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
    additionalProperties: { [key: string]: any | null };
    properties: { [key: string]: any | null };
    required: (string | null)[];
    type: string;
}

interface UISchema {
    elements: (any | null)[];
    type: string;
}

export interface Form {
    $schema: string;
    created_at: string;
    created_by: string;
    custom_javascript: string;
    custom_javascript_triggering_fields: string[];
    description: string;
    dynamic_field_config: { [key: string]: DynamicFieldConfigItem };
    field_schema: FieldSchema;
    id: string;
    is_reusable: boolean;
    name: string;
    ui_schema: UISchema;
    updated_at: string;
}

interface ApprovalAutoAssignConfig {
    form_field: string;
    form_key: string;
    type: string;
    value: string;
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

interface StateTransitionRulesIf {
    component_key: string;
    is_metadata: boolean;
    output_key: string;
    type: string;
}

interface StateTransitionRules {
    state_transition_rules_if: StateTransitionRulesIf;
    state_transition_rules_then: string;
}

interface NodeData {
    approval_auto_assign_config: ApprovalAutoAssignConfig;
    approval_required: boolean;
    approval_roles: string[];
    approval_scheduled_delay: Duration;
    approval_sla_duration: Duration;
    approval_task_name: string;
    auto_assign_config: ApprovalAutoAssignConfig;
    component_id: string;
    component_key: string;
    component_type: string;
    data_promotion_config: { [key: string]: string };
    id: string;
    input_mapping: { [key: string]: InputMappingItem };
    name: string;
    permitted_roles: string[];
    prerequisites: string[];
    scheduled_delay: Duration;
    sla_duration: Duration;
    state_transition_rules: StateTransitionRules;
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

interface OutputMapping {
    [key: string]: string;
}

interface Trigger {
    $schema: string;
    created_at: string;
    id: string;
    max_retries: number;
    name: string;
    output_mapping: OutputMapping;
    path_template: string;
    path_template_variables: string[];
    payload_template: { [key: string]: string };
    payload_template_variables: string[];
    query_parameter_template: { [key: string]: string };
    query_parameter_template_variables: string[];
    request_method: string;
    timeout_seconds: number;
    trigger_service_id: string;
    updated_at: string;
}

export interface BlueprintGraph {
    $schema: string;
    blueprint_id: string;
    blueprint_name: string;
    branches: Branch[];
    edges: Edge[];
    forms: Form[];
    nodes: Node[];
    promoted_data_order: string[];
    status: string;
    tenant_id: string;
    triggers: Trigger[];
    version_id: string;
    version_notes: string;
    version_number: string;
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

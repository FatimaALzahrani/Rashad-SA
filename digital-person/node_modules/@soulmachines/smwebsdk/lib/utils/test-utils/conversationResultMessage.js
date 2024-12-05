"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watsonMessage = exports.dialogflowMessage = exports.legacyDialogflowMessage = void 0;
var legacyDialogflowMessage = {
    body: {
        input: { text: 'okay' },
        output: {
            context: {
                'public-image': '{\n  "component": "image", "position": "right",\n  "data": {\n    "url": "https://via.placeholder.com/150/808080/FF0000/?text=Right"\n  }\n}',
                'public-image.original': '',
            },
            text: "Here's a right content block @ShowCards(image).",
        },
        personaId: '1',
        provider: {
            kind: 'dialogflow',
            meta: {
                dialogflow: {
                    queryResult: {
                        allRequiredParamsPresent: true,
                        fulfillmentMessages: [
                            {
                                text: {
                                    text: ["Here's a right content block @ShowCards(image)"],
                                },
                            },
                        ],
                        fulfillmentText: "Here's a right content block @ShowCards(image)",
                        intent: {
                            displayName: 'show right content block',
                            name: 'projects/intelligent-ui-npawgb/agent/intents/dd08466f-a179-4351-a865-f18debbc59ef',
                        },
                        intentDetectionConfidence: 0.53774820000000001,
                        languageCode: 'en',
                        outputContexts: [
                            {
                                lifespanCount: 9999,
                                name: 'projects/intelligent-ui-npawgb/agent/sessions/f10fb199-da97-43ae-9cca-fe17229f613c/contexts/soulmachines',
                                parameters: {
                                    Current_Time: '10 48 pm',
                                    FacePresent: '',
                                    PersonaTurn_IsAttentive: '',
                                    PersonaTurn_IsTalking: '',
                                    Persona_Turn_Confusion: '',
                                    Persona_Turn_Negativity: '',
                                    Persona_Turn_Positivity: '',
                                    UserTurn_IsAttentive: 0.46171015501022339,
                                    UserTurn_IsTalking: 0.04461120069026947,
                                    User_Turn_Confusion: '',
                                    User_Turn_Negativity: '',
                                    User_Turn_Positivity: '',
                                    is_speaking: false,
                                    'public-image': '{\n  "component": "image", "position": "right",\n  "data": {\n    "url": "https://via.placeholder.com/150/808080/FF0000/?text=Right"\n  }\n}',
                                    'public-image.original': '',
                                    stt_final_result_string: 'okay',
                                },
                            },
                        ],
                        parameters: {
                            'public-image': '{\n  "component": "image", "position": "right",\n  "data": {\n    "url": "https://via.placeholder.com/150/808080/FF0000/?text=Right"\n  }\n}',
                        },
                        queryText: 'okay',
                    },
                    responseId: '9e8c8ec6-ef9c-4e30-aa51-7ce70263b3c7-cf898478',
                },
                metadata: {
                    displayName: 'show right content block',
                    name: 'projects/intelligent-ui-npawgb/agent/intents/dd08466f-a179-4351-a865-f18debbc59ef',
                },
            },
        },
        status: 0,
    },
};
exports.legacyDialogflowMessage = legacyDialogflowMessage;
var dialogflowMessage = {
    body: {
        input: {
            text: '11',
        },
        output: {
            context: {},
            text: 'text response @showcards(cat) @showcards(cat2) @showcards(cat3).',
        },
        personaId: '1',
        provider: {
            kind: 'dialogflow',
            meta: {
                dialogflow: {
                    queryResult: {
                        allRequiredParamsPresent: true,
                        fulfillmentMessages: [
                            {
                                text: {
                                    text: [
                                        'text response @showcards(cat) @showcards(cat2) @showcards(cat3)',
                                    ],
                                },
                            },
                            {
                                payload: {
                                    soulmachines: {
                                        cat: {
                                            component: 'image',
                                            data: {
                                                alt: 'an image of a cat',
                                                url: 'https://placekitten.com/200/300',
                                            },
                                        },
                                        cat2: {
                                            component: 'image',
                                            data: {
                                                alt: 'another image of a cat',
                                                url: 'https://placekitten.com/400/600',
                                            },
                                        },
                                        cat3: {
                                            component: 'image',
                                            data: {
                                                alt: 'an image of a cat',
                                                url: 'https://placekitten.com/100/150',
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                        fulfillmentText: 'text response @showcards(cat) @showcards(cat2) @showcards(cat3)',
                        intent: {
                            displayName: '11 - triple content',
                            name: 'projects/makecueusable/agent/intents/03987444-29f3-42fd-ae74-801da6e1797f',
                        },
                        intentDetectionConfidence: 1,
                        languageCode: 'en',
                        outputContexts: [
                            {
                                lifespanCount: 9999,
                                name: 'projects/makecueusable/agent/sessions/6a1a5eb0-d7d6-44c9-bb42-62cdb67aa9cc/contexts/soulmachines',
                                parameters: {
                                    Current_Time: '11 21 pm',
                                    FacePresent: 1,
                                    PersonaTurn_IsAttentive: 0.37474548816680908,
                                    PersonaTurn_IsTalking: 0.99946671724319458,
                                    Persona_Turn_Confusion: '',
                                    Persona_Turn_Negativity: '',
                                    Persona_Turn_Positivity: '',
                                    Turn_Id: '051def12-1cd1-4723-af80-16e00fb8713b',
                                    UserTurn_IsAttentive: 0.13312289118766785,
                                    UserTurn_IsTalking: 0.92443406581878662,
                                    User_Turn_Confusion: '',
                                    User_Turn_Negativity: '',
                                    User_Turn_Positivity: '',
                                    is_speaking: false,
                                    number: 11,
                                    'number.original': '11',
                                },
                            },
                        ],
                        parameters: {
                            number: 11,
                        },
                        queryText: '11',
                    },
                    responseId: '659a04c0-d05c-439f-93d4-494562c65079-cf898478',
                },
                metadata: {
                    displayName: '11 - triple content',
                    name: 'projects/makecueusable/agent/intents/03987444-29f3-42fd-ae74-801da6e1797f',
                },
            },
        },
        status: 0,
    },
    category: 'scene',
    kind: 'event',
    name: 'conversationResult',
};
exports.dialogflowMessage = dialogflowMessage;
var watsonMessage = {
    body: {
        input: { text: '47' },
        output: {
            context: {
                'public-options': {
                    component: 'options',
                    data: {
                        options: [
                            { label: 'A', value: 'hello' },
                            { label: 'B', value: 'tell me a  joke' },
                            { label: 'C', value: 'count to twenty' },
                            { label: 'Tell me a joke' },
                            { label: 'Show me a cat', value: '' },
                            { label: '1', value: '1 ' },
                            { label: '2' },
                            { label: '3', value: '' },
                            { label: '4' },
                            { label: '5', value: '' },
                            { label: '6' },
                            { label: '7', value: '' },
                        ],
                    },
                },
            },
            text: "Here's a large options block @ShowCards(options).",
        },
        personaId: '1',
        provider: {
            kind: 'watson',
            meta: {
                conversation_id: '58f856ab-7594-49ad-bbcb-669610c8260a',
                entities: null,
                intents: [
                    { confidence: 1.0, intent: '47_SM_Content_Blocks_List_large' },
                ],
                system: {
                    _node_output_map: {
                        Welcome: { '0': [0] },
                        node_6_1598324340415: { '0': [0] },
                    },
                    branch_exited: true,
                    branch_exited_reason: 'completed',
                    dialog_request_counter: 2,
                    dialog_stack: [{ dialog_node: 'root' }],
                    dialog_turn_counter: 2,
                    initialized: true,
                    last_branch_node: 'node_6_1598324340415',
                },
                watson: {
                    context: {
                        Current_Time: '1 28 in the morning',
                        FacePresent: null,
                        PersonaTurn_IsAttentive: null,
                        PersonaTurn_IsTalking: null,
                        Persona_Turn_Confusion: null,
                        Persona_Turn_Negativity: null,
                        Persona_Turn_Positivity: null,
                        Turn_Id: '2f13a39e-f60e-4240-b9d4-7957dbd7f608',
                        UserTurn_IsAttentive: null,
                        UserTurn_IsTalking: null,
                        UserTurn_TextAnger: 0,
                        UserTurn_TextCare: 0,
                        UserTurn_TextConcern: 0,
                        UserTurn_TextDisgust: 0,
                        UserTurn_TextDistress: 0,
                        UserTurn_TextExcitement: 0,
                        UserTurn_TextFear: 0,
                        UserTurn_TextInterest: 0,
                        UserTurn_TextJoy: 0,
                        UserTurn_TextShame: 0,
                        UserTurn_TextSurprise: 0,
                        UserTurn_TextValence: 0,
                        User_Turn_Confusion: null,
                        User_Turn_Negativity: null,
                        User_Turn_Positivity: null,
                        conversation_id: '58f856ab-7594-49ad-bbcb-669610c8260a',
                        is_speaking: false,
                        metadata: { user_id: '58f856ab-7594-49ad-bbcb-669610c8260a' },
                        'public-options': {
                            component: 'options',
                            data: {
                                options: [
                                    { label: 'A', value: 'hello' },
                                    { label: 'B', value: 'tell me a  joke' },
                                    { label: 'C', value: 'count to twenty' },
                                    { label: 'Tell me a joke' },
                                    { label: 'Show me a cat', value: '' },
                                    { label: '1', value: '1 ' },
                                    { label: '2' },
                                    { label: '3', value: '' },
                                    { label: '4' },
                                    { label: '5', value: '' },
                                    { label: '6' },
                                    { label: '7', value: '' },
                                ],
                            },
                        },
                        stt_final_result_string: '47',
                        system: {
                            _node_output_map: {
                                Welcome: { '0': [0] },
                                node_6_1598324340415: { '0': [0] },
                            },
                            branch_exited: true,
                            branch_exited_reason: 'completed',
                            dialog_request_counter: 2,
                            dialog_stack: [{ dialog_node: 'root' }],
                            dialog_turn_counter: 2,
                            initialized: true,
                            last_branch_node: 'node_6_1598324340415',
                        },
                    },
                    entities: [],
                    input: { text: '47' },
                    intents: [
                        { confidence: 1, intent: '47_SM_Content_Blocks_List_large' },
                    ],
                    output: {
                        generic: [
                            {
                                response_type: 'text',
                                text: "Here's a large options block @ShowCards(options)",
                            },
                        ],
                        log_messages: [],
                        nodes_visited: ['node_6_1598324340415'],
                        nodes_visited_details: [
                            {
                                conditions: '#47_SM_Content_Blocks_List_large',
                                dialog_node: 'node_6_1598324340415',
                                title: '47 - SM Content Blocks List',
                                visit_reason: 'branch_start',
                            },
                        ],
                        text: ["Here's a large options block @ShowCards(options)"],
                    },
                    user_id: '58f856ab-7594-49ad-bbcb-669610c8260a',
                },
            },
        },
        status: 0,
    },
    category: 'scene',
    kind: 'event',
    name: 'conversationResult',
};
exports.watsonMessage = watsonMessage;
//# sourceMappingURL=conversationResultMessage.js.map
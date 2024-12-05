declare const legacyDialogflowMessage: {
    body: {
        input: {
            text: string;
        };
        output: {
            context: {
                'public-image': string;
                'public-image.original': string;
            };
            text: string;
        };
        personaId: string;
        provider: {
            kind: string;
            meta: {
                dialogflow: {
                    queryResult: {
                        allRequiredParamsPresent: boolean;
                        fulfillmentMessages: {
                            text: {
                                text: string[];
                            };
                        }[];
                        fulfillmentText: string;
                        intent: {
                            displayName: string;
                            name: string;
                        };
                        intentDetectionConfidence: number;
                        languageCode: string;
                        outputContexts: {
                            lifespanCount: number;
                            name: string;
                            parameters: {
                                Current_Time: string;
                                FacePresent: string;
                                PersonaTurn_IsAttentive: string;
                                PersonaTurn_IsTalking: string;
                                Persona_Turn_Confusion: string;
                                Persona_Turn_Negativity: string;
                                Persona_Turn_Positivity: string;
                                UserTurn_IsAttentive: number;
                                UserTurn_IsTalking: number;
                                User_Turn_Confusion: string;
                                User_Turn_Negativity: string;
                                User_Turn_Positivity: string;
                                is_speaking: boolean;
                                'public-image': string;
                                'public-image.original': string;
                                stt_final_result_string: string;
                            };
                        }[];
                        parameters: {
                            'public-image': string;
                        };
                        queryText: string;
                    };
                    responseId: string;
                };
                metadata: {
                    displayName: string;
                    name: string;
                };
            };
        };
        status: number;
    };
};
declare const dialogflowMessage: {
    body: {
        input: {
            text: string;
        };
        output: {
            context: {};
            text: string;
        };
        personaId: string;
        provider: {
            kind: string;
            meta: {
                dialogflow: {
                    queryResult: {
                        allRequiredParamsPresent: boolean;
                        fulfillmentMessages: ({
                            text: {
                                text: string[];
                            };
                            payload?: undefined;
                        } | {
                            payload: {
                                soulmachines: {
                                    cat: {
                                        component: string;
                                        data: {
                                            alt: string;
                                            url: string;
                                        };
                                    };
                                    cat2: {
                                        component: string;
                                        data: {
                                            alt: string;
                                            url: string;
                                        };
                                    };
                                    cat3: {
                                        component: string;
                                        data: {
                                            alt: string;
                                            url: string;
                                        };
                                    };
                                };
                            };
                            text?: undefined;
                        })[];
                        fulfillmentText: string;
                        intent: {
                            displayName: string;
                            name: string;
                        };
                        intentDetectionConfidence: number;
                        languageCode: string;
                        outputContexts: {
                            lifespanCount: number;
                            name: string;
                            parameters: {
                                Current_Time: string;
                                FacePresent: number;
                                PersonaTurn_IsAttentive: number;
                                PersonaTurn_IsTalking: number;
                                Persona_Turn_Confusion: string;
                                Persona_Turn_Negativity: string;
                                Persona_Turn_Positivity: string;
                                Turn_Id: string;
                                UserTurn_IsAttentive: number;
                                UserTurn_IsTalking: number;
                                User_Turn_Confusion: string;
                                User_Turn_Negativity: string;
                                User_Turn_Positivity: string;
                                is_speaking: boolean;
                                number: number;
                                'number.original': string;
                            };
                        }[];
                        parameters: {
                            number: number;
                        };
                        queryText: string;
                    };
                    responseId: string;
                };
                metadata: {
                    displayName: string;
                    name: string;
                };
            };
        };
        status: number;
    };
    category: string;
    kind: string;
    name: string;
};
declare const watsonMessage: {
    body: {
        input: {
            text: string;
        };
        output: {
            context: {
                'public-options': {
                    component: string;
                    data: {
                        options: ({
                            label: string;
                            value: string;
                        } | {
                            label: string;
                            value?: undefined;
                        })[];
                    };
                };
            };
            text: string;
        };
        personaId: string;
        provider: {
            kind: string;
            meta: {
                conversation_id: string;
                entities: null;
                intents: {
                    confidence: number;
                    intent: string;
                }[];
                system: {
                    _node_output_map: {
                        Welcome: {
                            '0': number[];
                        };
                        node_6_1598324340415: {
                            '0': number[];
                        };
                    };
                    branch_exited: boolean;
                    branch_exited_reason: string;
                    dialog_request_counter: number;
                    dialog_stack: {
                        dialog_node: string;
                    }[];
                    dialog_turn_counter: number;
                    initialized: boolean;
                    last_branch_node: string;
                };
                watson: {
                    context: {
                        Current_Time: string;
                        FacePresent: null;
                        PersonaTurn_IsAttentive: null;
                        PersonaTurn_IsTalking: null;
                        Persona_Turn_Confusion: null;
                        Persona_Turn_Negativity: null;
                        Persona_Turn_Positivity: null;
                        Turn_Id: string;
                        UserTurn_IsAttentive: null;
                        UserTurn_IsTalking: null;
                        UserTurn_TextAnger: number;
                        UserTurn_TextCare: number;
                        UserTurn_TextConcern: number;
                        UserTurn_TextDisgust: number;
                        UserTurn_TextDistress: number;
                        UserTurn_TextExcitement: number;
                        UserTurn_TextFear: number;
                        UserTurn_TextInterest: number;
                        UserTurn_TextJoy: number;
                        UserTurn_TextShame: number;
                        UserTurn_TextSurprise: number;
                        UserTurn_TextValence: number;
                        User_Turn_Confusion: null;
                        User_Turn_Negativity: null;
                        User_Turn_Positivity: null;
                        conversation_id: string;
                        is_speaking: boolean;
                        metadata: {
                            user_id: string;
                        };
                        'public-options': {
                            component: string;
                            data: {
                                options: ({
                                    label: string;
                                    value: string;
                                } | {
                                    label: string;
                                    value?: undefined;
                                })[];
                            };
                        };
                        stt_final_result_string: string;
                        system: {
                            _node_output_map: {
                                Welcome: {
                                    '0': number[];
                                };
                                node_6_1598324340415: {
                                    '0': number[];
                                };
                            };
                            branch_exited: boolean;
                            branch_exited_reason: string;
                            dialog_request_counter: number;
                            dialog_stack: {
                                dialog_node: string;
                            }[];
                            dialog_turn_counter: number;
                            initialized: boolean;
                            last_branch_node: string;
                        };
                    };
                    entities: never[];
                    input: {
                        text: string;
                    };
                    intents: {
                        confidence: number;
                        intent: string;
                    }[];
                    output: {
                        generic: {
                            response_type: string;
                            text: string;
                        }[];
                        log_messages: never[];
                        nodes_visited: string[];
                        nodes_visited_details: {
                            conditions: string;
                            dialog_node: string;
                            title: string;
                            visit_reason: string;
                        }[];
                        text: string[];
                    };
                    user_id: string;
                };
            };
        };
        status: number;
    };
    category: string;
    kind: string;
    name: string;
};
export { legacyDialogflowMessage, dialogflowMessage, watsonMessage };
//# sourceMappingURL=conversationResultMessage.d.ts.map
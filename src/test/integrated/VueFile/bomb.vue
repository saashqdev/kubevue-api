<template>
    <u-linear-layout direction="vertical">
        <div>Subpage</div>
        <router-view></router-view>*(J)
        <u-table-view ref="tableView" :data-source="load" pageable remote-paging>
            <u-table-view-column type="index" width="60" title="Serial Number"></u-table-view-column>
            <u-table-view-column title="Name" field="userInfo.UserName"></u-table-view-column>
            <u-table-view-column title="Mobile Phone" field="userInfo.Phone"></u-table-view-column>
            <u-table-view-column title="Employee Number" field="userInfo.UserInfoExtend.employee number"></u-table-view-column>
            <u-table-view-column title="ID Card" field="userInfo.UserInfoExtend.ID card"></u-table-view-column>
            <u-table-view-column title="Status" field="variables.status"></u-table-view-column>
            <u-table-view-column title="AccommodationAgreement" field="variables.accommodationAgreement"></u-table-view-column>
            <u-table-view-column title="Deposit" field="variables.deposit"></u-table-view-column>
            <u-table-view-column title="Cost" field="variables.cost"></u-table-view-column>
            <u-table-view-column title="Room" field="room"></u-table-view-column>
            <u-table-view-column title="ApplyContent" field="variables.applyContent"></u-table-view-column>
            <u-table-view-column title="Created Time" field="variables.createdTime" formatter="date('YYYY-MM-DD HH:mm:ss')"></u-table-view-column >
            <u-table-view-column title="Updated Time" field="variables.updatedTime" formatter="date('YYYY-MM-DD HH:mm:ss')"></u-table-view-column >
            <u-table-view-column title="Operation">
                <template #cell="scope">
                    <u-linear-layout gap="small">
                        <u-link @click="openAccept($event,scope)">Pass</u-link>
                        <u-link>Rejected</u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
        <u-modal ref="modal1" size="large">
            <template #title>
                <div>Audit Passed</div>
            </template>
            <template #body>
                <div>Content</div>
                <u-info-list>
                    <u-info-list-group title="Applicant Information">
                        <u-info-list-item label="Applicant">{{roomApplyItem.userInfo.UserId}}</u-info-list-item>
                        <u-info-list-item label="Employee Number">{{roomApplyItem.userInfo.UserInfoExtend.employee number}}</u-info-list-item>
                    </u-info-list-group>
                    <u-info-list-group title="Room Information">
                        <u-info-list-item label="Deposit">{{roomApplyItem.variables.deposit}}</u-info-list-item>
                        <u-info-list-item label="Rent">{{roomApplyItem.variables.cost}}</u-info-list-item>
                    </u-info-list-group>
                </u-info-list>
            </template>
            <template #foot>
                <u-linear-layout>
                    <u-button color="primary" @click="accept($event)">OK</u-button>
                    <u-button>Cancel</u-button>
                </u-linear-layout>
            </template>
        </u-modal>
    </u-linear-layout></template><script>
    export default {};</script>
    <definition>
    {
        "params": [],
        "variables": [
            {
                "level": "variable",
                "type": "Identifier",
                "name": "roomApplyItem",
                "description": "",
                "schema": {
                    "$ref": "#/flowend925/structures/ProcessTask"
                },
                "isLeaf": true,
                "existingNames": [
                    "abstract",
                    "in",
                    "double",
                    "arguments",
                    "boolean",
                    "break",
                    "byte",
                    "case",
                    "catch",
                    "char",
                    "class*",
                    "const",
                    "continue",
                    "debugger",
                    "default",
                    "delete",
                    "do",
                    "else",
                    "enum*",
                    "eval",
                    "export*",
                    "extends*",
                    false,
                    "final",
                    "finally",
                    "float",
                    "for",
                    "function",
                    "goto",
                    "if",
                    "implements",
                    "import*",
                    "instanceof",
                    "int",
                    "interface",
                    "let",
                    "long",
                    "native",
                    "new",
                    null,
                    "package",
                    "private",
                    "protected",
                    "public",
                    "return",
                    "short",
                    "static",
                    "super*",
                    "switch",
                    "synchronized",
                    "this",
                    "throw",
                    "throws",
                    "transient",
                    true,
                    "try",
                    "typeof",
                    "var",
                    "void",
                    "volatile",
                    "while",
                    "with",
                    "yield",
                    "load",
                    "params",
                    "result",
                    "res",
                    "apiUser",
                    "remove",
                    "event",
                    "scope",
                    "res",
                    "openAccept",
                    "event",
                    "scope"
                ],
                "init": {
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "ObjectProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "id"
                            },
                            "value": {
                                "type": "Identifier",
                                "name": "undefined"
                            }
                        },
                        {
                            "type": "ObjectProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "processDefinitionId"
                            },
                            "value": {
                                "type": "Identifier",
                                "name": "undefined"
                            }
                        },
                        {
                            "type": "ObjectProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "taskDefinitionKey"
                            },
                            "value": {
                                "type": "Identifier",
                                "name": "undefined"
                            }
                        },
                        {
                            "type": "ObjectProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "variables"
                            },
                            "value": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "id"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "userId"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "status"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "accommodationAgreement"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "deposit"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "cost"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "waterMode"
                                        },
                                        "value": {
                                            "type": "StringLiteral",
                                            "value": "USED"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "waterPrice"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "electricityMode"
                                        },
                                        "value": {
                                            "type": "StringLiteral",
                                            "value": "USED"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "electricityPrice"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "hotWaterMode"
                                        },
                                        "value": {
                                            "type": "StringLiteral",
                                            "value": "USED"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "hotWaterPrice"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "pay"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "reject"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "rejectMark"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "room"
                                        },
                                        "value": {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "id"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "location"
                                                    },
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "id"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "name"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "distribution"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "AUTO"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "applyDocument"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "YES"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "applyOutDocument"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "YES"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "payMode"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "ONLINE"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "waterMode"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "USED"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "waterPrice"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "electricityMode"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "USED"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "electricityPrice"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "hotWaterMode"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "USED"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "hotWaterPrice"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "createdTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "updatedTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "building"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "floor"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "roomNo"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "roomType"
                                                    },
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "id"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "name"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "location"
                                                                },
                                                                "value": {
                                                                    "type": "ObjectExpression",
                                                                    "properties": [
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "id"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "name"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "distribution"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "AUTO"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "applyDocument"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "YES"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "applyOutDocument"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "YES"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "payMode"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "ONLINE"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "waterMode"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "USED"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "waterPrice"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "electricityMode"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "USED"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "electricityPrice"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "hotWaterMode"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "USED"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "hotWaterPrice"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "createdTime"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "updatedTime"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "createdTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "updatedTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "genderType"
                                                    },
                                                    "value": {
                                                        "type": "StringLiteral",
                                                        "value": "MALE"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "bedCount"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "bedLeft"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "orientation"
                                                    },
                                                    "value": {
                                                        "type": "StringLiteral",
                                                        "value": "EAST"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "bed"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "chair"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "table"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "aircondition"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "television"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "refrigerator"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "cost"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "deposit"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "users"
                                                    },
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "id"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "userId"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "applyId"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "createdTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "updatedTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "room"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "status"
                                                    },
                                                    "value": {
                                                        "type": "StringLiteral",
                                                        "value": "ENABLED"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "description"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "pictures"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "createdTime"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "updatedTime"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "applyContent"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "createdTime"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "updatedTime"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "ObjectProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "userInfo"
                            },
                            "value": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "Status"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "LastLoginTime"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "UserInfoExtend"
                                        },
                                        "value": {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "Job Number"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "ID card"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "UserName"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "UserId"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "CreateTime"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "UpdateTime"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "LoginCount"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "Source"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "Email"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "Phone"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ],
        "lifecycles": [],
        "logics": [
            {
                "level": "logic",
                "name": "load",
                "definition": {
                    "params": [
                        {
                            "level": "variable",
                            "name": "params",
                            "schema": {
                                "$ref": "#/systemTypes/DataSourceParams"
                            },
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "page"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "size"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "sort"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "order"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "returns": [
                        {
                            "level": "return",
                            "name": "result",
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/flowend925/structures/ProcessTask"
                                }
                            },
                            "init": {
                                "type": "ArrayExpression",
                                "elements": []
                            }
                        }
                    ],
                    "variables": [
                        {
                            "level": "variable",
                            "name": "res",
                            "schema": {
                                "$ref": "#/flowend925/structures/ApiReturnOfProcess"
                            },
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "code"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "data"
                                        },
                                        "value": {
                                            "type": "ArrayExpression",
                                            "elements": []
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "message"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "level": "variable",
                            "type": "Identifier",
                            "name": "apiUser",
                            "description": "",
                            "schema": {
                                "$ref": "#/flowfront0928/structures/ApiReturnOfGetUser"
                            },
                            "isLeaf": true,
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "RequestId"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "Message"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "Data"
                                        },
                                        "value": {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "Status"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "LastLoginTime"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "UserInfoExtend"
                                                    },
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "Job Number"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "ID card"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "UserName"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "UserId"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "CreateTime"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "UpdateTime"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "LoginCount"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "Source"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "Email"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "Phone"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "Code"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    }
                                ]
                            },
                            "existingNames": [
                                "abstract",
                                "in",
                                "double",
                                "arguments",
                                "boolean",
                                "break",
                                "byte",
                                "case",
                                "catch",
                                "char",
                                "class*",
                                "const",
                                "continue",
                                "debugger",
                                "default",
                                "delete",
                                "do",
                                "else",
                                "enum*",
                                "eval",
                                "export*",
                                "extends*",
                                false,
                                "final",
                                "finally",
                                "float",
                                "for",
                                "function",
                                "goto",
                                "if",
                                "implements",
                                "import*",
                                "instanceof",
                                "int",
                                "interface",
                                "let",
                                "long",
                                "native",
                                "new",
                                null,
                                "package",
                                "private",
                                "protected",
                                "public",
                                "return",
                                "short",
                                "static",
                                "super*",
                                "switch",
                                "synchronized",
                                "this",
                                "throw",
                                "throws",
                                "transient",
                                true,
                                "try",
                                "typeof",
                                "var",
                                "void",
                                "volatile",
                                "while",
                                "with",
                                "yield",
                                "load",
                                "remove"
                            ]
                        }
                    ],
                    "body": [
                        {
                            "level": "logicNode",
                            "type": "Start"
                        },
                        {
                            "level": "logicNode",
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "level": "logicNode",
                                "type": "Identifier",
                                "name": "res",
                                "index": 1602768981727
                            },
                            "right": {
                                "level": "logicNode",
                                "type": "CallFlow",
                                "label": "Calling Process",
                                "action": "getList",
                                "processDefinitionKey": "homersimpson",
                                "taskId": null,
                                "processInstanceId": null,
                                "variables": null,
                                "schemaRef": null,
                                "arguments": [],
                                "offsetX": 591,
                                "offsetY": 198
                            }
                        },
                        {
                            "level": "logicNode",
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "level": "expressionNode",
                                "type": "Identifier",
                                "name": "result",
                                "index": 1602768981861
                            },
                            "right": {
                                "level": "expressionNode",
                                "type": "MemberExpression",
                                "name": "res",
                                "index": 1602768981974,
                                "object": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "res",
                                    "index": 1602768981974
                                },
                                "property": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "data"
                                }
                            }
                        },
                        {
                            "level": "logicNode",
                            "type": "ForEachStatement",
                            "label": "Loop Branch",
                            "each": {
                                "level": "expressionNode",
                                "type": "Identifier",
                                "name": "result",
                                "index": 1602768982159,
                                "object": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "res",
                                    "index": 1602766368375
                                },
                                "property": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "data"
                                }
                            },
                            "item": {
                                "level": "expressionNode",
                                "type": "Identifier",
                                "name": "item",
                                "editable": true,
                                "schema": {
                                    "$ref": "#/flowend925/structures/ProcessTask"
                                }
                            },
                            "index": {
                                "level": "expressionNode",
                                "type": "Identifier",
                                "name": "i",
                                "editable": true
                            },
                            "start": {
                                "level": "expressionNode",
                                "type": "NumericLiteral",
                                "value": 1
                            },
                            "end": {
                                "level": "expressionNode",
                                "type": "MemberExpression",
                                "name": "name",
                                "hide": false,
                                "index": 1602768982336,
                                "offsetX": 395.90625,
                                "offsetY": 1033,
                                "object": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "result",
                                    "index": 1602768982336
                                },
                                "property": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "length"
                                },
                                "arrayLength": true
                            },
                            "body": [
                                {
                                    "level": "logicNode",
                                    "type": "AssignmentExpression",
                                    "label": "Assignment",
                                    "operator": "=",
                                    "left": {
                                        "level": "expressionNode",
                                        "type": "Identifier",
                                        "name": "apiUser",
                                        "index": 1602768982586
                                    },
                                    "right": {
                                        "level": "logicNode",
                                        "type": "CallInterface",
                                        "label": "Calling interface",
                                        "params": [
                                            {
                                                "name": "UserId",
                                                "in": "query",
                                                "value": {
                                                    "level": "expressionNode",
                                                    "type": "MemberExpression",
                                                    "name": "name",
                                                    "hide": false,
                                                    "index": 1602768983577,
                                                    "object": {
                                                        "level": "expressionNode",
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "level": "expressionNode",
                                                            "type": "Identifier",
                                                            "name": "item",
                                                            "index": 1602768983577
                                                        },
                                                        "property": {
                                                            "level": "expressionNode",
                                                            "type": "Identifier",
                                                            "name": "variables"
                                                        },
                                                        "index": 1602768983577
                                                    },
                                                    "property": {
                                                        "level": "expressionNode",
                                                        "type": "Identifier",
                                                        "name": "userId"
                                                    }
                                                },
                                                "schema": {
                                                    "type": "string",
                                                    "format": ""
                                                }
                                            }
                                        ],
                                        "selectedParams": [
                                            {
                                                "name": "UserId",
                                                "in": "query",
                                                "description": "User unique ID",
                                                "required": false,
                                                "type": "string",
                                                "level": "param",
                                                "schema": {
                                                    "type": "string",
                                                    "format": ""
                                                }
                                            }
                                        ],
                                        "interfaceKey": "flowfront0928/GetUser"
                                    }
                                },
                                {
                                    "level": "logicNode",
                                    "type": "AssignmentExpression",
                                    "label": "Assignment",
                                    "operator": "=",
                                    "left": {
                                        "level": "expressionNode",
                                        "type": "MemberExpression",
                                        "name": "item",
                                        "index": 1602768983846,
                                        "object": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "item",
                                            "index": 1602768983846
                                        },
                                        "property": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "userInfo"
                                        }
                                    },
                                    "right": {
                                        "level": "expressionNode",
                                        "type": "MemberExpression",
                                        "name": "name",
                                        "hide": false,
                                        "index": 1602768984045,
                                        "object": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "apiUser",
                                            "index": 1602768984045
                                        },
                                        "property": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "Data"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "level": "logicNode",
                            "type": "End"
                        }
                    ],
                    "playground": [
                        {
                            "level": "logicNode",
                            "type": "CallGraphQL",
                            "label": "Data Query",
                            "action": "query",
                            "schemaRef": "#/flowend925/entities/RoomApply",
                            "resolverName": "getAllRoomApplies",
                            "params": [],
                            "querySchemaMap": {
                                "name": "Data",
                                "description": "",
                                "type": "object",
                                "format": "",
                                "$ref": "#/flowend925/structures/PageOfRoomApply",
                                "level": "structure",
                                "checked": true,
                                "properties": {
                                    "content": {
                                        "name": "content",
                                        "description": "",
                                        "type": "array",
                                        "level": "entity",
                                        "items": {
                                            "$ref": "#/flowend925/entities/RoomApply",
                                            "level": "entity",
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "name": "id",
                                                    "description": "Primary Key",
                                                    "type": "integer",
                                                    "format": "long",
                                                    "isLeaf": true,
                                                    "editable": false,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "userId": {
                                                    "name": "userId",
                                                    "description": "User ID",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "status": {
                                                    "name": "status",
                                                    "description": "Ticket Status",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "accommodationAgreement": {
                                                    "name": "accommodationAgreement",
                                                    "description": "Signing the agreement",
                                                    "type": "boolean",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "deposit": {
                                                    "name": "deposit",
                                                    "description": "Deposit",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "cost": {
                                                    "name": "cost",
                                                    "description": "Monthly rent",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "waterMode": {
                                                    "name": "waterMode",
                                                    "description": "",
                                                    "type": "enum",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/BillMode",
                                                    "isLeaf": true,
                                                    "level": "entity",
                                                    "checked": true,
                                                    "enumItems": {
                                                        "USED": "Unit price charge",
                                                        "MONTHLY": "Monthly charge"
                                                    }
                                                },
                                                "waterPrice": {
                                                    "name": "waterPrice",
                                                    "description": "",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "electricityMode": {
                                                    "name": "electricityMode",
                                                    "description": "",
                                                    "type": "enum",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/BillMode",
                                                    "isLeaf": true,
                                                    "level": "entity",
                                                    "checked": true,
                                                    "enumItems": {
                                                        "USED": "Unit price charge",
                                                        "MONTHLY": "Monthly charge"
                                                    }
                                                },
                                                "electricityPrice": {
                                                    "name": "electricityPrice",
                                                    "description": "",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "hotWaterMode": {
                                                    "name": "hotWaterMode",
                                                    "description": "",
                                                    "type": "enum",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/BillMode",
                                                    "isLeaf": true,
                                                    "level": "entity",
                                                    "checked": true,
                                                    "enumItems": {
                                                        "USED": "Unit price charge",
                                                        "MONTHLY": "Monthly charge"
                                                    }
                                                },
                                                "hotWaterPrice": {
                                                    "name": "hotWaterPrice",
                                                    "description": "",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "pay": {
                                                    "name": "pay",
                                                    "description": "Payment voucher",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "reject": {
                                                    "name": "reject",
                                                    "description": "",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "rejectMark": {
                                                    "name": "rejectMark",
                                                    "description": "",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "room": {
                                                    "name": "room",
                                                    "description": "",
                                                    "type": "object",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/Room",
                                                    "isLeaf": true,
                                                    "relationship": "ManyToOne",
                                                    "level": "entity",
                                                    "checked": true,
                                                    "properties": {
                                                        "id": {
                                                            "name": "id",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "long",
                                                            "isLeaf": true,
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "location": {
                                                            "name": "location",
                                                            "description": "",
                                                            "type": "object",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/Location",
                                                            "isLeaf": true,
                                                            "relationship": "ManyToOne",
                                                            "label": "Place",
                                                            "level": "entity",
                                                            "checked": true,
                                                            "properties": {
                                                                "id": {
                                                                    "name": "id",
                                                                    "description": "Primary Key",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "name": {
                                                                    "name": "name",
                                                                    "description": "",
                                                                    "type": "string",
                                                                    "format": "",
                                                                    "isLeaf": true,
                                                                    "label": "Place Name",
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "distribution": {
                                                                    "name": "distribution",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/Distribution",
                                                                    "isLeaf": true,
                                                                    "label": "Allocation method",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "enumItems": {
                                                                        "AUTO": "Automatic",
                                                                        "MANUAL": "Manual"
                                                                    }
                                                                },
                                                                "applyDocument": {
                                                                    "name": "applyDocument",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/ApplyDocument",
                                                                    "isLeaf": true,
                                                                    "label": "Application Information",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "enumItems": {
                                                                        "YES": "Required",
                                                                        "NO": "Not Required"
                                                                    }
                                                                },
                                                                "applyOutDocument": {
                                                                    "name": "applyOutDocument",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/ApplyOutDocument",
                                                                    "isLeaf": true,
                                                                    "label": "Check-out Information",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "enumItems": {
                                                                        "YES": "Required",
                                                                        "NO": "Optional"
                                                                    }
                                                                },
                                                                "payMode": {
                                                                    "name": "payMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/PayMode",
                                                                    "isLeaf": true,
                                                                    "label": "Payment method",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "enumItems": {
                                                                        "ONLINE": "Online payment",
                                                                        "OFFLINE": "Offline payment"
                                                                    }
                                                                },
                                                                "waterMode": {
                                                                    "name": "waterMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/BillMode",
                                                                    "isLeaf": true,
                                                                    "label": "Cold water fee",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "enumItems": {
                                                                        "USED": "Unit price charge",
                                                                        "MONTHLY": "Monthly charge"
                                                                    }
                                                                },
                                                                "waterPrice": {
                                                                    "name": "waterPrice",
                                                                    "description": "",
                                                                    "type": "number",
                                                                    "format": "double",
                                                                    "isLeaf": true,
                                                                    "label": "Cold water price",
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "electricityMode": {
                                                                    "name": "electricityMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/BillMode",
                                                                    "isLeaf": true,
                                                                    "label": "Electricity Bill",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "enumItems": {
                                                                        "USED": "Unit price charge",
                                                                        "MONTHLY": "Monthly charge"
                                                                    }
                                                                },
                                                                "electricityPrice": {
                                                                    "name": "electricityPrice",
                                                                    "description": "",
                                                                    "type": "number",
                                                                    "format": "double",
                                                                    "isLeaf": true,
                                                                    "label": "Electricity Price",
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "hotWaterMode": {
                                                                    "name": "hotWaterMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/BillMode",
                                                                    "isLeaf": true,
                                                                    "label": "Hot water fee",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "enumItems": {
                                                                        "USED": "Unit price charge",
                                                                        "MONTHLY": "Monthly charge"
                                                                    }
                                                                },
                                                                "hotWaterPrice": {
                                                                    "name": "hotWaterPrice",
                                                                    "description": "",
                                                                    "type": "number",
                                                                    "format": "double",
                                                                    "isLeaf": true,
                                                                    "label": "Hot water price",
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "createdTime": {
                                                                    "name": "createdTime",
                                                                    "description": "Creation time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "label": "Creation Time",
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "updatedTime": {
                                                                    "name": "updatedTime",
                                                                    "description": "Update time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "label": "Update time",
                                                                    "level": "property",
                                                                    "checked": true
                                                                }
                                                            }
                                                        },
                                                        "building": {
                                                            "name": "building",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Building",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "floor": {
                                                            "name": "floor",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Floor",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "roomNo": {
                                                            "name": "roomNo",
                                                            "description": "Room number",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Room Number",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "roomType": {
                                                            "name": "roomType",
                                                            "description": "",
                                                            "type": "object",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/RoomType",
                                                            "isLeaf": true,
                                                            "relationship": "ManyToOne",
                                                            "label": "Room Type",
                                                            "level": "entity",
                                                            "checked": true,
                                                            "properties": {
                                                                "id": {
                                                                    "name": "id",
                                                                    "description": "Primary Key",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "name": {
                                                                    "name": "name",
                                                                    "description": "",
                                                                    "type": "string",
                                                                    "format": "",
                                                                    "isLeaf": true,
                                                                    "label": "Room Type",
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "location": {
                                                                    "name": "location",
                                                                    "description": "",
                                                                    "type": "object",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/Location",
                                                                    "isLeaf": true,
                                                                    "relationship": "ManyToOne",
                                                                    "label": "Place",
                                                                    "level": "entity",
                                                                    "checked": true,
                                                                    "properties": {
                                                                        "id": {
                                                                            "name": "id",
                                                                            "description": "Primary Key",
                                                                            "type": "integer",
                                                                            "format": "long",
                                                                            "isLeaf": true,
                                                                            "editable": false,
                                                                            "level": "property",
                                                                            "checked": true
                                                                        },
                                                                        "name": {
                                                                            "name": "name",
                                                                            "description": "",
                                                                            "type": "string",
                                                                            "format": "",
                                                                            "isLeaf": true,
                                                                            "label": "Place Name",
                                                                            "level": "property",
                                                                            "checked": true
                                                                        },
                                                                        "distribution": {
                                                                            "name": "distribution",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/Distribution",
                                                                            "isLeaf": true,
                                                                            "label": "Allocation method",
                                                                            "level": "entity",
                                                                            "checked": true,
                                                                            "enumItems": {
                                                                                "AUTO": "Automatic",
                                                                                "MANUAL": "Manual"
                                                                            }
                                                                        },
                                                                        "applyDocument": {
                                                                            "name": "applyDocument",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/ApplyDocument",
                                                                            "isLeaf": true,
                                                                            "label": "Application Information",
                                                                            "level": "entity",
                                                                            "checked": true,
                                                                            "enumItems": {
                                                                                "YES": "Required",
                                                                                "NO": "Not Required"
                                                                            }
                                                                        },
                                                                        "applyOutDocument": {
                                                                            "name": "applyOutDocument",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/ApplyOutDocument",
                                                                            "isLeaf": true,
                                                                            "label": "Check-out Information",
                                                                            "level": "entity",
                                                                            "checked": true,
                                                                            "enumItems": {
                                                                                "YES": "Required",
                                                                                "NO": "Optional"
                                                                            }
                                                                        },
                                                                        "payMode": {
                                                                            "name": "payMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/PayMode",
                                                                            "isLeaf": true,
                                                                            "label": "Payment method",
                                                                            "level": "entity",
                                                                            "checked": true,
                                                                            "enumItems": {
                                                                                "ONLINE": "Online payment",
                                                                                "OFFLINE": "Offline payment"
                                                                            }
                                                                        },
                                                                        "waterMode": {
                                                                            "name": "waterMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/BillMode",
                                                                            "isLeaf": true,
                                                                            "label": "Cold water fee",
                                                                            "level": "entity",
                                                                            "checked": true,
                                                                            "enumItems": {
                                                                                "USED": "Unit price charge",
                                                                                "MONTHLY": "Monthly charge"
                                                                            }
                                                                        },
                                                                        "waterPrice": {
                                                                            "name": "waterPrice",
                                                                            "description": "",
                                                                            "type": "number",
                                                                            "format": "double",
                                                                            "isLeaf": true,
                                                                            "label": "Cold water price",
                                                                            "level": "property",
                                                                            "checked": true
                                                                        },
                                                                        "electricityMode": {
                                                                            "name": "electricityMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/BillMode",
                                                                            "isLeaf": true,
                                                                            "label": "Electricity Bill",
                                                                            "level": "entity",
                                                                            "checked": true,
                                                                            "enumItems": {
                                                                                "USED": "Unit price charge",
                                                                                "MONTHLY": "Monthly charge"
                                                                            }
                                                                        },
                                                                        "electricityPrice": {
                                                                            "name": "electricityPrice",
                                                                            "description": "",
                                                                            "type": "number",
                                                                            "format": "double",
                                                                            "isLeaf": true,
                                                                            "label": "Electricity Price",
                                                                            "level": "property",
                                                                            "checked": true
                                                                        },
                                                                        "hotWaterMode": {
                                                                            "name": "hotWaterMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/BillMode",
                                                                            "isLeaf": true,
                                                                            "label": "Hot water fee",
                                                                            "level": "entity",
                                                                            "checked": true,
                                                                            "enumItems": {
                                                                                "USED": "Unit price charge",
                                                                                "MONTHLY": "Monthly charge"
                                                                            }
                                                                        },
                                                                        "hotWaterPrice": {
                                                                            "name": "hotWaterPrice",
                                                                            "description": "",
                                                                            "type": "number",
                                                                            "format": "double",
                                                                            "isLeaf": true,
                                                                            "label": "Hot water price",
                                                                            "level": "property",
                                                                            "checked": true
                                                                        },
                                                                        "createdTime": {
                                                                            "name": "createdTime",
                                                                            "description": "Creation time",
                                                                            "type": "string",
                                                                            "format": "date-time",
                                                                            "isLeaf": true,
                                                                            "editable": false,
                                                                            "label": "Creation Time",
                                                                            "level": "property",
                                                                            "checked": true
                                                                        },
                                                                        "updatedTime": {
                                                                            "name": "updatedTime",
                                                                            "description": "Update time",
                                                                            "type": "string",
                                                                            "format": "date-time",
                                                                            "isLeaf": true,
                                                                            "editable": false,
                                                                            "label": "Update time",
                                                                            "level": "property",
                                                                            "checked": true
                                                                        }
                                                                    }
                                                                },
                                                                "createdTime": {
                                                                    "name": "createdTime",
                                                                    "label": "Creation Time",
                                                                    "description": "Creation time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "updatedTime": {
                                                                    "name": "updatedTime",
                                                                    "label": "Update time",
                                                                    "description": "Update time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "checked": true
                                                                }
                                                            }
                                                        },
                                                        "genderType": {
                                                            "name": "genderType",
                                                            "description": "",
                                                            "type": "enum",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/RoomGenderType",
                                                            "isLeaf": true,
                                                            "label": "Room Category",
                                                            "level": "entity",
                                                            "checked": true,
                                                            "enumItems": {
                                                                "MALE": "Mens Bed",
                                                                "FEMALE": "Womens Bed"
                                                            }
                                                        },
                                                        "bedCount": {
                                                            "name": "bedCount",
                                                            "description": "Total number of beds",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Total number of beds",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "bedLeft": {
                                                            "name": "bedLeft",
                                                            "description": "Beds remaining",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Beds remaining",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "orientation": {
                                                            "name": "orientation",
                                                            "description": "",
                                                            "type": "enum",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/OrientationType",
                                                            "isLeaf": true,
                                                            "label": "Orientation",
                                                            "level": "entity",
                                                            "checked": true,
                                                            "enumItems": {
                                                                "EAST": "East",
                                                                "SOUTH": "South",
                                                                "WEST": "West",
                                                                "NORTH": "North"
                                                            }
                                                        },
                                                        "bed": {
                                                            "name": "bed",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Bed",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "chair": {
                                                            "name": "chair",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Chair",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "table": {
                                                            "name": "table",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Table",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "aircondition": {
                                                            "name": "aircondition",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Air Conditioner",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "television": {
                                                            "name": "television",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Television",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "refrigerator": {
                                                            "name": "refrigerator",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Refrigerator",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "cost": {
                                                            "name": "cost",
                                                            "description": "",
                                                            "type": "number",
                                                            "format": "double",
                                                            "isLeaf": true,
                                                            "label": "Monthly rent",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "deposit": {
                                                            "name": "deposit",
                                                            "description": "",
                                                            "type": "number",
                                                            "format": "double",
                                                            "isLeaf": true,
                                                            "label": "Deposit",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "users": {
                                                            "name": "users",
                                                            "description": "",
                                                            "type": "object",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/UserInRoom",
                                                            "isLeaf": true,
                                                            "relationship": "OneToMany",
                                                            "required": false,
                                                            "label": "Stayed guests",
                                                            "level": "entity",
                                                            "checked": true,
                                                            "properties": {
                                                                "id": {
                                                                    "name": "id",
                                                                    "description": "Primary Key",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "userId": {
                                                                    "name": "userId",
                                                                    "description": "",
                                                                    "type": "string",
                                                                    "format": "",
                                                                    "isLeaf": true,
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "applyId": {
                                                                    "name": "applyId",
                                                                    "description": "",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "createdTime": {
                                                                    "name": "createdTime",
                                                                    "description": "Creation time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "checked": true
                                                                },
                                                                "updatedTime": {
                                                                    "name": "updatedTime",
                                                                    "description": "Update time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "checked": true
                                                                }
                                                            }
                                                        },
                                                        "status": {
                                                            "name": "status",
                                                            "description": "",
                                                            "type": "enum",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/RoomStatus",
                                                            "isLeaf": true,
                                                            "label": "Room Status",
                                                            "level": "entity",
                                                            "checked": true,
                                                            "enumItems": {
                                                                "ENABLED": "Open",
                                                                "DISABLED": "Closed"
                                                            }
                                                        },
                                                        "description": {
                                                            "name": "description",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Room Introduction",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "pictures": {
                                                            "name": "pictures",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Room Picture",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "createdTime": {
                                                            "name": "createdTime",
                                                            "description": "Creation time",
                                                            "type": "string",
                                                            "format": "date-time",
                                                            "isLeaf": true,
                                                            "editable": false,
                                                            "label": "Creation Time",
                                                            "level": "property",
                                                            "checked": true
                                                        },
                                                        "updatedTime": {
                                                            "name": "updatedTime",
                                                            "description": "Update time",
                                                            "type": "string",
                                                            "format": "date-time",
                                                            "isLeaf": true,
                                                            "editable": false,
                                                            "label": "Update time",
                                                            "level": "property",
                                                            "checked": true
                                                        }
                                                    }
                                                },
                                                "applyContent": {
                                                    "name": "applyContent",
                                                    "description": "",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "createdTime": {
                                                    "name": "createdTime",
                                                    "label": "Creation Time",
                                                    "description": "Creation time",
                                                    "type": "string",
                                                    "format": "date-time",
                                                    "isLeaf": true,
                                                    "editable": false,
                                                    "level": "property",
                                                    "checked": true
                                                },
                                                "updatedTime": {
                                                    "name": "updatedTime",
                                                    "label": "Update time",
                                                    "description": "Update time",
                                                    "type": "string",
                                                    "format": "date-time",
                                                    "isLeaf": true,
                                                    "editable": false,
                                                    "level": "property",
                                                    "checked": true
                                                }
                                            }
                                        },
                                        "checked": true
                                    },
                                    "empty": {
                                        "name": "empty",
                                        "description": "",
                                        "type": "boolean",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": ""
                                    },
                                    "first": {
                                        "name": "first",
                                        "description": "",
                                        "type": "boolean",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": ""
                                    },
                                    "last": {
                                        "name": "last",
                                        "description": "",
                                        "type": "boolean",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": ""
                                    },
                                    "number": {
                                        "name": "number",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": "int"
                                    },
                                    "numberOfElements": {
                                        "name": "numberOfElements",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": "int"
                                    },
                                    "size": {
                                        "name": "size",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": "int"
                                    },
                                    "totalElements": {
                                        "name": "totalElements",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": "int"
                                    },
                                    "totalPages": {
                                        "name": "totalPages",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "checked": true,
                                        "format": "int"
                                    }
                                }
                            },
                            "selectedParams": [],
                            "singularResolverName": "getAllRoomApply",
                            "querySchemaList": {
                                "name": "Data",
                                "description": "",
                                "type": "object",
                                "format": "",
                                "$ref": "#/flowend925/structures/PageOfRoomApply",
                                "level": "structure",
                                "propertyList": [
                                    {
                                        "name": "content",
                                        "description": "",
                                        "type": "array",
                                        "level": "entity",
                                        "isArray": true,
                                        "$ref": "#/flowend925/entities/RoomApply",
                                        "items": {
                                            "$ref": "#/flowend925/entities/RoomApply",
                                            "level": "entity",
                                            "type": "object",
                                            "propertyList": [
                                                {
                                                    "name": "id",
                                                    "description": "Primary Key",
                                                    "type": "integer",
                                                    "format": "long",
                                                    "isLeaf": true,
                                                    "editable": false,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/Long",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "userId",
                                                    "description": "User ID",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/String",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "status",
                                                    "description": "Ticket Status",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/String",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "accommodationAgreement",
                                                    "description": "Signing the agreement",
                                                    "type": "boolean",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/Boolean",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "deposit",
                                                    "description": "Deposit",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/Decimal",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "cost",
                                                    "description": "Monthly rent",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/Decimal",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "waterMode",
                                                    "description": "",
                                                    "type": "enum",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/BillMode",
                                                    "isLeaf": true,
                                                    "level": "entity",
                                                    "enumItemList": [
                                                        {
                                                            "level": "enumItem",
                                                            "label": "Unit price",
                                                            "value": "USED"
                                                        },
                                                        {
                                                            "level": "enumItem",
                                                            "label": "Monthly Fee",
                                                            "value": "MONTHLY"
                                                        }
                                                    ],
                                                    "checked": true
                                                },
                                                {
                                                    "name": "waterPrice",
                                                    "description": "",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/Decimal",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "electricityMode",
                                                    "description": "",
                                                    "type": "enum",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/BillMode",
                                                    "isLeaf": true,
                                                    "level": "entity",
                                                    "enumItemList": [
                                                        {
                                                            "level": "enumItem",
                                                            "label": "Unit price",
                                                            "value": "USED"
                                                        },
                                                        {
                                                            "level": "enumItem",
                                                            "label": "Monthly Fee",
                                                            "value": "MONTHLY"
                                                        }
                                                    ],
                                                    "checked": true
                                                },
                                                {
                                                    "name": "electricityPrice",
                                                    "description": "",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/Decimal",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "hotWaterMode",
                                                    "description": "",
                                                    "type": "enum",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/BillMode",
                                                    "isLeaf": true,
                                                    "level": "entity",
                                                    "enumItemList": [
                                                        {
                                                            "level": "enumItem",
                                                            "label": "Unit price",
                                                            "value": "USED"
                                                        },
                                                        {
                                                            "level": "enumItem",
                                                            "label": "Monthly Fee",
                                                            "value": "MONTHLY"
                                                        }
                                                    ],
                                                    "checked": true
                                                },
                                                {
                                                    "name": "hotWaterPrice",
                                                    "description": "",
                                                    "type": "number",
                                                    "format": "double",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/Decimal",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "pay",
                                                    "description": "Payment voucher",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/String",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "reject",
                                                    "description": "",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/String",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "rejectMark",
                                                    "description": "",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/String",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "room",
                                                    "description": "",
                                                    "type": "object",
                                                    "format": "",
                                                    "$ref": "#/flowend925/entities/Room",
                                                    "isLeaf": true,
                                                    "relationship": "ManyToOne",
                                                    "level": "entity",
                                                    "propertyList": [
                                                        {
                                                            "name": "id",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "long",
                                                            "isLeaf": true,
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Long",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "location",
                                                            "description": "",
                                                            "type": "object",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/Location",
                                                            "isLeaf": true,
                                                            "relationship": "ManyToOne",
                                                            "label": "Place",
                                                            "level": "entity",
                                                            "propertyList": [
                                                                {
                                                                    "name": "id",
                                                                    "description": "Primary Key",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/Long",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "name",
                                                                    "description": "",
                                                                    "type": "string",
                                                                    "format": "",
                                                                    "isLeaf": true,
                                                                    "label": "Place Name",
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/String",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "distribution",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/Distribution",
                                                                    "isLeaf": true,
                                                                    "label": "Allocation method",
                                                                    "level": "entity",
                                                                    "enumItemList": [
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Automatic",
                                                                            "value": "AUTO"
                                                                        },
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Manual",
                                                                            "value": "MANUAL"
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "applyDocument",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/ApplyDocument",
                                                                    "isLeaf": true,
                                                                    "label": "Application Information",
                                                                    "level": "entity",
                                                                    "enumItemList": [
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Required",
                                                                            "value": "YES"
                                                                        },
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Not Required",
                                                                            "value": "NO"
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "applyOutDocument",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/ApplyOutDocument",
                                                                    "isLeaf": true,
                                                                    "label": "Check-out Information",
                                                                    "level": "entity",
                                                                    "enumItemList": [
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Required",
                                                                            "value": "YES"
                                                                        },
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Optional",
                                                                            "value": "NO"
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "payMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/PayMode",
                                                                    "isLeaf": true,
                                                                    "label": "Payment method",
                                                                    "level": "entity",
                                                                    "enumItemList": [
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Online Payment",
                                                                            "value": "ONLINE"
                                                                        },
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Offline payment",
                                                                            "value": "OFFLINE"
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "waterMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/BillMode",
                                                                    "isLeaf": true,
                                                                    "label": "Cold water fee",
                                                                    "level": "entity",
                                                                    "enumItemList": [
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Unit price",
                                                                            "value": "USED"
                                                                        },
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Monthly Fee",
                                                                            "value": "MONTHLY"
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "waterPrice",
                                                                    "description": "",
                                                                    "type": "number",
                                                                    "format": "double",
                                                                    "isLeaf": true,
                                                                    "label": "Cold water price",
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/Decimal",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "electricityMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/BillMode",
                                                                    "isLeaf": true,
                                                                    "label": "Electricity Bill",
                                                                    "level": "entity",
                                                                    "enumItemList": [
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Unit price",
                                                                            "value": "USED"
                                                                        },
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Monthly Fee",
                                                                            "value": "MONTHLY"
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "electricityPrice",
                                                                    "description": "",
                                                                    "type": "number",
                                                                    "format": "double",
                                                                    "isLeaf": true,
                                                                    "label": "Electricity Price",
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/Decimal",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "hotWaterMode",
                                                                    "description": "",
                                                                    "type": "enum",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/BillMode",
                                                                    "isLeaf": true,
                                                                    "label": "Hot water fee",
                                                                    "level": "entity",
                                                                    "enumItemList": [
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Unit price",
                                                                            "value": "USED"
                                                                        },
                                                                        {
                                                                            "level": "enumItem",
                                                                            "label": "Monthly Fee",
                                                                            "value": "MONTHLY"
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "hotWaterPrice",
                                                                    "description": "",
                                                                    "type": "number",
                                                                    "format": "double",
                                                                    "isLeaf": true,
                                                                    "label": "Hot water price",
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/Decimal",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "createdTime",
                                                                    "description": "Creation time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "label": "Creation Time",
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/DateTime",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "updatedTime",
                                                                    "description": "Update time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "label": "Update time",
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/DateTime",
                                                                    "checked": true
                                                                }
                                                            ],
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "building",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Building",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/String",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "floor",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Floor",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/String",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "roomNo",
                                                            "description": "Room number",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Room Number",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/String",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "roomType",
                                                            "description": "",
                                                            "type": "object",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/RoomType",
                                                            "isLeaf": true,
                                                            "relationship": "ManyToOne",
                                                            "label": "Room Type",
                                                            "level": "entity",
                                                            "propertyList": [
                                                                {
                                                                    "name": "id",
                                                                    "description": "Primary Key",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/Long",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "name",
                                                                    "description": "",
                                                                    "type": "string",
                                                                    "format": "",
                                                                    "isLeaf": true,
                                                                    "label": "Room Type",
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/String",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "location",
                                                                    "description": "",
                                                                    "type": "object",
                                                                    "format": "",
                                                                    "$ref": "#/flowend925/entities/Location",
                                                                    "isLeaf": true,
                                                                    "relationship": "ManyToOne",
                                                                    "label": "Place",
                                                                    "level": "entity",
                                                                    "propertyList": [
                                                                        {
                                                                            "name": "id",
                                                                            "description": "Primary Key",
                                                                            "type": "integer",
                                                                            "format": "long",
                                                                            "isLeaf": true,
                                                                            "editable": false,
                                                                            "level": "property",
                                                                            "$ref": "#/basicTypes/Long",
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "name",
                                                                            "description": "",
                                                                            "type": "string",
                                                                            "format": "",
                                                                            "isLeaf": true,
                                                                            "label": "Place Name",
                                                                            "level": "property",
                                                                            "$ref": "#/basicTypes/String",
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "distribution",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/Distribution",
                                                                            "isLeaf": true,
                                                                            "label": "Allocation method",
                                                                            "level": "entity",
                                                                            "enumItemList": [
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Automatic",
                                                                                    "value": "AUTO"
                                                                                },
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Manual",
                                                                                    "value": "MANUAL"
                                                                                }
                                                                            ],
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "applyDocument",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/ApplyDocument",
                                                                            "isLeaf": true,
                                                                            "label": "Application Information",
                                                                            "level": "entity",
                                                                            "enumItemList": [
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Required",
                                                                                    "value": "YES"
                                                                                },
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Not Required",
                                                                                    "value": "NO"
                                                                                }
                                                                            ],
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "applyOutDocument",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/ApplyOutDocument",
                                                                            "isLeaf": true,
                                                                            "label": "Check-out Information",
                                                                            "level": "entity",
                                                                            "enumItemList": [
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Required",
                                                                                    "value": "YES"
                                                                                },
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Optional",
                                                                                    "value": "NO"
                                                                                }
                                                                            ],
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "payMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/PayMode",
                                                                            "isLeaf": true,
                                                                            "label": "Payment method",
                                                                            "level": "entity",
                                                                            "enumItemList": [
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Online Payment",
                                                                                    "value": "ONLINE"
                                                                                },
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Offline payment",
                                                                                    "value": "OFFLINE"
                                                                                }
                                                                            ],
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "waterMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/BillMode",
                                                                            "isLeaf": true,
                                                                            "label": "Cold water fee",
                                                                            "level": "entity",
                                                                            "enumItemList": [
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Unit price",
                                                                                    "value": "USED"
                                                                                },
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Monthly Fee",
                                                                                    "value": "MONTHLY"
                                                                                }
                                                                            ],
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "waterPrice",
                                                                            "description": "",
                                                                            "type": "number",
                                                                            "format": "double",
                                                                            "isLeaf": true,
                                                                            "label": "Cold water price",
                                                                            "level": "property",
                                                                            "$ref": "#/basicTypes/Decimal",
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "electricityMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/BillMode",
                                                                            "isLeaf": true,
                                                                            "label": "Electricity Bill",
                                                                            "level": "entity",
                                                                            "enumItemList": [
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Unit price",
                                                                                    "value": "USED"
                                                                                },
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Monthly Fee",
                                                                                    "value": "MONTHLY"
                                                                                }
                                                                            ],
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "electricityPrice",
                                                                            "description": "",
                                                                            "type": "number",
                                                                            "format": "double",
                                                                            "isLeaf": true,
                                                                            "label": "Electricity Price",
                                                                            "level": "property",
                                                                            "$ref": "#/basicTypes/Decimal",
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "hotWaterMode",
                                                                            "description": "",
                                                                            "type": "enum",
                                                                            "format": "",
                                                                            "$ref": "#/flowend925/entities/BillMode",
                                                                            "isLeaf": true,
                                                                            "label": "Hot water fee",
                                                                            "level": "entity",
                                                                            "enumItemList": [
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Unit price",
                                                                                    "value": "USED"
                                                                                },
                                                                                {
                                                                                    "level": "enumItem",
                                                                                    "label": "Monthly Fee",
                                                                                    "value": "MONTHLY"
                                                                                }
                                                                            ],
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "hotWaterPrice",
                                                                            "description": "",
                                                                            "type": "number",
                                                                            "format": "double",
                                                                            "isLeaf": true,
                                                                            "label": "Hot water price",
                                                                            "level": "property",
                                                                            "$ref": "#/basicTypes/Decimal",
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "createdTime",
                                                                            "description": "Creation time",
                                                                            "type": "string",
                                                                            "format": "date-time",
                                                                            "isLeaf": true,
                                                                            "editable": false,
                                                                            "label": "Creation Time",
                                                                            "level": "property",
                                                                            "$ref": "#/basicTypes/DateTime",
                                                                            "checked": true
                                                                        },
                                                                        {
                                                                            "name": "updatedTime",
                                                                            "description": "Update time",
                                                                            "type": "string",
                                                                            "format": "date-time",
                                                                            "isLeaf": true,
                                                                            "editable": false,
                                                                            "label": "Update time",
                                                                            "level": "property",
                                                                            "$ref": "#/basicTypes/DateTime",
                                                                            "checked": true
                                                                        }
                                                                    ],
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "createdTime",
                                                                    "label": "Creation Time",
                                                                    "description": "Creation time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/DateTime",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "updatedTime",
                                                                    "label": "Update time",
                                                                    "description": "Update time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/DateTime",
                                                                    "checked": true
                                                                }
                                                            ],
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "genderType",
                                                            "description": "",
                                                            "type": "enum",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/RoomGenderType",
                                                            "isLeaf": true,
                                                            "label": "Room Category",
                                                            "level": "entity",
                                                            "enumItemList": [
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "Mens Bed",
                                                                    "value": "MALE"
                                                                },
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "Womens Bed",
                                                                    "value": "FEMALE"
                                                                }
                                                            ],
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "bedCount",
                                                            "description": "Total number of beds",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Total number of beds",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "bedLeft",
                                                            "description": "Beds remaining",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Beds remaining",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "orientation",
                                                            "description": "",
                                                            "type": "enum",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/OrientationType",
                                                            "isLeaf": true,
                                                            "label": "Orientation",
                                                            "level": "entity",
                                                            "enumItemList": [
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "East",
                                                                    "value": "EAST"
                                                                },
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "South",
                                                                    "value": "SOUTH"
                                                                },
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "West",
                                                                    "value": "WEST"
                                                                },
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "North",
                                                                    "value": "NORTH"
                                                                }
                                                            ],
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "bed",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Bed",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "chair",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Chair",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "table",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Table",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "aircondition",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Air Conditioner",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "television",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Television",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "refrigerator",
                                                            "description": "",
                                                            "type": "integer",
                                                            "format": "int",
                                                            "isLeaf": true,
                                                            "label": "Refrigerator",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Integer",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "cost",
                                                            "description": "",
                                                            "type": "number",
                                                            "format": "double",
                                                            "isLeaf": true,
                                                            "label": "Monthly rent",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Decimal",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "deposit",
                                                            "description": "",
                                                            "type": "number",
                                                            "format": "double",
                                                            "isLeaf": true,
                                                            "label": "Deposit",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/Decimal",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "users",
                                                            "description": "",
                                                            "type": "object",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/UserInRoom",
                                                            "isLeaf": true,
                                                            "relationship": "OneToMany",
                                                            "required": false,
                                                            "label": "Stayed guests",
                                                            "level": "entity",
                                                            "propertyList": [
                                                                {
                                                                    "name": "id",
                                                                    "description": "Primary Key",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/Long",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "userId",
                                                                    "description": "",
                                                                    "type": "string",
                                                                    "format": "",
                                                                    "isLeaf": true,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/String",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "applyId",
                                                                    "description": "",
                                                                    "type": "integer",
                                                                    "format": "long",
                                                                    "isLeaf": true,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/Long",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "createdTime",
                                                                    "description": "Creation time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/DateTime",
                                                                    "checked": true
                                                                },
                                                                {
                                                                    "name": "updatedTime",
                                                                    "description": "Update time",
                                                                    "type": "string",
                                                                    "format": "date-time",
                                                                    "isLeaf": true,
                                                                    "editable": false,
                                                                    "level": "property",
                                                                    "$ref": "#/basicTypes/DateTime",
                                                                    "checked": true
                                                                }
                                                            ],
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "status",
                                                            "description": "",
                                                            "type": "enum",
                                                            "format": "",
                                                            "$ref": "#/flowend925/entities/RoomStatus",
                                                            "isLeaf": true,
                                                            "label": "Room Status",
                                                            "level": "entity",
                                                            "enumItemList": [
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "Open",
                                                                    "value": "ENABLED"
                                                                },
                                                                {
                                                                    "level": "enumItem",
                                                                    "label": "Closed",
                                                                    "value": "DISABLED"
                                                                }
                                                            ],
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "description",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Room Introduction",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/String",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "pictures",
                                                            "description": "",
                                                            "type": "string",
                                                            "format": "",
                                                            "isLeaf": true,
                                                            "label": "Room Picture",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/String",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "createdTime",
                                                            "description": "Creation time",
                                                            "type": "string",
                                                            "format": "date-time",
                                                            "isLeaf": true,
                                                            "editable": false,
                                                            "label": "Creation Time",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/DateTime",
                                                            "checked": true
                                                        },
                                                        {
                                                            "name": "updatedTime",
                                                            "description": "Update time",
                                                            "type": "string",
                                                            "format": "date-time",
                                                            "isLeaf": true,
                                                            "editable": false,
                                                            "label": "Update time",
                                                            "level": "property",
                                                            "$ref": "#/basicTypes/DateTime",
                                                            "checked": true
                                                        }
                                                    ],
                                                    "checked": true
                                                },
                                                {
                                                    "name": "applyContent",
                                                    "description": "",
                                                    "type": "string",
                                                    "format": "",
                                                    "isLeaf": true,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/String",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "createdTime",
                                                    "label": "Creation Time",
                                                    "description": "Creation time",
                                                    "type": "string",
                                                    "format": "date-time",
                                                    "isLeaf": true,
                                                    "editable": false,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/DateTime",
                                                    "checked": true
                                                },
                                                {
                                                    "name": "updatedTime",
                                                    "label": "Update time",
                                                    "description": "Update time",
                                                    "type": "string",
                                                    "format": "date-time",
                                                    "isLeaf": true,
                                                    "editable": false,
                                                    "level": "property",
                                                    "$ref": "#/basicTypes/DateTime",
                                                    "checked": true
                                                }
                                            ]
                                        },
                                        "checked": true
                                    },
                                    {
                                        "name": "empty",
                                        "description": "",
                                        "type": "boolean",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Boolean",
                                        "checked": true
                                    },
                                    {
                                        "name": "first",
                                        "description": "",
                                        "type": "boolean",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Boolean",
                                        "checked": true
                                    },
                                    {
                                        "name": "last",
                                        "description": "",
                                        "type": "boolean",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Boolean",
                                        "checked": true
                                    },
                                    {
                                        "name": "number",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Integer",
                                        "checked": true
                                    },
                                    {
                                        "name": "numberOfElements",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Integer",
                                        "checked": true
                                    },
                                    {
                                        "name": "size",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Integer",
                                        "checked": true
                                    },
                                    {
                                        "name": "totalElements",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Integer",
                                        "checked": true
                                    },
                                    {
                                        "name": "totalPages",
                                        "description": "",
                                        "type": "integer",
                                        "level": "property",
                                        "isLeaf": true,
                                        "$ref": "#/basicTypes/Integer",
                                        "checked": true
                                    }
                                ],
                                "checked": true
                            },
                            "offsetX": 942.421875,
                            "offsetY": 381
                        }
                    ]
                },
                "expanded": true
            },
            {
                "level": "logic",
                "name": "remove",
                "definition": {
                    "params": [
                        {
                            "level": "param",
                            "name": "event",
                            "schema": {
                                "ref": "#/basicTypes/String"
                            }
                        },
                        {
                            "level": "param",
                            "name": "scope",
                            "schema": {
                                "ref": "#/basicTypes/String"
                            }
                        }
                    ],
                    "returns": [],
                    "variables": [
                        {
                            "level": "variable",
                            "name": "res",
                            "schema": {
                                "$ref": "#/flowend925/structures/PageOfRoomApply"
                            },
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "content"
                                        },
                                        "value": {
                                            "type": "ArrayExpression",
                                            "elements": []
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "empty"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "first"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "last"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "number"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "numberOfElements"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "size"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "totalElements"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    },
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "totalPages"
                                        },
                                        "value": {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "body": [
                        {
                            "level": "logicNode",
                            "type": "Start"
                        },
                        {
                            "level": "logicNode",
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "level": "logicNode",
                                "type": "Identifier",
                                "name": "res"
                            },
                            "right": {
                                "level": "logicNode",
                                "type": "CallInterface",
                                "label": "Calling interface",
                                "interfaceKey": "flowend925/deleteRoomApply",
                                "params": [
                                    {
                                        "name": "id",
                                        "in": "path",
                                        "value": {
                                            "level": "expressionNode",
                                            "type": "MemberExpression",
                                            "object": {
                                                "level": "expressionNode",
                                                "type": "MemberExpression",
                                                "object": {
                                                    "level": "expressionNode",
                                                    "type": "Identifier",
                                                    "name": "scope"
                                                },
                                                "property": {
                                                    "level": "expressionNode",
                                                    "type": "Identifier",
                                                    "name": "item"
                                                }
                                            },
                                            "property": {
                                                "level": "expressionNode",
                                                "type": "Identifier",
                                                "name": "id"
                                            }
                                        }
                                    }
                                ],
                                "selectedParams": [
                                    {
                                        "level": "param",
                                        "type": "Identifier",
                                        "isLeaf": true,
                                        "name": "id",
                                        "in": "path",
                                        "required": true,
                                        "schema": {
                                            "type": "integer",
                                            "format": "long",
                                            "isLeaf": true
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "level": "logicNode",
                            "type": "CallLogic",
                            "label": "Call logic",
                            "calleeCode": "$refs['tableView'].reload",
                            "arguments": []
                        },
                        {
                            "level": "logicNode",
                            "type": "End"
                        }
                    ]
                },
                "expanded": true
            },
            {
                "level": "logic",
                "expanded": true,
                "name": "openAccept",
                "description": "",
                "definition": {
                    "params": [
                        {
                            "level": "param",
                            "type": "Identifier",
                            "name": "event",
                            "description": "",
                            "schema": {
                                "type": "string",
                                "format": ""
                            },
                            "required": true,
                            "isLeaf": true,
                            "existingNames": [
                                "abstract",
                                "in",
                                "double",
                                "arguments",
                                "boolean",
                                "break",
                                "byte",
                                "case",
                                "catch",
                                "char",
                                "class*",
                                "const",
                                "continue",
                                "debugger",
                                "default",
                                "delete",
                                "do",
                                "else",
                                "enum*",
                                "eval",
                                "export*",
                                "extends*",
                                false,
                                "final",
                                "finally",
                                "float",
                                "for",
                                "function",
                                "goto",
                                "if",
                                "implements",
                                "import*",
                                "instanceof",
                                "int",
                                "interface",
                                "let",
                                "long",
                                "native",
                                "new",
                                null,
                                "package",
                                "private",
                                "protected",
                                "public",
                                "return",
                                "short",
                                "static",
                                "super*",
                                "switch",
                                "synchronized",
                                "this",
                                "throw",
                                "throws",
                                "transient",
                                true,
                                "try",
                                "typeof",
                                "var",
                                "void",
                                "volatile",
                                "while",
                                "with",
                                "yield",
                                "roomApplyItem",
                                "load",
                                "remove",
                                "openAccept",
                                "accept"
                            ],
                            "init": {
                                "type": "StringLiteral",
                                "value": ""
                            }
                        },
                        {
                            "level": "param",
                            "type": "Identifier",
                            "name": "scope",
                            "description": "",
                            "schema": {
                                "$ref": "#/flowfront0928/structures/ScopeOfProcessTask"
                            },
                            "required": true,
                            "isLeaf": true,
                            "existingNames": [
                                "abstract",
                                "in",
                                "double",
                                "arguments",
                                "boolean",
                                "break",
                                "byte",
                                "case",
                                "catch",
                                "char",
                                "class*",
                                "const",
                                "continue",
                                "debugger",
                                "default",
                                "delete",
                                "do",
                                "else",
                                "enum*",
                                "eval",
                                "export*",
                                "extends*",
                                false,
                                "final",
                                "finally",
                                "float",
                                "for",
                                "function",
                                "goto",
                                "if",
                                "implements",
                                "import*",
                                "instanceof",
                                "int",
                                "interface",
                                "let",
                                "long",
                                "native",
                                "new",
                                null,
                                "package",
                                "private",
                                "protected",
                                "public",
                                "return",
                                "short",
                                "static",
                                "super*",
                                "switch",
                                "synchronized",
                                "this",
                                "throw",
                                "throws",
                                "transient",
                                true,
                                "try",
                                "typeof",
                                "var",
                                "void",
                                "volatile",
                                "while",
                                "with",
                                "yield",
                                "roomApplyItem",
                                "load",
                                "remove",
                                "openAccept",
                                "accept"
                            ],
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "ObjectProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "item"
                                        },
                                        "value": {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "id"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "processDefinitionId"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "taskDefinitionKey"
                                                    },
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "undefined"
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "variables"
                                                    },
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "id"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "userId"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "status"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "accommodationAgreement"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "deposit"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "cost"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "waterMode"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "USED"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "waterPrice"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "electricityMode"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "USED"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "electricityPrice"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "hotWaterMode"
                                                                },
                                                                "value": {
                                                                    "type": "StringLiteral",
                                                                    "value": "USED"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "hotWaterPrice"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "pay"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "reject"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "rejectMark"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "room"
                                                                },
                                                                "value": {
                                                                    "type": "ObjectExpression",
                                                                    "properties": [
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "id"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "location"
                                                                            },
                                                                            "value": {
                                                                                "type": "ObjectExpression",
                                                                                "properties": [
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "id"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "name"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "distribution"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "StringLiteral",
                                                                                            "value": "AUTO"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "applyDocument"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "StringLiteral",
                                                                                            "value": "YES"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "applyOutDocument"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "StringLiteral",
                                                                                            "value": "YES"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "payMode"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "StringLiteral",
                                                                                            "value": "ONLINE"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "waterMode"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "StringLiteral",
                                                                                            "value": "USED"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "waterPrice"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "electricityMode"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "StringLiteral",
                                                                                            "value": "USED"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "electricityPrice"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "hotWaterMode"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "StringLiteral",
                                                                                            "value": "USED"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "hotWaterPrice"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "createdTime"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "updatedTime"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "building"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "floor"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "roomNo"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "roomType"
                                                                            },
                                                                            "value": {
                                                                                "type": "ObjectExpression",
                                                                                "properties": [
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "id"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "name"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "location"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "ObjectExpression",
                                                                                            "properties": [
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "id"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "undefined"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "name"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "undefined"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "distribution"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "StringLiteral",
                                                                                                        "value": "AUTO"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "applyDocument"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "StringLiteral",
                                                                                                        "value": "YES"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "applyOutDocument"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "StringLiteral",
                                                                                                        "value": "YES"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "payMode"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "StringLiteral",
                                                                                                        "value": "ONLINE"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "waterMode"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "StringLiteral",
                                                                                                        "value": "USED"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "waterPrice"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "undefined"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "electricityMode"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "StringLiteral",
                                                                                                        "value": "USED"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "electricityPrice"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "undefined"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "hotWaterMode"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "StringLiteral",
                                                                                                        "value": "USED"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "hotWaterPrice"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "undefined"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "createdTime"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "undefined"
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "type": "ObjectProperty",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "updatedTime"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "undefined"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "createdTime"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "updatedTime"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "genderType"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "MALE"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "bedCount"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "bedLeft"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "orientation"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "EAST"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "bed"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "chair"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "table"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "aircondition"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "television"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "refrigerator"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "cost"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "deposit"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "users"
                                                                            },
                                                                            "value": {
                                                                                "type": "ObjectExpression",
                                                                                "properties": [
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "id"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "userId"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "applyId"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "createdTime"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "updatedTime"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ObjectProperty",
                                                                                        "key": {
                                                                                            "type": "Identifier",
                                                                                            "name": "room"
                                                                                        },
                                                                                        "value": {
                                                                                            "type": "Identifier",
                                                                                            "name": "undefined"
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "status"
                                                                            },
                                                                            "value": {
                                                                                "type": "StringLiteral",
                                                                                "value": "ENABLED"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "description"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "pictures"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "createdTime"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "updatedTime"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "applyContent"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "createdTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "updatedTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "type": "ObjectProperty",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "userInfo"
                                                    },
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "Status"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "LastLoginTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "UserInfoExtend"
                                                                },
                                                                "value": {
                                                                    "type": "ObjectExpression",
                                                                    "properties": [
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "Job Number"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "ObjectProperty",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "ID card"
                                                                            },
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "undefined"
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "UserName"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "UserId"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "CreateTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "UpdateTime"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "LoginCount"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "Source"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "Email"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            },
                                                            {
                                                                "type": "ObjectProperty",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "Phone"
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "returns": [],
                    "variables": [],
                    "body": [
                        {
                            "level": "logicNode",
                            "type": "Start",
                            "label": "Start"
                        },
                        {
                            "level": "logicNode",
                            "type": "AssignmentExpression",
                            "label": "Assignment",
                            "operator": "=",
                            "left": {
                                "level": "expressionNode",
                                "type": "Identifier",
                                "name": "roomApplyItem",
                                "index": 1602769417847
                            },
                            "right": {
                                "level": "expressionNode",
                                "type": "MemberExpression",
                                "name": "name",
                                "hide": false,
                                "index": 1602769417940,
                                "object": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "scope",
                                    "index": 1602769417940
                                },
                                "property": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "item"
                                },
                                "offsetX": 638.09375,
                                "offsetY": 466
                            }
                        },
                        {
                            "level": "logicNode",
                            "type": "CallLogic",
                            "label": "Call logic",
                            "calleeCode": "$refs['modal1'].open",
                            "arguments": []
                        },
                        {
                            "level": "logicNode",
                            "type": "End",
                            "label": "Finish"
                        }
                    ],
                    "playground": [
                        {
                            "level": "expressionNode",
                            "type": "BuiltInFunction",
                            "value": "Clone",
                            "offsetX": 853.09375,
                            "offsetY": 241,
                            "calleeCode": "Clone",
                            "params": [
                                {
                                    "name": "obj",
                                    "schema": {
                                        "type": "object",
                                        "properties": {}
                                    },
                                    "value": null
                                }
                            ]
                        }
                    ]
                },
                "serviceType": "web",
                "existingNames": [
                    "abstract",
                    "in",
                    "double",
                    "arguments",
                    "boolean",
                    "break",
                    "byte",
                    "case",
                    "catch",
                    "char",
                    "class*",
                    "const",
                    "continue",
                    "debugger",
                    "default",
                    "delete",
                    "do",
                    "else",
                    "enum*",
                    "eval",
                    "export*",
                    "extends*",
                    false,
                    "final",
                    "finally",
                    "float",
                    "for",
                    "function",
                    "goto",
                    "if",
                    "implements",
                    "import*",
                    "instanceof",
                    "int",
                    "interface",
                    "let",
                    "long",
                    "native",
                    "new",
                    null,
                    "package",
                    "private",
                    "protected",
                    "public",
                    "return",
                    "short",
                    "static",
                    "super*",
                    "switch",
                    "synchronized",
                    "this",
                    "throw",
                    "throws",
                    "transient",
                    true,
                    "try",
                    "typeof",
                    "var",
                    "void",
                    "volatile",
                    "while",
                    "with",
                    "yield",
                    "load",
                    "remove"
                ]
            },
            {
                "level": "logic",
                "expanded": true,
                "name": "accept",
                "description": "",
                "definition": {
                    "params": [],
                    "returns": [],
                    "variables": [],
                    "body": [
                        {
                            "level": "logicNode",
                            "type": "Start",
                            "label": "Start"
                        },
                        {
                            "level": "logicNode",
                            "type": "AssignmentExpression",
                            "label": "Assignment",
                            "operator": "=",
                            "left": {
                                "level": "expressionNode",
                                "type": "MemberExpression",
                                "name": "",
                                "index": 1602769144982,
                                "object": {
                                    "level": "expressionNode",
                                    "type": "MemberExpression",
                                    "object": {
                                        "level": "expressionNode",
                                        "type": "Identifier",
                                        "name": "roomApplyItem",
                                        "index": 1602769144982
                                    },
                                    "property": {
                                        "level": "expressionNode",
                                        "type": "Identifier",
                                        "name": "variables"
                                    },
                                    "index": 1602769144982
                                },
                                "property": {
                                    "level": "expressionNode",
                                    "type": "Identifier",
                                    "name": "status"
                                }
                            },
                            "right": {
                                "level": "expressionNode",
                                "type": "StringLiteral",
                                "value": "Complete review"
                            }
                        },
                        {
                            "level": "logicNode",
                            "type": "CallInterface",
                            "label": "Calling interface",
                            "interfaceKey": "flowend925/applyRoomTaskDone",
                            "params": [
                                {
                                    "name": "taskId",
                                    "in": "query",
                                    "value": {
                                        "level": "expressionNode",
                                        "type": "MemberExpression",
                                        "name": "name",
                                        "hide": false,
                                        "index": 1602769145698,
                                        "offsetX": 527,
                                        "offsetY": 276,
                                        "object": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "roomApplyItem",
                                            "index": 1602769145698
                                        },
                                        "property": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "id"
                                        }
                                    },
                                    "schema": {
                                        "type": "string",
                                        "format": "",
                                        "isLeaf": true
                                    }
                                },
                                {
                                    "name": "body",
                                    "in": "body",
                                    "value": {
                                        "level": "expressionNode",
                                        "type": "MemberExpression",
                                        "name": "undefined",
                                        "hide": false,
                                        "index": 1602769145800,
                                        "offsetX": 365,
                                        "offsetY": 324,
                                        "object": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "roomApplyItem",
                                            "index": 1602769145800
                                        },
                                        "property": {
                                            "level": "expressionNode",
                                            "type": "Identifier",
                                            "name": "variables"
                                        }
                                    },
                                    "schema": {
                                        "$ref": "#/flowend925/entities/RoomApply"
                                    }
                                }
                            ],
                            "selectedParams": [
                                {
                                    "level": "param",
                                    "type": "Identifier",
                                    "name": "taskId",
                                    "description": "",
                                    "schema": {
                                        "type": "string",
                                        "format": "",
                                        "isLeaf": true
                                    },
                                    "in": "query",
                                    "required": true,
                                    "isLeaf": true,
                                    "init": {
                                        "type": "StringLiteral",
                                        "value": ""
                                    }
                                },
                                {
                                    "level": "param",
                                    "type": "Identifier",
                                    "name": "body",
                                    "description": "",
                                    "schema": {
                                        "$ref": "#/flowend925/entities/RoomApply"
                                    },
                                    "in": "body",
                                    "required": true,
                                    "isLeaf": true,
                                    "init": {
                                        "type": "StringLiteral",
                                        "value": ""
                                    }
                                }
                            ]
                        },
                        {
                            "level": "logicNode",
                            "type": "CallLogic",
                            "label": "Call logic",
                            "calleeCode": "$refs['modal1'].ok",
                            "arguments": []
                        },
                        {
                            "level": "logicNode",
                            "type": "End",
                            "label": "Finish"
                        }
                    ],
                    "playground": []
                },
                "serviceType": "web",
                "existingNames": [
                    "abstract",
                    "in",
                    "double",
                    "arguments",
                    "boolean",
                    "break",
                    "byte",
                    "case",
                    "catch",
                    "char",
                    "class*",
                    "const",
                    "continue",
                    "debugger",
                    "default",
                    "delete",
                    "do",
                    "else",
                    "enum*",
                    "eval",
                    "export*",
                    "extends*",
                    false,
                    "final",
                    "finally",
                    "float",
                    "for",
                    "function",
                    "goto",
                    "if",
                    "implements",
                    "import*",
                    "instanceof",
                    "int",
                    "interface",
                    "let",
                    "long",
                    "native",
                    "new",
                    null,
                    "package",
                    "private",
                    "protected",
                    "public",
                    "return",
                    "short",
                    "static",
                    "super*",
                    "switch",
                    "synchronized",
                    "this",
                    "throw",
                    "throws",
                    "transient",
                    true,
                    "try",
                    "typeof",
                    "var",
                    "void",
                    "volatile",
                    "while",
                    "with",
                    "yield",
                    "item",
                    "load",
                    "remove",
                    "openAccept"
                ]
            }
        ],
        "title": "Accommodation Application",
        "crumb": "Accommodation Application"
    }
    </definition>
import { ITagCategory, EPrecisionType, ETagCategoryStatus, EMetadataComponent, EMetadataInputType, EMetadataSelectMode } from '../interfaces';

export const sampleTagCategories: ITagCategory[] = [
    {
        id: "6894a3d4148f1ffde8c5a5ea",
        gameId: "6622504e845d0e572cddc306",
        group: {
            label: "Ball",
            value: "ball"
        },
        isParentTag: true,
        isReplay: false,
        metadataConfig: [
            {
                component: EMetadataComponent.INPUT,
                key: "eventId",
                label: "Event Id",
                readOnly: true,
                type: EMetadataInputType.TEXT
            },
            {
                component: EMetadataComponent.INPUT,
                key: "over",
                label: "Over",
                required: true,
                type: EMetadataInputType.TEXT
            },
            {
                component: EMetadataComponent.INPUT,
                key: "rating",
                label: "Rating",
                type: EMetadataInputType.NUMBER
            },
            {
                component: EMetadataComponent.SELECT,
                key: "actionBy",
                label: "Ball By",
                required: true,
                mode: EMetadataSelectMode.QUERY,
                multiple: false,
                query: "players"
            },
            {
                component: EMetadataComponent.SELECT,
                key: "ballType",
                label: "Ball Type",
                required: false,
                mode: EMetadataSelectMode.OPTIONS,
                multiple: false,
                options: [
                    {
                        label: "UnderArm",
                        value: "under-arm"
                    },
                    {
                        label: "OverArm",
                        value: "over-arm"
                    }
                ],
                query: "players"
            }
        ],
        name: "Ball",
        nameStructure: [
            "name",
            "eventId",
            "over"
        ],
        precisionType: EPrecisionType.LONG,
        status: ETagCategoryStatus.ACTIVE,
        subCategories: {
            "no-ball": {
                label: "No Ball",
                config: [
                    {
                        component: EMetadataComponent.INPUT,
                        key: "runs",
                        label: "Runs",
                        required: true,
                        type: EMetadataInputType.NUMBER
                    },
                    {
                        component: EMetadataComponent.SELECT,
                        key: "outcome",
                        label: "Outcome",
                        required: true,
                        mode: EMetadataSelectMode.OPTIONS,
                        multiple: false,
                        options: [
                            {
                                label: "Wicket",
                                value: "wicket"
                            },
                            {
                                label: "Six",
                                value: "six"
                            },
                            {
                                label: "Four",
                                value: "four"
                            }
                        ]
                    },
                    {
                        component: EMetadataComponent.SELECT,
                        key: "actionBy",
                        label: "Injury",
                        mode: EMetadataSelectMode.QUERY,
                        multiple: true,
                        query: "players"
                    }
                ]
            }
        },
        createdAt: 1754571732334,
        deleted: false
    },
    {
        id: "6894a3d4148f1ffde8c5a5eb",
        gameId: "6622504e845d0e572cddc307",
        group: {
            label: "Player",
            value: "player"
        },
        isParentTag: true,
        isReplay: false,
        metadataConfig: [
            {
                component: EMetadataComponent.INPUT,
                key: "playerId",
                label: "Player ID",
                required: true,
                type: EMetadataInputType.TEXT
            },
            {
                component: EMetadataComponent.INPUT,
                key: "playerName",
                label: "Player Name",
                required: true,
                type: EMetadataInputType.TEXT
            },
            {
                component: EMetadataComponent.SELECT,
                key: "position",
                label: "Position",
                required: true,
                mode: EMetadataSelectMode.OPTIONS,
                multiple: false,
                options: [
                    {
                        label: "Batsman",
                        value: "batsman"
                    },
                    {
                        label: "Bowler",
                        value: "bowler"
                    },
                    {
                        label: "Wicket Keeper",
                        value: "wicket_keeper"
                    }
                ]
            },
            {
                component: EMetadataComponent.INPUT,
                key: "team",
                label: "Team",
                required: true,
                type: EMetadataInputType.TEXT
            }
        ],
        name: "Player",
        nameStructure: [
            "name",
            "playerId",
            "team"
        ],
        precisionType: EPrecisionType.SHORT,
        status: ETagCategoryStatus.ACTIVE,
        subCategories: {
            "batting": {
                label: "Batting",
                config: [
                    {
                        component: EMetadataComponent.INPUT,
                        key: "runs",
                        label: "Runs Scored",
                        required: true,
                        type: EMetadataInputType.NUMBER
                    },
                    {
                        component: EMetadataComponent.INPUT,
                        key: "balls",
                        label: "Balls Faced",
                        required: true,
                        type: EMetadataInputType.NUMBER
                    }
                ]
            },
            "bowling": {
                label: "Bowling",
                config: [
                    {
                        component: EMetadataComponent.INPUT,
                        key: "overs",
                        label: "Overs Bowled",
                        required: true,
                        type: EMetadataInputType.NUMBER
                    },
                    {
                        component: EMetadataComponent.INPUT,
                        key: "wickets",
                        label: "Wickets Taken",
                        required: true,
                        type: EMetadataInputType.NUMBER
                    }
                ]
            }
        },
        createdAt: 1754571732000,
        deleted: false
    },
    {
        id: "6894a3d4148f1ffde8c5a5ec",
        gameId: "6622504e845d0e572cddc308",
        group: {
            label: "Game",
            value: "game"
        },
        isParentTag: false,
        isReplay: true,
        metadataConfig: [
            {
                component: EMetadataComponent.INPUT,
                key: "matchId",
                label: "Match ID",
                required: true,
                readOnly: true,
                type: EMetadataInputType.TEXT
            },
            {
                component: EMetadataComponent.INPUT,
                key: "venue",
                label: "Venue",
                required: true,
                type: EMetadataInputType.TEXT
            },
            {
                component: EMetadataComponent.INPUT,
                key: "date",
                label: "Match Date",
                required: true,
                type: EMetadataInputType.TEXT
            },
            {
                component: EMetadataComponent.SELECT,
                key: "format",
                label: "Match Format",
                required: true,
                mode: EMetadataSelectMode.OPTIONS,
                multiple: false,
                options: [
                    {
                        label: "T20",
                        value: "t20"
                    },
                    {
                        label: "ODI",
                        value: "odi"
                    },
                    {
                        label: "Test",
                        value: "test"
                    }
                ]
            },
            {
                component: EMetadataComponent.SELECT,
                key: "teams",
                label: "Teams",
                required: true,
                mode: EMetadataSelectMode.QUERY,
                multiple: true,
                query: "teams"
            },
            {
                component: EMetadataComponent.SELECT,
                key: "tossWinner",
                label: "Toss Winner",
                required: false,
                mode: EMetadataSelectMode.QUERY,
                multiple: false,
                query: "teams"
            }
        ],
        name: "Game Event",
        nameStructure: [
            "name",
            "matchId",
            "venue",
            "date"
        ],
        precisionType: EPrecisionType.LONG,
        status: ETagCategoryStatus.INACTIVE,
        subCategories: {
            "innings": {
                label: "Innings",
                config: [
                    {
                        component: EMetadataComponent.INPUT,
                        key: "inningsNumber",
                        label: "Innings Number",
                        required: true,
                        type: EMetadataInputType.NUMBER
                    },
                    {
                        component: EMetadataComponent.SELECT,
                        key: "battingTeam",
                        label: "Batting Team",
                        required: true,
                        mode: EMetadataSelectMode.QUERY,
                        multiple: false,
                        query: "teams"
                    }
                ]
            }
        },
        createdAt: 1754571731000,
        deleted: false
    }
];

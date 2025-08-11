import { ITagCategory, EPrecisionType, ETagCategoryStatus, EMetadataComponent, EMetadataInputType, EMetadataSelectMode } from "@shared/schema";

export const sampleData: ITagCategory[] = [
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
        ]
      }
    ],
    name: "Ball",
    nameStructure: ["name", "eventId", "over"],
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
    lastUpdatedAt: 1754571732334,
    deleted: false
  },
  {
    id: "player-category-id",
    gameId: "6622504e845d0e572cddc307",
    group: {
      label: "Player",
      value: "player"
    },
    isParentTag: false,
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
          { label: "Batsman", value: "batsman" },
          { label: "Bowler", value: "bowler" },
          { label: "Keeper", value: "keeper" }
        ]
      }
    ],
    name: "Player",
    nameStructure: ["name", "playerId"],
    precisionType: EPrecisionType.SHORT,
    status: ETagCategoryStatus.ACTIVE,
    subCategories: {
      "injury": {
        label: "Injury",
        config: [
          {
            component: EMetadataComponent.SELECT,
            key: "severity",
            label: "Severity",
            required: true,
            mode: EMetadataSelectMode.OPTIONS,
            multiple: false,
            options: [
              { label: "Minor", value: "minor" },
              { label: "Major", value: "major" }
            ]
          }
        ]
      },
      "substitution": {
        label: "Substitution",
        config: [
          {
            component: EMetadataComponent.INPUT,
            key: "substituteId",
            label: "Substitute ID",
            required: true,
            type: EMetadataInputType.TEXT
          }
        ]
      }
    },
    createdAt: 1704672000000,
    lastUpdatedAt: 1704672000000,
    deleted: false
  },
  {
    id: "game-event-category-id",
    gameId: "6622504e845d0e572cddc308",
    group: {
      label: "Game",
      value: "game"
    },
    isParentTag: true,
    isReplay: true,
    metadataConfig: [
      {
        component: EMetadataComponent.INPUT,
        key: "eventType",
        label: "Event Type",
        required: true,
        type: EMetadataInputType.TEXT
      },
      {
        component: EMetadataComponent.INPUT,
        key: "timestamp",
        label: "Timestamp",
        required: true,
        type: EMetadataInputType.NUMBER
      }
    ],
    name: "Game Event",
    nameStructure: ["name", "eventType", "timestamp"],
    precisionType: EPrecisionType.LONG,
    status: ETagCategoryStatus.INACTIVE,
    subCategories: {
      "timeout": {
        label: "Timeout",
        config: [
          {
            component: EMetadataComponent.INPUT,
            key: "duration",
            label: "Duration (minutes)",
            required: true,
            type: EMetadataInputType.NUMBER
          }
        ]
      }
    },
    createdAt: 1704326400000,
    lastUpdatedAt: 1704326400000,
    deleted: false
  }
];

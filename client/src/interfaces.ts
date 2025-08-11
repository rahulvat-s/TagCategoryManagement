export interface ITagCategory extends IBaseModel {
    gameId: string;
    group: IOption;
    name: string;
    precisionType: EPrecisionType;
    status: ETagCategoryStatus;
    metadataConfig: IMetadataConfig[];
    subCategories: Record<string, {label: string; config: IMetadataConfig[]}>;
    isParentTag: boolean;
    isReplay: boolean;
    nameStructure: string[];
}

export interface IBaseModel {
    id: string;
    createdAt: number;
    lastUpdatedAt?: number;
    deleted: boolean;
}

export interface IOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    id?: string;
}

export enum EPrecisionType {
    LONG = 'LONG',
    SHORT = 'SHORT',
}

export enum ETagCategoryStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface IMetadataConfig {
    component: EMetadataComponent;
    key: string;
    label: string;
    required?: boolean;
    readOnly?: boolean;
    type?: EMetadataInputType;
    mode?: EMetadataSelectMode;
    multiple?: boolean;
    options?: IOption[];
    query?: string;
}

export enum EMetadataComponent {
    INPUT = 'input',
    SELECT = 'select',
}

export enum EMetadataInputType {
    TEXT = 'text',
    NUMBER = 'number',
}

export enum EMetadataSelectMode {
    OPTIONS = 'options',
    QUERY = 'query',
}

export interface FilterState {
    status: string;
    group: string;
    precisionType: string;
    search: string;
}

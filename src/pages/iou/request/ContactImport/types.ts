import type {PermissionStatus} from 'react-native-permissions';

type StringHolder = {
    value: string;
};

type ContactImportResult = {
    contactList: DeviceContact[] | [];
    permissionStatus: PermissionStatus;
};

type PermissionResponse = 'granted' | 'denied' | 'blocked';

type DeviceContact = {
    firstName?: string;
    lastName?: string;
    emailAddresses?: StringHolder[];
    phoneNumbers?: Array<{value: string}>;
    imageData?: string;
};

export type {StringHolder, ContactImportResult, PermissionResponse, DeviceContact};
/// <reference types="jest" />
export declare function useMockMediaDevices<UsageResult>(usage: ({ mockUserMedia, mockMediaDevices, }: {
    mockUserMedia: jest.Mock;
    mockMediaDevices: {
        getUserMedia: jest.Mock;
        getSupportedConstraints: jest.Mock;
    };
}) => UsageResult): Promise<UsageResult>;
//# sourceMappingURL=MockMediaDevices.d.ts.map
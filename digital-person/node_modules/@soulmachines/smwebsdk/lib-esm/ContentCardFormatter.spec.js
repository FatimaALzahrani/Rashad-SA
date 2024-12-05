import { ContentCardFormatter } from './ContentCardFormatter';
import { legacyDialogflowMessage, dialogflowMessage, watsonMessage, } from './utils/test-utils/conversationResultMessage';
describe('ContentCardFormatter', function () {
    var contentCardFormatter;
    beforeEach(function () {
        contentCardFormatter = new ContentCardFormatter();
    });
    describe('format', function () {
        describe('when the body is a legacy dialogflow object', function () {
            it('returns the formatted cards with an id and data key', function () {
                expect(contentCardFormatter === null || contentCardFormatter === void 0 ? void 0 : contentCardFormatter.format(legacyDialogflowMessage.body)).toEqual([
                    {
                        data: {
                            id: 'image',
                            position: 'right',
                            type: 'image',
                            data: {
                                url: 'https://via.placeholder.com/150/808080/FF0000/?text=Right',
                            },
                        },
                        id: 'image',
                    },
                ]);
            });
        });
        describe('when the body is a dialogflow object', function () {
            it('returns the formatted cards with an id and data key', function () {
                expect(contentCardFormatter === null || contentCardFormatter === void 0 ? void 0 : contentCardFormatter.format(dialogflowMessage.body)).toEqual([
                    {
                        data: {
                            id: 'cat',
                            type: 'image',
                            data: {
                                alt: 'an image of a cat',
                                url: 'https://placekitten.com/200/300',
                            },
                        },
                        id: 'cat',
                    },
                    {
                        data: {
                            id: 'cat2',
                            type: 'image',
                            data: {
                                alt: 'another image of a cat',
                                url: 'https://placekitten.com/400/600',
                            },
                        },
                        id: 'cat2',
                    },
                    {
                        data: {
                            id: 'cat3',
                            type: 'image',
                            data: {
                                alt: 'an image of a cat',
                                url: 'https://placekitten.com/100/150',
                            },
                        },
                        id: 'cat3',
                    },
                ]);
            });
        });
        describe('when the body is a watson object', function () {
            it('returns the formatted cards with an id and data key', function () {
                expect(contentCardFormatter).toBeDefined();
                expect(contentCardFormatter === null || contentCardFormatter === void 0 ? void 0 : contentCardFormatter.format(watsonMessage.body)).toEqual([
                    {
                        data: {
                            id: 'options',
                            type: 'options',
                            data: {
                                options: [
                                    {
                                        label: 'A',
                                        value: 'hello',
                                    },
                                    {
                                        label: 'B',
                                        value: 'tell me a  joke',
                                    },
                                    {
                                        label: 'C',
                                        value: 'count to twenty',
                                    },
                                    {
                                        label: 'Tell me a joke',
                                    },
                                    {
                                        label: 'Show me a cat',
                                        value: '',
                                    },
                                    {
                                        label: '1',
                                        value: '1 ',
                                    },
                                    {
                                        label: '2',
                                    },
                                    {
                                        label: '3',
                                        value: '',
                                    },
                                    {
                                        label: '4',
                                    },
                                    {
                                        label: '5',
                                        value: '',
                                    },
                                    {
                                        label: '6',
                                    },
                                    {
                                        label: '7',
                                        value: '',
                                    },
                                ],
                            },
                        },
                        id: 'options',
                    },
                ]);
            });
        });
    });
});
//# sourceMappingURL=ContentCardFormatter.spec.js.map
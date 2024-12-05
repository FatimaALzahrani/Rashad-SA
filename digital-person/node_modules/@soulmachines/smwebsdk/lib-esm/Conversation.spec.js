import { ContentCardFormatter } from './ContentCardFormatter';
import { Conversation } from './Conversation';
import { ConversationState } from './ConversationState';
import { Logger } from './utils/Logger';
import { dialogflowMessage } from './utils/test-utils/conversationResultMessage';
import { showcardsMessage, hidecardsMessage, hideallcardsMessage, } from './utils/test-utils/speechMarkerResult';
jest.mock('./utils/Logger');
jest.mock('./ConversationState');
jest.mock('./ContentCardFormatter');
var mockSMEvent = {
    call: jest.fn(),
    addListener: jest.fn(),
};
jest.mock('./SmEvent', function () { return ({
    SmEvent: jest.fn(function () { return mockSMEvent; }),
}); });
describe('conversation', function () {
    var conversation;
    var mockLogger = new Logger();
    var mockConversationState = new ConversationState();
    var mockContentCardFormatter = new ContentCardFormatter();
    var formattedCardData1 = { id: 'mockId1', data: { id: 'mockId1' } };
    var formattedCardData2 = { id: 'mockId2', data: { id: 'mockId2' } };
    beforeEach(function () {
        jest
            .spyOn(mockContentCardFormatter, 'format')
            .mockReturnValue([formattedCardData1, formattedCardData2]);
        conversation = new Conversation(mockLogger, mockConversationState, mockContentCardFormatter);
        conversation.onCardChanged.addListener(function () { return jest.fn(); });
    });
    it('returns an empty array for allCards', function () {
        expect(conversation.cardData.size).toEqual(0);
    });
    it('returns an empty array for activeCards', function () {
        expect(conversation.activeCardIds.size).toEqual(0);
    });
    it('adds the active card when speechMarker name is showcards', function () {
        conversation.onSpeechMarker(showcardsMessage.body);
        expect(conversation.activeCardIds.size).toEqual(3);
        expect(conversation.activeCardIds.has('image')).toBeTruthy();
    });
    it('calls onCardChanged with an empty array when card is removed with hidecards', function () {
        conversation.activeCardIds = new Set(['image']);
        conversation.onSpeechMarker(hidecardsMessage.body);
        expect(mockSMEvent.call).toHaveBeenCalledWith([]);
    });
    it('calls onCardChanged with the card data when cards are added during onSpeechMarker', function () {
        conversation.cardData = new Map([
            ['image', { some: 'value1' }],
            ['image1', { more: 'value2' }],
            ['image2', { another: 'value3' }],
        ]);
        conversation.onSpeechMarker(showcardsMessage.body);
        expect(mockSMEvent.call).toHaveBeenCalledWith([
            { some: 'value1' },
            { more: 'value2' },
            { another: 'value3' },
        ]);
    });
    it('clears all active card ids when hide all cards is shown', function () {
        conversation.activeCardIds = new Set(['image', 'cat']);
        conversation.onSpeechMarker(hideallcardsMessage.body);
        expect(conversation.activeCardIds.size).toEqual(0);
    });
    it('clears active card id when hidecard is shown', function () {
        conversation.activeCardIds = new Set(['image', 'cat']);
        conversation.onSpeechMarker(hidecardsMessage.body);
        expect(conversation.activeCardIds.has('cat')).toBeTruthy();
        expect(conversation.activeCardIds.has('image')).toBeFalsy();
    });
    it('calls onCardChanged with an empty array when hide all cards message is received', function () {
        conversation.activeCardIds = new Set(['image', 'image2']);
        conversation.onSpeechMarker(hidecardsMessage.body);
        expect(mockSMEvent.call).toHaveBeenCalledWith([]);
    });
    describe('activeCards', function () {
        it('returns an empty array when there is no data', function () {
            expect(conversation.activeCards).toEqual([]);
        });
        it('logs error when active card does not exist', function () {
            conversation.activeCardIds = new Set(['nonexistentValue']);
            conversation.activeCards;
            expect(mockLogger.log).toHaveBeenCalledWith('error', 'card data for nonexistentValue does not exist');
        });
        it('returns card  data for all active cards when there is data', function () {
            conversation.activeCardIds = new Set(['cat', 'cat2']);
            conversation.cardData = new Map([
                [
                    'cat',
                    {
                        id: 'cat',
                        component: 'image',
                        data: {
                            id: 'cat',
                            alt: 'an image of a cat',
                            url: 'https://placekitten.com/200/300',
                        },
                    },
                ],
                [
                    'cat2',
                    {
                        id: 'cat2',
                        component: 'image',
                        data: {
                            id: 'cat2',
                            alt: 'another image of a cat',
                            url: 'https://placekitten.com/400/600',
                        },
                    },
                ],
            ]);
            expect(conversation.activeCards).toEqual([
                {
                    id: 'cat',
                    component: 'image',
                    data: {
                        id: 'cat',
                        alt: 'an image of a cat',
                        url: 'https://placekitten.com/200/300',
                    },
                },
                {
                    id: 'cat2',
                    component: 'image',
                    data: {
                        id: 'cat2',
                        alt: 'another image of a cat',
                        url: 'https://placekitten.com/400/600',
                    },
                },
            ]);
        });
    });
    describe('onConversationResult', function () {
        var _a;
        var mockBody = {
            status: 0,
            personaId: 0,
            input: {
                text: '',
            },
            output: {
                text: '',
                context: {},
            },
            provider: {
                kind: '',
                meta: {},
            },
        };
        var expectedCardRawData = (_a = {},
            _a['existingData'] = 'existingData',
            _a);
        describe('content cards are not automatically cleared', function () {
            beforeEach(function () {
                conversation.cardData = new Map([['existingId', expectedCardRawData]]);
                conversation.activeCardIds = new Set(['existingId']);
                conversation.autoClearCards = false;
                conversation.onConversationResult(mockBody);
            });
            it('does not call onCardChanged', function () {
                expect(mockSMEvent.call).not.toHaveBeenCalled();
            });
            it('adds the result of the formatted cards to the existing cards', function () {
                expect(conversation.cardData.get('existingId')).toEqual(expectedCardRawData);
                expect(conversation.cardData.get(formattedCardData1.id)).toEqual(formattedCardData1.data);
                expect(conversation.cardData.get(formattedCardData2.id)).toEqual(formattedCardData2.data);
                expect(conversation.cardData.size).toEqual(3);
            });
        });
        describe('automatically clearing content cards', function () {
            beforeEach(function () {
                conversation.cardData = new Map([['existingId', expectedCardRawData]]);
                conversation.activeCardIds = new Set(['existingId']);
                conversation.autoClearCards = true;
                conversation.onConversationResult(mockBody);
            });
            it('calls onCardChanged with an empty array', function () {
                conversation.onConversationResult(dialogflowMessage.body);
                expect(mockSMEvent.call).toHaveBeenCalledWith([]);
            });
            it('adds the result of the formatted cards, overriding the existing cards', function () {
                expect(conversation.cardData.get('existingId')).toEqual(expectedCardRawData);
                expect(conversation.cardData.get(formattedCardData1.id)).toEqual(formattedCardData1.data);
                expect(conversation.cardData.get(formattedCardData2.id)).toEqual(formattedCardData2.data);
                expect(conversation.cardData.size).toEqual(3);
            });
        });
    });
    describe('reset', function () {
        beforeEach(function () {
            conversation.cardData = new Map([['1', { some: 'data' }]]);
            conversation.activeCardIds = new Set(['one', 'two', 'three']);
            conversation.reset();
        });
        it('calls onCardChanged with an empty array', function () {
            expect(mockSMEvent.call).toBeCalledWith([]);
        });
        it('clears activeCardIds', function () {
            expect(conversation.activeCardIds.size).toEqual(0);
        });
        it('clears cardData', function () {
            expect(conversation.cardData.size).toEqual(0);
        });
    });
    describe('processStateMessage', function () {
        it('calls conversationState.processStateMessage with the message', function () {
            var message = {
                scene: {
                    featureFlags: [],
                },
            };
            conversation.processStateMessage(message);
            expect(mockConversationState.processStateMessage).toHaveBeenCalledWith(message);
        });
    });
    describe('processRecognizeResultsMessage', function () {
        it('calls conversationState.processRecognizeResultsMessage with the message', function () {
            var message = {
                status: 0,
                errorMessage: '',
                results: [
                    {
                        final: true,
                        alternatives: [],
                    },
                ],
            };
            conversation.processRecognizeResultsMessage(message);
            expect(mockConversationState.processRecognizeResultsMessage).toHaveBeenCalledWith(message);
        });
    });
});
//# sourceMappingURL=Conversation.spec.js.map
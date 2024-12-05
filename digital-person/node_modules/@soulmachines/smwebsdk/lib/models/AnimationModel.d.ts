import { AnimationAttributeTypes, AnimationCurveTypes } from '../enums/index';
interface Point {
    x: number;
    y: number;
    z: number;
}
export interface AnimationData {
    attribute: AnimationAttributeTypes;
    time: number;
    curve: AnimationCurveTypes;
    relative: boolean;
    value: Point | number | string;
}
/**
 * More documentation on the structure can be found on the [SVN animation readme](https://svn.soulmachines.com:8443/!/#repo/view/head/SM/trunk/SDK/avatar_sdk/docs/animation.md)
 */
export interface AnimationModel {
    points: AnimationData[];
}
export {};
//# sourceMappingURL=AnimationModel.d.ts.map
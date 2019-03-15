// can not use Validate decorator crouse of no ctx
export default function Validate(rules?: any) {
    return function (target: any, name: any, descriptor: any): void {
        console.dir(target);
        return;
    }
}

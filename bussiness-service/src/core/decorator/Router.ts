interface RouteerDecoratorOptions {
    prefix: string;
}

export default function Router({ prefix }: RouteerDecoratorOptions) {
    return (target: any) => {
        target.router = { prefix, routes: target.prototype.routes };
    }
}

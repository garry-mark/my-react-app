export default function Services(services: object) {
    return function (target: any) {
        const newServices = {}
        for (let key in services) {
            newServices[key] = new services[key]();
        }
        // set services as a static menber
        target.services = newServices;
    }
}
